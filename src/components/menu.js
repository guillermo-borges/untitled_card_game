import React from "react"
import { Link } from "react-router-dom"

import { useSpring, animated as a } from "react-spring"
import styles from "./menu.scss"


export default ({ show = true, blurBackground = false }) => {

    const props = useSpring({ opacity: show ? 1 : 0, from: { opacity: 0 } })

    return <div>
        <div className={styles.background} />
        <div className={styles.container} >
            <a.div className={styles.menu} style={props}>
                <h1>Untitled Card Game</h1>
                <ul>
                    <li><Link to="/board">New</Link></li>
                    <li><Link to="/board">Load</Link></li>
                    <li><Link to="/editor/playsets">Editor</Link></li>
                    <li><Link to="/editor/playsets">Settings</Link></li>
                    <li><Link to="/editor/playsets">Quit</Link></li>
                </ul>
            </a.div>
        </div>
    </div>
}