import React, { useState } from "react"
import { useGameContext } from "src/models/game"
import styles from "./toolbar.scss"

export default () => {

    const [{ turn }, game] = useGameContext()

    return <div>
        <div className={styles.toolbar}>
            Turn: {turn}
        </div>
        <button className={styles.nextTurnButton} onClick={() => game(g => g.nextTurn())}>Next Turn</button>
    </div>
}