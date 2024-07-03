"use client"

import type { NextPage } from "next"
import type { z } from "zod"

import { Button } from "src/libs/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/libs/components/ui/card"
import { Form } from "src/libs/components/ui/form"
import { DecimalInputField, DecimalInputFieldProps } from "./decimal-input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import React, { useContext } from "react"
import { useServerAction } from "zsa-react"
import { CritArcanaContext, CritArcanaProvider } from "./CritArcanaCtx"
import ExecuteButton from "./ExecuteButton"
import calculateCritArcana from "./calculateAction"
import calculateActionSchema from "./calculateActionSchema"

type CalculateActionValues = z.infer<typeof calculateActionSchema>

const defaultValues: CalculateActionValues = {
  cd: 0,
  cd_: 0,
  cc: 0,
  cc_: 0,
  ccm: 0,
}

const TheCard: React.FC = () => {
  const { setCritArcana } = useContext(CritArcanaContext)

  const { error, isPending, data, execute }
    = useServerAction(calculateCritArcana)

  const form = useForm<CalculateActionValues>({
    resolver: zodResolver(calculateActionSchema),
    defaultValues,
  })

  const onSubmit = form.handleSubmit(async (data) => {
    setCritArcana(data)
    await execute(data)
  })

  const inputFieldsInfos: Omit<DecimalInputFieldProps, "control">[] = [
    { label: "Tỉ lệ Chí mạng (trang bị)", name: "cc" },
    { label: "Tỉ lệ Chí mạng (nội tại)", name: "cc_" },
    { label: "Sát thương Chí mạng (trang bị)", name: "cd" },
    { label: "Sát thương Chí mạng (nội tại)", name: "cd_" },
    { label: "Số nhân Tỉ lệ Chí mạng (phù hiệu)", name: "ccm" },
  ]

  const inputFieldsProps: DecimalInputFieldProps[] = inputFieldsInfos.map(
    (entry) => ({
      ...entry,
      control: form.control,
    }),
  )

  return (
    <Card className="m-10 h-fit w-full max-w-md">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="flex items-end justify-start gap-4">
              Tìm bảng ngọc Chí mạng
              <CardDescription>2.2.1</CardDescription>
            </CardTitle>
            <CardDescription>Đơn vị %</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            {inputFieldsProps.map((props) => (
              <DecimalInputField key={props.name} {...props} />
            ))}
          </CardContent>
          <CardFooter className="flex w-full gap-4">
            <Button
              onClick={() => form.reset()}
              variant="secondary"
              className="flex-1"
            >
              Đặt lại
            </Button>
            <ExecuteButton data={data} isPending={isPending} error={error} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

const HomePage: NextPage = () => {
  return (
    <CritArcanaProvider>
      <TheCard />{" "}
    </CritArcanaProvider>
  )
}

export default HomePage
