import { animated as a, useSpring } from "react-spring";

import React, { useState } from "react";

export default ({ playsets = [], onChange = () => null }) => {

    const [_playsets, _setPlayset] = useState(playsets);

    return <div>
        <ul>
            {_playsets.map(playset => <li>
                {playset.name}
            </li>)}
        </ul>
    </div>
};