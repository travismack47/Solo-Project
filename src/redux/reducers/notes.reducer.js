// Setting initial state for the reducer to use //
const initialState = [];

const notesReducer = (state = initialState, action) => {
  switch (action.type) { // Switch statement handling the different action types // 
    case 'SET_NOTES':
      return action.payload;

    case 'ADD_NOTE':
      return [...state, action.payload];

    case 'UPDATE_NOTE':
      return state.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    default:
      return state;
  }
};

// Exporting reducer to use in the root reducer file //

export default notesReducer;
