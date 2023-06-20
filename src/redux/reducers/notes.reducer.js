// Creating initial state to assign to the reducer //

const initialState = {
    notes: []
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {  // Switch statement handling the different types of actions // 
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.payload,
            };

        case 'ADD_NOTE':
            return {
                ...state,
                notes: [...state.notes, action.payload],
            };

        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) => // Looping through 
                    note.id === action.payload.id ? action.payload : note
                ),
            };

        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload),
            };
    };
};

// Exporting reducer to use in root reducer file // 

export default notesReducer;
