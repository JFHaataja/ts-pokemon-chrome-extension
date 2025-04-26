import { useState } from "react";
import { fetchPokemonData } from "./lib/api";
import { getPokemonWeaknesses } from "./lib/logic";
import pokeball from "./assets/pokeball.svg";
import "./assets/placeholder.svg";
import "./App.css";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [cardName, setCardName] = useState("");
  const [doubleWeaknesses, setDoubleWeaknesses] = useState<string[]>([]);
  const [quadrupleWeaknesses, setQuadrupleWeaknesses] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      const data = await fetchPokemonData(name);
      setCardName(name);
      const types = data.types.map(
        (t: { type: { name: string } }) => t.type.name,
      );
      const { doubleWeaknesses, quadrupleWeaknesses } =
        await getPokemonWeaknesses(types);
      setDoubleWeaknesses(doubleWeaknesses);
      setQuadrupleWeaknesses(quadrupleWeaknesses);
      setPokemonId(data.id);
    } catch (e) {
      setError("Pokémon not found!");
      console.error(e);
      setPokemonId(null);
    }
  };

  return (
    <div className="page">
      <div className="hero_bg">
        <h1 className={"h1"}>Pokémon Weakness Finder</h1>
        <img src={pokeball} height={40} alt="Pokeball" />

        <div role="search">
          <form onSubmit={handleSearch}>
            <label className={"input_label"} htmlFor="inputSearch">
              Search for a Pokémon:
            </label>
            <div className={"input_group"}>
              <input
                id="inputSearch"
                className={"input"}
                type="text"
                placeholder="Enter Pokémon name"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
              />
              <button className={"button_primary"} type="submit">
                Search
              </button>
            </div>
          </form>
          {error && <p className={"text_error"}>{error}</p>}
        </div>
      </div>

      {pokemonId && (
        <div className={"result_card_container"}>
          <div className={"card_weakness"}>
            <h2 className={"h2"}>Id:</h2>
            <ul className={"ul"}>
              <li className={"li"}>#{pokemonId}</li>
            </ul>

            <h2 className={"h2"}>Name:</h2>
            <ul className={"ul"}>
              <li className={"li"}>{cardName}</li>
            </ul>

            {quadrupleWeaknesses.length > 0 && (
              <>
                <h2 className={"h2"}>4x Weaknesses:</h2>
                <ul className={"ul"}>
                  {quadrupleWeaknesses.map((weakness) => (
                    <li key={weakness} className={"li"}>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {doubleWeaknesses.length > 0 && (
              <>
                <h2 className={"h2"}>2x Weaknesses:</h2>
                <ul className={"ul"}>
                  {doubleWeaknesses.map((weakness) => (
                    <li key={weakness} className={"li"}>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Pokemonin kuva */}
          <div className={"card_pokemon_image"}>
            {pokemonId && (
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                alt={`Pokemon ${pokemonId}`}
                width={150}
                height={150}
                className={"pokemon_image"}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
