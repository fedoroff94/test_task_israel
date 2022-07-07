export interface GetCounriesRequest {
    search?: string;
  }
  
  export interface GetCounriesResponse {
    searchResults: ICountry[];
    searchResultCount: number;
    totalResultCounter: number;
  }
  
  export interface ICountry {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    currencies: ICurrency[];
    languages: ILanguage[];
    flag: string;
  }
  
  interface ILanguage {
    code: string;
    name: string;
    nativeName: string;
  }
  
  interface ICurrency {
    code?: string | null;
    name?: string | null;
    symbol?: string | null;
  }
  