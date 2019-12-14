import React, { useState } from "react"
import { animated as a, useSpring } from "react-spring"
import theme from "src/theme"

import styles from "./switch.scss"

export default ({ checked = false, onCheck = () => null }) => {

    const [_checked, _setChecked] = useState(checked)

    const _onCheck = () => {
        _setChecked(!_checked)
        onCheck(_checked)
        console.log("checked")
    }

    const knobSpring = useSpring({
        transform: _checked ? "translateX(30px)" : "translateX(0px)",
        backgroundColor: _checked ? theme.colors.uiHighlight : theme.colors.uiBackgroundRecessed,
        config: {
            tension: 500
        }
    })

    return <div className={styles.switch}>
        <input type="checkbox" checked={_checked} onChange={() => _onCheck()} />
        <a.span style={{ backgroundColor: knobSpring.backgroundColor }} className={styles.slider} onClick={() => _onCheck()} onTouchEnd={() => _onCheck()} />
        <a.span style={{ transform: knobSpring.transform }} className={styles.knob} onClick={() => _onCheck()} onTouchEnd={() => _onCheck()} />
    </div>
}