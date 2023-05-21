import { rehydrate } from 'overmind'

export const changeEmail = ({ state }, email) => {
    state.email = email
}

export const rehydrateData = ({ state }, data) => {
    // Grab a previous copy of the state, for example stored in
    // localstorage
    rehydrate(state, data || {})
}
