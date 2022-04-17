import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
    open: false,
    title: '',
    message: '',
    type: '',
    data: ''
};


const slice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action) {
            return state = action.payload
        },
        closeModal(state) {
            return state = {
                ...state,
                open: false,
            }
        },
    },
});

export function dispatchOpenModal({ message, variant, open, title, type, data }) {
    dispatch(slice.actions.openModal({
        open,
        message,
        variant,
        title,
        type,
        data
    }));
}

export function dispatchCloseModal() {
    dispatch(slice.actions.closeModal());
}
export default slice.reducer;

