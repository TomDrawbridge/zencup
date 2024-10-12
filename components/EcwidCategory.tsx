import React, { useEffect } from 'react'

interface EcwidCategoryProps {
  storeId: string;
  categoryId: string;
}

declare global {
  interface Window {
    Ecwid: any;
    xProductBrowser: any;
  }
}

export default function EcwidCategory({ storeId, categoryId }: EcwidCategoryProps) {
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
        window.ec.config.baseUrl = '/category';
        window.xProductBrowser("defaultCategoryId=" + categoryId);
      }
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [storeId, categoryId])

  return <div id={`my-category-${categoryId}`}></div>
}