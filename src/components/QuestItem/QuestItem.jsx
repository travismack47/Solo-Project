import React from "react";
import { useDispatch } from "react-redux";

export default function QuestItem({ quest }) {
    const dispatch = useDispatch();
    const handleComplete = () => {
        dispatch({ type: 'MARK_COMPLETE', payload: { id: quest.id } });
      };

  return (
    <div key={quest.id}>
      <h3>{quest.name}</h3>
      <p>{quest.description}</p>
      <p>Complete: {quest.is_complete ? 'Yes' : 'No'}</p>
      <button onClick={handleComplete}>Mark Complete</button>
    </div>
  );
}
