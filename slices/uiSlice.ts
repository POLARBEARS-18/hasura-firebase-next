import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { EditNews, EditTask } from '../types/types'

export interface uiState {
  editedTask: EditTask
  editedNews: EditNews
}

const initialState: uiState = {
  editedTask: {
    id: '',
    title: '',
  },
  editedNews: {
    id: '',
    content: '',
  },
}
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      const wrapState = state
      wrapState.editedTask = action.payload
    },
    resetEditedTask: (state) => {
      const wrapState = state
      wrapState.editedTask = initialState.editedTask
    },
    setEditedNews: (state, action: PayloadAction<EditNews>) => {
      const wrapState = state
      wrapState.editedNews = action.payload
    },
    resetEditedNews: (state) => {
      const wrapState = state
      wrapState.editedNews = initialState.editedNews
    },
  },
})

export const { setEditedTask, resetEditedTask, setEditedNews, resetEditedNews } = uiSlice.actions

export const selectTask = (state: RootState) => state.ui.editedTask
export const selectNews = (state: RootState) => state.ui.editedNews

export default uiSlice.reducer
