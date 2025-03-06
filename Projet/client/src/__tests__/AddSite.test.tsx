import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddSite from "../features/chantiers/add/add-chantiers";

test("Le bouton 'Ajouter un Chantier' ouvre la modal", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <AddSite />
    </QueryClientProvider>
  );

  const addButton = screen.getByText("Ajouter un Chantier");
  expect(addButton).toBeInTheDocument();

  fireEvent.click(addButton);

  expect(await screen.findByText("Nouveau chantier")).toBeInTheDocument();
  expect(screen.getByLabelText("Nom du chantier")).toBeInTheDocument();
  expect(screen.getByLabelText("Adresse")).toBeInTheDocument();
});
