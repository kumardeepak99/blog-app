import userReducer, { initialUserState, createUser, deleteUser } from "@/app/store/features/userSlice";
import { mockUserData } from "../../__fixtures__/store";

describe("user slice", () => {
  it("should return the initial user state on first run", () => {
    const result = userReducer(undefined, { type: "" });
    expect(result).toEqual(initialUserState);
  });

  it("should handle createUser and set the user data", () => {
    const userData = mockUserData;
    const nextState = userReducer(initialUserState, createUser(userData));
    expect(nextState).toEqual(userData);
  });

  it("should handle deleteUser and reset to initial state", () => {
    const nextState = userReducer(mockUserData, deleteUser());
    expect(nextState).toEqual(initialUserState);
  });
});
