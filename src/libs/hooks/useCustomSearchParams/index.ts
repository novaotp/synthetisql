
"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

/** A custom implementation of {@link useSearchParams} that also includes setting and removing a search parameter. */
export const useCustomSearchParams = () => {
  const searchParams = useSearchParams();
  
  const set = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    return params.toString();
  }, [searchParams]);

  const remove = useCallback((name: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);

    return params.toString();
  }, [searchParams]);

  return {
    /** The search params from `useSearchParams`. */
    searchParams,
    /**
     * Sets a new search parameter.
     * @param name The name of the search parameter
     * @param value The value of the search parameter
     * @returns The full search parameter string
     */
    set,
    /**
     * Removes an existing search parameter.
     * @param name The name of the search parameter to remove
     * @returns The full search parameter string
     */
    remove
  };
}
