import React, { useEffect } from 'react'

interface EcwidStoreProps {
  storeId: string | number;
  className?: string;
  baseUrl?: string;
}

const EcwidStore: React.FC<EcwidStoreProps> = ({ storeId = 13433173, className = '', baseUrl = '/store' }) => {
  useEffect(() => {
    let ecwidLoaded = false;

    function load_ecwid() {
      if (typeof window.Ecwid !== 'undefined') {
        window.Ecwid.OnAPILoaded.add(function () {
          if (!ecwidLoaded) {
            ecwidLoaded = true;
            window.xProductBrowser("categoriesPerRow=3", "views=grid(20,3) list(60) table(60)", "categoryView=grid", "searchView=list", "id=ecStoreProductBrowser");
          }
        });
      }
    }

    window.ec = window.ec || {};
    window.ec.config = window.ec.config || {};
    window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
    window.ec.config.storefrontUrls.cleanUrls = true;
    window.ec.config.storefrontUrls.queryBasedCleanUrls = false;
    window.ec.config.baseUrl = baseUrl; // Add this line to set the base URL

    window.ecwid_script_defer = true;
    window.ecwid_dynamic_widgets = true;

    if (!document.getElementById('ecwid-script')) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://app.ecwid.com/script.js?' + storeId + '&data_platform=nextjs';
      script.id = 'ecwid-script'
      script.onload = load_ecwid
      document.body.appendChild(script);
    } else {
      load_ecwid()
    }
  }, [storeId, baseUrl])

  return (
    <div id="ecStoreProductBrowser" className={className}></div>
  )
}

export default EcwidStore

// Add these type declarations at the end of the file or in a separate .d.ts file
declare global {
  interface Window {
    Ecwid: any;
    xProductBrowser: any;
    ec: any;
    ecwid_script_defer: boolean;
    ecwid_dynamic_widgets: boolean;
  }
}
