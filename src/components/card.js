import React, { useState } from "react"
import { useGameContext } from "src/models/game"
import styles from "./card.scss"

export default ({ position }) => {

    const style = {
        left: (position.x * 200) + "px",
        top: (position.y * 300) + "px"
    }

    return <div className={styles.container} style={style}>
        <div className={styles.cardBody}>
            <div className={styles.cardImage}></div>
            <div className={styles.cardTitle}>Blue-Eyes Bootleg Dragon</div>
        </div>
    </div>
}