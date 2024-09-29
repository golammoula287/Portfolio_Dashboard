


import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "Application",
  initialState: {
    loading: false,
    softwareApplications: [], // Fixed typo
    error: null,
    message: null,
  },
  reducers: {
    getAllSoftwareApplicationsRequest(state) {
      state.softwareApplications = [];
      state.loading = true;
      state.error = null;
    },
    getAllSoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewSoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteSoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetSoftwareApplicationsSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Actions to handle API requests

// Get all applications
export const getAllSoftwareApplication = () => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/softwareapplication/getall", {
      withCredentials: true,
    });
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(data.softwareApplication));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(errorMessage));
  }
};

// Add a new application
export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationsRequest());
  try {
    const response = await axios.post("http://localhost:4000/api/v1/softwareapplication/add", data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationsSuccess(response.data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationsFailed(errorMessage));
  }
};

// Delete an application
export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationsRequest());
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/v1/softwareapplication/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationsSuccess(data.message));
    toast.success("Software Application Deleted")
  } catch (error) {
    dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationsFailed(error.response.data.message));
  }
};

// Clear errors
export const clearAllSoftwareApplicationSliceError = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

// Reset slice state
export const resetSoftwareApplicationsSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationsSlice());
};

export default softwareApplicationSlice.reducer;
