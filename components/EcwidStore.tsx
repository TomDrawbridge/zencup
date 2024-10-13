'use client'

import React, { useEffect } from 'react'

interface EcwidStoreProps {
  storeId: string | number
  baseUrl?: string
}

const load_ecwid = () => {
  if (typeof window.Ecwid !== 'undefined') {
    window.Ecwid.OnAPILoaded.add(function () {
      let ecwidLoaded = false;
      if (!ecwidLoaded) {
        ecwidLoaded = true;
        const storeDiv = document.getElementById('ecStoreProductBrowser');
        if (storeDiv) {
          window.xProductBrowser(
            "categoriesPerRow=3",
            "views=grid(20,3) list(60) table(60)",
            "categoryView=grid",
            "searchView=list",
            "id=ecStoreProductBrowser"
          );
        }
      }
    });
  }
};

const EcwidStore: React.FC<EcwidStoreProps> = ({ storeId = "109087793", baseUrl = '/store' }) => {
  useEffect(() => {
    let ecwidLoaded = false

    window.ec = window.ec || {}
    window.ec.config = window.ec.config || {}
    window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {}
    window.ec.config.storefrontUrls.cleanUrls = true
    window.ec.config.storefrontUrls.queryBasedCleanUrls = false
    window.ec.config.baseUrl = baseUrl

    window.ecwid_script_defer = true
    window.ecwid_dynamic_widgets = true

    if (!document.getElementById('ecwid-script')) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=nextjs`
      script.id = 'ecwid-script'
      script.onload = load_ecwid
      document.body.appendChild(script)
    } else {
      load_ecwid()
    }

    return () => {
      // Cleanup function
      if (window.Ecwid && window.Ecwid.OnAPILoaded && typeof window.Ecwid.OnAPILoaded.remove === 'function') {
        window.Ecwid.OnAPILoaded.remove(load_ecwid);
      }
    }
  }, [storeId, baseUrl])

  // This component doesn't render anything visible
  return null
}

export default EcwidStore

declare global {
  interface Window {
    Ecwid: any
    xProductBrowser: any
    ec: any
    ecwid_script_defer: boolean
    ecwid_dynamic_widgets: boolean
  }
}
