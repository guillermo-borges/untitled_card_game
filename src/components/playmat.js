import React, { useEffect } from "react"
import Card from "src/components/card"
import { useGameContext } from "src/models/game"

import styles from "./playmat.scss"

const style = {
    top: (window.innerHeight / 2) - 150 + "px",
    left: (window.innerWidth / 2) - 100 + "px"
}

export default ({ children }) => {
    const [gameState, game] = useGameContext()
    const cards = gameState.entities.filter(x => x.location.type == "field" && x.types[0] == "types.card")

    return <div className={styles.container} style={style}>
        {cards.map(c => <Card key={c.entityId} card={c} />)}
    </div>
}