import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { GET_COUNTRIES } from "./graphql/queries";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

describe("App", () => {
  it("renders the title", () => {
    renderApp();

    expect(screen.getByText(/Explore Countries/i)).toBeInTheDocument();
  });

  it("shows data attribution", () => {
    renderApp();

    expect(screen.getByText(/Data courtesy of the/i)).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/trevorblades/countries"
    );
    expect(link).toHaveTextContent("GraphQL Countries API");
  });

  it("handles loading state", () => {
    renderApp([asyncMock]);

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  it("displays an error message", async () => {
    renderApp([errorMock]);

    await screen.findByText(errorMock.error.message);
  });

  const renderApp = (mocks: MockedResponse[] = [emptyListMock]) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
});

const emptyListMock = {
  request: {
    query: GET_COUNTRIES,
  },
  result: {
    data: {
      countries: [],
    },
  },
};

const asyncMock = {
  request: {
    query: GET_COUNTRIES,
  },
  result: () => ({
    data: {
      countries: [],
    },
  }),
};

const errorMock = {
  request: {
    query: GET_COUNTRIES,
  },
  error: {
    name: "Test Error",
    message: "Something went wrong",
  },
};
