import { Module } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';  // Importation de 'path'
import { AppController } from './app.controller';
import { RustServiceClient } from './rust.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'RUST_SERVICE',
      useFactory: () => {
        return {
          transport: Transport.GRPC,
          options: {
            package: 'rust',  // Assure-toi que le package est bien celui utilisé dans le fichier proto
            protoPath: path.join(__dirname, './proto/service.proto'),  // Utilisation de 'path.join' pour obtenir le chemin du fichier proto
            url: 'rust_service:50051',  // Utilisation du nom du service Docker et du port
          },
        };
      },
    },
    RustServiceClient,
  ],
})
export class AppModule {}

