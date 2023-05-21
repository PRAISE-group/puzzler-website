import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAppState, useActions } from '../overmind'
import { Link } from 'react-router-dom'

const NavbarComponent = () => {
    const state = useAppState()
    const actions = useActions()
    let navigate = useNavigate()

    return (
        <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
              
            </div>
        </nav>
    )
}

export default NavbarComponent
