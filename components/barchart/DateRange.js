'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import PerformanceBarChart from './BarChart';

export default function DateRange() {
  var date = new Date()
  const [startDate, setStartDate] = useState(new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`));
  const [endDate, setEndDate] = useState(new Date());
  const data = { startDate: startDate, endDate: endDate };
  return (
    <div className='h-full'>
      <div className='w-full flex flex-col h-[100%]'>
        <div className="bg-secondary w-full p-5 flex flex-col justify-center items-center gap-2 text-center rounded-t-lg">
          <h2>Sales Period</h2>
          <div className='flex flex-col sm:flex-row w-full lg:w-[50%] gap-5 justify-center items-center'>
            <lable>Start Date<input onChange={(e) => setStartDate(new Date(e.target.value))} type="date" name='startDate' placeholder='YYYY-MM-DD' defaultValue={startDate} /></lable>
            <lable>End Date<input onChange={(e) => setEndDate(new Date(`${e.target.value}T23:59:59Z`))} type="date" name='startDate' placeholder='none' defaultValue={endDate} /></lable>
          </div>
        </div>
        <div className='pt-10 h-[50%] border-2 text-center shadow-2xl'>
          <PerformanceBarChart data={data} />
        </div>
      </div>
    </div>
  )
}
