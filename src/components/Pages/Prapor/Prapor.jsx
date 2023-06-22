import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";


export default function Prapor() {
    const dispatch = useDispatch();
    const traderId = 1; // Set the trader ID for Prapor //
    
    useEffect(() => { // Dispatches the FETCH_TRADER_QUESTS action upon every re-render, sending the trader ID to make sure only
        // the quests from that specific trader are shown on the DOM //
        dispatch({ type: 'FETCH_TRADER_QUESTS', payload: traderId });
    }, []);

    const quests = useSelector(store => store.quests) // Assigning the quests variable to equal the Redux store quests //


    return (
        <>
            <div>
                <h1>Prapor's Quests</h1>
                {quests.map((quest) => ( // Mapping over quests object, importing QuestItem which appends indexed items to the dom and 
                    // checks if an entry exists for that quest inside the user_quests table. If it does, the quest is marked as 'complete'
                    <QuestItem key={quest.id} quest={quest} />
                ))}
            </div>
        </>
    );
}
