"use client"

import type { z } from "zod"
import type calculateActionSchema from "./calculateActionSchema"

import { createContext, useState } from "react"

const defaultValues: CalculateActionValues = {
  cd: 0,
  cd_: 0,
  cc: 0,
  cc_: 0,
  ccm: 0,
}

export type CalculateActionValues = z.infer<typeof calculateActionSchema>
type CritArcanaState = {
  critArcana: CalculateActionValues
  setCritArcana: React.Dispatch<React.SetStateAction<CalculateActionValues>>
}

export const CritArcanaContext = createContext<CritArcanaState>({
  critArcana: defaultValues,
  setCritArcana: () => {},
} as CritArcanaState)

export const CritArcanaProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [critArcana, setCritArcana] = useState(defaultValues)
  return (
    <CritArcanaContext.Provider value={{ critArcana, setCritArcana }}>
      {children}
    </CritArcanaContext.Provider>
  )
}
