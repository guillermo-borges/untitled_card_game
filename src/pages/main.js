import React from "react"
import { Link } from "react-router-dom"

export default () => {
    return <div>
        <h1>Untitled Card Game</h1>
        <ul>
            <li><Link to="/board">New Game</Link></li>
            <li><Link to="/editor/playsets">Editor</Link></li>
        </ul>
    </div>
}