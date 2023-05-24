import { Link } from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import { useAppState, useActions, useEffects, useReaction } from '../overmind';
import React, { lazy, Suspense } from 'react';
import PuzzleComponent from '../components/PuzzleComponent';
import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from '../firebase/firebase.js';

const PuzzlesPage = () => {
    return (
        <>
            <div className="mx-auto max-w-screen-2xl">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PuzzleComponent id="puzzle_872635" name="b0001" number="1" />
                        <PuzzleComponent id="puzzle_341243" name="b0041" number="2" />
                        <PuzzleComponent id="puzzle_235312" name="b0003" number="3" />
                        <PuzzleComponent id="puzzle_534523" name="b0004" number="4" />
                        <PuzzleComponent id="puzzle_884567" name="b0005" number="5" />
                        <PuzzleComponent id="puzzle_774563" name="b0006" number="6" />
                    </div>
                </section>
            </div>
        </>
    );
};

export default PuzzlesPage;
