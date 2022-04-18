import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
    myPokemon: []
};


const slice = createSlice({
    name: 'my-pokemon-data',
    initialState,
    reducers: {
        addData: (state, action) => {
            const data = action.payload
            return {
                ...state,
                myPokemon: [...state.myPokemon, data]
            }
        },
        removeData: (state, action) => {
            const id = action.payload
            return {
                ...state,
                myPokemon: state.myPokemon.filter(item => item.id !== id)
            }
        }
    },
});

export function addData(payload) {
    dispatch(slice.actions.addData(payload));
}

export function removeData(payload) {
    dispatch(slice.actions.removeData(payload));
}
export default slice.reducer;