import React, { useEffect } from "react"
import Card from "src/components/card"
import Tile from "src/components/tile"
import { useGameContext } from "src/models/game"

import styles from "./playmat.scss"

const style = {
    top: (window.innerHeight / 2) - 150 + "px",
    left: (window.innerWidth / 2) - 100 + "px"
}

export default ({ children, panViewport }) => {
    const [gameState, game] = useGameContext()
    const cards = gameState.entities.filter(x => x.location.type == "field" && x.types[0] == "types.card")
    const tiles = gameState.entities.filter(x => x.location.type == "field" && x.types[0] == "types.tile")

    return <div className={styles.container} style={style}>
        {tiles.map(t => <Tile key={t.entityId} tile={t} onDrag={panViewport} />)}
        {cards.map(c => <Card key={c.entityId} card={c} />)}
    </div>
}