import React, { useRef, useState } from "react"

import styles from "./panzoom.scss"

export default () => {

    const [loc, setLoc] = useState({ x: 35, y: 66.7 })
    const locRef = useRef(loc)
    const cursorRef = useRef({ x: 0, y: 0 })

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

    return <div className={styles.container}>
        <div onMouseDown={onMouseDown} style={{ top: `${loc.y}px`, left: `${loc.x}px` }} className={styles.pannable}>
            <h1 >Blue-Eyes White Dragon</h1>
            <button onClick={() => setLoc({ x: -10, y: -12 })}>Click me</button>
        </div>
    </div>
}