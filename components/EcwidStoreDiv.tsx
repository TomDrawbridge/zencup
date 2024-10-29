'use client'

import React from 'react'

interface EcwidStoreDivProps {
  className?: string
}

export default function EcwidStoreDiv({ className = '' }: EcwidStoreDivProps) {
  return <div id="ecStoreProductBrowser" className={className}></div>
}
