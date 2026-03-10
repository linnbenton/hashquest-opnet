'use client';

import { useState, useEffect } from 'react';

export default function Miner() {
  const [hash, setHash] = useState('');
  const [nonce, setNonce] = useState(0);
  const [minerReady, setMinerReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function loadMiner() {
      try {
        console.log('Mulai load WASM wrapper...');
        const module = await import('../public/wasm-miner/miner.js'); // GANTI kalau nama file beda
        console.log('Wrapper loaded:', module);

        console.log('Init WASM...');
        await module.default(); // atau module.init() kalau ada
        console.log('WASM init berhasil!');

        setMinerReady(true);
      } catch (err) {
        console.error('Load WASM gagal:', err);
        setErrorMsg('Gagal load miner: ' + err.message);
      }
    }
    loadMiner();
  }, []);

  const handleMine = async () => {
    if (!minerReady) {
      setErrorMsg('Miner belum siap');
      return;
    }

    try {
      console.log('Panggil fungsi mine dengan nonce:', nonce);
      // SESUAIKAN nama fungsi & argumen sesuai export di miner_bg.js / miner.d.ts
      const result = (window as any).mine?.(nonce, 'dummy-block-header'); // ganti 'mine' kalau nama lain
      console.log('Hasil mining:', result);

      setHash(result?.toString() || 'No result');
      setNonce(prev => prev + 1);
    } catch (err) {
      console.error('Mining error:', err);
      setErrorMsg('Error mining: ' + err.message);
    }
  };

  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <button onClick={handleMine} disabled={!minerReady}>
        {minerReady ? 'Start Mining' : 'Loading Miner...'}
      </button>
      <p>Nonce: {nonce}</p>
      <p>Hash: {hash || 'Belum ada hasil'}</p>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
}