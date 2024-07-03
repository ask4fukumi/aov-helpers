"use client"

import type { CalculateActionValues } from "./CritArcanaCtx"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/libs/components/ui/table"

import usePromise from "react-use-promise"
import { Skeleton } from "src/libs/components/ui/skeleton"
import { calculateTable } from "./calculateAction"

const CritResultTable: React.FC<{
  critArcana: CalculateActionValues
}> = ({ critArcana }) => {
  const [result] = usePromise(
    async () => await calculateTable(critArcana),
    [critArcana],
  )
  const data = result?.[0]

  if (data)
    return (
      <Table>
        <TableCaption className="px-4 text-left">
          x là số viên ngọc Tỉ lệ Chí mạng.
          <br />f là khả năng gây sát thương (càng cao càng tốt).
          <br />
          {"f' là đạo hàm của f (f là một hàm parabol)."}
        </TableCaption>
        <TableHeader className="sticky top-0 bg-background">
          <TableRow className="">
            <TableHead className="w-[20%]">10 - x</TableHead>
            <TableHead className="w-[20%]">x</TableHead>
            <TableHead className="w-[30%]">f</TableHead>
            <TableHead className="w-[30%]">{"f'"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => (
            <TableRow key={entry.x}>
              <TableCell>{10 - entry.x}</TableCell>
              <TableCell>{entry.x}</TableCell>
              <TableCell>{entry.f.toFixed(7)}</TableCell>
              <TableCell>{entry.f_.toFixed(7)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )

  return <Skeleton className="h-[60dvh] w-full" />
}

export default CritResultTable
