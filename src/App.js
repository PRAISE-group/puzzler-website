import { Link } from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import { useAppState, useActions, useEffects, useReaction } from './overmind';
import React, { lazy, Suspense } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from './firebase/firebase.js';
import { useNavigate } from 'react-router-dom';

const App = () => {
    // General
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const reaction = useReaction();
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        navigate('/puzzles', {
            replace: true,
        });
    }

    return (
        <div className="App">
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        Puzzler AI
                    </h1>
                    <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                        Please login below with your unique id and solve the puzzles shown. Remember
                        to rate the puzzles (on a scale from 1 to 5).
                    </p>
                </div>
            </section>

            {/* Login Section */}
            <section class="">
                <div class="px-6 py-2 flex flex-col items-center justify-center mx-auto lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        for="email"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your unique id
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 
                                            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Paste your unique id here!"
                                        required=""
                                    />
                                </div>
                                <div class="flex items-center justify-between">
                                    <a
                                        href="#"
                                        class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Forgot unique id?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    onClick={(e) => handleLogin(e)}
                                    class="w-full text-white bg-primary-600 
                                    hover:bg-primary-700 focus:ring-4 focus:outline-none 
                                    focus:ring-primary-300 font-medium rounded-lg text-sm 
                                    px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Let me solve puzzles!
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default App;
