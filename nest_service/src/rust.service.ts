import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface RustService {
  sayHello(data: { name: string }): Observable<{ message: string }>;
  sayGoodbye(data: { name: string }): Observable<{ message: string }>;
  addSpecies(data: { name: string, description: string, population: number }): Observable<{ status: string }>;
}

@Injectable()
export class RustServiceClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'myservice',  // Le package défini dans le fichier .proto
      protoPath: 'src/proto/service.proto',  // Chemin vers le fichier proto
      url: 'rust_service:50051',  // L'URL du service gRPC (Rust) dans Docker
    },
  })
  private client: ClientGrpc;

  private rustService: RustService;

  onModuleInit() {
    this.rustService = this.client.getService<RustService>('RustService');
  }

  async sayHello(name: string): Promise<string> {
    const response = await this.rustService.sayHello({ name }).toPromise();
    return response?.message ?? 'Message par défaut';
  }

  async sayGoodbye(name: string): Promise<string> {
    const response = await this.rustService.sayGoodbye({ name }).toPromise();
    return response?.message ?? 'Message par défaut';
  }
  
  async addSpecies(name: string, description: string, population: number): Promise<string> {
    console.log('Sending to gRPC:', { name, description, population });
    const response = await this.rustService.addSpecies({ name, description, population }).toPromise();
    console.log('gRPC response:', response);
    return response?.status ?? 'Error';
  }
}

