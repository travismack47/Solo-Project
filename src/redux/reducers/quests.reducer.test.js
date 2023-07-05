import questsReducer from './quests.reducer';

describe('questsReducer', () => {
    it('should return the initial state', () => {
        const initialState = [];
        const action = { type: 'UNKNOWN_ACTION' };

        const newState = questsReducer(initialState, action);

        expect(newState).toEqual(initialState);
    });

    it('should handle SET_TRADER_QUESTS action', () => {
        const initialState = [];
        const quests = ['Quest 1', 'Quest 2'];
        const action = { type: 'SET_TRADER_QUESTS', payload: quests };

        const newState = questsReducer(initialState, action);

        expect(newState).toEqual(quests);
    });
});

it('should return the current state for unknown action types', () => {
    const currentState = ['Quest 1', 'Quest 2'];
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = questsReducer(currentState, action);

    expect(newState).toEqual(currentState);
});
