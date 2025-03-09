FROM rust:latest

RUN apt-get update && apt-get install -y protobuf-compiler

WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY . .
RUN cargo install sqlx-cli --no-default-features --features postgres

RUN cargo build --release
CMD ["./target/release/rust_service"]
