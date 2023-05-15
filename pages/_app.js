import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import Head from 'next/head';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import loadCookieControl from 'components/CookieControl';

console.log("API Key:", process.env.NEXT_PUBLIC_API_KEY);

<MyApp apiKey={process.env.NEXT_PUBLIC_API_KEY} />

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    console.log("apiKey:", apiKey);
    var config = {
      apiKey: apiKey,
      product: "community",
      position: "BOTTOM",
      theme: "DARK"
    };
    console.log("config:", config);
    window.CookieControl.load(config);
  }, [apiKey]);


  return (
    <>
      <Head>
        {/* Your other meta tags, title, stylesheets, and scripts */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WF28PJS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </Head>
      <script
        src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
        strategy="afterInteractive"
        async
      />
      
      <script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        strategy="afterInteractive"
        async
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
        strategy="afterInteractive"
      />
      <Component {...pageProps} {...loadCookieControl}/>
    </>
  );
}

export default MyApp;
