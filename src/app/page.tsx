"use client"

import { Label } from "@radix-ui/react-label"
import type { NextPage } from "next"
import { list } from "radash"
import { createContext, useContext, useId, useState } from "react"
import { Button } from "src/libs/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/libs/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "src/libs/components/ui/dialog"
import { Input } from "src/libs/components/ui/input"
import { ScrollArea } from "src/libs/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/libs/components/ui/table"

const defaultMathValues = {
  cd: 0,
  cd_: 0,
  cc: 0,
  cc_: 0,
  ccm: 0,
}

type UseState<S> = [S, React.Dispatch<React.SetStateAction<S>>]

const MathContext = createContext<UseState<typeof defaultMathValues> | null>(
  null,
)

const MathProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const mathState = useState(defaultMathValues)

  return (
    <MathContext.Provider value={mathState}>{children}</MathContext.Provider>
  )
}

const InputField: React.FC<{
  label: {
    title: string
    description?: React.ReactNode
  }

  variable: keyof typeof defaultMathValues
}> = ({ label, variable }) => {
  const id = useId()
  const mathState = useContext(MathContext)

  return (
    <div className="flex items-start justify-between">
      <Label className="flex flex-col" htmlFor={id}>
        <div>{label.title}</div>
        {!!label.description && (
          <div className="text-sm text-zinc-500">{label.description}</div>
        )}
      </Label>
      <Input
        id={id}
        onChange={(e) => {
          if (!mathState) return
          mathState[1]((prev) => ({
            ...prev,
            [variable]: e.target.valueAsNumber,
          }))
        }}
        className="w-[12ch] md:w-[20ch]"
        type="number"
      ></Input>
    </div>
  )
}

const calculateResult = (mathValues?: typeof defaultMathValues) => {
  const { cd, cd_, cc, cc_, ccm } = mathValues ?? defaultMathValues

  const C = cc_ + (1 + ccm) * (0.07 + cc)
  const D = 1.36 + cd + cd_

  return Math.max(
    Math.min(
      10,
      Math.round(
        -(D * (1 + ccm) * 0.009 - 0.036 * C) / (-6.48 * Math.pow(10, -4)),
      ),
    ),
    0,
  )
}

const calculateF = (x: number, mathValues?: typeof defaultMathValues) => {
  const { cd, cd_, cc, cc_, ccm } = mathValues ?? defaultMathValues

  const C = cc_ + (1 + ccm) * (0.07 + cc)
  const D = 1.36 + cd + cd_

  return (
    -3.24 * Math.pow(10, -4) * Math.pow(x, 2)
    + (D * (1 + ccm) * 0.009 - 0.036 * C) * x
    + cd
    + 1
  )
}

const calculateF_ = (x: number, mathValues?: typeof defaultMathValues) => {
  const { cd, cd_, cc, cc_, ccm } = mathValues ?? defaultMathValues

  const C = cc_ + (1 + ccm) * (0.07 + cc)
  const D = 1.36 + cd + cd_

  return -6.48 * Math.pow(10, -4) * x + (D * (1 + ccm) * 0.009 - 0.036 * C)
}

const CalculateButton: React.FC = () => {
  const mathState = useContext(MathContext)

  const x = calculateResult(mathState?.[0])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Tính</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="">
          <div className="mb-1">
            Bạn cần{" "}
            <span className="inline-flex w-[3ch] justify-center text-lg font-bold tabular-nums">
              {10 - x}
            </span>
            {" viên "}
            <span className="underline">Sát thương Chí mạng</span>
          </div>
          <div className="">
            Bạn cần{" "}
            <span className="inline-flex w-[3ch] justify-center text-lg font-bold tabular-nums">
              {x}
            </span>
            {" viên "}
            <span className="underline">Tỉ lệ Chí mạng</span>
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
            <TableHeader className="border-red sticky top-0 bg-background">
              <TableRow className="">
                <TableHead>x</TableHead>
                <TableHead>f</TableHead>
                <TableHead>{"f'"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list(0, 10).map((i) => (
                <TableRow key={i}>
                  <TableCell>{i}</TableCell>
                  <TableCell>
                    {calculateF(i, mathState?.[0]).toFixed(7)}
                  </TableCell>
                  <TableCell>
                    {calculateF_(i, mathState?.[0]).toFixed(7)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const HomePage: NextPage = () => {
  return (
    <MathProvider>
      <main className="flex h-dvh w-dvw items-center justify-center">
        <Card className="m-10 h-fit w-full max-w-md">
          <CardHeader>
            <CardTitle>Nhập số liệu</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <InputField
              label={{
                title: "Tỉ lệ chí mạng",
                description: "Có được từ trang bị",
              }}
              variable="cc"
            />
            <InputField
              label={{
                title: "Tỉ lệ chí mạng",
                description: "Có được từ nội tại",
              }}
              variable="cc_"
            />
            <InputField
              label={{
                title: "Sát thương chí mạng",
                description: "Có được từ trang bị",
              }}
              variable="cd"
            />
            <InputField
              label={{
                title: "Sát thương chí mạng",
                description: "Có được từ nội tại",
              }}
              variable="cd_"
            />
            <InputField
              label={{
                title: "Số nhân TLCM",
                description: (
                  <span>
                    Có được từ phù hiệu <br /> (0 hoặc 0.16)
                  </span>
                ),
              }}
              variable="ccm"
            />
          </CardContent>
          <CardFooter>
            <CalculateButton />
          </CardFooter>
        </Card>
      </main>
    </MathProvider>
  )
}

export default HomePage
