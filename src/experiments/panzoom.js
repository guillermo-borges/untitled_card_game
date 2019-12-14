import React, { useRef, useState } from "react"
import { animated as a, useSpring } from "react-spring"
import { useGameContext } from "src/models/game"

import styles from "./panzoom.scss"

export default () => {

    const [loc, setLoc] = useState({ x: 35, y: 66.7 })
    const locRef = useRef(loc)
    const cursorRef = useRef({ x: 0, y: 0 })
    const [{ turn }, game] = useGameContext()

    var onMouseMove = (e) => {
        let newCursor = { x: e.pageX, y: e.pageY }
        let diff = { x: newCursor.x - cursorRef.current.x, y: newCursor.y - cursorRef.current.y }

        locRef.current.x = locRef.current.x + diff.x
        locRef.current.y = locRef.current.y + diff.y

        cursorRef.current.x = newCursor.x
        cursorRef.current.y = newCursor.y

        setLoc({
            x: locRef.current.x,
            y: locRef.current.y
        })
    }

    var onMouseUp = () => {
        window.removeEventListener("mouseup", onMouseUp)
        window.removeEventListener("mousemove", onMouseMove)
    }

    const onMouseDown = (e) => {
        cursorRef.current.x = e.pageX
        cursorRef.current.y = e.pageY
        locRef.current.x = loc.x
        locRef.current.y = loc.y
        window.addEventListener("mouseup", onMouseUp)
        window.addEventListener("mousemove", onMouseMove)
    }

    const spring = useSpring({
        top: `${loc.y}px`,
        left: `${loc.x}px`,
        config: {
            tension: 1000,
            friction: 100
        }
    })

    return <div className={styles.container}>
        <a.div onMouseDown={onMouseDown} style={{ top: spring.top, left: spring.left }} className={styles.pannable}>
            <h1 >Current Turn: {turn}</h1>
            <button onClick={() => game(g => g.nextTurn())}>Next Turn!</button>
        </a.div>
    </div>
}