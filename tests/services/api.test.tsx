import { fetchMarkersFromAPI } from "../../services/api";

describe("API", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: "Test Marker" }]),
      })
    ) as jest.Mock;
  });

  it("fetchMarkersFromAPI should return markers", async () => {
    const markers = await fetchMarkersFromAPI();
    expect(markers).toEqual([{ id: 1, name: "Test Marker" }]);
  });

  it("fetchMarkersFromAPI should throw an error when the network response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    await expect(fetchMarkersFromAPI()).rejects.toThrow(
      "Network response was not ok"
    );
  });

  it("fetchMarkersFromAPI should throw an error when the API is down", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("API is down"))
    ) as jest.Mock;

    await expect(fetchMarkersFromAPI()).rejects.toThrow("API is down");
  });
});
