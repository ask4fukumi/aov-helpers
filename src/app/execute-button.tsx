"use client"

import {
  getCritArcanaResult,
  getCritArcanaResultTable,
} from "#be/logic/crit-arcana"
import { Button } from "#u/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "#u/components/ui/dialog"
import { ScrollArea } from "#u/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#u/components/ui/table"
import { useContext } from "react"
import { CritArcanaContext } from "./crit-arcana-context"

const ExecuteButton: React.FC = () => {
  const { data: critArcanaVariable } = useContext(CritArcanaContext)
  const critArcanaResult = getCritArcanaResult(critArcanaVariable)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" className="flex-1">
          Tìm
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <div className="flex items-center">
            <span>Bạn cần</span>
            <span className="relative mx-[1ch] inline-block h-7 w-[3ch] text-center font-mono text-lg font-bold">
              {critArcanaResult.criticalDamage}
            </span>
            <span>
              viên <span className="underline">Sát thương Chí mạng</span>
            </span>
          </div>
          <div className="flex items-center">
            <span>Bạn cần</span>
            <span className="relative mx-[1ch] inline-block h-7 w-[3ch] text-center font-mono text-lg font-bold">
              {critArcanaResult.criticalChance}
            </span>
            <span>
              viên <span className="underline">Tỉ lệ Chí mạng</span>
            </span>
          </div>
        </div>
        <ScrollArea className="max-h-[60dvh] w-full">
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
              {getCritArcanaResultTable(critArcanaVariable).map((entry) => (
                <TableRow key={entry.x}>
                  <TableCell>{10 - entry.x}</TableCell>
                  <TableCell>{entry.x}</TableCell>
                  <TableCell>{entry.f.toFixed(7)}</TableCell>
                  <TableCell>{entry.f_.toFixed(7)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ExecuteButton
