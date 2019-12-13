import React, { useState } from "react"

export default ({ playsets = [] }) => {

    const [_playsets] = useState(playsets)

    return <div>
        <ul>
            {_playsets.map(playset => <li key={playset.id}>
                {playset.name}
            </li>)}
        </ul>
    </div>
}