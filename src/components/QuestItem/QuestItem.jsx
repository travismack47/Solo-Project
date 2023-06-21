import React from "react";
import { useDispatch } from "react-redux";

export default function QuestItem({ quest }) {
  const dispatch = useDispatch();
  const handleComplete = () => {
    dispatch({ type: 'MARK_COMPLETE', payload: { id: quest.id } }); // Dispatching mark complete action which adds the quest to the 
    // user_quests table, meaning it has been completed //
  };

  const isComplete = !!quest.user_quest_id; // Double negation turning quest ID into a boolean, and then negating that to return it to
  // its original boolean value. If the original value was true, it will return back to true with the second negation //

  return (
    <div key={quest.id}> {/* Giving the return the indexed quest ID as a key to render the quest details on the DOM */}
      <h3>{quest.name}</h3>
      <p>{quest.description}</p>
      <p>Complete: {isComplete ? 'Yes' : 'No'}</p> {/* If quest ID also exists in user_quests table, it will show yes for completed */}
      <button onClick={handleComplete}>Mark Complete</button>
    </div>
  );
};
