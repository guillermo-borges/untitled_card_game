import React from "react"
import ReactDOM from "react-dom"
import { MemoryRouter as Router } from "react-router-dom"
import { Provider as GameProvider } from "src/models/game"
import Routes from "src/routes"

import "./scss/global.css"
import "./scss/normalize.css"

const App = () => <GameProvider>
    <Router>
        <Routes />
    </Router>
</GameProvider>

ReactDOM.render(<App />, document.getElementById("app"))