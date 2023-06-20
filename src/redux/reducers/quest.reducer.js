// Setting inital state to assign to the reducer //

const initialState = {
    quests: [],
  };
  
  const questsReducer = (state = initialState, action) => {
    switch (action.type) { // Switch statement for handling action types // 
      case 'SET_TRADER_QUESTS':
        return {
          ...state,
          quests: action.payload,
        };
      default:
        return state;
    }
  };
  
  // Exporting reducer to use in root reducer file //

  export default questsReducer;