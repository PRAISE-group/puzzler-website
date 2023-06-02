import { Link } from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import { useAppState, useActions, useEffects, useReaction } from '../overmind';
import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import PuzzleComponent from '../components/PuzzleComponent';
import { puzzleList } from '../data/puzzleList';

import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from '../firebase/firebase.js';

const PuzzlesPage = () => {
    // General
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const reaction = useReaction();
    const navigate = useNavigate();

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

    const [name, setName] = useState('');

    useEffect(() => {
        (async () => {
            await actions.setLoginId(JSON.parse(window.sessionStorage.getItem('loginId')));
            await actions.setActivePuzzleId(
                JSON.parse(window.sessionStorage.getItem('active_puzzleId'))
            );
            await setName(JSON.parse(window.sessionStorage.getItem('name')));
            actions.setQuestionImagesNumSeq(5);
        })();
    }, []);

    return (
        <>
            <div className="mx-auto px-2 md:px-20">
                <section class="bg-white dark:bg-gray-900">
                    <div class="mb-4 px-10 mx-auto max-w-screen-xl text-center">
                        <h1 class="mb-4 md:mb-8 mt-16 md:mt-20 text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-gray-900">
                            Puzzler AI
                        </h1>
                        <div className="">
                            <p className="mb-6 text-lg md:text-2xl font-normal text-gray-500 lg:text-xl sm:px-10 lg:px-20 dark:text-gray-400">
                                Please use your judgement at rating the puzzles. The rating scale
                                shown below are just representative. A good puzzle is creative,
                                challenging, deductive and enjoyable to solve!.
                            </p>
                            <div className="grid grid-cols-2 max-w-screen-2xl text-center gap-4 md:grid-cols-4 mb-6 ">
                                <p class="text-left inline-flex justify-center items-center text-gray-500 dark:text-gray-400 space-x-2.5 mt-2">
                                    <span class="inline-flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                        1
                                    </span>
                                    <span>
                                        <h3 class="font-medium leading-tight">Rating 1 Star</h3>
                                        <p class="text-sm">Puzzle is bad.</p>
                                    </span>
                                </p>
                                <p class="inline-flex text-left justify-center items-center text-gray-500 dark:text-gray-400 space-x-2.5 mt-2">
                                    <span class="inline-flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                        2
                                    </span>
                                    <span>
                                        <h3 class="font-medium leading-tight">Rating 2 Star</h3>
                                        <p class="text-sm">Puzzle is average.</p>
                                    </span>
                                </p>
                                <p class="inline-flex text-left justify-center items-center text-gray-500 dark:text-gray-400 space-x-2.5 mt-2">
                                    <span class="inline-flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                        3
                                    </span>
                                    <span>
                                        <h3 class="font-medium leading-tight">Rating 3 Star</h3>
                                        <p class="text-sm">Puzzle is good.</p>
                                    </span>
                                </p>
                                <p class="text-left inline-flex justify-center items-center text-gray-500 dark:text-gray-400 space-x-2.5 mt-2">
                                    <span class="inline-flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                        4
                                    </span>
                                    <span>
                                        <h3 class="font-medium leading-tight">Rating 4 Star</h3>
                                        <p class="text-sm">Puzzle is bad.</p>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white dark:bg-gray-900 px-2 md:px-4 mx-auto max-w-screen-xl">
                    <div className="grid grid-cols-1">
                        <PuzzleComponent
                            key={state.active_puzzleId}
                            loginId={state.loginId}
                            id={state.active_puzzleId}
                            name={name}
                            number={state.active_puzzleId.split('-')[1]}
                        />
                    </div>
                </section>
            </div>
        </>
    );
};

export default PuzzlesPage;
