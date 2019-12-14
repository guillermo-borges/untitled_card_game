import React from "react"
import ReactDOM from "react-dom"
import { MemoryRouter as Router } from "react-router-dom"
import Routes from "src/routes"

import "./scss/global.css"
import "./scss/normalize.css"

const App = () => <div>
    <Router>
        <Routes />
    </Router>
</div>

ReactDOM.render(<App />, document.getElementById("app"))