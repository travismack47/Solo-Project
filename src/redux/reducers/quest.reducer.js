const initialState = {
    quests: [],
  };
  
  const questsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TRADER_QUESTS':
        return {
          ...state,
          quests: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default questsReducer;