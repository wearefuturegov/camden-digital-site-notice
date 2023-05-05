import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import Head from 'next/head';
import { useState } from "react";


function MyApp({ Component, pageProps }) {

  const [apiKey, setApiKey] = useState(process.env.API_KEY);
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
        dangerouslySetInnerHTML={{
          __html: `
            var config = {
              apiKey: "${apiKey}",
              product: 'community',
              optionalCookies: [
                {
                  name: 'analytics',
                  label: 'Analytics',
                  description: 'Analytical cookies help us to improve our website by collecting and reporting information on its usage.',
                  cookies: [],
                  onAccept: function() {
                    // Enable Google Analytics
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      cookie_flags: 'SameSite=None;Secure'
                    });
                    
                    // Enable Google Tag Manager
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-WF28PJS');
                  },
                  onRevoke: function(){
                    // Disable Google Analytics
                    window['ga-disable-${gtag.GA_TRACKING_ID}'] = true;

                    // Disable Google Tag Manager
                    var dataLayer = window.dataLayer || [];
                    dataLayer.push({
                      'event': 'gtm.disable',
                      'gtm.start': new Date().getTime()
                    });
                  }
                },{
                  name: 'marketing',
                  label: 'Marketing',
                  description: '',
                  cookies: [],
                  onAccept : function(){}, // This function is not needed
                  onRevoke: function(){} // This function is not needed
                },{
                  name: 'preferences',
                  label: 'Preferences',
                  description: '',
                  cookies: [],
                  onAccept : function(){},
                  onRevoke: function(){}
                }
              ],
              position: 'RIGHT',
              theme: 'DARK'
            };
            window.addEventListener('load', function () {
              window.CookieControl.load(config);
            });
          `,
        }}
        strategy="afterInteractive"
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
