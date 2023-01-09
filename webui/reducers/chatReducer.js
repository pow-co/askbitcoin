import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//const searchParams = new URLSearchParams(window.location.search);

const initialState = {
  messages: { byId: {}, allIds: [], loading: true },
  typingUser: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    receiveNewMessage(state, action) {
      const message = action.payload;
      state.messages.byId[message.tx.h] = message;
      state.messages.allIds.push(message.tx.h);
    },
    receiveEditedMessage(state, action) {
      const message = action.payload;
      state.messages.byId[message.tx.h] = message;
    },
    receiveDeletedMessage(state, action) {
      const message = action.payload;
      delete state.messages.byId[message.tx.h];
      state.messages.allIds = state.messages.allIds.filter(
        (id) => id !== message.tx.h
      );
    },
    editMessage(state, action) {},
    deleteMessage(state, action) {},
    typing(state, action) {},
    stopTyping(state, action) {},
    updateTypingUser(state, action) {
      state.typingUser = action.payload;
    },
  },
});

export const {
  setActiveChannel,
  receiveNewMessage,
  receiveEditedMessage,
  receiveDeletedMessage,
  updateOnlineUsers,
  updateTypingUser,
  editMessage,
  deleteMessage,
  stopTyping,
  typing,
} = chatSlice.actions;

export default chatSlice.reducer;
