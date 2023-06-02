import { Link } from 'react-router-dom';
import react, { useEffect, useState, useCallback } from 'react';
import { useAppState, useActions, useEffects, useReaction } from '../overmind';
import React, { lazy, Suspense } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { db, analytics } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';

const PuzzleQuestionImageComponent = (props) => {
    const fullPath = `/generated/${props.folder}/${props.path}.png`;
    const actions = useActions();
    const state = useAppState();
    const [hidden, setHidden] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const onLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    return (
        !hidden && (
            <div
                className="bg-blue-200 hover:bg-blue-300
                items-center text-center shadow-lg mb-6 shadow-blue-400 p-1 rounded-xl border-2 border-blue-500"
            >
                <img
                    src={fullPath}
                    loading="lazy"
                    alt="No Image"
                    onLoad={onLoad}
                    onError={() => {
                        actions.setQuestionImagesNumSeq(state.numSeqs - 1);
                        setHidden(true);
                    }}
                    className="w-36 h-40 rounded-xl items-center text-center"
                />
                {!loaded && (
                    <>
                        <Loading />
                    </>
                )}
                <p className="p-2 text-xl font-semibold tracking-tight">{props.seqName}</p>
            </div>
        )
    );
};

const Loading = () => {
    return (
        <>
            <div role="status" class="text-center items-center justify-center px-14 py-10">
                <svg
                    aria-hidden="true"
                    class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 
                            78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 
                            100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 
                            50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 
                            72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 
                        33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 
                        15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 
                        1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 
                        1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 
                        41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 
                        10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 
                        79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 
                        35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </>
    );
};

const PuzzleOptionsImageComponent = (props) => {
    const optionsId = `data-${props.id}_${props.optionName}`;
    const fullPath = `/generated/${props.folder}/${props.path}.png`;
    const [loaded, setLoaded] = useState(false);
    const onLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    return (
        <div>
            <input
                type="checkbox"
                id={optionsId}
                checked={props.flag}
                class="hidden peer"
                onClick={(e) => {
                    if (e.target.checked) {
                        props.setOptionName(`${props.optionName}`);
                        props.own(true);
                        props.callbacks.map((x) => x(false));
                    } else {
                        props.setOptionName(`${props.optionName}`);
                    }
                }}
            />
            <label
                for={optionsId}
                class="inline-flex text-center items-center bg-primary-200 
                    hover:bg-primary-300 hover:shadow-lg items-center text-center shadow-lg shadow-primary-400 p-1 rounded-xl 
                    border-2 border-primary-500 justify-between cursor-pointer dark:hover:text-gray-300 
                    dark:border-gray-700 peer-checked:bg-red-50 peer-checked:shadow-red-200 peer-checked:border-red-600 
                    hover:text-gray-600 dark:peer-checked:text-gray-300 
                    peer-checked:text-red-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div>
                    <img
                        src={fullPath}
                        loading="lazy"
                        alt="No Image"
                        onLoad={onLoad}
                        onError={(e) => {
                            console.log(e);
                        }}
                        className="w-36 h-40 rounded-xl items-center text-center"
                    />
                    {!loaded && (
                        <>
                            <Loading />
                        </>
                    )}
                    <span className="mt-2 mb-2 font-semibold text-xl">{props.optionName}</span>
                </div>
            </label>
        </div>
    );
};

const StarFragment = (props) => {
    return (
        <>
            {' '}
            {!props.flag && (
                <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-400 hover:text-primary-400"
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
                    class="w-8 h-8 text-yellow-300"
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
    const state = useAppState();
    const actions = useActions();
    const reaction = useReaction();
    const navigate = useNavigate();

    const [starActive1, setStarActive1] = useState(false);
    const [starActive2, setStarActive2] = useState(false);
    const [starActive3, setStarActive3] = useState(false);
    const [starActive4, setStarActive4] = useState(false);

    const [option1disable, setOption1Disabled] = useState(false);
    const [option2disable, setOption2Disabled] = useState(false);
    const [option3disable, setOption3Disabled] = useState(false);
    const [option4disable, setOption4Disabled] = useState(false);

    const [rating, setRating] = useState(0);
    const [optionName, setOptionName] = useState('');

    const effects = useEffects();

    async function handleSubmit(event, loginId, puzzleId, option, rating) {
        event.preventDefault();
        if (option === '' || rating === 0) {
            alert('Please choose option and rating!');
            return;
        }
        await effects.submitPuzzleData(loginId, puzzleId, rating, option);
        navigate('/', { replace: true });
    }

    async function handleBackFromPuzzle(event) {
        event.preventDefault();
        navigate('/', { replace: true });
    }

    const [gridTxt, setGridText] = useState(`grid grid-cols-2 md:grid-cols-5 gap-6 items-center`);

    useEffect(() => {
        setGridText(`grid grid-cols-2 md:grid-cols-${state.numSeqs} gap-6 items-center`);
    }, [state.numSeqs, gridTxt]);

    return (
        <div class="p-6 bg-white border-2 border-gray-200 rounded-2xl dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between">
                {' '}
                <span>
                    <span class="text-2xl font-semibold px-2.5 py-0.5 dark:bg-blue-200 dark:text-blue-800 ml-3 mb-3">
                        {props.number}. Puzzle Information
                    </span>
                    <span
                        class="inline-flex flex-row bg-blue-100 
                text-blue-800 text-lg font-semibold mr-1 px-2 py-0.5 dark:bg-blue-200 dark:text-blue-800 ml-1 mb-3"
                    >
                        {props.id}
                    </span>
                    <span
                        class="inline-flex flex-row bg-primary-100
                text-primary-800 text-lg font-semibold mr-1 px-2 py-0.5 dark:bg-blue-200 dark:text-blue-800 ml-1 mb-3"
                    >
                        Index: {props.name}
                    </span>
                    <span
                        class="inline-flex flex-row bg-black
                text-white text-lg font-semibold mr-1 px-2 py-0.5 dark:bg-blue-200 dark:text-blue-800 ml-1 mb-3"
                    >
                        LoginId: {props.loginId}
                    </span>
                </span>
                <button
                    className="text-center inline-flex w-24 bg-black hover:bg-gray-800 text-white px-4 py-2 mb-2 rounded-xl"
                    onClick={(e) => {
                        handleBackFromPuzzle(e);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 px-0.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                    </svg>
                    Back
                </button>
            </div>
            <hr className="mb-2" />
            <div class="flex items-center justify-between">
                <div className="mx-auto">
                    <div className={gridTxt}>
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
                        <PuzzleQuestionImageComponent
                            seqName="Seq-5"
                            folder={props.name}
                            path="s5"
                        />
                    </div>
                </div>
            </div>
            <hr className="mb-2" />
            <div class="md:px-5 md:pb-5">
                <div class="flex flex-col text-center space-y-2 justify-between items-center mt-2.5 mb-5">
                    <a href="#">
                        <h5 class="text-xl mt-4 mb-4 md:px-10 md:mt-2 md:mb-2 tracking-tight text-gray-900 dark:text-white">
                            See the seqeunce of puzzle images above. Choose the next sequence from
                            the options shown below and give a rating for the puzzle. The option you
                            choose will appear "red".
                        </h5>
                    </a>
                    <div class="flex items-center">
                        <span className="px-2 font-bold text-xl">Puzzle Rating:</span>
                        <StarFragment
                            flag={starActive1}
                            callback={setStarActive1}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                            ]}
                            restCallbacks={[]}
                            rating="1"
                            setRating={setRating}
                            name="Give 1 star!"
                        />
                        <StarFragment
                            flag={starActive2}
                            callback={setStarActive2}
                            restCallbacks={[setStarActive1]}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                            ]}
                            rating="2"
                            setRating={setRating}
                            name="Give 2 star!"
                        />
                        <StarFragment
                            flag={starActive3}
                            callback={setStarActive3}
                            restCallbacks={[setStarActive1, setStarActive2]}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                            ]}
                            rating="3"
                            setRating={setRating}
                            name="Give 3 star!"
                        />
                        <StarFragment
                            flag={starActive4}
                            callback={setStarActive4}
                            restCallbacks={[setStarActive1, setStarActive2, setStarActive3]}
                            allCallbacks={[
                                setStarActive1,
                                setStarActive2,
                                setStarActive3,
                                setStarActive4,
                            ]}
                            rating="4"
                            setRating={setRating}
                            name="Give 4 star!"
                        />
                        <span class="bg-yellow-100 text-yellow-800 text-md font-semibold px-2 py-0.5 rounded ml-4">
                            {rating} out of 4
                        </span>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between">
                    <div className="mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
                            <PuzzleOptionsImageComponent
                                optionName="Option-1"
                                id={props.id}
                                folder={props.name}
                                flag={option1disable}
                                own={setOption1Disabled}
                                callbacks={[
                                    setOption2Disabled,
                                    setOption3Disabled,
                                    setOption4Disabled,
                                ]}
                                setOptionName={setOptionName}
                                path="o1"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-2"
                                id={props.id}
                                setOptionName={setOptionName}
                                flag={option2disable}
                                own={setOption2Disabled}
                                callbacks={[
                                    setOption1Disabled,
                                    setOption3Disabled,
                                    setOption4Disabled,
                                ]}
                                folder={props.name}
                                path="o2"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-3"
                                id={props.id}
                                setOptionName={setOptionName}
                                own={setOption3Disabled}
                                flag={option3disable}
                                callbacks={[
                                    setOption1Disabled,
                                    setOption2Disabled,
                                    setOption4Disabled,
                                ]}
                                folder={props.name}
                                path="o3"
                            />
                            <PuzzleOptionsImageComponent
                                optionName="Option-4"
                                id={props.id}
                                setOptionName={setOptionName}
                                own={setOption4Disabled}
                                folder={props.name}
                                flag={option4disable}
                                callbacks={[
                                    setOption1Disabled,
                                    setOption2Disabled,
                                    setOption3Disabled,
                                ]}
                                path="o4"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <a
                    onClick={(e) => {
                        handleSubmit(e, state.loginId, props.name, optionName, rating);
                    }}
                    class="text-white bg-blue-700 mx-auto hover:bg-blue-800 
                    focus:ring-4 focus:outline focus:ring-blue-300 cursor-pointer
                    mt-8 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit option and rating
                </a>
            </div>
        </div>
    );
};

export default PuzzleComponent;
