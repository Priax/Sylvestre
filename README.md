docker exec -it sylvestre-rust_service-1 bash # Pour accéder au conteneur rust

sqlx migrate run # Ceci va permettre de créer les tables et les populer !


Pour créer des routes gRPC, déjà commencer par le service.proto (Doivent être les mêmes pour le rust_service et le nest_service)

Créer ensuite la route dans le main.rs, puis dans le nest_service

Pour lancer le tout, docker-compose up --build

Voici un exemple de test de route avec grpcurl :
```sh
grpcurl -plaintext -d '{"name": "Alice"}' localhost:50051 myservice.RustService/SayHello
```

Voici comment voir les tables de la database, si vous avez envie de faire des tests sans forcément faire de migrations 
```sh
docker exec -it sylvestre-postgres-1 bash

psql -U postgres Sylvestre_database

select * from greetings;
```

