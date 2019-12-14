import React from "react"
import { GameProvider } from "src/models/game"
import ViewPort from "src/components/viewport"

export default () => <GameProvider>
    <ViewPort>
        <h1>Hello, world! Hell yeah!</h1>
    </ViewPort>
</GameProvider>