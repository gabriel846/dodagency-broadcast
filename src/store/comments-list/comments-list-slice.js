// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { commentsList: [] };

const commentsListSlice = createSlice({
  name: "commentsList",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.commentsList.push(action.payload.comment);
    },
    clearCommentsList: (state) => {
      if (state.commentsList.length > 0) {
        state.commentsList = [];
      }
    },
  },
});

export const commentsListActions = commentsListSlice.actions;

export default commentsListSlice;
