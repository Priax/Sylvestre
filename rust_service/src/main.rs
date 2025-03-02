use tonic::{transport::Server, Request, Response, Status};
use tonic_reflection::server::Builder;
use myservice::rust_service_server::{RustService, RustServiceServer};
use myservice::{HelloRequest, HelloReply, GoodbyeRequest, GoodbyeReply};
use sqlx::PgPool;
use dotenv::dotenv;
use std::env;

pub mod myservice {
    tonic::include_proto!("myservice");
}

#[derive(Debug)]
pub struct MyRustService {
    db_pool: PgPool,
}

impl MyRustService {
    pub fn new(db_pool: PgPool) -> Self {
        Self { db_pool }
    }
}

#[tonic::async_trait]
impl RustService for MyRustService {
    async fn say_hello(&self, request: Request<HelloRequest>) -> Result<Response<HelloReply>, Status> {
        let name = request.into_inner().name;

        let result: (String,) = sqlx::query_as("SELECT message FROM greetings WHERE name = $1")
            .bind(&name)
            .fetch_one(&self.db_pool)
            .await
            .map_err(|e| Status::internal(format!("Database error: {}", e)))?;

        let reply = HelloReply {
            message: result.0,
        };

        Ok(Response::new(reply))
    }

    async fn say_goodbye(&self, request: Request<GoodbyeRequest>) -> Result<Response<GoodbyeReply>, Status> {
        let name = request.into_inner().name;

        let result: (String,) = sqlx::query_as("SELECT message FROM goodbye_messages WHERE name = $1")
            .bind(&name)
            .fetch_one(&self.db_pool)
            .await
            .map_err(|e| Status::internal(format!("Database error: {}", e)))?;

        let reply = GoodbyeReply {
            message: result.0,
        };

        Ok(Response::new(reply))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set in .env file");

    let db_pool = PgPool::connect(&database_url).await?;
    
    let addr = "0.0.0.0:50051".parse()?;
    let service = MyRustService::new(db_pool);

    let reflection_service = Builder::configure()
        .register_encoded_file_descriptor_set(tonic::include_file_descriptor_set!("myservice"))
        .build_v1()?;

    Server::builder()
        .add_service(RustServiceServer::new(service))
        .add_service(reflection_service)
        .serve(addr)
        .await?;

    Ok(())
}

