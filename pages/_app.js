import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import Head from 'next/head';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import loadCookieControl from 'components/CookieControl';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    
    loadCookieControl(apiKey);
  }, [apiKey]);
 
  return (
    <>
      <Head>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WF28PJS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
