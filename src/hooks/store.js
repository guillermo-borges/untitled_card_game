import React, { createContext, useContext, useReducer } from "react"
import _ from "lodash"

const copy = (state) => _.cloneDeep(state)

export default (reducer = (s) => s, init = {}) => {
    let init_wrapper = typeof init === "function" ? init : () => init

    const Context = createContext()
    const reducer_wrapper = (state, callback) => {
        let s = copy(state)
        let reset = () => s = init_wrapper
        callback(reducer(s, reset))
        return s
    }
    const Provider = ({ children }) => (
        <Context.Provider value={useReducer(reducer_wrapper, init_wrapper())}>
            {children}
        </Context.Provider>
    )

    return {
        Context,
        Provider,
        useContext: () => useContext(Context)
    }
}