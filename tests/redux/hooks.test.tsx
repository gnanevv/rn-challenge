import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Redux hooks", () => {
  it("useAppDispatch should return useDispatch", () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const dispatch = useAppDispatch();
    expect(dispatch).toBe(mockDispatch);
  });

  it("useAppSelector should return useSelector", () => {
    const mockState = { markers: {}, settings: {}, filters: {} };
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState)
    );
    const result = useAppSelector((state) => state);
    expect(result).toEqual(mockState);
  });
});
