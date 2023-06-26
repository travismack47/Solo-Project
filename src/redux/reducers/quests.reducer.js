// Setting initial state for the reducer to use //
const initialState = [];

const questsReducer = (state = initialState, action) => {
  switch (action.type) { // Switch statement handling different action types //
    case 'SET_TRADER_QUESTS':
      return action.payload;
    default:
      return state;
  }
};

// Exporting reducer to use in the root reducer file //

export default questsReducer;
