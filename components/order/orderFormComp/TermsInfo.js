import React from 'react'

export default function TermsInfo({terms}) {
  return (
    <div className='flex flex-col gap-3'>
        <h4>Terms and Conditions</h4>
        <textarea rows={5} name="terms" defaultValue={terms?.description || terms} />
      </div>
  )
}
