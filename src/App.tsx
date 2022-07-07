import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesThunk, getPeopleThunk } from "store/searchReducer";
import { useAppSelector } from "./store/index";

const App: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const countries = useAppSelector((state) => state.searchReducer.countries);
  const people = useAppSelector((state) => state.searchReducer.people);
  const searchResultCount = useAppSelector((state) => state.searchReducer.searchResultCount);
  const totalResultCounter = useAppSelector((state) => state.searchReducer.totalResultCounter);

  useEffect(() => {
    if (!countries.length) {
      dispatch(getCountriesThunk());
    }
    const debounce = setTimeout(() => {
      dispatch(getPeopleThunk(inputValue));
    }, 2000);

    return () => {
      clearTimeout(debounce);
    };
  }, [inputValue, dispatch]);

  return (
    <div className="pageWrapper">
      <p>Search Component</p>
      <input
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.currentTarget.value)
        }
      />
      <p>List Component</p>
      <div className="listWrapper">
        <div>
          {people.map(({ first_name, last_name, age, countryFullName, id }) => (
            <div
              key={id}
              style={{
                border: "1px solid grey",
                margin: "5px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p>Full name: {first_name + " " + last_name}</p>
              <p>Age: {age}</p>
              <p>Country Full Name: {countryFullName}</p>
            </div>
          ))}
        </div>
      </div>
      <p>Found results: {searchResultCount}</p>
      <p>Total results: {totalResultCounter}</p>
    </div>
  );
};

export default App;
