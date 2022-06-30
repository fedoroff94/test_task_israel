# React Interview Task

Write a app that use the data api and shows a list of people filtered by the search input with the data below.
People result will be filtered by name or country.

**User must insert at least 3 characters to search and the trigger is the input change**

Search result should contains:

- Full name
- Age
- Country Full Name

## Api Usage

```typescript
import { getCountries, getPeople } from "./DataApi";

const searchCountries = async (search?: string) => {
  const result = await getCountries({ search });
  console.log(result);
};

const searchPeople = async (search?: string) => {
  const result = await getPeople({ search });
  console.log(result);
};

searchCountries(); // Print all countries
searchCountries("ISR"); // Print selected countries
searchPeople(); // Print all people
searchPeople("David"); // Print selected people
```
