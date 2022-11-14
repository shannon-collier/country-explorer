interface Continent {
  name: string;
}

export interface Country {
  code: string;
  name: string;
  emoji: string;
  currency: string;
  continent: Continent;
  phone: string;
  native: string;
  capital: string;
}
