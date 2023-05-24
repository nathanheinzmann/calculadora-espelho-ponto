import { GtmProvider } from '@/providers';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GtmProvider id="G-7S1CEW6YLZ">
      <Component {...pageProps} />
    </GtmProvider>
  );
}
