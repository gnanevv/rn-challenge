import { store } from "../../redux/store";

describe("Redux store", () => {
  it("should have the correct initial state", () => {
    const state = store.getState();
    expect(state).toHaveProperty("markers");
    expect(state).toHaveProperty("settings");
    expect(state).toHaveProperty("filters");
  });
});
