import {
  configureStore,
  addListener,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

const dumpStore = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(createListenerMiddleware().middleware),
});

function useStore<TStore extends typeof dumpStore>(
  store: TStore
): [ReturnType<TStore["getState"]>, TStore["dispatch"]];
function useStore<TStore extends typeof dumpStore, TSelector>(
  store: TStore,
  selector?: (state: ReturnType<TStore["getState"]>) => TSelector
): [TSelector, TStore["dispatch"]];
function useStore<TStore extends typeof dumpStore, TSelector>(
  store: TStore,
  selector?: (state: ReturnType<TStore["getState"]>) => TSelector
) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const unscribe = store.dispatch(
        addListener({
          predicate(action, currentState, previousState) {
            return currentState !== previousState;
          },
          effect(action, listenerApi) {
            callback();
          },
        })
      );
      return unscribe;
    },
    [store]
  );
  const state = useSyncExternalStoreWithSelector(
    subscribe,
    useCallback(() => store.getState(), [store]), // memo
    undefined,
    useCallback(
      (state: ReturnType<TStore["getState"]>) =>
        selector ? selector(state) : state,
      [selector]
    )
  );
  return [state, store.dispatch];
}

export { useStore };
