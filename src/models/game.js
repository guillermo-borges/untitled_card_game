import React from "react"
import uuid from "uuid/v4"
import store from "src/hooks/store"

import { loadAssets } from "./assets"

const init = (s = {}) => {
    s.assets = []
    s.entities = []
    s.turn = 1
    s.gameId = null
    return s
}

const initProperties = (entity) => {
    if (entity.types.includes("types.card")) {
        entity.properties = {
            ...entity.properties,
            locked: 0,
            frozen: 0,
            pickableFrom: ["playmat", "deck", "resources"]
        }
    } else if (entity.types.includes("types.tile")) {
        entity.properties = {
            ...entity.properties,
            pickableFrom: ["deck"]
        }
    } else {
        entity.properties = {
            ...entity.properties,
        }
    }
}

const isColliding = (a, b, placeable = false) => {
    if (a.types[0] != b.types[0] && !placeable) return false
    if (a.location.x >= b.location.x && a.location.x < b.location.x + b.size.width) return true
    if (b.location.x >= a.location.x && b.location.x < a.location.x + a.size.width) return true
    if (a.location.y >= b.location.y && a.location.y < b.location.y + b.size.height) return true
    if (b.location.y >= a.location.y && b.location.y < a.location.y + a.size.height) return true
    return false
}

const getCollisions = (s, a, placeable = false) => s.entities.filter(x => {
    if (a.types[0] != x.types[0]) return false
    if (!isColliding(a, x, placeable)) return false
    return true
})

export const find = (s, entity) => s.entities.find(e => e.entityId == entity.entityId)

export const plane = (s, plane = "playmat") => s.entities.filter(e => e.location.plane == plane)

const nextTurn = (s) => {
    s.turn = s.turn + 1
}

const newGame = (s) => {
    console.log("Starting new game")
    init(s)
    s.assets = loadAssets()
    s.gameId = uuid()

    const spawnTile = s.assets.find(x => x.assetId == "base.tiles.spawn")
    const playerCard = s.assets.find(x => x.assetId == "base.cards.player")

    spawn(s, spawnTile, { x: -1, y: -1 })
    spawn(s, playerCard, { x: 1, y: 1 })
}

const spawn = (s, asset, location) => {
    const entity = JSON.parse(JSON.stringify(asset))
    entity.location = location
    if (location.plane == null) location.plane = "playmat"

    if (getCollisions(s, entity).length > 0) throw new Error("errors.collision")

    console.log("[Game] Entity Spawned", entity)
    //if (entity.types[0] == "types.card" && getCollisions(s, entity, true).length == 0) throw new Error("errors.noTile")

    entity.entityId = uuid()
    entity.refs = {
        "@self": { type: "uuid", "value": entity.entityId }
    }
    initProperties(entity)
    entity.state.current = entity.state.startState

    s.entities.push(entity)
}

const pick = (s, entity) => {
    const e = find(s, entity)
    if (s.entities.find(e => e.location.plane == "hand")) return
    if (!e.properties.pickableFrom.includes(e.location.plane) || e.properties.frozen > 0 || e.properties.locked > 0) return

    e.location.plane = "hand"
}

export const { Provider, useContext } = store(s => ({
    state: s,
    nextTurn: () => nextTurn(s),
    newGame: () => newGame(s),
    spawn: (asset, location) => spawn(s, asset, location),
    pick: (entity) => pick(s, entity)
}), init())