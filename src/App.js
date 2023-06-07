import { Link } from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import { useAppState, useActions, useEffects, useReaction } from './overmind';
import React, { lazy, Suspense } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from './firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { puzzleList } from './data/puzzleList';

const PuzzleWidget = (props) => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const reaction = useReaction();
    const navigate = useNavigate();

    useEffect(() => {
        logEvent(analytics, 'visit_section:puzzleId');
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'screen_base',
            firebase_screen_class: 'App.js',
        });
    }, []);

    async function handleNavigateToPuzzle(event, puzzleId) {
        setSpinner(true);
        setPuzzleClass(
            'hover:bg-red-200 bg-red-100 w-full cursor-pointer max-w-sm text-left border-2 \
                            border-red-800 rounded-lg shadow-lg shadow-red-400'
        );

        event.preventDefault();
        await actions.setActivePuzzleId(puzzleId);
        await effects.setPuzzleAttempted(state.loginId, puzzleList[state.loginId][props.puzzleId]);

        window.sessionStorage.setItem('active_puzzleId', JSON.stringify(state.active_puzzleId));
        window.sessionStorage.setItem('loginId', JSON.stringify(state.loginId));
        window.sessionStorage.setItem(
            'name',
            JSON.stringify(puzzleList[state.loginId][state.active_puzzleId])
        );

        navigate('/puzzles', {
            replace: true,
        });
    }

    const [puzzleStatusString, setPuzzleStatusString] = useState('Loading Status...');
    const [spinner, setSpinner] = useState(true);

    const [puzzleClass, setPuzzleClass] = useState(
        'hover:bg-blue-100 w-full bg-blue-50 cursor-pointer max-w-sm text-left border-2 \
            border-blue-800 rounded-lg shadow-lg shadow-blue-400'
    );

    useEffect(() => {
        (async () => {
            const puzzleStatus = await effects.getPuzzleSubmissionData(
                state.loginId,
                puzzleList[state.loginId][props.puzzleId]
            );
            setSpinner(false);
            if (puzzleStatus !== null) {
                if (puzzleStatus.submitted != null && puzzleStatus.submitted == true) {
                    setPuzzleStatusString('Submitted');
                    setPuzzleClass(
                        'hover:bg-primary-200 bg-primary-100 w-full cursor-pointer max-w-sm text-left border-2 \
                            border-primary-800 rounded-lg shadow-lg shadow-primary-400'
                    );
                } else {
                    if (puzzleStatus.attempted != null && puzzleStatus.attempted == true) {
                        setPuzzleStatusString('Attempted');
                        setPuzzleClass(
                            'hover:bg-blue-100 w-full cursor-pointer max-w-sm text-left border-2 \
                                border-blue-800 rounded-lg shadow-lg shadow-blue-400'
                        );
                    }
                }
            } else {
                setPuzzleStatusString('Not Attempted');
                setPuzzleClass(
                    'hover:bg-yellow-50 w-full cursor-pointer max-w-sm text-left border-2 \
                        border-yellow-800 rounded-lg shadow-lg shadow-yellow-200'
                );
            }
        })();
    }, []);

    return (
        <div class={puzzleClass} onClick={(e) => handleNavigateToPuzzle(e, props.puzzleId)}>
            {!spinner && (
                <>
                    <div class="m-4">
                        <a>
                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {props.puzzleId}
                            </h5>
                        </a>
                        <span className="text-xs">Click to solve the following puzzle</span>
                        <div class="">
                            <span class="text-3xl font-bold text-primary-800 dark:text-white">
                                {puzzleList[state.loginId][props.puzzleId]}
                            </span>
                        </div>
                    </div>
                    <div className="text-left px-4 bg-black w-full py-2">
                        <span className="text-white text-md font-semibold">
                            {puzzleStatusString}
                        </span>
                    </div>
                </>
            )}
            {spinner && (
                <>
                    <div role="status" class="text-center items-center justify-center px-10 py-10">
                        <svg
                            aria-hidden="true"
                            class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </>
            )}
        </div>
    );
};
const App = () => {
    useEffect(() => {
        logEvent(analytics, 'visit_page:app');
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'screen_base',
            firebase_screen_class: 'App.js',
        });
    }, []);

    // General
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const reaction = useReaction();
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [setTC, setTCaccept] = useState('');

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
        window.sessionStorage.removeItem('active_puzzleId');
        window.sessionStorage.removeItem('loginId');
        window.sessionStorage.removeItem('name');
        await actions.setLoginId('');
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

        if (setTC == false) {
            alert('Please accept the T&C.');
            return;
        }

        await actions.setLoginId(loginId);
        await actions.setToggleShowList(true);

        await effects.setLoginIdInUse(loginId);

        window.sessionStorage.setItem('loginId', JSON.stringify(state.loginId));
    }

    async function handleTC(event) {
        setTCaccept(event.target.checked);
    }

    useEffect(() => {
        const loginId = JSON.parse(window.sessionStorage.getItem('loginId'));
        if (loginId != null && loginId != '') {
            actions.setLoginId(loginId);
            actions.setToggleShowList(true);
        }
    }, []);

    return (
        <div className="App">
            <section class="bg-white dark:bg-gray-900">
                <div class="mb-4 px-10 mx-auto max-w-screen-xl text-center">
                    <h1 class="mb-4 md:mb-8 mt-16 md:mt-20 text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-gray-900">
                        Puzzler AI
                    </h1>
                    <p class="mb-6 text-lg md:text-2xl font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                        Please login below with your unique id and solve the puzzles shown. Remember
                        to rate the puzzles (on a scale from 1 to 4). We are collecting this data
                        for a reseach project. We don't collect any personal information from you on
                        this website, it is completely anonymous. You should use the unique id from
                        the ones shown below in green, and not any other UID.
                    </p>{' '}
                    {state.loginId !== '' && (
                        <div className="px-12 m-8 mx-auto text-center justify-center">
                            <a
                                class="block p-6 bg-white border-2 border-gray-800 
                                    rounded-lg shadow-lg shadow-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-blue-600 dark:text-white">
                                    Your login id (UID) is {state.loginId}
                                </h5>
                                <p class="font-bold text-lg text-gray-800 dark:text-gray-400">
                                    Please remember your login id. You may logout and login later
                                    with the same UID, your submission status is saved.
                                </p>
                            </a>
                        </div>
                    )}
                </div>
            </section>
            {state.toggleShowList && (
                <section class="mb-10 w-96 md:w-full md:px-6 px-2 mx-auto max-w-screen-xl">
                    <div className="">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                            {puzzleNumberList.map((puzzleId) => {
                                return <PuzzleWidget puzzleId={puzzleId} key={puzzleId} />;
                            })}
                        </div>
                    </div>
                </section>
            )}
            {/* Login Section */}
            <section class="">
                <div class="px-4 flex flex-col items-center justify-center mx-auto lg:py-0">
                    <div
                        class="w-full bg-white rounded-lg border md:border-2 border-blue-500 shadow-lg md:shadow-xl
                        m-4 p-6 md:p-2 shadow-blue-500 dark:border max-w-md dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div class="space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {state.toggleShowList && <>Submit for all the puzzles assigned!</>}
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
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-start">
                                                <div class="flex items-center h-5">
                                                    <input
                                                        id="remember"
                                                        aria-describedby="remember"
                                                        type="checkbox"
                                                        class="w-4 h-4 border border-gray-300 
                                                            rounded bg-gray-50 focus:ring-3 
                                                            focus:ring-primary-300 dark:bg-gray-700 
                                                            dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                        onChange={(e) => handleTC(e)}
                                                        required
                                                    />
                                                </div>
                                                <div class="ml-3 text-sm">
                                                    <label
                                                        for="remember"
                                                        class="text-gray-500 dark:text-gray-300"
                                                    >
                                                        You consent to data collection.
                                                    </label>
                                                </div>
                                            </div>
                                            {/* <a
                                                href="https://docs.google.com/spreadsheets/d/1OPMZOKl2iovY4d5oO4rQtk9ToAtRX35GHQF5vgaTdwM/edit?usp=sharing"
                                                target="_blank"
                                                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            >
                                                Allocation Sheet
                                            </a> */}
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
                    {!state.toggleShowList && (
                        <div className="max-w-screen-xl mt-8 p-4 border-2 border-primary-400 rounded-2xl">
                            <p className="text-center mb-6 text-base font-normal text-gray-500 sm:px-2 dark:text-gray-400">
                                Please choose from the available UIDs shown below in green. Please
                                refresh to check available UIDs and solve only one set of puzzles
                                using one of the UIDs shown below. Remember your UID for login
                                later!
                            </p>
                            <div className="grid grid-cols-3 lg:grid-cols-12 gap-6">
                                {state.availableUids.map((uids) => {
                                    return <LoginIdFragment uid={uids} key={uids} />;
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

const LoginIdFragment = (props) => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();

    const [uidtext, setUidText] = useState('Loading...');
    const [isUsed, setIsUsed] = useState(false);

    useEffect(() => {
        (async () => {
            const hasBeenUsed = await effects.getUIDusageStatus(props.uid);
            if (hasBeenUsed == true) {
                setIsUsed(true);
                setUidText('UID used!');
            } else {
                setUidText(props.uid);
            }
        })();
    }, []);

    return (
        <>
            {!isUsed && (
                <span className="text-sm text-primary-700 font-bold hover:bg-primary-200 text-center">
                    {uidtext}
                </span>
            )}
            {isUsed && (
                <span className="text-sm text-red-600 bg-red-100 font-bold hover:bg-red-200 text-center">
                    {uidtext}
                </span>
            )}
        </>
    );
};

export default App;
