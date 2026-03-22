import { render, screen, fireEvent } from "@testing-library/react";
import { GamesModalResult } from "..";
import type { Game } from "@strategies/types/selectorGameTypes";

const mockGames: Game[] = [
  { id: 1, title: "Game 1", game_url: "https://test.com/1" } as Game,
  { id: 2, title: "Game 2", game_url: "https://test.com/2" } as Game,
  { id: 3, title: "Game 3", game_url: "https://test.com/3" } as Game,
  { id: 4, title: "Game 4", game_url: "https://test.com/4" } as Game,
];
describe("GamesModalResult Component", () => {
  const mockClose = jest.fn();

  it("should not render anything if the modal is closed", () => {
    const { container } = render(
      <GamesModalResult games={mockGames} isOpen={false} onClose={mockClose} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("should slice the games correctly (limit of 3 per page)", () => {
    render(
      <GamesModalResult games={mockGames} isOpen={true} onClose={mockClose} />,
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("should call the onClose function when the X button is clicked", () => {
    render(
      <GamesModalResult games={mockGames} isOpen={true} onClose={mockClose} />,
    );

    const closeBtn = screen.getByLabelText("Fechar");
    fireEvent.click(closeBtn);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
