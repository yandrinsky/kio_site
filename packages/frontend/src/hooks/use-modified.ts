import { useCallback, useState } from 'react';

type TUseModified = [boolean, React.Dispatch<React.SetStateAction<boolean>>, { onFocus: () => void }];

/**
 * @description Hook to track if a form has been modified
 * @example
 * const [isModified, setModified, { onFocus }] = useModified();
 * <input type="text" onFocus={onFocus} />
 */
export function useModified(defaultState: boolean = true): TUseModified {
  const [isModified, setModified] = useState(defaultState);

  const onFocus = useCallback(() => {
    setModified(true);
  }, []);

  return [isModified, setModified, { onFocus }];
}
