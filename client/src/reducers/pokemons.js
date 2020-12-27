import { POKEMON_CAUGHT, POKEMON_NOT_FOUND } from "../actions/types";

const initialState = {
  pokemon: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POKEMON_CAUGHT:
      return {
        ...state,
        pokemon: payload.pokemon
      };
    case POKEMON_NOT_FOUND:
      return {
        ...state,
        pokemon: null
      };
    default:
      return state;
  }
}