import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";


export default function Prapor() {
  const dispatch = useDispatch();
  const traderId = 1; // Set the trader ID for Prapor (replace with dynamic value if needed)

  useEffect(() => {
    dispatch({ type: 'FETCH_TRADER_QUESTS', payload: traderId });
  }, [dispatch]);

 const quests = useSelector(store => store.quests)


  return (
    <>
      <div>
        <h1>Prapor's Quests</h1>
        {quests.map((quest) => (
          <QuestItem key={quest.id} quest={quest} />
        ))}
      </div>
    </>
  );
}
