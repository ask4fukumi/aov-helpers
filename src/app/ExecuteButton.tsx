"use client"

import { useServerAction } from "zsa-react"
import calculateCritArcana from "./calculateAction"

import { useContext } from "react"
import { Button } from "src/libs/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "src/libs/components/ui/dialog"
import { ScrollArea } from "src/libs/components/ui/scroll-area"
import { Skeleton } from "src/libs/components/ui/skeleton"
import { CritArcanaContext, type CalculateActionValues } from "./CritArcanaCtx"
import CritResultTable from "./CritResultTable"

const defaultValues: CalculateActionValues = {
  cd: 0,
  cd_: 0,
  cc: 0,
  cc_: 0,
  ccm: 0,
}

const ExecuteButton: React.FC = () => {
  const { critArcana: critArcanaState } = useContext(CritArcanaContext)

  const {
    error,
    isPending,
    data: critArcana,
    execute,
  } = useServerAction(calculateCritArcana)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={async () => await execute(critArcanaState)}
          variant={!!error ? "destructive" : "default"}
          disabled={isPending}
          type="submit"
          className="flex-1"
        >
          {!!error ? "Lỗi" : "Tìm"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <div className="flex items-center">
            <span>Bạn cần</span>
            <span className="relative mx-[1ch] inline-block h-7 w-[3ch] text-center font-mono text-lg font-bold">
              {!critArcana ? (
                <Skeleton className="absolute inset-0 rounded-none" />
              ) : (
                critArcana.criticalDamage
              )}
            </span>
            <span>
              viên <span className="underline">Sát thương Chí mạng</span>
            </span>
          </div>
          <div className="flex items-center">
            <span>Bạn cần</span>
            <span className="relative mx-[1ch] inline-block h-7 w-[3ch] text-center font-mono text-lg font-bold">
              {!critArcana ? (
                <Skeleton className="absolute inset-0 rounded-none" />
              ) : (
                critArcana.criticalChance
              )}
            </span>
            <span>
              viên <span className="underline">Tỉ lệ Chí mạng</span>
            </span>
          </div>
        </div>
        <ScrollArea className="max-h-[60dvh] w-full">
          <CritResultTable critArcana={critArcanaState ?? defaultValues} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ExecuteButton
