import React, { createContext, useContext, useReducer } from "react"
import uuid from "uuid/v4"
import { loadAssets } from "./assets"

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

const initProperties = (entity) => {
    if (entity.type[0] == "types.card") {
        entity.properties = {
            ...entity.properties,
            locked: 0,
            frozen: 0,
            draggable: true
        }
    } else {
        entity.properties = {}
    }
}

export const isColliding = (a, b, placeable = false) => {
    if (a.type[0] != b.type[0] && !placeable) return false
    if (a.location.x >= b.location.x && a.location.x < b.location.x + b.size.width) return true
    if (b.location.x >= a.location.x && b.location.x < a.location.x + a.size.width) return true
    if (a.location.y >= b.location.y && a.location.y < b.location.y + b.size.height) return true
    if (b.location.y >= a.location.y && b.location.y < a.location.y + a.size.height) return true
    return false
}

export const getCollisions = (s, a, placeable = false) => s.entities.filter(x => {
    if (a.type[0] != x.type[0]) return false
    if (!isColliding(a, x, placeable)) return false
    return true
})

const nextTurn = (s) => {
    s.turn = s.turn + 1
}

const newGame = (s) => {
    s = init()
    s.assets = loadAssets()

    const spawnTile = s.assets.find(x => x.assetId == "base.tiles.spawn")
    const playerCard = s.assets.find(x => x.assetId == "base.cards.player")

    spawn(s, spawnTile, { x: -1, y: -1 })
    spawn(s, playerCard, { x: 1, y: 1 })
}

const spawn = (s, asset, location) => {
    const entity = JSON.parse(JSON.stringify(asset))
    entity.location = location
    if (getCollisions(s, entity).length > 0) throw new Error("errors.collision")
    if (entity.type[0] == "types.card" && getCollisions(s, entity, true).length == 0) throw new Error("errors.noTile")

    entity.entityId = uuid()
    entity.refs = {
        "@self": { type: "uuid", "value": entity.entityId }
    }
    initProperties(entity)
    entity.state.current = entity.state.startState

    s.entities.push(entity)
}

const reducer = (state, callback) => {
    let s = copy(state)
    callback({
        nextTurn: () => nextTurn(s),
        newGame: () => newGame(s),
        spawn: (asset, location) => spawn(s, asset, location)

    })
    return s
}

export const GameProvider = ({ children }) => (
    <GameContext.Provider value={useReducer(reducer, init())}>
        {children}
    </GameContext.Provider>
)

export const useGameContext = () => useContext(GameContext)