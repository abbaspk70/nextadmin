'use client'
import React from 'react'

export default function Test({order}) {
    console.log(order);
  return (
    <div>
       {JSON.stringify(order)}
    </div>
  )
}
