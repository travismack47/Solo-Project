// Setting initial state for the reducer to use // 
const initialState = [];

const questsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRADER_QUESTS':
      return action.payload;

    case 'MARK_QUEST_COMPLETE_SUCCESS':
      return state.map(quest => {
        if (quest.id === action.payload) {
          return { ...quest, is_complete: true };
        }
        return quest;
      });

    default:
      return state;
  }
};

// Exporting reducer to use in the root reducer file //

export default questsReducer;
