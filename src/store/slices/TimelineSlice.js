
// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const timelineSlice = createSlice({
//   name: "messages",
//   initialState: {
//     loading: false,
//     messages: [],
//     error: null,
//     message: null
//   },
//   reducers: {
//     getAllTimelineRequest(state) {
//       state.timeline = [];
//       state.error = null;
//       state.loading = true;
//     },
//     getAllTimelineSuccess(state, action) {
//       state.timeline = action.payload;
//       state.error = null;
//       state.loading = false;
//     },
//     getAllTimelineFailed(state, action) {
//       state.timeline = state.timeline;
//       state.error = action.payload;
//       state.loading = false;
//     },
//     deleteTimelineRequest(state) {
//       state.message = null;
//       state.error = null;
//       state.loading = true;
//     },
//     deleteTimelineSuccess(state, action) {
//       state.message = action.payload;
//       state.error = null;
//       state.loading = false;
//     },
//     deleteTimelineFailed(state, action) {
//       state.message = null;
//       state.error = action.payload;
//       state.loading = false;
//     },
//     addTimelineRequest(state) {
//         state.message = null;
//         state.error = null;
//         state.loading = true;
//       },
//       addTimelineSuccess(state, action) {
//         state.timeline = action.payload;
//         state.error = null;
//         state.loading = false;
//       },
//       addTimelineFailed(state, action) {
//         state.timeline = null;
//         state.error = action.payload;
//         state.loading = false;
//       },
//     resetTimelineSlice(state) {
//       state.error = null;
//       state.timeline = state.timeline
//       state.message = null;
//       state.loading = false;
//     },
//     clearAllError(state) {
//       state.error = null;
//     }
//   }
// });

// export const getAllTimeline = () => async (dispatch) => {
//   dispatch(timelineSlice.actions.getAllTimelineRequest());
//   try {
//     const { data } = await axios.get("http://localhost:4000/api/v1/timeline/getall", { withCredentials: true });
//     dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
//     dispatch(timelineSlice.actions.clearAllError());
//   } catch (error) {
//     dispatch(timelineSlice.actions.getAllTimelineFailed(error.response.data.message));
//   }
// };

// export const deleteTimeline = (id) => async (dispatch) => {
//   dispatch(timelineSlice.actions.deleteTimelineRequest());
//   try {
//     const { data } = await axios.delete(`http://localhost:4000/api/v1/timeline/delete/${id}`, { withCredentials: true });
//     dispatch(timelineSlice.actions.deleteTimelineSuccess(data.timelines));  // success response with message
//     dispatch(getAllMessages());  // refetch messages after deletion
//   } catch (error) {
//     dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message));
//   }
// };

// export const addNewTimeline = (timelineData) => async (dispatch) => {
//     dispatch(timelineSlice.actions.addTimelineRequest());
//     try {
//       const { data } = await axios.delete(`http://localhost:4000/api/v1/timeline/add`,timelineData, { withCredentials: true , headers:{"Content-Type" : "application/json"} });
//       dispatch(timelineSlice.actions.addTimelineRequest(data.timelines));  // success response with message
//       dispatch(getAllMessages());  // refetch messages after deletion
//     } catch (error) {
//       dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message));
//     }
//   };

// export const clearAllTimelineErrors = () => (dispatch) => {
//   dispatch(timelineSlice.actions.clearAllError());
// };

// export const resetTimelineSlice = () => (dispatch) => {
//   dispatch(timelineSlice.actions.resetTimelineSlice());
// };

// export default timelineSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const timelineSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    timeline: [], // should be `timeline`, not `messages`
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state) {
      state.timeline = [];
      state.error = null;
      state.loading = true;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteTimelineRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addTimelineRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addTimelineSuccess(state, action) {
      state.timeline.push(action.payload); // adding the new timeline to the existing array
      state.error = null;
      state.loading = false;
    },
    addTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetTimelineSlice(state) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllError(state) {
      state.error = null;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/timeline/getall", {
      withCredentials: true,
    });
    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timeline));
    dispatch(timelineSlice.actions.clearAllError());
  } catch (error) {
    dispatch(timelineSlice.actions.getAllTimelineFailed(error.response.data.message));
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/v1/timeline/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message)); // assuming API returns success message
    dispatch(getAllTimeline()); // refetch timelines after deletion
  } catch (error) {
    dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message));
  }
};

export const addNewTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequest());
  try {
    const { data } = await axios.post(`http://localhost:4000/api/v1/timeline/add`, timelineData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(timelineSlice.actions.addTimelineSuccess(data.timeline)); // success response with new timeline
    dispatch(getAllTimeline()); // refetch timelines after adding new one
    toast.success("Timeline Added")
  } catch (error) {
    dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message));
  }
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllError());
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export default timelineSlice.reducer;

