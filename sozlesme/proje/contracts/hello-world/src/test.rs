#![cfg(test)]
use soroban_sdk::{testutils::{Address as _, Ledger}, Env};
use crate::{LisansKontrati, LisansKontratiClient}; // Sözleşme dosyanızı dahil edin

#[test]
fn test_lisans_akisi() {
    let env = Env::default();
    let contract_id = env.register_contract(None, LisansKontrati);
    let client = LisansKontratiClient::new(&env, &contract_id);
    
    // Test için iki adres oluştur
    let admin = Address::random(&env);
    let user = Address::random(&env);

    // Sözleşme için sahte (mock) bir token kontratı oluştur
    let token_id = env.register_stellar_asset_contract(admin.clone());
    
    // 1. Initialize (Başlatma) testi
    client.initialize(&admin, &token_id);
    
    // 2. Erişim Kontrolü (Başlangıçta olmamalı)
    assert!(!client.check_access(&user)); 

    // 3. Lisans Dağıtma (Mint)
    // Önce kullanıcıya token kabul etmesi için güven hattı (trustline) kurmalıyız. 
    // Basit bir test için bu adım genellikle mock'lanır.
    
    // Yönetici olarak tokeni basıyoruz (1 token = 10,000,000)
    client.mint_license(&user); 

    // 4. Erişim Kontrolü (Şimdi olmalı)
    // Bakiyenin değişmesi için ledger'ı ilerletmek gerekebilir
    env.ledger().set(env.ledger().sequence() + 1); 

    assert!(client.check_access(&user)); 
}