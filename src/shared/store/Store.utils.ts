import { StoreState } from './Store.types';

export const setState = (state: StoreState, path: string, value: unknown): StoreState => {
  return { ...state, [path]: value } as StoreState;
};

export enum StoreEvents {
  Updated = 'updated'
}

export const isNeedUpdate = (oldState: StoreState, newState: StoreState): boolean => {
  return (Object.keys({ ...oldState, ...newState }) as (keyof StoreState)[]).some(
    (key) => oldState[key] !== newState[key]
  );
};
