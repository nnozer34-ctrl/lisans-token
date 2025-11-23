#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Symbol};

// Sözleşme içinde saklanacak verilerin yapısı
#[contracttype]
pub enum DataKey {
    Admin,           // Yöneticinin adresini tutar
    Balances,        // Kullanıcı bakiyelerini tutar (Address -> i128)
    ClaimedUsers,    // Talep eden kullanıcıları izlemek için (Address -> bool)
}

#[contract]
pub struct LisansKontrati;

#[contractimpl]
impl LisansKontrati {
    /// Sözleşmeyi ağa yükledikten sonra çağrılması GEREKEN ilk fonksiyondur.
    pub fn initialize(env: Env, admin: Address) {
        // Yöneticinin (Admin) adresini kalıcı olarak sakla
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    /// Bir kullanıcıya Lisans Tokenı basar ve gönderir. YALNIZCA Yönetici çağırabilir.
    pub fn mint_license(env: Env, to: Address) {
        let admin_key: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        // Çağrının yöneticiden gelip gelmediğini kontrol et
        admin_key.require_auth();

        // Kullanıcının mevcut bakiyesini oku
        let bal_key = (Symbol::new(&env, "bal"), to.clone());
        let balance: i128 = env.storage().persistent().get(&bal_key).unwrap_or(0_i128);

        // 1 LNS Token ekle
        env.storage().persistent().set(&bal_key, &(balance + 1_i128));

        // Olay Kaydı (Loglama)
        env.events().publish(
            (Symbol::new(&env, "LNS"), Symbol::new(&env, "mint")), 
            (admin_key, to, 1_i128),
        );
    }

    /// Belirtilen kullanıcının Lisans Tokenı bakiyesini kontrol eder. (FRONTEND bunu çağıracak)
    pub fn check_access(env: Env, user: Address) -> bool {
        // Kullanıcının bakiyesini oku
        let bal_key = (Symbol::new(&env, "bal"), user);
        let balance: i128 = env.storage().persistent().get(&bal_key).unwrap_or(0_i128);

        // Bakiye 1 veya daha fazlaysa erişim izni ver
        balance >= 1
    }

    /// Kullanıcı kendi başına Lisans Tokenı talep eder (claim eder).
    /// Her kullanıcı yalnızca 1 kez talep yapabilir.
    pub fn claim_license(env: Env, user: Address) {
        // Çağıranın kimliğini doğrula (user parametresi caller olarak işlev görür)
        user.require_auth();

        // Kullanıcının daha önce talep yapıp yapmadığını kontrol et
        let claimed_key = (Symbol::new(&env, "claimed"), user.clone());
        let already_claimed: bool = env.storage().persistent().get(&claimed_key).unwrap_or(false);

        if already_claimed {
            panic!("License already claimed by this user");
        }

        // Kullanıcının mevcut bakiyesini oku
        let bal_key = (Symbol::new(&env, "bal"), user.clone());
        let balance: i128 = env.storage().persistent().get(&bal_key).unwrap_or(0_i128);

        // 1 LNS Token ekle
        env.storage().persistent().set(&bal_key, &(balance + 1_i128));

        // Talep işaretini set et (bir daha talep yapamaması için)
        env.storage().persistent().set(&claimed_key, &true);

        // Olay Kaydı (Loglama)
        env.events().publish(
            (Symbol::new(&env, "LNS"), Symbol::new(&env, "claim")), 
            (user, 1_i128),
        );
    }

    /// Kullanıcının talep yapıp yapmadığını kontrol eder.
    pub fn is_claimed(env: Env, user: Address) -> bool {
        let claimed_key = (Symbol::new(&env, "claimed"), user);
        env.storage().persistent().get(&claimed_key).unwrap_or(false)
    }
}