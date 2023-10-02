"use client"

import { format } from 'date-fns';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  "#FF5733",
  "#008C74",
  "#FFD700",
  "#4B0082",
  "#FF6B6B",
  "#2E8B57",
  "#800000",
  "#6A5ACD",
  "#00FF00",
  "#1E90FF",
  "#FF1493",
  "#FFA07A",
  "#4682B4",
  "#008080",
  "#DB7093",
  "#5F9EA0",
  "#8A2BE2",
  "#20B2AA",
  "#DC143C",
  "#00CED1",
  "#556B2F",
  "#FF8C00",
  "#9932CC",
  "#008000",
  "#DA70D6",
  "#7B68EE",
  "#228B22",
  "#FF4500",
  "#DAA520",
  "#2F4F4F",
];

export function ConsumptionChart({ data: dataIn, players }) {
  let conv = {};
  dataIn.forEach((d) => {
    let t = format(d.start_time, 'HH:mm');
    if (conv[t] == null) {
      conv[t] = {};
    }

    conv[t][d.name] = d.rolling_sum;
  });

  let k = Object.keys(conv);
  let data = k.map((key) => ({ ...conv[key], name: key }));

  return (
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
        {players.map((player, idx) => (
          <Line key={player.name} type="monotone" dataKey={player.name} stroke={COLORS[idx]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
