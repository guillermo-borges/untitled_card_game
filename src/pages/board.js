import React from "react"
import ViewPort from "src/components/viewport"
import ToolBar from "src/components/toolbar"
import Card from "src/components/card"
import Playmat from "src/components/playmat"

export default () => <div>
    <ViewPort>
        <Playmat />
    </ViewPort>
    <ToolBar />
</div>