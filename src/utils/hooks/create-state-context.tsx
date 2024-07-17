"use client"

import React, { createContext, useState } from "react"

type StateContext<T> = {
  data: T
  setData: React.Dispatch<React.SetStateAction<T>>
}

const createStateContext: <T>(defaultValue: T) => {
  Context: React.Context<StateContext<T>>
  Provider: React.FC<React.PropsWithChildren>
} = (defaultValue) => {
  type T = typeof defaultValue

  const Context = createContext({} as StateContext<T>)

  const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<T>(defaultValue)
    return (
      <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
    )
  }

  return { Context, Provider }
}

export default createStateContext
