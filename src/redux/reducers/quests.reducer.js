// Setting initial state for the reducer to use //
const initialState = [];

const questsReducer = (state = initialState, action) => {
  switch (action.type) { // Switch statement handling different action types //
    case 'SET_TRADER_QUESTS':
      return action.payload;

    case 'MARK_COMPLETE':
      return state.map(quest => {
        if (quest.id === action.payload.id) {
          return { ...quest, user_quest_id: true };
        }
        return quest;
      });

    default:
      return state;
  }
};

// Exporting reducer to use in the root reducer file //

export default questsReducer;
