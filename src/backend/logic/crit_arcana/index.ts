import type { ComputeVariable } from "#types/crit_arcana"

import { clamp } from "#u/funcs"
import { list } from "radash"

const getRefinedVariable = (input: ComputeVariable) => ({
  cc: input.cc / 100,
  cc_: input.cc_ / 100,
  cd: input.cd / 100,
  cd_: input.cd_ / 100,
  ccm: input.ccm / 100,
})

const getComputedVariable = (input: ComputeVariable) => ({
  D: 1.36 + input.cd + input.cd_,
  C: input.cc_ + (1 + input.ccm) * input.cc + 0.07,
})

const getRequiredVariable = (input: ComputeVariable) => {
  const refinedVariable = getRefinedVariable(input)
  return getComputedVariable(refinedVariable)
}

export const getCritArcanaResult = (input: ComputeVariable) => {
  const { D, C } = getRequiredVariable(input)

  const rawCriticalChance = (0.009 * D - 0.036 * C) / (6.48 * Math.pow(10, -4))
  const criticalChance = Math.round(clamp(0, rawCriticalChance, 10))

  return {
    criticalChance,
    criticalDamage: 10 - criticalChance,
  }
}

export const getCritArcanaResultTable = (input: ComputeVariable) => {
  const { D, C } = getRequiredVariable(input)

  return list(0, 10).map((x) => {
    const f_cc = C + 0.009 * x
    const f_cd = D + 1 - 0.036 * x
    return {
      x,
      f: (f_cd - 1) * f_cc + 1,
      f_: -6.48 * Math.pow(10, -4) * x + 0.009 * D - 0.036 * C,
    }
  })
}
