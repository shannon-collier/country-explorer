import { render, screen } from "@testing-library/react";
import { CountryTable } from "./CountriesTable";
import { Country } from "../graphql/types";

// These are largely smoke tests. All important logic is encapsulated in
// MUI's DataGrid component.
describe("CountriesTable", () => {
  it("shows correct column headers by default", () => {
    render(<CountryTable countries={[]} />);

    const defaultColNames = [
      "Country name",
      "Currency",
      "Native name",
      "Capital",
    ];

    defaultColNames.forEach((name) => screen.getByText(name));

    const defaultHiddenCols = ["Location", "Phone code"];
    defaultHiddenCols.forEach((name) =>
      expect(screen.queryByText(name)).toBeNull()
    );
  });

  it("shows data passed in", () => {
    const brazil: Country = {
      code: "BR",
      name: "Brazil",
      native: "Brasil",
      phone: "55",
      continent: {
        name: "South America",
      },
      capital: "Brasilia",
      currency: "BRL",
      emoji: "🇧🇷",
    };

    render(<CountryTable countries={[brazil]} />);

    // use findBy to ensure it's loaded
    screen.findByText(brazil.name);

    screen.getByText(brazil.native);
    screen.getByText(brazil.capital);
    screen.getByText(brazil.currency);
  });
});
