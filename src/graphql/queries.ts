import { gql } from "@apollo/client";
import { Country } from "./types";

export const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      code
      name
      emoji
      currency
      continent {
        name
      }
      phone
      native
      capital
    }
  }
`;

export type GET_COUNTRIES_DATA = { countries: Country[] };
