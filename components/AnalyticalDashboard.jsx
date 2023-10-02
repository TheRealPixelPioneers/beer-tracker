import React from "react";
import { BarChart, BeerIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConsumptionChart } from '@/components/ConsumptionChart';
import { sql } from '@/lib/sql-client';
import { formatDistance } from 'date-fns';


export default async function AnalyticalDashboard() {

  let totalBeers = await sql`SELECT count(*) as total_beers FROM beers`;
  let averageBeers = await sql`SELECT AVG(entry_count) AS average_count_per_hour
  FROM (
      SELECT
          DATE_TRUNC('hour', created_at) AS hour,
          COUNT(nfc_id) AS entry_count
      FROM beers
      GROUP BY hour
  ) AS subquery`;
  let fastestDrinker = await sql`SELECT
  beers.nfc_id,
  players.name,
  beers.created_at,
  LEAD(beers.created_at) OVER (PARTITION BY beers.nfc_id ORDER BY beers.created_at) AS next_timestamp
FROM beers
inner join players on players.nfc_id = beers.nfc_id
order by (LEAD(beers.created_at) OVER (PARTITION BY beers.nfc_id ORDER BY beers.created_at)) - beers.created_at
limit 1;`;
  let leaderboard = await sql`select  
beers.nfc_id,
players.name,
count(beers.nfc_id) as beers
from beers
inner join players on players.nfc_id = beers.nfc_id
group by beers.nfc_id, players.name
order by count(beers.nfc_id) desc
`;

  return (
    <div className="p-6">
      <h1 className="font-bold text-4xl mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Total Beers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBeers?.rows[0]?.total_beers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Average Beers per Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parseFloat(averageBeers?.rows[0]?.average_count_per_hour).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Fastest Drinker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fastestDrinker?.rows[0]?.name}</div>
            <p className="text-xs text-muted-foreground">
              {formatDistance(fastestDrinker?.rows[0]?.next_timestamp, fastestDrinker?.rows[0]?.created_at, { includeSeconds: true })}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="text-lg font-bold">Leaderboard</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-300">
            Leaderboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 dark:bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="w-[60px]">RANK</TableCell>
                <TableCell className="w-[150px]">NAME</TableCell>
                <TableCell>BEERS</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard?.rows.map((row, idx) => (
                <TableRow key={row.nfc_id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="font-medium">
                    <BeerIcon className="h-4 w-4 mr-2 inline-block" />{row.beers}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="text-lg font-bold">Drinking</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-300">
            Drinking over Time
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 dark:bg-gray-800">
          <ConsumptionChart />
        </CardContent>
      </Card>
    </div>
  );
}