import React, { useRef, useState } from "react"
import { animated as a, useSpring } from "react-spring"

import styles from "./viewport.scss"

export default ({ children }) => {
    const [loc, setLoc] = useState({ x: 0, y: 0 })
    const locRef = useRef({ x: 0, y: 0 })
    const cursorRef = useRef({})
    const container = useRef(null)
    const pannable = useRef(null)

    var onMouseMove = (e) => {
        if (cursorRef.current.x == null) {
            cursorRef.current.x = e.screenX
            cursorRef.current.y = e.screenY
        }

        let newCursor = { x: e.screenX, y: e.screenY }
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
        cursorRef.current = {}

        /*
        if (container.current != null) {
            const area = { width: pannable.current.offsetWidth, height: pannable.current.offsetHeight }
            const screen = { width: container.current.offsetWidth, height: container.current.offsetHeight }

            const topLeft = {
                x: - locRef.current.x,
                y: - locRef.current.y
            }

            const r = JSON.parse(JSON.stringify(topLeft))
            if (topLeft.x + Math.round(screen.width / 3) < 0) {
                r.x = 0 - Math.round(screen.width / 3)
            } else if (topLeft.x > (area.width - Math.round(screen.width / 3))) {
                r.x = (area.width - Math.round(screen.width / 3))
            }

            if (topLeft.y + Math.round(screen.height / 3) < 0) {
                r.y = 0 - Math.round(screen.height / 3)
            } else if (topLeft.y > (area.height - Math.round(screen.height / 3))) {
                r.y = (area.height - Math.round(screen.height / 3))
            }

            if (r.x != topLeft.x || r.y != topLeft.y) {
                locRef.current.x = -r.x
                locRef.current.y = -r.y
                setLoc(locRef.current)
            }
        }
        */

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

    return <div ref={container} className={styles.container}>
        <div className={styles.selectableBackground} onMouseDown={onMouseDown} />
        <a.div ref={pannable} style={{ top: spring.top, left: spring.left }} className={styles.pannable}>
            {React.Children.map(children, c => React.cloneElement(c, {
                panViewport: () => onMouseDown()
            }))}
        </a.div>
    </div>
}