import { useMarkers } from "../../hooks/useMarkers";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarkers } from "../../redux/slices/markersSlice";
import { renderHook } from "@testing-library/react-native";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../redux/slices/markersSlice", () => ({
  fetchMarkers: jest.fn(),
}));

describe("useMarkers", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch); // Fixed reassignment issue
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        markers: { markers: [], status: "idle", error: null },
      })
    );
  });

  it("fetches markers when status is idle", () => {
    renderHook(() => useMarkers());
    expect(mockDispatch).toHaveBeenCalledWith(fetchMarkers());
  });

  it("returns markers, status, and error from state", () => {
    const { result } = renderHook(() => useMarkers());
    expect(result.current).toEqual({
      markers: [],
      status: "idle",
      error: null,
    });
  });
});
