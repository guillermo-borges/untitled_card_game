import React, { useState } from "react"
import { useGameContext } from "src/models/game"
import styles from "./card.scss"

export default ({ card }) => {

    const style = {
        left: (card.location.x * 200) + "px",
        top: (card.location.y * 300) + "px"
    }

    return <div className={styles.container} style={style}>
        <div className={styles.cardBody}>
            <div className={styles.cardImage}></div>
            <div className={styles.cardTitle}>{card.display.title}</div>
        </div>
    </div>
}