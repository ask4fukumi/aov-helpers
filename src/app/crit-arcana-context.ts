import type { ComputeVariable as CritArcanaComputeVariable } from "src/types/crit-arcana"

import createStateContext from "#u/hooks/create-state-context"

export const defaultCritArcanaComputeVariable: CritArcanaComputeVariable = {
  cc: 0,
  ccm: 0,
  cd: 0,
  cc_: 0,
  cd_: 0,
}

const CritArcanaStateContext = createStateContext<CritArcanaComputeVariable>(
  defaultCritArcanaComputeVariable,
)

export const CritArcanaContext = CritArcanaStateContext.Context
export const CritArcanaProvider = CritArcanaStateContext.Provider
