const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  base_experience: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  stats: {
    type: Array,
    required: false
  }
});

// eslint-disable-next-line no-undef
module.exports = User = mongoose.model("pokemon", PokemonSchema);
