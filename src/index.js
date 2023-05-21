import React from 'react'
import { useState, useEffect } from 'react'

import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import FooterComponent from './components/FooterComponent'
import NavbarComponent from './components/NavbarComponent'

import './index.css'
import App from './App'

import { Analytics, logEvent } from 'firebase/analytics'
import { db, analytics } from './firebase/firebase.js'

import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'

export const overmind = createOvermind(config, {
    devtools: false,
})

export default function Application() {

    return (
        <Router>
            <NavbarComponent />
            <div className="py-10"></div>
            <Routes>
                <Route path="*" element={<App />} />
                <Route path="/" element={<App />} />
               
            </Routes>
            <div className="py-10"></div>
            <FooterComponent />
        </Router>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider value={overmind}>
        <Application />
    </Provider>
)
