import React from "react"
import { Route, Switch } from "react-router-dom"
import EditorPage from "src/components/editor/page"
import PanZoomDemo from "src/components/experiments/panzoom"

export default () => <Switch>
    <Route path="/editor">
        <EditorPage />
    </Route>
    <Route path="/game">
        <h1>This is the game</h1>
    </Route>
    <Route path="/panzoom">
        <PanZoomDemo />
    </Route>
    <Route path="/">
        <div>
            <h1>This is the main menu!</h1>
        </div>
    </Route>
</Switch>