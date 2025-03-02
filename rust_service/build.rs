use std::env;
use std::path::PathBuf;

fn main() {
    let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap()); // Get the OUT_DIR
    let descriptor_path = out_dir.join("myservice.bin"); // Store descriptor in OUT_DIR

    tonic_build::configure()
        .file_descriptor_set_path(&descriptor_path) // Correct path
        .compile(&["proto/service.proto"], &["proto"]) // Ensure correct paths
        .unwrap();
}

