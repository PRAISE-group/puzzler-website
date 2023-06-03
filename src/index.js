import React from 'react';
import { useState, useEffect } from 'react';

import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';

import PuzzlesPage from './pages/PuzzlesPage';

import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from './firebase/firebase.js';

import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { config } from './overmind';
import Responses from './pages/ResponsesPage';

export const overmind = createOvermind(config, {
    devtools: false,
});

export default function Application() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<App />} />
                <Route path="/" element={<App />} />
                <Route path="/puzzles" element={<PuzzlesPage />} />
                {/* <Route path="/responses" element={<Responses />} /> */}
            </Routes>
            <div className="py-16"></div>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider value={overmind}>
        <Application />
    </Provider>
);
