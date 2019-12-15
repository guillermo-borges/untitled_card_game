import React from "react"
import styles from "./grid.scss"

const index = (n) => Array.from(Array(n).keys())

export default ({ rows, columns, width, height, panViewport }) => <div className={styles.container} onMouseDown={panViewport}>
    <table>
        <tbody>
            {index(rows).map(i => <tr key={i}>
                {index(columns).map(j => <td key={`${i}-${j}`} >
                    <div className={styles.cell} style={{ width: width, height: height }} />
                </td>)}
            </tr>)}
        </tbody>
    </table>
</div>