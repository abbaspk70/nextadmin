import PerformanceBarChart from '@/components/barchart/BarChart'
import React from 'react'
import DateRange from '@/components/barchart/DateRange';

export default async function page() {
  return (
    <div className='my-20 px-5 md:ml-[300px] h-screen'>
        <DateRange/>
    </div>
  )
}
