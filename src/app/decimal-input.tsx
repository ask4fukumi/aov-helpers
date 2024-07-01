import type { useForm } from "react-hook-form"
import type { z } from "zod"
import type calculateActionSchema from "./calculateActionSchema"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/libs/components/ui/form"
import { Input } from "src/libs/components/ui/input"

type CalculateActionSchema = z.infer<typeof calculateActionSchema>

export type DecimalInputFieldProps = {
  control: ReturnType<typeof useForm<CalculateActionSchema>>["control"]
  label: React.ReactNode
  name: keyof CalculateActionSchema
}

export const DecimalInputField: React.FC<DecimalInputFieldProps> = ({
  control,
  label,
  name,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type="number" inputMode="decimal" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
