
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        loading: false,
        error: null,
        message: null
       
    },
    reducers: {
        // Get All Projects
        getAllProjectsRequest(state, action) {
            state.projects = [];
            state.error = null;
            state.loading = true;
        },
        getAllProjectsSuccess(state, action) {
            state.projects = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllProjectsFailed(state, action) {
            // state.projects = state.projects; // Redundant
            state.error = action.payload;
            state.loading = false;
        },

        // Add New Project
        addNewProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewProjectsSuccess(state, action) {
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        addNewProjectsFailed(state, action) {
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },

        // Delete Project
        deleteProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteProjectsSuccess(state, action) {
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteProjectsFailed(state, action) {
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },

        // update Project
        updateProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProjectsSuccess(state, action) {
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateProjectsFailed(state, action) {
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },

        // Reset and Clear Errors
        resetProjectSlice(state, action) {
            state.error = null;
            state.message = null;
            state.loading = false;
            // Optionally reset other parts of the state if needed
        },
        clearAllErrors(state, action) {
            state.error = null;
            // You can also clear messages if desired:
            // state.message = null;
        },
    },
});

// Async Thunks

// Get All Projects
export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
        const { data } = await axios.get("http://localhost:4000/api/v1/project/getall", { withCredentials: true });
        dispatch(projectSlice.actions.getAllProjectsSuccess(data.project));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectsFailed(error.response?.data?.message || "Failed to fetch projects."));
    }
};

// Add New Project
export const addNewProject = (formData) => async (dispatch) => {
    dispatch(projectSlice.actions.addNewProjectsRequest());
    try {
        const response = await axios.post("http://localhost:4000/api/v1/project/add", formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        dispatch(projectSlice.actions.addNewProjectsSuccess(response.data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.addNewProjectsFailed(error.response?.data?.message || "Failed to add project."));
    }
};

// Delete Project
export const deleteProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectsRequest());
    try {
        const { data } = await axios.delete(`http://localhost:4000/api/v1/project/delete/${id}`, { withCredentials: true });
        dispatch(projectSlice.actions.deleteProjectsSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectsFailed(error.response?.data?.message || "Failed to delete project."));
    }
};



// Handle Update Project
export const updateProject = (id, newData) => async (dispatch) => {
    dispatch(projectSlice.actions.updateProjectsRequest());
    try {
        const { data } = await axios.put(`http://localhost:4000/api/v1/project/update/${id}`,newData, { withCredentials: true , headers:{"content-Type":"multipart"} });
        dispatch(projectSlice.actions.updateProjectsSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.updateProjectsFailed(error.response?.data?.message || "Failed to delete project."));
    }
};

// Clear All Errors
export const clearAllProjectSliceError = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
};

// Reset Project Slice
export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
