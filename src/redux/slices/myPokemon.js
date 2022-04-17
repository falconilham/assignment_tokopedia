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
        }
    },
});

export function addData(payload) {
    dispatch(slice.actions.addData(payload));
}
export default slice.reducer;