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
                value=""
                class="hidden peer"
                required=""
                onClick={(e) => alert(`${optionsId}`)}
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

const PuzzleComponent = (props) => {
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
                            the puzzle
                        </h5>
                    </a>
                    <div class="flex items-center">
                        <svg
                            aria-hidden="true"
                            class="w-7 h-7 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>First star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            class="w-7 h-7 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Second star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            class="w-7 h-7 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Third star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            class="w-7 h-7 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Fourth star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            class="w-7 h-7 text-gray-300 dark:text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Fifth star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="bg-blue-100 text-blue-800 text-md font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                            4 out of 5
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
                                path="o1"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-2"
                                id={props.id}
                                folder={props.name}
                                path="o2"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-3"
                                id={props.id}
                                folder={props.name}
                                path="o3"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-4"
                                id={props.id}
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
                        alert('Option Submitted!');
                    }}
                    class="text-white bg-blue-700 mx-auto hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit option and rating
                </a>
            </div>
        </div>
    );
};

export default PuzzleComponent;
