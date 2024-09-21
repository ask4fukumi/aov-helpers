"use client"

import type { NextPage } from "next"

import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react"
import { useForm } from "react-hook-form"

import { Button } from "#u/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#u/components/ui/card"
import { Form } from "#u/components/ui/form"
import {
  CritArcanaContext,
  CritArcanaProvider,
  defaultCritArcanaComputeVariable,
} from "./crit_arcana_context"
import {
  DecimalInputField,
  type DecimalInputFieldProps,
} from "./decimal_input_field"
import ExecuteButton from "./execute_button"

import {
  ComputeVariable as CritArcanaComputeVariable,
  computeVariableSchema as critArcanaComputeVariableSchema,
} from "#types/crit_arcana"

const ComputeCenter: React.FC = () => {
  const { setData: setCritArcanaComputeVariable }
    = useContext(CritArcanaContext)

  const form = useForm<CritArcanaComputeVariable>({
    resolver: zodResolver(critArcanaComputeVariableSchema),
    defaultValues: defaultCritArcanaComputeVariable,
  })

  const onSubmit = form.handleSubmit((data) =>
    setCritArcanaComputeVariable(data),
  )

  const inputFieldsInfos: Omit<DecimalInputFieldProps, "control">[] = [
    { label: "% Tỉ lệ Chí mạng (trang bị)", name: "cc" },
    { label: "% Tỉ lệ Chí mạng (nội tại)", name: "cc_" },
    { label: "% Sát thương Chí mạng (trang bị)", name: "cd" },
    { label: "% Sát thương Chí mạng (nội tại)", name: "cd_" },
    { label: "% Số nhân Tỉ lệ Chí mạng (phù hiệu)", name: "ccm" },
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
            </CardTitle>
            <CardDescription>2.3.0</CardDescription>
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
            <ExecuteButton />
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

const HomePage: NextPage = () => {
  return (
    <CritArcanaProvider>
      <ComputeCenter />
    </CritArcanaProvider>
  )
}

export default HomePage
