import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Local storage with Search Params 💪
export function useSearchParamsWithLocal(initialValue = {}, localStorageKey) {
  function setInitialValue() {
    const fromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));

    return fromLocalStorage || initialValue;
  }

  const [searchParams, setSearchParams] = useSearchParams(setInitialValue());
  // console.log(Array.from(searchParams.entries()));

  useEffect(() => {
    const newObject = Array.from(searchParams.entries()).reduce(
      (accum, current) => {
        return { ...accum, [current[0]]: current[1] };
      },
      {}
    );

    localStorage.setItem(localStorageKey, JSON.stringify(newObject));
  }, [localStorageKey, searchParams]);

  return [searchParams, setSearchParams];
}

// Local storage
export function useLocalStorage(initialValue, localStorageKey) {
  function setInitialValue() {
    const fromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));

    return fromLocalStorage || initialValue;
  }

  const [value, setValue] = useState(setInitialValue());

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);

  return [value, setValue];
}
