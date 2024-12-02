import { act, renderHook } from "@testing-library/react-native";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import NetInfo from "@react-native-community/netinfo";

jest.mock("@react-native-community/netinfo", () => ({
  addEventListener: jest.fn(),
}));

describe("useNetworkStatus", () => {
  it("returns initial offline status", () => {
    (NetInfo.addEventListener as jest.Mock).mockImplementation((callback) => {
      callback({ isConnected: false });
      return () => {};
    });

    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current).toBe(true);
  });

  it("updates offline status when network changes", () => {
    let listener: (state: { isConnected: boolean }) => void;
    (NetInfo.addEventListener as jest.Mock).mockImplementation((callback) => {
      listener = callback;
      return () => {};
    });

    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      listener({ isConnected: true });
    });

    expect(result.current).toBe(false);
  });
});
