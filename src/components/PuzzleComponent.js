import { Link } from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import { useAppState, useActions, useEffects, useReaction } from '../overmind';
import React, { lazy, Suspense } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from '../firebase/firebase.js';

import s2image from '../assets/s2.png';
import o4image from '../assets/o4.png';

const PuzzleQuestionImageComponent = (props) => {
    const fullPath = `/benchmarks/${props.folder}/${props.path}.png`;
    return (
        <div className="bg-blue-200 hover:bg-blue-300 hover:shadow-lg items-center text-center shadow-xl mb-6 shadow-blue-200 p-1 rounded-xl border-2 border-blue-500">
            <img src={fullPath} className="w-40 h-40 rounded-xl items-center" />
            <p className="p-2 text-xl font-semibold tracking-tight">{props.seqName}</p>
        </div>
    );
};

const PuzzleOptionsImageComponent = (props) => {
    const optionsId = `data-${props.id}_${props.optionName}`;
    const fullPath = `/benchmarks/${props.folder}/${props.path}.PNG`;

    return (
        <div>
            <input
                type="checkbox"
                id={optionsId}
                class="hidden peer"
                onClick={(e) => {
                    if (e.target.checked) props.setOptionName(`${props.optionName}`);
                    else props.setOptionName('');
                }}
            />
            <label
                for={optionsId}
                class="inline-flex items-center bg-primary-200 
                    hover:bg-primary-300 hover:shadow-lg items-center text-center shadow-xl p-1 shadow-primary-200 p-1 rounded-xl 
                    border-2 border-primary-500 justify-between cursor-pointer dark:hover:text-gray-300 
                    dark:border-gray-700 peer-checked:bg-red-50 peer-checked:shadow-red-200 peer-checked:border-red-600 hover:text-gray-600 dark:peer-checked:text-gray-300 
                    peer-checked:text-red-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div>
                    <img src={fullPath} className="w-40 h-40 rounded-xl items-center" />
                    <span className="mt-2 mb-2 font-semibold text-xl">{props.optionName}</span>
                </div>
            </label>
        </div>
    );
};

const StartFragment = (props) => {
    return (
        <>
            {' '}
            {!props.flag && (
                <svg
                    aria-hidden="true"
                    class="w-7 h-7 text-gray-300 hover:text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => {
                        props.setRating(props.rating);
                        props.allCallbacks.map((x) => x(false));
                        props.callback(true);
                        props.restCallbacks.map((x) => x(true));
                    }}
                >
                    <title>{props.name}</title>
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 
                        00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 
                        3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 
                        2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                </svg>
            )}
            {props.flag && (
                <svg
                    aria-hidden="true"
                    class="w-7 h-7 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => {
                        props.setRating(props.rating);
                        props.allCallbacks.map((x) => x(false));
                        props.callback(true);
                        props.restCallbacks.map((x) => x(true));
                    }}
                >
                    <title>{props.name}</title>
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 
                        00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 
                        3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 
                        2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                </svg>
            )}
        </>
    );
};
const PuzzleComponent = (props) => {
    const [starActive1, setStarActive1] = useState(false);
    const [starActive2, setStarActive2] = useState(false);
    const [starActive3, setStarActive3] = useState(false);
    const [starActive4, setStarActive4] = useState(false);
    const [starActive5, setStarActive5] = useState(false);
    const [rating, setRating] = useState(0);
    const [optionName, setOptionName] = useState('');

    const effects = useEffects();

    async function handleSubmit(event, loginId, puzzleId, option, rating) {
        event.preventDefault();
        if (option === '' || rating === 0) alert('Please choose option and rating!');
        await effects.submitPuzzleRating(loginId, puzzleId, rating);
        await effects.submitPuzzleOption(loginId, puzzleId, option);
    }

    return (
        <div class="max-w-sceen-sm p-6 bg-white border-2 border-gray-200 rounded-2xl dark:bg-gray-800 dark:border-gray-700">
            <span class="text-xl font-semibold px-2.5 py-0.5 dark:bg-blue-200 dark:text-blue-800 ml-3 mb-3">
                {props.number}. Puzzle Information
            </span>
            <span
                class="inline-flex flex-row bg-blue-100 
                text-blue-800 text-sm font-semibold mr-1 px-2 py-0.5 dark:bg-blue-200 dark:text-blue-800 ml-1 mb-3"
            >
                {props.id}
            </span>
            <span
                class="inline-flex flex-row bg-blue-100
                text-blue-800 text-sm font-semibold mr-1 px-2 py-0.5 dark:bg-blue-200 dark:text-blue-800 ml-1 mb-3"
            >
                {props.name}
            </span>
            <hr className="mb-2" />
            <div class="flex items-center justify-between">
                <div className="mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        <PuzzleQuestionImageComponent
                            seqName="Seq-1"
                            folder={props.name}
                            path="s1"
                        />
                        <PuzzleQuestionImageComponent
                            seqName="Seq-2"
                            folder={props.name}
                            path="s2"
                        />
                        <PuzzleQuestionImageComponent
                            seqName="Seq-3"
                            folder={props.name}
                            path="s3"
                        />
                        <PuzzleQuestionImageComponent
                            seqName="Seq-4"
                            folder={props.name}
                            path="s4"
                        />
                    </div>
                </div>
            </div>
            <hr className="mb-2" />
            <div class="px-5 pb-5">
                <div class="flex flex-col space-y-2 justify-between items-center mt-2.5 mb-5">
                    <a href="#">
                        <h5 class="text-xl mr-6 font-semibold tracking-tight text-gray-900 dark:text-white">
                            Choose the next sequence from the options below and give a rating for
                            the puzzle. (Choose only one option!)
                        </h5>
                    </a>
                    <div class="flex items-center">
                        <StartFragment
                            flag={starActive1}
                            callback={setStarActive1}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                                setStarActive5,
                            ]}
                            restCallbacks={[]}
                            rating="1"
                            setRating={setRating}
                            name="Give 1 star!"
                        />
                        <StartFragment
                            flag={starActive2}
                            callback={setStarActive2}
                            restCallbacks={[setStarActive1]}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                                setStarActive5,
                            ]}
                            rating="2"
                            setRating={setRating}
                            name="Give 2 star!"
                        />
                        <StartFragment
                            flag={starActive3}
                            callback={setStarActive3}
                            restCallbacks={[setStarActive1, setStarActive2]}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                                setStarActive5,
                            ]}
                            rating="3"
                            setRating={setRating}
                            name="Give 3 star!"
                        />
                        <StartFragment
                            flag={starActive4}
                            callback={setStarActive4}
                            restCallbacks={[setStarActive1, setStarActive2, setStarActive3]}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                                setStarActive5,
                            ]}
                            rating="4"
                            setRating={setRating}
                            name="Give 4 star!"
                        />
                        <StartFragment
                            flag={starActive5}
                            callback={setStarActive5}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                                setStarActive5,
                            ]}
                            restCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                            ]}
                            rating="5"
                            setRating={setRating}
                            name="Give 5 star!"
                        />
                        <span class="bg-blue-100 text-blue-800 text-md font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                            {rating} out of 5
                        </span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div className="mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center">
                            <PuzzleOptionsImageComponent
                                optionName="Option-1"
                                id={props.id}
                                folder={props.name}
                                setOptionName={setOptionName}
                                path="o1"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-2"
                                id={props.id}
                                setOptionName={setOptionName}
                                folder={props.name}
                                path="o2"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-3"
                                id={props.id}
                                setOptionName={setOptionName}
                                folder={props.name}
                                path="o3"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-4"
                                id={props.id}
                                setOptionName={setOptionName}
                                folder={props.name}
                                path="o4"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <a
                    onClick={(e) => {
                        handleSubmit(e, 'pz34564', props.name, optionName, rating);
                    }}
                    class="text-white bg-blue-700 mx-auto hover:bg-blue-800 
                    focus:ring-4 focus:outline focus:ring-blue-300 cursor-pointer
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit option and rating
                </a>
            </div>
        </div>
    );
};

export default PuzzleComponent;
