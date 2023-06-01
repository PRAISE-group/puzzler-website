import { Link } from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import { useAppState, useActions, useEffects, useReaction } from './overmind';
import React, { lazy, Suspense } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from './firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { puzzleList } from './data/puzzleList';

const App = () => {
    // General
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const reaction = useReaction();
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');

    const puzzleNumberList = [
        'Puzzle-1',
        'Puzzle-2',
        'Puzzle-3',
        'Puzzle-4',
        'Puzzle-5',
        'Puzzle-6',
        'Puzzle-7',
        'Puzzle-8',
        'Puzzle-9',
        'Puzzle-10',
    ];

    async function handleLogout(event) {
        event.preventDefault();
        await actions.setToggleShowList(false);
    }

    async function handleLogin(event) {
        event.preventDefault();

        if (loginId === '') {
            alert('Your unique Id is empty!');
            return;
        }

        if (puzzleList[loginId] == null) {
            alert('Unique Id is invalid. Pleae check if your login Id exists!');
            return;
        }

        await actions.setLoginId(loginId);
        await actions.setToggleShowList(true);
    }

    async function handleNavigateToPuzzle(event, puzzleId) {
        event.preventDefault();

        await actions.setActivePuzzleId(puzzleId);

        navigate('/puzzles', {
            replace: false,
        });
    }

    return (
        <div className="App">
            <section class="bg-white dark:bg-gray-900">
                <div class="px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        Puzzler AI
                    </h1>
                    <p class="mb-2 text-2xl font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                        Please login below with your unique id and solve the puzzles shown. Remember
                        to rate the puzzles (on a scale from 1 to 5).
                    </p>{' '}
                    {state.loginId !== '' && (
                        <span class="text-2xl items-center bg-primary-200 border-2 border-green-400 rounded-xl w-64 px-8 text-center font-bold text-primary-700">
                            Login-Id: {state.loginId}
                        </span>
                    )}
                </div>
            </section>
            {state.toggleShowList && (
                <section class="mb-10 px-4 mx-auto max-w-screen-xl">
                    <div className="">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                            {puzzleNumberList.map((puzzleId) => {
                                return (
                                    <div
                                        class="hover:bg-primary-100 w-full cursor-pointer max-w-sm text-left border-2 
                                                border-primary-800 rounded-lg shadow-lg shadow-primary-200 dark:bg-gray-800 dark:border-gray-700"
                                        onClick={(e) => handleNavigateToPuzzle(e, puzzleId)}
                                    >
                                        <div class="m-4">
                                            <a>
                                                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                    {puzzleId}
                                                </h5>
                                            </a>
                                            <span className="text-xs">
                                                Click to solve the following puzzle
                                            </span>
                                            <div class="">
                                                <span class="text-3xl font-bold text-primary-800 dark:text-white">
                                                    {puzzleList[state.loginId][puzzleId]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-left px-4 bg-black w-full py-2">
                                            <span className="text-white text-md font-semibold">
                                                Puzzle not attempted.
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
            {/* Login Section */}
            <section class="">
                <div class="px-6 py-2 flex flex-col items-center justify-center mx-auto lg:py-0">
                    <div class="w-full bg-white rounded-lg border-2 border-blue-500 shadow-xl shadow-blue-500 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {state.toggleShowList && <>Solve the puzzles assigned!</>}
                                {!state.toggleShowList && <>Get you puzzles now!</>}
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="submit">
                                {!state.toggleShowList && (
                                    <>
                                        <div>
                                            <label
                                                for="email"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Unique Id:
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 
                                            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Login with your unique Id"
                                                onChange={(e) => {
                                                    setLoginId(e.target.value);
                                                }}
                                                required
                                            />
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
                                    </>
                                )}

                                {state.toggleShowList && (
                                    <button
                                        type="submit"
                                        onClick={(e) => handleLogout(e)}
                                        class="w-full text-white bg-black
                                    hover:bg-blue-700 focus:ring-4 focus:outline-none 
                                    focus:ring-primary-300 font-medium rounded-lg text-sm 
                                    px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Logout
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default App;
