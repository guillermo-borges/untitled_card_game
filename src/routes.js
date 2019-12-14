import React from "react"
import { Route, Switch } from "react-router-dom"
import BoardPage from "src/pages/board"
import MainPage from "src/pages/main"

export default () => <Switch>
    <Route exact path="/board">
        <BoardPage />
    </Route>

    <Route exact path="/">
        <MainPage />
    </Route>
</Switch>