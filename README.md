# use-redux-store-without-provider

A hook to get rid of redux provider built on top of [useSyncExternalStore](https://www.npmjs.com/package/use-sync-external-store)

## Usage

```bash
yarn add use-redux-store-without-provider
```

```typescript
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useStore } from "use-sync-external-store/with-selector";

const store = configureStore({
  reducer: { /*...*/ },
  // must add listner middleware in your store othwersise it won't work
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(createListenerMiddleware().middleware),
});

function YourComponent() {
  const [selected, dispatch] = useStore(store, your_selector);

  return ( /*...*/ );
}
```
