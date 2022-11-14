import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Country } from "../graphql/types";

interface CountryTableProps {
  countries: Country[];
}

export const CountryTable: React.FC<CountryTableProps> = ({ countries }) => {
  return (
    <DataGrid
      rows={countries}
      columns={COL_CONFIG}
      getRowId={(country: Country) => country.code}
      initialState={{
        columns: { columnVisibilityModel: { phone: false, continent: false } },
      }}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
};

const COL_CONFIG: GridColDef[] = [
  {
    field: "name",
    headerName: "Country name",
    minWidth: 200,
    flex: 1,
    valueGetter: ({ row: country }) => `${country.emoji} ${country.name}`,
    hideable: false,
  },
  { field: "currency", headerName: "Currency", minWidth: 80, flex: 1 },
  { field: "capital", headerName: "Capital", flex: 1 },
  { field: "native", headerName: "Native name", flex: 1 },
  { field: "phone", headerName: "Phone code", flex: 1 },
  {
    field: "continent",
    headerName: "Location",
    valueGetter: ({ row: country }) => country.continent.name,
    // Use singleSelect to make the filter nicer.
    type: "singleSelect",
    valueOptions: [
      "Africa",
      "Antarctica",
      "Asia",
      "Europe",
      "North America",
      "Oceania",
      "South America",
    ].map((country) => ({ value: country, label: country })),
    flex: 1,
  },
];
