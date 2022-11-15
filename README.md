# use-redux-store-without-provider

A hook to get rid of redux provider built on top of [useSyncExternalStore](https://www.npmjs.com/package/use-sync-external-store)

## Usage

```bash
yarn add use-redux-store-without-provider
```

```typescript
import { useStore } from "use-sync-external-store/with-selector";

const [selected, dispatch] = useStore(your_store, your_selector);
```
