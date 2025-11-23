# Stellar License Token (LNS) - Soroban Smart Contract

Soroban tabanlı bir Lisans Tokenı sistemi. Kullanıcıların lisans talep etmesini, kontrol etmesini ve yönetmesini sağlayan blockchain tabanlı çözüm.

## 📁 Proje Yapısı

```
Stellar/
├── sozlesme/proje/              # Soroban Smart Contract (Rust)
│   ├── contracts/hello-world/   # LNS Contract
│   │   ├── src/
│   │   │   ├── lib.rs           # Contract ana kodu
│   │   │   └── test.rs          # Unit testler
│   │   └── Cargo.toml           # Rust bağımlılıkları
│   └── Makefile                 # Build scriptleri
│
├── frontend/                     # Next.js Frontend
│   ├── app/
│   │   ├── page.tsx             # Landing page
│   │   ├── license/page.tsx     # License Manager
│   │   └── layout.tsx           # Root layout
│   ├── components/              # React components (shadcn/ui)
│   ├── lib/
│   │   ├── soroban.ts           # Soroban RPC integration
│   │   └── utils.ts
│   ├── package.json             # Node.js bağımlılıkları
│   └── next.config.mjs          # Next.js config
│
├── backend/                      # Python API (opsiyonel)
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   └── __init__.py
│   └── requirements.txt
│
└── docker-compose.yml            # Docker services
```

## 🚀 Smart Contract Özellikleri

### Contract Fonksiyonları

- **`initialize(env, admin)`** - Admin adresini ayarla (bir kez çalışır)
- **`mint_license(env, to)`** - Admin tarafından kullanıcıya lisans mint et
- **`claim_license(env, user)`** - Kullanıcı kendi lisansını talep et (bir kez)
- **`is_claimed(env, user)`** - Kullanıcının lisansı talep edip etmediğini kontrol et
- **`check_access(env, user)`** - Kullanıcının ≥1 lisansa sahip olup olmadığını kontrol et

### Storage Yapısı

```rust
// Persistent Storage
"bal" => Map<Address, u32>       // Adres başına lisans sayısı
"claimed" => Map<Address, bool>  // Talep durumu
"issuer" => Address              // Admin adresi
```

## 🎯 Frontend Özellikleri

### Pages

- **Landing Page** (`/`) - Proje hakkında bilgi ve navigasyon
- **License Manager** (`/license`) - Lisans yönetimi arayüzü

### Freighter Entegrasyonu

- **SDK**: `@stellar/freighter-api` v6
- **Özellikler**:
  - Wallet bağlantısı (Freighter popup)
  - Lisans durumu sorgulama
  - Lisans talep etme
  - Real-time wallet sync

### UI Components

- Shadcn/ui tabanlı component library
- Responsive design
- Dark/Light mode support

## 🛠️ Kurulum & Setup

### Gereksinimler

- **Rust** (1.70+) - Smart contract geliştirme
- **Soroban CLI** - Contract build & deploy
- **Node.js** (18+) - Frontend
- **pnpm** - Package manager

### Adım 1: Smart Contract Build

```bash
cd sozlesme/proje/contracts/hello-world
soroban contract build
```

**Output**: `/target/wasm32v1-none/release/lisans_kontrati.wasm` (3.3 KB)

### Adım 2: Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend çalışacak: `http://localhost:3000`

## 🌐 Stellar Network Bilgileri

**Network**: Soroban Testnet
- **RPC URL**: `https://soroban-testnet.stellar.org`
- **Network ID**: `TESTNET_NETWORK_PASSPHRASE`
- **Faucet**: https://friendbot.stellar.org

## 📝 Deployment

### 1. Testnet Hesabı Oluştur

```bash
# Hesap oluştur (private key kaydet!)
soroban keys generate --network testnet

# Faucet ile XLM al
curl "https://friendbot.stellar.org?addr=YOUR_PUBLIC_KEY"
```

### 2. Contract Deploy

```bash
soroban contract deploy \
  --network testnet \
  --wasm /path/to/lisans_kontrati.wasm \
  --source-account KEY_ALIAS
```

### 3. Initialize

```bash
soroban contract invoke \
  --network testnet \
  --contract CA5JQXFNR7IN7XKSLYFLFFXQIJVGQ5H6KZ3FMWX2GZPJ66J67VJYHQPT \
  --function initialize \
  --arg admin:G... \
  --source-account KEY_ALIAS
```

## 🔑 Freighter Wallet Entegrasyonu

### Kurulum

1. Chrome/Firefox'a Freighter extension'ı yükle
2. Testnet network'ü seç
3. Hesap oluştur veya import et

### Frontend Kullanımı

```typescript
import FreighterApi from '@stellar/freighter-api';

// Wallet bağlantısı
const result = await FreighterApi.requestAccess();
const { address } = await FreighterApi.getAddress();

// Transaction imzalama
const { signedTxXdr } = await FreighterApi.signTransaction(xdr, {
  networkPassphrase: NETWORK_PASSPHRASE,
});
```

## 🧪 Testing

### Contract Tests

```bash
cd sozlesme/proje/contracts/hello-world
cargo test
```

### Frontend Tests

```bash
cd frontend
pnpm test
```

## 📦 Teknoloji Stack

### Backend (Smart Contract)
- **Rust** - Programming language
- **Soroban SDK** v20.1.0 - Smart contract framework
- **wasm32v1-none** - Target architecture

### Frontend
- **Next.js** 16.0.3 - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **@stellar/stellar-sdk** - Stellar integration
- **@stellar/freighter-api** v6 - Wallet SDK

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 TODO List

- [ ] Soroban RPC integration (soroban.ts)
  - [ ] prepareContractCall() implementation
  - [ ] Real transaction building
  - [ ] check_access() RPC query

- [ ] Contract deployment
  - [ ] Fund testnet account
  - [ ] Deploy WASM
  - [ ] Get Contract ID
  - [ ] Initialize contract

- [ ] Frontend integration
  - [ ] Implement claimLicense()
  - [ ] Implement checkAccess() RPC
  - [ ] Add transaction signing
  - [ ] Add error handling

- [ ] Testing
  - [ ] Contract unit tests
  - [ ] Integration tests
  - [ ] E2E tests with Freighter

## 🤝 Katkı

1. Fork repo
2. Feature branch oluştur (`git checkout -b feature/amazing-feature`)
3. Değişiklikleri commit et (`git commit -m 'Add amazing feature'`)
4. Branch'e push et (`git push origin feature/amazing-feature`)
5. Pull Request aç

## 📄 Lisans

MIT

## 📞 İletişim

Soroban Smart Contract geliştirme soruları: https://discord.gg/stellar

---

**Dikkat**: Bu, geliştirme aşamasında olan bir projedir. Mainnet'te kullanmayın.
