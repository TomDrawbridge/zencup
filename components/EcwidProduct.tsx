import React, { useEffect } from 'react'

interface EcwidProductProps {
  storeId: string;
  productId: string;
}

declare global {
  interface Window {
    Ecwid: any;
    xProductBrowser: any;
  }
}

export default function EcwidProduct({ storeId, productId }: EcwidProductProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=2024-10-09`
    script.charset = 'utf-8'
    script.async = true

    script.onload = () => {
      if (typeof window.Ecwid !== 'undefined') {
        window.Ecwid.init();
        window.ec.config = window.ec.config || {};
        window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
        window.ec.config.storefrontUrls.cleanUrls = true;
        window.ec.config.baseUrl = '/product';
        window.xProductBrowser("productId=" + productId);
      }
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [storeId, productId])

  return <div id={`my-product-${productId}`}></div>
}