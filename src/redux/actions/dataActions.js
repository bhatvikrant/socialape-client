import {
	SET_SCREAMS,
	LOADING_DATA,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	DELETE_SCREAM,
	LOADING_UI,
	SET_ERRORS,
	POST_SCREAM,
	CLEAR_ERRORS,
	SET_SCREAM,
	STOP_LOADING_UI,
} from "../types";

import axios from "axios";

// GET all screams
export const getScreams = () => dispatch => {
	dispatch({ type: LOADING_DATA });

	axios
		.get("/screams")
		.then(res => {
			dispatch({
				type: SET_SCREAMS,
				payload: res.data,
			});
		})
		.catch(err => {
			dispatch({
				type: SET_SCREAMS,
				payload: [],
			});
		});
};

// GET a scream
export const getScream = screamId => dispatch => {
	dispatch({ type: LOADING_UI });

	axios
		.get(`/scream/${screamId}`)
		.then(res => {
			dispatch({
				type: SET_SCREAM,
				payload: res.data,
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch(err => {
			console.log(err);
		});
};

// POST a scream
export const postScream = newScream => dispatch => {
	dispatch({ type: LOADING_UI });

	axios
		.post("/scream", newScream)
		.then(res => {
			dispatch({
				type: POST_SCREAM,
				payload: res.data,
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		});
};

// LIKE a scream
export const likeScream = screamId => dispatch => {
	axios
		.get(`/scream/${screamId}/like`)
		.then(res => {
			dispatch({
				type: LIKE_SCREAM,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

// UNLIKE a scream
export const unlikeScream = screamId => dispatch => {
	axios
		.get(`/scream/${screamId}/unlike`)
		.then(res => {
			dispatch({
				type: UNLIKE_SCREAM,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

// DELETE a scream
export const deleteScream = screamId => dispatch => {
	axios
		.delete(`/scream/${screamId}`)
		.then(res => {
			dispatch({
				type: DELETE_SCREAM,
				payload: screamId,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

// Clear Errors
export const clearErrors = () => dispatch => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
