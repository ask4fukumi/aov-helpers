import type { ComputeVariable as CritArcanaComputeVariable } from "#types/crit-arcana"
import type { useForm } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#u/components/ui/form"
import { Input } from "#u/components/ui/input"

export type DecimalInputFieldProps = {
  control: ReturnType<typeof useForm<CritArcanaComputeVariable>>["control"]
  label: React.ReactNode
  name: keyof CritArcanaComputeVariable
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
