// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const skillSlice = createSlice({
//   name: "Skill",
//   initialState: {
//     loading: false,
//     skill: [],
//     error: null,
//     message: null,
//   },
//   reducers: {
//     getAllSkillsRequest(state) {
//       state.skill = [];
//       state.loading = true;
//       state.error = null;
//     },
//     getAllSkillsSuccess(state, action) {
//       state.skil = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     getAllSkillsFailed(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     addNewSkillsRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     addNewSkillsSuccess(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.message = action.payload;
//     },
//     addNewSkillsFailed(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.message = null;
//     },
//     resetSkillSlice(state) {
//       state.error = null;
//       state.loading = false;
//       state.message = null;
//       state.skill = state.skill;
//     },
//     clearAllErrors(state) {
//       state.error = null;
//       state.skill = state.skill;
//     },
//   },
// });

// // Get all skills action
// export const getAllSkills = () => async (dispatch) => {
//   dispatch(skillSlice.actions.getAllSkillsRequest());
//   try {
//     const { data } = await axios.get("http://localhost:4000/api/v1/skill/getall", {
//       withCredentials: true,
//     });
//     dispatch(skillSlice.actions.getAllSkillsSuccess(data.skill));
//   } catch (error) {
//     dispatch(skillSlice.actions.getAllSkillsFailed(error.response.data.message));
//   }
// };

// // Add new skill action
// export const addNewSkill = (data) => async (dispatch) => {
//   dispatch(skillSlice.actions.addNewSkillsRequest());
//   try {
//     const response = await axios.post("http://localhost:4000/api/v1/skill/add", data, {
//       withCredentials: true,
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     dispatch(skillSlice.actions.addNewSkillsSuccess(response.data.message));
//     toast.success("Skill Added")
//   } catch (error) {
//     dispatch(skillSlice.actions.addNewSkillsFailed(error.response.data.message));
//   }
// };

// // Clear errors
// export const clearAllSkillSliceError = () => (dispatch) => {
//   dispatch(skillSlice.actions.clearAllErrors());
// };

// // Reset skill slice
// export const resetSkillSlice = () => (dispatch) => {
//   dispatch(skillSlice.actions.resetSkillSlice());
// };

// export default skillSlice.reducer;







import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const skillSlice = createSlice({
  name: "Skill",
  initialState: {
    loading: false,
    skills: [], // Corrected typo here
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state) {
      state.skills = [];
      state.loading = true;
      state.error = null;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload; // Fixed typo
      state.loading = false;
      state.error = null;
    },
    getAllSkillsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewSkillsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSkillsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteSkillsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetSkillSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Get all skills action
export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillsRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/skill/getall", {
      withCredentials: true,
    });
    dispatch(skillSlice.actions.getAllSkillsSuccess(data.skill));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    dispatch(skillSlice.actions.getAllSkillsFailed(errorMessage));
  }
};

// Add new skill action
export const addNewSkill = (data) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillsRequest());
  try {
    const response = await axios.post("http://localhost:4000/api/v1/skill/add", data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(skillSlice.actions.addNewSkillsSuccess(response.data.message));
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    dispatch(skillSlice.actions.addNewSkillsFailed(errorMessage));
  }
};



export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillsRequest());
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/v1/skill/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(skillSlice.actions.deleteSkillsSuccess(data.message)); 
    dispatch(skillSlice.actions.clearAllErrors()); 
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillsFailed(error.response.data.message));
  }
};

// Clear errors
export const clearAllSkillSliceError = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

// Reset skill slice
export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
