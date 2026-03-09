use wasm_bindgen::prelude::*;
use sha2::{Sha256, Digest};

#[wasm_bindgen]
pub fn mine(nonce: u64) -> String {

    let mut hasher = Sha256::new();

    hasher.update(nonce.to_string());

    let result = hasher.finalize();

    hex::encode(result)
}