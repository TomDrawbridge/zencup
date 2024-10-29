'use client'

<<<<<<< HEAD
import React from 'react'
=======
import React, { useEffect } from 'react'
>>>>>>> 139418f71c2555cdfe1a60548c56ffe7ecdefb10

interface EcwidStoreDivProps {
  className?: string
}

export default function EcwidStoreDiv({ className = '' }: EcwidStoreDivProps) {
<<<<<<< HEAD
=======
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

>>>>>>> 139418f71c2555cdfe1a60548c56ffe7ecdefb10
  return <div id="ecStoreProductBrowser" className={className}></div>
}
