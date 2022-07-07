import { ICountry } from "../DataApi/country.interface";
import { IPeople } from "../DataApi/people.interface";
import { AnyAction, Dispatch } from "redux";
import { getCountries, getPeople } from "DataApi";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

const SET_COUNTRIES = "SET_COUNTRIES";
const SET_PEOPLE = "SET_PEOPLE";

const initialState = {
  countries: [],
  people: [],
  searchResultCount: 0,
  totalResultCounter: 0,
};

type IPeopleData = IPeople & { age: string; countryFullName: string };

interface IState {
  countries: ICountry[];
  people: IPeopleData[];
  searchResultCount: number;
  totalResultCounter: number;
}

export const searchReducer = (
  state: IState = initialState,
  action: ActionsType
): IState => {
  switch (action.type) {
    case SET_COUNTRIES:
      return { ...state, countries: action.payload };
    case SET_PEOPLE:
      return {
        ...state,
        people: action.payload.peopleData,
        searchResultCount: action.payload.searchResultCount,
        totalResultCounter: action.payload.totalResultCounter,
      };
    default:
      return state;
  }
};

const setCountriesActionCreator = (payload) => ({
  type: SET_COUNTRIES,
  payload,
});

const setPeopleActionCreator = (payload) => ({
  type: SET_PEOPLE,
  payload,
});

export const getCountriesThunk = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const response = await getCountries({ search: "" });
    const countries = response.searchResults;
    dispatch(setCountriesActionCreator(countries));
  };
};

export const getPeopleThunk = (value) => {
  return async (dispatch: Dispatch, getState) => {
    const { searchResults, searchResultCount, totalResultCounter } =
      await getPeople({ search: value });

    const people = searchResults;
    const countries = getState().searchReducer.countries;

    let peopleData = people.map((user) => {
      let personCountryName = user.country;
      let personBday = user.date_of_birth;

      let birthDate = new Date(personBday).getTime();
      let presentDate = new Date().getTime();
      let difference = presentDate - birthDate;
      let age = Math.floor(difference / 31622400000);

      let sameCountry = countries.find((country) => {
        return country.alpha2Code === personCountryName;
      });

      let countryFullName = sameCountry ? sameCountry.name : "";

      return { ...user, countryFullName, age };
    });
    dispatch(setPeopleActionCreator({ peopleData, searchResultCount, totalResultCounter }));
  };
};

export type setCountriesActionType = ReturnType<typeof setCountriesActionCreator>;
export type setPeopleActionType = ReturnType<typeof setPeopleActionCreator>;
type ActionsType = setCountriesActionType | setPeopleActionType;
