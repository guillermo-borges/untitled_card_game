import React from "react"
import { GameProvider } from "src/models/game"
import ViewPort from "src/components/viewport"
import Grid from "src/components/grid"

export default () => <GameProvider>
    <ViewPort>
        <Grid rows={3} columns={3} width="200px" height="300px" />
    </ViewPort>
</GameProvider>