'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'

interface EcwidStoreProps {
  storeId: string | number
  baseUrl?: string
}

declare global {
  interface Window {
    Ecwid: any
    ec: any
    ecwid_script_defer: boolean
    ecwid_dynamic_widgets: boolean
    _xnext_initialization_scripts: any[]
  }
}

export default function EcwidStore({ storeId = "109087793", baseUrl = '/store' }: EcwidStoreProps) {
  const router = useRouter()
  const initialized = useRef(false)
  const currentPage = useRef('')
  const handleRouteChangeRef = useRef<((url: string) => void) | null>(null)

  const initializeEcwid = useCallback(() => {
    if (!document.getElementById('ecStoreProductBrowser')) {
      console.log('EcwidStore: Store div not found, skipping initialization');
      return;
    }

    window._xnext_initialization_scripts = [
      { 
        widgetType: 'ProductBrowser',
        id: 'ecStoreProductBrowser',
        arg: [
          'id=ecStoreProductBrowser',
          'categoriesPerRow=3',
          'views=grid(20,3) list(60) table(60)',
          'categoryView=grid',
          'searchView=list'
        ]
      }
    ];

    window.Ecwid.init();

    // Set up route change handler
    handleRouteChangeRef.current = (url: string) => {
      if (typeof window.Ecwid === 'undefined') return;

      const newPage = url.split('/').pop() || '';
      
      if (newPage !== currentPage.current) {
        currentPage.current = newPage;
        
        if (newPage === 'cart') {
          window.Ecwid.OnPageLoaded.add((page: any) => {
            if (page.type === 'CART') {
              window.Ecwid.refreshConfig();
              window.Ecwid.Cart.get();
            }
          });
        }
        
        window.Ecwid.openPage(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChangeRef.current);

    // Initial page load
    handleRouteChangeRef.current(router.asPath);

    initialized.current = true;
  }, [router]);

  const loadEcwidScript = useCallback(() => {
    if (!document.getElementById('ecwid-script')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=nextjs`;
      script.id = 'ecwid-script';
      script.onload = () => {
        window.Ecwid.OnAPILoaded.add(() => {
          console.log("Ecwid API has loaded");
          initializeEcwid();
        });
      };
      document.body.appendChild(script);
    } else if (typeof window.Ecwid !== 'undefined') {
      initializeEcwid();
    }
  }, [storeId, initializeEcwid]);

  useEffect(() => {
    window.ec = window.ec || {};
    window.ec.config = window.ec.config || {};
    window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
    window.ec.config.storefrontUrls.cleanUrls = true;
    window.ec.config.storefrontUrls.queryBasedCleanUrls = true;
    window.ec.config.baseUrl = baseUrl;
    window.ecwid_script_defer = true;
    window.ecwid_dynamic_widgets = true;

    loadEcwidScript();

    return () => {
      if (handleRouteChangeRef.current) {
        router.events.off('routeChangeComplete', handleRouteChangeRef.current);
      }
      // Reset initialization flag when component unmounts
      initialized.current = false;
    };
  }, [baseUrl, loadEcwidScript, router.events]);

  // Check for store div and initialize on route change
  useEffect(() => {
    const checkAndInitialize = () => {
      if (document.getElementById('ecStoreProductBrowser') && !initialized.current) {
        initializeEcwid();
      }
    };

    router.events.on('routeChangeComplete', checkAndInitialize);

    return () => {
      router.events.off('routeChangeComplete', checkAndInitialize);
    };
  }, [router, initializeEcwid]);

  return null;
}