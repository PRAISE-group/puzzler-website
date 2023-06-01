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

    return (
        <>
            <div className="mx-auto max-w-screen-2xl px-20">
                <section class="bg-white dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-16">
                        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                            Puzzler AI
                        </h1>
                        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                            Welcome to puzzle solving! We have assigned a set of puzzles for you to
                            solve. Please choose an option against each of the puzzles you solve. We
                            request you to solve each puzzle assigned to you and rate it on a scale
                            of 1 to 5, (1 being too easy and 5 being too difficult).
                        </p>
                    </div>
                </section>
                <section className="bg-white dark:bg-gray-900 px-4 mx-auto max-w-screen-2xl">
                    <div className="grid grid-cols-1">
                        {/* {puzzleNumberList.map((puzzleId) => {
                            return (
                                <PuzzleComponent
                                    key={puzzleId}
                                    id={puzzleId}
                                    name={puzzleList[state.loginId][puzzleId]}
                                    number={puzzleId.split('-')[1]}
                                />
                            );
                        })} */}
                        <PuzzleComponent
                            key={state.active_puzzleId}
                            id={state.active_puzzleId}
                            name={puzzleList[state.loginId][state.active_puzzleId]}
                            number={state.active_puzzleId.split('-')[1]}
                        />
                    </div>
                </section>
            </div>
        </>
    );
};

export default PuzzlesPage;
