import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface EcwidStoreProps {
  storeId: string;
  className: string;
}

declare global {
  interface Window {
    Ecwid: any;
    xProductBrowser: any;
    ec: any;
  }
}

export default function EcwidStore({ storeId, className }: EcwidStoreProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isEcwidReady, setIsEcwidReady] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=2024-10-09`
    script.charset = 'utf-8'
    script.async = true

    script.onload = () => {
      if (typeof window.Ecwid !== 'undefined') {
        window.Ecwid.init({
          popup: false,
          scriptId: 'ecwid-script',
          storeId: storeId,
        });

        if (typeof window.ec === 'undefined') {
          window.ec = {};
        }

        window.ec.config = window.ec.config || {};
        window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
        window.ec.config.navigation_scrolling = "DISABLED";
        window.ec.config.storefrontUrls.cleanUrls = true;
        window.ec.config.baseUrl = '/store';

        window.Ecwid.OnAPILoaded.add(() => {
          setIsEcwidReady(true)
        })
      }
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [storeId])

  useEffect(() => {
    if (isEcwidReady) {
      window.xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list",`id=my-store-${storeId}`);
      setIsLoading(false)
    }
  }, [isEcwidReady, storeId])

  return (
    <div className={`relative min-h-screen ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      {isEcwidReady && (
        <div id={`my-store-${storeId}`} className={isLoading ? 'invisible' : 'visible'}></div>
      )}
    </div>
  )
}
