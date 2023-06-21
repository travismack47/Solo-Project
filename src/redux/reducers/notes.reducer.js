// Setting initial state for the reducer to use //
const initialState = [];

const notesReducer = (state = initialState, action) => {
  switch (action.type) { // Switch statement handling the different action types // 
    case 'SET_NOTES':
      return action.payload;

    case 'ADD_NOTE': // Adds a new note to the database //
      return [...state, action.payload];

    case 'UPDATE_NOTE':
      return state.map((note) => // Maps over the notes and checks each note item to see if it matches the action.payload. If it does,
      // that means it is the correct note to edit. If it doesn't, it just returns note as is //
        note.id === action.payload.id ? action.payload : note
      );
    default:
      return state;
  }
};

// Exporting reducer to use in the root reducer file //

export default notesReducer;
