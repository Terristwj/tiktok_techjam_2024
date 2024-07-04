// pages/_app.tsx
import { AppProps } from 'next/app';
import { WalletProvider } from './lib/WalletContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
