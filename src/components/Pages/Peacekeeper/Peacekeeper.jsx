import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";


export default function Peacekeeper() {
    const dispatch = useDispatch();
    const traderId = 5; // Set the trader ID for Peacekeeper //

    useEffect(() => {
        dispatch({ type: 'FETCH_TRADER_QUESTS', payload: traderId });
    }, [dispatch]);

    const quests = useSelector(store => store.quests)


    return (
        <>
            <div>
                <h1>Peacekeeper's Quests</h1>
                {quests.map((quest) => ( // Mapping over quests object, importing QuestItem which appends indexed items to the dom and
                    // checks if an entry exists for that quest inside the user_quests table. If it does, the quest is marked as 'complete' 
                    <QuestItem key={quest.id} quest={quest} />
                ))}
            </div>
        </>
    );
}