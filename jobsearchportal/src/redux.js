// redux.js
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

// Action type
const UPDATE_FILTER = "UPDATE_FILTER";

// Action creator
const updateFilter = (filter) => ({
  type: UPDATE_FILTER,
  payload: filter,
});

// Reducer
const initialState = {
  minExperience: "",
  companyName: "",
  location: "",
  remote: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(filterReducer);

// Redux setup
const mapStateToProps = (state) => ({
  filters: state,
});

const mapDispatchToProps = (dispatch) => ({
  updateFilter: (filter) => dispatch(updateFilter(filter)),
});

export const connectToRedux = (Component) => {
  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Export action creators if needed
export { updateFilter };
