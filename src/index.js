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
import FooterComponent from './components/FooterComponent';

export const overmind = createOvermind(config, {
    devtools: false,
});

export default function Application() {
    useEffect(() => {
        logEvent(analytics, 'visit_page:first_page');
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'screen_base',
            firebase_screen_class: 'App.js',
        });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="*" element={<App />} />
                <Route path="/" element={<App />} />
                <Route path="/puzzles" element={<PuzzlesPage />} />
                {/* <Route path="/submissions" element={<Responses />} /> */}
            </Routes>
            <FooterComponent />
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
