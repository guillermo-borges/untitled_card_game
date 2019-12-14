import React, { useRef, useState } from "react"
import { animated as a, useSpring } from "react-spring"

import styles from "./viewport.scss"

export default ({ children, center = { x: 0, y: 0 } }) => {
    const [loc, setLoc] = useState(center)
    const locRef = useRef({})
    const cursorRef = useRef({})

    var onMouseMove = (e) => {
        if (locRef.current.x == null || cursorRef.current.x == null) {
            locRef.current.x = loc.x
            locRef.current.y = loc.y
            cursorRef.current.x = e.pageX
            cursorRef.current.y = e.pageY
        }

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

    const onMouseDown = () => {
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
        <a.div style={{ top: spring.top, left: spring.left }} className={styles.pannable}>
            {React.Children.map(children, c => React.cloneElement(c, {
                panViewport: () => onMouseDown()
            }))}
        </a.div>
    </div>
}