import axios from "axios";
import { AUTH_ERROR, CLEAR_PROFILE, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, POKEMON_CAUGHT, POKEMON_NOT_FOUND, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register USer
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': "application/json"
    }
  }

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': "application/json"
    }
  }

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });

}

// showPokemon
export const showPokemon = (name) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': "application/json"
    }
  }

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post("/api/pokemons/catch", body, config)

    dispatch({
      type: POKEMON_CAUGHT,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }
    dispatch({
      type: POKEMON_NOT_FOUND
    })
  }
};