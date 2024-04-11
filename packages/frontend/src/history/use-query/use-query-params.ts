import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { IDeleteQuery, ISetQuery, IUseQuery } from './use-query.types';

export const useQueryParams: IUseQuery = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const query = useMemo(
    () =>
      Object.fromEntries(
        Array.from(new URLSearchParams(search)).map(([key, value]) => {
          try {
            return [key, JSON.parse(value)];
          } catch (e) {
            /* empty */
          }

          return [key, value];
        })
      ),
    [search]
  );

  const setQuery = useCallback<ISetQuery>(
    queryParams => {
      const searchParams = new URLSearchParams();

      let newQuery: Record<string, string>;

      if (typeof queryParams === 'function') {
        newQuery = Object.fromEntries(
          Object.entries(queryParams(query)).map(([key, value]) => [key, String(value)])
        );
      } else {
        newQuery = Object.fromEntries(
          Object.entries(queryParams).map(([key, value]) => [key, String(value)])
        );
      }

      Object.keys(newQuery).forEach(key => {
        searchParams.set(key, newQuery[key]);
      });

      navigate({ search: searchParams.toString() });
    },
    [search]
  );

  const deleteQuery: IDeleteQuery = keys => {
    const keysToDelete = Array.isArray(keys) ? keys : [keys];

    const searchParams = new URLSearchParams();

    for (const key in query) {
      searchParams.set(key, query[key]);
    }

    keysToDelete.forEach(key => {
      searchParams.delete(key);
    });

    navigate({ search: searchParams.toString() });
  };

  return [query, setQuery, deleteQuery];
};
