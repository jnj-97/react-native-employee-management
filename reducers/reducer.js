export const initialData = { data: [], loading: true };
export const reducer = (state = initialData, action) => {
  if (action.type == "ADD_DATA") return { ...state, data: action.payload };
  if (action.type == "SET_LOADING")
    return { ...state, loading: action.payload };
  return state;
};
