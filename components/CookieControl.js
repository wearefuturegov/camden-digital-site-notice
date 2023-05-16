export default function loadCookieControl(apiKey) {
  var config = {
    apiKey: apiKey,
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
