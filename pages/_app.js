import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import Head from 'next/head';
import { useEffect } from "react";
import loadCookieControl from 'components/CookieControl';

function MyApp({ Component, pageProps }) {

  const apiKey = process.env.NEXT_PUBLIC_COOKIE_CONTROL_KEY;
  useEffect(() => {
    
    loadCookieControl(apiKey);
  }, [apiKey]);
 
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
