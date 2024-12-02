import markersReducer, {
  fetchMarkers,
} from "../../../redux/slices/markersSlice";

jest.mock("../../../services/api");

describe("markersSlice", () => {
  const initialState: {
    markers: any[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  } = {
    markers: [],
    status: "idle",
    error: null,
  };

  it("should handle initial state", () => {
    expect(markersReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle fetchMarkers.pending", () => {
    const action = { type: fetchMarkers.pending.type };
    const state = markersReducer(initialState, action);
    expect(state.status).toEqual("loading");
  });

  it("should handle fetchMarkers.fulfilled", () => {
    const mockMarkers = [{ id: "1", title: "Test Marker" }];
    const action = { type: fetchMarkers.fulfilled.type, payload: mockMarkers };
    const state = markersReducer(initialState, action);
    expect(state.status).toEqual("succeeded");
    expect(state.markers).toEqual(mockMarkers);
  });

  it("should handle fetchMarkers.rejected", () => {
    const action = {
      type: fetchMarkers.rejected.type,
      error: { message: "Error" },
    };
    const state = markersReducer(initialState, action);
    expect(state.status).toEqual("failed");
    expect(state.error).toEqual("Error");
  });
});
