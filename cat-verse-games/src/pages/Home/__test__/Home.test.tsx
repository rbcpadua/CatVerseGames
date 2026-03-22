import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAudio } from "@context/AudioContext";
import { ThemeProvider } from "@context/ThemeContext";
import { Home } from "..";

jest.mock("@context/AudioContext");

const mockPlayClickSound = jest.fn();

const renderComponent = () =>
  render(
    <ThemeProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </ThemeProvider>,
  );

describe("Home Page Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAudio as jest.Mock).mockReturnValue({
      playClickSound: mockPlayClickSound,
    });
  });

  it("Should render the principal Home's text", () => {
    renderComponent();

    expect(
      screen.getByText(/Explore nossa biblioteca filtrando por sua/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Desenvolvido por Rebeca Sato/i),
    ).toBeInTheDocument();
  });

  it("Should render the 'Começar Agora' button with the correct link", () => {
    renderComponent();

    const startButton = screen.getByRole("link", { name: /começar agora/i });

    expect(startButton).toBeInTheDocument();
    expect(startButton).toHaveAttribute("href", "/selection");
  });

  it("Should play the click sound when clicking the start button", () => {
    renderComponent();

    const startButton = screen.getByRole("link", { name: /começar agora/i });
    fireEvent.click(startButton);

    expect(mockPlayClickSound).toHaveBeenCalledTimes(1);
  });
});
