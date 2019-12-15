import React, { useRef } from "react"
import { Link } from "react-router-dom"
import { animated as a, useSpring } from "react-spring"
import Menu from "src/components/menu"
import { useOrbit } from "src/hooks/orbit"

import styles from "./main.scss"

const particle = () => ({
    y: {
        rotation: 2 * Math.PI * Math.random(),
        frequency: 1,
        wavelength: 1 + (0.5 * Math.random()),
    },

    x: {
        rotation: 2 * Math.PI * Math.random(),
        frequency: 5,
        wavelength: 12 * (1 + 5 * Math.random()),
        location: Math.random()
    },

    rotation: {
        direction: Math.random() > 0.5 ? 1 : -1,
        rotation: 2 * Math.PI * Math.random(),
        frequency: 1,
        wavelength: 30 + (360 * Math.random())
    }
})

const letter = () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62))

export default () => {
    const indexes = [...Array(168).keys()]

    const particles = useOrbit(indexes.map((i) => ({ ...particle(), text: letter() })), 64000)

    console.log(particles)
    const tX = (p, r) => (window.innerWidth * p.location) + (p.wavelength * Math.sin((p.frequency * r) + p.rotation))
    const tY = (p, r) => -((window.innerHeight + 10) * p.wavelength) * (((r + p.rotation) % (2 * Math.PI)) / (2 * Math.PI))
    const tR = (p, r) => (p.direction * p.wavelength) * (((r + p.rotation) % (2 * Math.PI)) / (2 * Math.PI))

    const t = (p, r) => `translate3d(${tX(p.x, r)}px, ${tY(p.y, r)}px, 0px) rotate(${tR(p.rotation, r)}deg)`

    const s = (p) => ({
        transform: p.interpolate(t)
    })

    return <div className={styles.container}>
        <div>
            {particles.map(p => <a.div key={p.key} className={styles.particle} style={s(p)}>
                {p.particle.text}
            </a.div>)}
        </div>
        <Menu />
    </div>
}