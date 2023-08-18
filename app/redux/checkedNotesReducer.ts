import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckedNotesState {
    checked: number[];
    deleted: number[];
}

const initialState: CheckedNotesState = {
    checked: [],
    deleted: [],
};

export const checkedNotesSlice = createSlice({
    name: 'checkedNotes',
    initialState,
    reducers: {
        setCheckedAndDeleted: (state, action: PayloadAction<CheckedNotesState>) => {
            return action.payload;
        },
        clearChecked: (state) => {
            state.checked = [];
        },
    },
});

export const { setCheckedAndDeleted, clearChecked } = checkedNotesSlice.actions;

export default checkedNotesSlice.reducer;
