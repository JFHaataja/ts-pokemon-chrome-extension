import React, { useState, useEffect, useRef } from "react";
import { fetchPokemonData } from "./lib/api";
import { getPokemonWeaknesses } from "./lib/logic";
import { getCachedData, setCachedData } from "./lib/cache";
import pokeball from "./assets/pokeball.svg";
import "./App.css";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [cardName, setCardName] = useState("");
  const [doubleWeaknesses, setDoubleWeaknesses] = useState<string[]>([]);
  const [quadrupleWeaknesses, setQuadrupleWeaknesses] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const activeSuggestionRef = useRef<HTMLLIElement | null>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const cachedNames = await getCachedData<string[]>("pokemonNames");
        if (cachedNames && Array.isArray(cachedNames)) {
          setAllPokemonNames(cachedNames);
          return;
        }

        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10000",
        );
        const data = await res.json();
        const names = data.results.map(
          (pokemon: { name: string }) => pokemon.name,
        );
        setAllPokemonNames(names);
        await setCachedData("pokemonNames", names);
      } catch (error) {
        console.error("Failed to fetch or cache Pokémon names", error);
      }
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (activeSuggestionRef.current) {
      activeSuggestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeSuggestionIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    } catch (e) {
      setError("Pokémon not found!");
      console.error(e);
      setPokemonId(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setName(input);
    if (input.length === 0) {
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
      return;
    }
    const filtered = allPokemonNames
      .filter((n) => n.startsWith(input.toLowerCase()))
      .slice(0, 5);
    setSuggestions(filtered);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        activeSuggestionIndex >= 0 &&
        activeSuggestionIndex < suggestions.length
      ) {
        const selected = suggestions[activeSuggestionIndex];
        setName(selected);
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  };

  return (
    <main className="page">
      <div className="hero_bg">
        <h1 className="h1">Pokémon Weakness Finder</h1>
        <img src={pokeball} height={40} alt="Pokeball" />

        <div role="search" className="search_container">
          <form onSubmit={handleSearch} autoComplete="off">
            <label className="input_label" htmlFor="inputSearch">
              Search for a Pokémon:
            </label>
            <div className="input_group" ref={inputWrapperRef}>
              <input
                id="inputSearch"
                className="input"
                type="text"
                placeholder="Enter Pokémon name"
                value={name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button className="button_primary" type="submit">
                Search
              </button>

              {suggestions.length > 0 && (
                <ul className="suggestion-list" role="listbox">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion}
                      ref={
                        index === activeSuggestionIndex
                          ? activeSuggestionRef
                          : null
                      }
                      className={`suggestion-item ${
                        index === activeSuggestionIndex ? "active" : ""
                      }`}
                      role="option"
                      onClick={() => {
                        setName(suggestion);
                        setSuggestions([]);
                        setActiveSuggestionIndex(-1);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
          {error && <p className="text_error">{error}</p>}
        </div>
      </div>

      {pokemonId && (
        <div className="result_card_container">
          <div className="card_weakness">
            <h2 className="h2">Id:</h2>
            <ul className="ul">
              <li className="li">#{pokemonId}</li>
            </ul>

            <h2 className="h2">Name:</h2>
            <ul className="ul">
              <li className="li li_name">{cardName}</li>
            </ul>

            {quadrupleWeaknesses.length > 0 && (
              <>
                <h2 className="h2">4x Weaknesses:</h2>
                <ul className="ul">
                  {quadrupleWeaknesses.map((weakness) => (
                    <li key={weakness} className="li">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {doubleWeaknesses.length > 0 && (
              <>
                <h2 className="h2">2x Weaknesses:</h2>
                <ul className="ul">
                  {doubleWeaknesses.map((weakness) => (
                    <li key={weakness} className="li">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="card_pokemon_image">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
              alt={`Pokemon ${pokemonId}`}
              width={150}
              height={150}
              className="pokemon_image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
