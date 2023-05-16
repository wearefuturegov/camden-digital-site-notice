export default function loadCookieControl(apiKey) {
  var config = {
    apiKey: apiKey,
    product: 'community',
    optionalCookies: [
      // Optional cookie configurations here
    ],
    position: 'RIGHT',
    theme: 'DARK'
  };

  var head = document.getElementsByTagName('head')[0];

  // Google Tag Manager script
  var gtmScript = document.createElement('script');
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WF28PJS';
  gtmScript.async = true;
  head.appendChild(gtmScript);

  // Google Analytics script
  var gaScript = document.createElement('script');
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID';
  gaScript.async = true;
  head.appendChild(gaScript);

  // Inline script for initializing Google Analytics
  var gaInlineScript = document.createElement('script');
  gaInlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  `;
  head.appendChild(gaInlineScript);

  // Cookie Control script
  var ccScript = document.createElement('script');
  ccScript.src = 'https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js';
  ccScript.async = true;
  ccScript.onload = function () {
    window.CookieControl.load(config);
  };
  head.appendChild(ccScript);
}
