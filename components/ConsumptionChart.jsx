"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '20:00',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '20:15',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '20:30',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '20:45',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '21:00',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '21:15',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '21:30',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const ConsumptionChart = () => (
  <ResponsiveContainer width="100%" height={350}>
    <LineChart
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
);
