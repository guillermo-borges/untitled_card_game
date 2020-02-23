import React, { useState } from "react"
import { useContext as useGameContext } from "src/models/game"
import styles from "./tile.scss"

export default ({ tile, onDrag }) => {

    const style = {
        left: (tile.location.x * 200) + "px",
        top: (tile.location.y * 300) + "px",
        width: (tile.size.width * 200) + "px",
        height: (tile.size.height * 300) + "px"
    }

    return <div className={styles.container} style={style} onMouseDown={onDrag}>

    </div>
}