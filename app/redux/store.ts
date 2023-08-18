import { configureStore } from '@reduxjs/toolkit'
import checkedNotesReducer from './checkedNotesReducer'

export const store = configureStore({
    reducer: {
        checkedNotes: checkedNotesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch