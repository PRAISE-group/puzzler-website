import { Link } from 'react-router-dom'
import react, { useEffect, useState } from 'react'
import { useAppState, useActions, useEffects, useReaction } from './overmind'
import React, { lazy, Suspense } from 'react'
import { Analytics, logEvent } from 'firebase/analytics'
import { db, analytics } from './firebase/firebase.js'

const App = () => {
    // General
    const state = useAppState()
    const actions = useActions()
    const effects = useEffects()
    const reaction = useReaction()

    return (
        <div className="App">
            <section class="bg-white dark:bg-gray-900">
                
            </section>
        </div>
    )
}

export default App
