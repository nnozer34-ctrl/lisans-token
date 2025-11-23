'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as StellarSdk from '@stellar/stellar-sdk';
import FreighterApi from '@stellar/freighter-api';

const LISANS_CONTRAT_ID = 'CA5JQXFNR7IN7XKSLYFLFFXQIJVGQ5H6KZ3FMWX2GZPJ66J67VJYHQPT'; // Contract ID

export default function LicensePage() {
  const [userPublicKey, setUserPublicKey] = useState<string | null>(null);
  const [hasLicense, setHasLicense] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Freighter SDK durumu kontrol et
  useEffect(() => {
    const checkFreighter = async () => {
      try {
        console.log('🔍 Checking Freighter SDK...');
        
        // isConnected() SDK metodu ile kontrol et
        const { isConnected } = await FreighterApi.isConnected();
        if (isConnected) {
          console.log('✅ Freighter SDK is connected');
        } else {
          console.log('ℹ️  Freighter SDK is not connected');
        }
      } catch (err) {
        console.log('ℹ️  Freighter SDK check:', err);
      }
    };

    checkFreighter();
  }, []);

  // Freighter Wallet Bağlantısı - SDK kullanarak
  const connectWallet = async () => {
    try {
      setError('');
      setMessage('⏳ Opening Freighter...');
      setLoading(true);

      console.log('=== Freighter SDK Connection ===');

      try {
        // requestAccess() gerçek Freighter popup'ını açar
        const result = await FreighterApi.requestAccess();
        console.log('Freighter result:', result);
        
        if (result.error) {
          setError(`❌ Freighter: ${result.error}`);
          setLoading(false);
          return;
        }

        // Şimdi address al
        const addressResult = await FreighterApi.getAddress();
        console.log('Address result:', addressResult);
        
        if (addressResult.error) {
          setError(`❌ Failed to get address: ${addressResult.error}`);
          setLoading(false);
          return;
        }

        const publicKey = addressResult.address;
        if (publicKey) {
          setUserPublicKey(publicKey);
          setMessage(`✅ Connected: ${publicKey.substring(0, 10)}...${publicKey.substring(-10)}`);
          console.log('✅ Wallet connected via Freighter SDK');
          await checkAccess(publicKey);
        }
      } catch (getKeyError: any) {
        const errorMsg = getKeyError?.message || String(getKeyError);
        setError(`❌ Freighter connection failed: ${errorMsg}`);
        console.error('Freighter SDK error:', getKeyError);
      }
    } catch (err: any) {
      const errorMsg = err?.message || String(err);
      setError(`❌ Connection failed: ${errorMsg}`);
      console.error('Wallet connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Lisans kontrolü - Soroban RPC çağrısı
  const checkAccess = async (publicKey: string) => {
    try {
      setLoading(true);
      console.log('📋 Checking license for:', publicKey);
      
      // TODO: Soroban RPC ile kontrol et
      console.log('TODO: Call check_access() on contract');
      console.log('Contract ID:', LISANS_CONTRAT_ID);
      console.log('User:', publicKey);
      
      // Şimdilik demo amaçlı
      setHasLicense(true);
      setIsClaimed(false);
      setMessage(`📋 License check complete`);
    } catch (err: any) {
      console.error('Check access error:', err);
      setError(`Failed to check access: ${err?.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Lisans talep et - Soroban işlem
  const claimLicense = async () => {
    if (!userPublicKey) {
      setError('❌ Please connect wallet first');
      return;
    }

    try {
      setError('');
      setMessage('⏳ Opening Freighter to sign transaction...');
      setLoading(true);

      console.log('=== Claim License ===');
      console.log('User:', userPublicKey);
      console.log('Contract:', LISANS_CONTRAT_ID);

      // TODO: Soroban işlem gönder
      console.log('TODO: Send claim_license transaction');
      
      setMessage('✅ License claimed successfully!');
      setIsClaimed(true);
    } catch (err: any) {
      const errorMsg = err?.message || String(err);
      setError(`❌ Failed to claim license: ${errorMsg}`);
      console.error('Claim license error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cüzdanı disconnect et
  const disconnectWallet = () => {
    setUserPublicKey(null);
    setHasLicense(false);
    setIsClaimed(false);
    setMessage('');
    setError('');
    console.log('🔌 Wallet disconnected');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">StellarLicense - License Manager</h1>
          {userPublicKey ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Connected</p>
                <p className="text-xs font-mono text-foreground truncate max-w-xs">
                  {userPublicKey.substring(0, 10)}...{userPublicKey.substring(-10)}
                </p>
              </div>
              <Button variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={connectWallet} className="gap-2">
              <Wallet className="size-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Messages */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="size-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="size-4 text-green-600" />
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}

        {/* Wallet Status Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Wallet Status</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {userPublicKey ? '✅ Connected' : '❌ Not Connected'}
              </p>
            </div>
            <Badge variant={userPublicKey ? 'default' : 'secondary'}>
              {userPublicKey ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </Card>

        {/* License Status */}
        {userPublicKey && (
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">License Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Active License</p>
                  <p className="text-sm text-muted-foreground">Your access rights</p>
                </div>
                {hasLicense ? (
                  <Badge variant="default">✅ Active</Badge>
                ) : (
                  <Badge variant="secondary">❌ Inactive</Badge>
                )}
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Claim Status</p>
                  <p className="text-sm text-muted-foreground">Already claimed your license?</p>
                </div>
                {isClaimed ? (
                  <Badge variant="default">✅ Claimed</Badge>
                ) : (
                  <Badge variant="secondary">❌ Not Claimed</Badge>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        {userPublicKey && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Actions</h2>
            <div className="space-y-3">
              <Button
                onClick={claimLicense}
                disabled={loading || isClaimed}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : isClaimed ? (
                  '✅ License Already Claimed'
                ) : (
                  'Claim License'
                )}
              </Button>

              <Button
                onClick={() => checkAccess(userPublicKey)}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Checking...
                  </>
                ) : (
                  'Check Access'
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Info Box */}
        {!userPublicKey && (
          <Card className="p-6 text-center">
            <Wallet className="size-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please connect your Stellar wallet to manage your licenses
            </p>
            
            <Button 
              onClick={connectWallet} 
              size="lg" 
              className="gap-2"
            >
              <Wallet className="size-4" />
              Connect Wallet
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
}
