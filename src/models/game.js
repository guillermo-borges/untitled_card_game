import React, { createContext, useContext, useReducer } from "react"

const GameContext = createContext()

const init = () => ({
    assets: [],
    entities: [],
    board: {
        width: 14,
        height: 8
    },
    turn: 1,
})

const copy = (state) => JSON.parse(JSON.stringify(state))

const reducer = (state, callback) => {
    const s = copy(state)
    callback({

        nextTurn() {
            s.turn = s.turn + 1
        }

    })
    return s
}

export const GameProvider = ({ children }) => (
    <GameContext.Provider value={useReducer(reducer, init())}>
        {children}
    </GameContext.Provider>
)

export const useGameContext = () => useContext(GameContext)