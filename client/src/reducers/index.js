import { combineReducers } from "redux";
import alert from "./alert"
import auth from "./auth"
import pokemons from "./pokemons";

export default combineReducers({
  alert,
  auth,
  pokemons
});