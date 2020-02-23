import React, { useState } from "react"
import { useContext as useGameContext } from "src/models/game"
import { getRef } from "src/models/assets"

import styles from "./card.scss"

export default ({ card }) => {
    const cardImage = getRef(card.display.portrait)

    const style = {
        left: (card.location.x * 200) + "px",
        top: (card.location.y * 300) + "px"
    }

    return <div id={card.entityId} draggable="true" className={styles.container} style={style}>
        <div className={styles.cardBody}>
            <div className={styles.cardTitle}>
                {card.display.title}
                {card.properties.frozen > 0 ? ` - Frozen (${card.properties.frozen})` : ""}
                {card.properties.locked > 0 ? ` - Locked (${card.properties.locked})` : ""}
            </div>
            <div className={styles.cardImage} style={{ backgroundImage: `url(${cardImage})` }} />
        </div>
    </div>
}