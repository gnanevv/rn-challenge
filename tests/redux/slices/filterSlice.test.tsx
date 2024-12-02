import filterReducer, {
  setConnectorTypes,
  setConnectorStatuses,
} from "../../../redux/slices/filterSlice";

describe("filterSlice", () => {
  const initialState = {
    connectorTypes: [],
    connectorStatuses: [],
  };

  it("should handle initial state", () => {
    expect(filterReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setConnectorTypes", () => {
    const newConnectorTypes = ["J1772", "Type2"];
    const action = setConnectorTypes(newConnectorTypes);
    const state = filterReducer(initialState, action);
    expect(state.connectorTypes).toEqual(newConnectorTypes);
  });

  it("should handle setConnectorStatuses", () => {
    const newConnectorStatuses = ["available", "unavailable"];
    const action = setConnectorStatuses(newConnectorStatuses);
    const state = filterReducer(initialState, action);
    expect(state.connectorStatuses).toEqual(newConnectorStatuses);
  });
});
