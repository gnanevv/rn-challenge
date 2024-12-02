import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarkers } from "../redux/slices/markersSlice";
import { RootState } from "../redux/store";

export const useMarkers = () => {
  const dispatch = useDispatch();
  const { markers, status, error } = useSelector(
    (state: RootState) => state.markers
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMarkers() as any);
    }
  }, [status, dispatch]);

  return { markers, status, error };
};
