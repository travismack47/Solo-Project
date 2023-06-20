import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Therapist() {
  const dispatch = useDispatch();
  const traderId = 2; // Set the trader ID for Therapist // 

  useEffect(() => {
    dispatch({ type: 'FETCH_TRADER_QUESTS', payload: traderId }); // Sending a FETCH dispatch with trader ID data as the payload //
  }, [dispatch]);

  const quests = useSelector(store => store.quests) // Pulling the quests from the Redux store // 


  return (
    <>
      <div>
        <h1>Therapist's Quests</h1>
        {quests.map((quest) => ( // Looping through the quests to display each item on the DOM // 
          <div key={quest.id}>
            <h3>{quest.name}</h3>
            <p>{quest.description}</p>
            <p>Complete: {quest.is_complete ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </>
  );
};
