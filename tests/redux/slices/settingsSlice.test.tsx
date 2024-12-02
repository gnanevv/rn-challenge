import settingsReducer, {
  setPinStyle,
  initialState,
} from "../../../redux/slices/settingsSlice";

describe("settings reducer", () => {
  it("should handle initial state", () => {
    expect(settingsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setPinStyle", () => {
    const actual = settingsReducer(initialState, setPinStyle("custom1"));
    expect(actual.pinStyle).toEqual("custom1");
  });
});
