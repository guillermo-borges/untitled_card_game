import React from "react"
import { GameProvider } from "src/models/game"
import ViewPort from "src/components/viewport"
import Grid from "src/components/grid"
import ToolBar from "src/components/toolbar"
import Card from "src/components/card"

export default () => <GameProvider>
    <ViewPort>
        <Grid rows={3} columns={3} width="200px" height="300px" />
        <Card position={{ x: 1, y: 1 }} />
    </ViewPort>
    <ToolBar />
</GameProvider>