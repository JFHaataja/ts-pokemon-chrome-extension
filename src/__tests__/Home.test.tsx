import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { vi } from "vitest";
import * as api from "../lib/api";
import * as logic from "../lib/logic";
import "@testing-library/jest-dom";

vi.mock("../lib/api");
vi.mock("../lib/logic");

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the initial UI correctly", () => {
    render(<App />);
    expect(screen.getByText("Pokémon Weakness Finder")).toBeInTheDocument();
    expect(screen.getByLabelText(/search for a pokémon/i)).toBeInTheDocument();
  });

  it("displays weaknesses after searching", async () => {
    const mockData = {
      id: 25,
      types: [{ type: { name: "electric" } }],
    };
    vi.mocked(api.fetchPokemonData).mockResolvedValue(mockData);
    vi.mocked(logic.getPokemonWeaknesses).mockResolvedValue(["ground"]);

    render(<App />);

    const input = screen.getByPlaceholderText(/enter pokémon name/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "pikachu" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("#25")).toBeInTheDocument();
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.getByText("ground")).toBeInTheDocument();
    });
  });

  it("shows an error message if the Pokémon is not found", async () => {
    vi.mocked(api.fetchPokemonData).mockRejectedValue(new Error("Not found"));

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/enter pokémon name/i), {
      target: { value: "unknownpoke" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/pokémon not found!/i)).toBeInTheDocument();
    });
  });
});
