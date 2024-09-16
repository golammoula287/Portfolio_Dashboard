// import {createSlice} from "@reduxjs/toolkit";
// import axios from "axios";


// const messageSlice = createSlice({
//     name: "messages",
//     initialState:{
//         loading: false,
//         messages: [],
//         error: null,
//         message: null
//     },
//     reducers:{
//         getAllMessagesRequest(state, action){
//             state.messages = [],
//             state.error = null;
//             state.loading = true;
//         },
//         getAllMessagesSuccess(state, action){
//             state.messages = action.payload,
//             state.error = null;
//             state.loading = false;
//         },
//         getAllMessagesFailed(state, action){
//             state.messages = [],
//             state.error = action.payload;
//             state.loading = false;
//         },
//         deleteMessagesRequest(state, action){
//             state.message = null,
//             state.error = null;
//             state.loading = true;
//         },
//         deleteMessagesSuccess(state, action){
//             state.message = action.payload,
//             state.error = null;
//             state.loading = false;
//         },
//         deleteMessagesFailed(state, action){
//             state.message = null,
//             state.error = action.payload;
//             state.loading = false;
//         },
//         resetMessageSlice(state,action){
//             state.error = null,
//             state.messages = state.messages,
//             state.message = null,
//             state.loading = false;
//         },
//         clearAllError(state , action){
//             state.error = null ;
//             state.messages = state.messages;
//         }   
//     },
// });

// export const getAllMessages = () => async(dispatch) => {
//     dispatch(messageSlice.actions.getAllMessagesRequest());
//     try {
//         const{data} = await axios.get("http://localhost:4000/api/v1/message/getall" , {withCredentials: true});
//         dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
//         dispatch(messageSlice.actions.clearAllError())
//     } catch (error) {
//         dispatch(messageSlice.actions.getAllMessagesFailed(error.response.data.message)
//      );
//     }
// };
// export const deleteMessage = (id) => async(dispatch) => {
//     dispatch(messageSlice.actions.deleteMessagesRequest());
//     try {
//         const{data} = await axios.delete(`http://localhost:4000/api/v1/message/delete/${id}` , {withCredentials: true});
//         dispatch(messageSlice.actions.deleteMessagesSuccess(data.messages));
//         dispatch(messageSlice.actions.clearAllError())
//     } catch (error) {
//         dispatch(messageSlice.actions.deleteMessagesFailed(error.response.data.message)
//      );
//     }
// };
// export const clearAllMessageErrors = () => (dispatch) => {
//     dispatch(messageSlice.actions.clearAllError())
// };

// export const resetMessageSlice = () => (dispatch) => {
//     dispatch(messageSlice.actions.resetMessageSlice());
// };

// export default messageSlice.reducer;







import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.messages = [];
      state.error = action.payload;
      state.loading = false;
    },
    deleteMessagesRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteMessagesSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteMessagesFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    resetMessageSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllError(state) {
      state.error = null;
    }
  }
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/message/getall", { withCredentials: true });
    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
    dispatch(messageSlice.actions.clearAllError());
  } catch (error) {
    dispatch(messageSlice.actions.getAllMessagesFailed(error.response.data.message));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessagesRequest());
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/v1/message/delete/${id}`, { withCredentials: true });
    dispatch(messageSlice.actions.deleteMessagesSuccess(data.message));  // success response with message
    dispatch(getAllMessages());  // refetch messages after deletion
  } catch (error) {
    dispatch(messageSlice.actions.deleteMessagesFailed(error.response.data.message));
  }
};

export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllError());
};

export const resetMessageSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
