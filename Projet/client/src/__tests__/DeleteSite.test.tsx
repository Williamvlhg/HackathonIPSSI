import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeleteSite from "@/features/chantiers/delete-chantier";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock;

describe("Suppression d'un chantier", () => {
  const queryClient = new QueryClient();

  test("Vérifie que le bouton Supprimer déclenche la suppression", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteSite siteId={1} />
      </QueryClientProvider>
    );

    const deleteButton = screen.getByRole("button", { name: /supprimer/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
