const initialState = [];

const questsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRADER_QUESTS':
      return action.payload;

    default:
      return state;
  }
};

export default questsReducer;
