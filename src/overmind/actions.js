import { rehydrate } from 'overmind';

export const setLoginId = ({ state }, loginId) => {
    state.loginId = loginId;
};

export const setActivePuzzleId = ({ state }, puzzleId) => {
    state.active_puzzleId = puzzleId;
};

export const setToggleShowList = ({ state }, toggleShowList) => {
    state.toggleShowList = toggleShowList;
};

export const setQuestionImagesNumSeq = ({ state }, numSeqs) => {
    state.numSeqs = numSeqs;
};

export const rehydrateData = ({ state }, data) => {
    // Grab a previous copy of the state, for example stored in
    // localstorage
    rehydrate(state, data || {});
};
