import axios from "axios";
import { POKEMON_CAUGHT, POKEMON_NOT_FOUND } from "./types";
import { setAlert } from "./alert";

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
    dispatch(setAlert("Wrong pokemon name", "danger"))
    dispatch({
      type: POKEMON_NOT_FOUND
    })
  }
};