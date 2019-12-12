import { BrowserRouter as Router } from "react-router-dom"
import Routes from "src/routes"

import React from "react"

import "../scss/global.css"
import "../scss/normalize.css"

export default () => <div>
    <Router>
        <Routes />
    </Router>
</div>