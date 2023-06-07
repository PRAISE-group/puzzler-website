import { Link } from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import { useAppState, useActions, useEffects, useReaction } from '../overmind';
import React, { lazy, Suspense } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { puzzleList } from '../data/puzzleList';

const PuzzleWidget = (props) => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const reaction = useReaction();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const puzzleStatus = await effects.getPuzzleSubmissionData(
                state.loginId,
                puzzleList[state.loginId][props.puzzleId]
            );
        })();
    }, []);

    return <div></div>;
};

const Responses = () => {
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

    const [responses, setResponses] = useState([]);

    useEffect(() => {
        (async () => {
            setResponses(
                await Promise.all(
                    state.allGeneratedUids.map(async (x) => {
                        return await effects.getPuzzleSubmissionDataLogin(x);
                    })
                )
            );
        })();
    }, []);

    return (
        <div className="App">
            <section class="mx-auto max-w-screen-xl bg-white dark:bg-gray-900">
                <table class="w-full text-sm mt-20 text-left text-gray-500 dark:text-gray-400 p-10 m-10 rounded-2xl border-2 border-primary-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-center">
                                LoginId
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                PuzzleId
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Rating
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Option choosen
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Attempted
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Submitted
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Time Started
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Last Submitted
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {responses.map((response) => {
                            return (
                                <>
                                    {response !== null &&
                                        response.map((x) => {
                                            return (
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        class="px-2 text-center py-2 bg-gray-100 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {x.loginId}
                                                    </th>
                                                    <td class="px-2 py-2 text-center">
                                                        {x.puzzleId}
                                                    </td>
                                                    <td class="px-2 py-2 bg-yellow-200 text-yellow-800 font-bold text-center">
                                                        {x.rating}
                                                    </td>
                                                    <td class="px-2 py-2 bg-blue-200 text-blue-800 font-bold text-center">
                                                        {x.option}
                                                    </td>
                                                    <td class="px-2 py-2 text-center">
                                                        {JSON.stringify(x.attempted)}
                                                    </td>
                                                    <td class="px-2 py-2 text-center bg-primary-100">
                                                        {JSON.stringify(x.submitted)}
                                                    </td>
                                                    <td class="px-2 py-2 text-center">
                                                        {x.attempt_start_time != null &&
                                                            JSON.stringify(
                                                                x.attempt_start_time
                                                                    .toDate()
                                                                    .toString()
                                                            )}
                                                    </td>
                                                    <td class="px-2 py-2 text-center">
                                                        {x.submit_time != null &&
                                                            JSON.stringify(
                                                                x.submit_time.toDate().toString()
                                                            )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Responses;
