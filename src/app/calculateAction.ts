"use server"

import type { z } from "zod"

import { list } from "radash"
import { createServerActionProcedure } from "zsa"

import calculateActionSchema from "./calculateActionSchema"

const publicProcedure = createServerActionProcedure().handler(function () {})
const publicAction = publicProcedure.createServerAction()

type CalculateActionSchema = z.infer<typeof calculateActionSchema>

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(min, value), max)

const getRefinedValues = (input: CalculateActionSchema) => ({
  cc: input.cc / 100,
  cc_: input.cc_ / 100,
  cd: input.cd / 100,
  cd_: input.cd_ / 100,
  ccm: input.ccm / 100,
})

const getAssetsValues = (input: CalculateActionSchema) => ({
  D: 1.36 + input.cd + input.cd_,
  C: input.cc_ + (1 + input.ccm) * input.cc + 0.07,
  ...input,
})

const calculateCritArcana = publicAction
  .input(calculateActionSchema)
  .handler(async ({ input }) => {
    const refinedValues = getRefinedValues(input)
    const { D, C } = getAssetsValues(refinedValues)

    const rawCriticalChance
      = (0.009 * D - 0.036 * C) / (6.48 * Math.pow(10, -4))
    const criticalChance = Math.round(clamp(0, rawCriticalChance, 10))

    return {
      criticalChance,
      criticalDamage: 10 - criticalChance,
    }
  })

export const calculateTable = publicAction
  .input(calculateActionSchema)
  .handler(({ input }) => {
    const refinedValues = getRefinedValues(input)
    const { D, C } = getAssetsValues(refinedValues)

    return list(0, 10).map((x) => {
      const f_cc = C + 0.009 * x
      const f_cd = D + 1 - 0.036 * x
      return {
        x,
        f: (f_cd - 1) * f_cc + 1,
        f_: -6.48 * Math.pow(10, -4) * x + 0.009 * D - 0.036 * C,
      }
    })
  })

export default calculateCritArcana
