import _ from "lodash"
import React, { useRef } from "react"
import { useSpring } from "react-spring"

export const useOrbit = (particles, interval) => {
    const _particles = useRef(_.isArray(particles) ? particles : [particles])

    const { orbit } = useSpring({
        to: async next => {
            while (true) await next({ orbit: 2 * Math.PI })
        },

        from: { orbit: 0 },
        config: { duration: interval },
        reset: true
    })

    const f = (p, t) => r => t(p, r)

    return _particles.current.map((p, i) => ({
        key: i,
        particle: p,
        interpolate: (t) => orbit.interpolate(f(p, t))
    }))
}