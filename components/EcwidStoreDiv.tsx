'use client'

import React, { useEffect } from 'react'

interface EcwidStoreDivProps {
  className?: string
}

export default function EcwidStoreDiv({ className = '' }: EcwidStoreDivProps) {
  useEffect(() => {
    if (typeof window.xProductBrowser !== 'undefined') {
      window.xProductBrowser(
        "categoriesPerRow=2",
        "views=grid(20,2) list(60) table(60)",
        "categoryView=grid",
        "searchView=list",
        "id=ecStoreProductBrowser"
      )
    }
  }, [])

  return <div id="ecStoreProductBrowser" className={className}></div>
}