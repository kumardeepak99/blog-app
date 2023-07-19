import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { persistor, store, RootState, AppDispatch } from "../../../../app/store";
import { initialUserState } from "@/app/store/features/userSlice";

const IgnoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

describe("Redux Store Configuration", () => {
  beforeEach(() => {
    persistor.purge();
  });

  it("should reset the store when purged", async () => {
    persistor.purge();
    const purgedState: RootState = store.getState();
    expect(purgedState.user.id).toEqual(initialUserState.id);
    expect(purgedState.user.name).toEqual(initialUserState.name);
    expect(purgedState.user.email).toEqual(initialUserState.email);
  });

  it("should persist the user reducer", () => {
    const state: RootState = store.getState();
    expect(state.user).toBeDefined();
  });

  it("should persist and rehydrate the store", () => {
    persistor.persist();
    const rehydratedState: RootState = store.getState();
    expect(rehydratedState.user).toBeDefined();
  });

  it("should ignore specific actions during serialization", () => {
    const dispatch: AppDispatch = store.dispatch;
    dispatch({ type: IgnoredActions });
    const serializedState = persistor.getState();
    expect(serializedState).not.toHaveProperty(IgnoredActions);
  });
});
