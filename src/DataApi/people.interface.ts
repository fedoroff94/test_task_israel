export interface GetPeopleRequest {
    search?: string;
  }
  
  export interface GetPeopleResponse {
    searchResults: IPeople[];
    searchResultCount: number;
    totalResultCounter: number;
  }
  
  export interface IPeople {
    id: string;
    first_name: string;
    last_name: string;
    city: string;
    country: string;
    date_of_birth: string;
  }
  