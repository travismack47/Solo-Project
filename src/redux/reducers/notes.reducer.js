const initialState = {
    notes: [],
    error: null,
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
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
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload : note
                ),
            };

        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload),
            };
    };
}
export default notesReducer;
