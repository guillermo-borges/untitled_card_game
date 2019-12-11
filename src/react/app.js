import { BrowserRouter as Router } from "react-router-dom";
import Routes from "src/routes";
import "../scss/normalize.css";
import "../scss/global.css";

import React from "react";

export default () => <div>
    <Router>
        <Routes />
    </Router>
</div>