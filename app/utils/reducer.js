import { initialState } from "~/utils/initial";

const ActionTypes = {
  CLEAR_STATE: "CLEAR_STATE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_STATE:
      return initialState;
    default:
      return { ...state, ...action };
  }
};

export { ActionTypes, reducer };
