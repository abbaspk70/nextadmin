'use client'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDailyOrders } from '@/src/actions/orderAction';
import { useTransition } from 'react'


import { useState, useEffect } from 'react';
import DataLoading from '../loaders/DataLoading';
export default function PerformanceBarChart({data}) {

    let [isPending, startTransition] = useTransition()
    const [chartData,setChartData] = useState([]);
    useEffect(() => {
        const getChartData = async()=>{
        const result = await getDailyOrders(data);
        setChartData(JSON.parse(result));
        };
        startTransition(()=>getChartData());
    },[data])
  return (
    <div className=' text-black w-full md:w-[80%] h-full mx-auto'>
        {isPending? <DataLoading/>:
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sale" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
}
      </div>
  )
 
}
