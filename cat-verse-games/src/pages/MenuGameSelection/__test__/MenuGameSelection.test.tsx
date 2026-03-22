import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MenuGameSelection from "../index";
import { useGameDiscovery } from "@hooks/useGameDiscovery";
import { useAudio } from "@context/AudioContext";
import { ThemeProvider } from "@context/ThemeContext";

jest.mock("@hooks/useGameDiscovery");
jest.mock("@context/AudioContext");

const mockFetchGames = jest.fn();
const mockPlayClickSound = jest.fn();
const mockPlaySliderSound = jest.fn();

const renderComponent = () =>
  render(
    <ThemeProvider>
      <BrowserRouter>
        <MenuGameSelection />
      </BrowserRouter>
    </ThemeProvider>,
  );

describe("MenuGameSelection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGameDiscovery as jest.Mock).mockReturnValue({
      fetchGames: mockFetchGames,
      loading: false,
      error: null,
    });

    (useAudio as jest.Mock).mockReturnValue({
      playClickSound: mockPlayClickSound,
      playSliderSound: mockPlaySliderSound,
    });
  });

  it("Should render the component with the initial genres and the quantity in the badge", () => {
    renderComponent();

    expect(screen.getByText("Escolha os gêneros")).toBeInTheDocument();
    expect(screen.getByText("1 gênero(s) selecionado(s)")).toBeInTheDocument();
  });

  it("Should toggle the genre selection when clicking a button", () => {
    renderComponent();
    const actionButton = screen.getByRole("button", { name: /ação/i });

    fireEvent.click(actionButton);

    expect(mockPlayClickSound).toHaveBeenCalled();
  });

  it("Should clear the selection when clicking the Clear button", () => {
    renderComponent();

    const clearButton = screen.getByText("Limpar seleção");
    fireEvent.click(clearButton);

    expect(mockPlayClickSound).toHaveBeenCalled();
    expect(screen.getByText("0 gênero(s) selecionado(s)")).toBeInTheDocument();
  });

  it("Should open the alert modal if trying to search without selected genres", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Limpar seleção"));

    const searchButton = screen.getByText("Explorar jogos");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Por favor, escolha pelo menos um gênero para nossa busca!",
        ),
      ).toBeInTheDocument();
    });
  });

  it("Should call fetchGames with the correct parameters when clicking on Explore", async () => {
    mockFetchGames.mockResolvedValueOnce([
      { id: 1, title: "Game 1", genre: "sports", platform: "pc" },
    ]);

    renderComponent();

    const searchButton = screen.getByText("Explorar jogos");
    fireEvent.click(searchButton);

    expect(mockPlayClickSound).toHaveBeenCalled();

    await waitFor(() => {
      expect(mockFetchGames).toHaveBeenCalledWith(["sports"], "pc");
    });
  });
});
