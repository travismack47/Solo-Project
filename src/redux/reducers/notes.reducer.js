// Setting initial state for the reducer to use //
const initialState = [];

const notesReducer = (state = initialState, action) => {
  switch (action.type) { // Switch statement handling the different action types // 
    case 'SET_NOTES':
      return action.payload;
    default:
      return state;
  }
};

// Exporting reducer to use in the root reducer file //

export default notesReducer;
