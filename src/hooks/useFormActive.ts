import React, { useContext, useMemo } from 'react'
import { useAppSelector } from './useAppSelector'

const useActiveFormContext = () => {
    const state = useContext<ActiveState>(Context)
    return state
}

export interface ActiveState {
    active: boolean
}

const Context = React.createContext<ActiveState>({ active: true })
const Provider = Context.Provider
const Consumer = Context.Consumer

export {
    useActiveFormContext,
    Provider as ActiveFormProvider,
    Consumer as ActiveFormConsumer,
}