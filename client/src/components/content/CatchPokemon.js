import React, { useState } from 'react';
import { connect } from "react-redux";
import { showPokemon } from "../../actions/auth";
import PropTypes from "prop-types";

const CatchPokemon = ({ showPokemon, pokemon = null }) => {
  const [name, setName] = useState("");

  const onChange = event => setName(event.target.value)
  const onSubmit = async event => {
    event.preventDefault();
    showPokemon(name)
  }

  const loadedPokemon =
    (
      <p>
        <h2>Caught pokemon</h2>
        <h3>
          Name: {pokemon ? pokemon.name : ""}
        </h3>
        Weight: {pokemon ? pokemon.weight : ""} kg
      </p>
    )

  return (
    <>
      <h1 className="large text-primary">Pokedex</h1>
      <form className="form" onSubmit={event => onSubmit(event)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={event => onChange(event)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Catch pokemon!"/>
      </form>
      <p>{pokemon !== null ? loadedPokemon : ""}</p>

    </>
  );
}
CatchPokemon.propTypes = {
  showPokemon: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  pokemon: state.pokemons.pokemon
})

export default connect(mapStateToProps, { showPokemon })(CatchPokemon);
