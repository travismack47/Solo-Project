import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { TableCell, TableRow, Button } from "@mui/material";

export default function QuestItem({ quest, traderId }) {
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch({ type: 'MARK_COMPLETE', payload: { questId: quest.id, traderId: traderId } }); // Dispatching mark complete action which adds the quest to the user_quests table, meaning it has been completed
  };

  const handleUndo = () => {
    dispatch({
      type: 'UNDO_COMPLETION',
      payload: { questId: quest.id, traderId: traderId },
    });
  };
  
  const isComplete = !!quest.user_quest_id; // Checking if a user_quest id exists for that quest, meaning it has been completed

  return (
    <>
      <TableRow key={quest.id}>
        <TableCell>{quest.name}</TableCell> {/* Displaying quest name */}
        <TableCell>{quest.description}</TableCell> {/* Displaying quest description */}
        <TableCell>
          {isComplete ? (
            <Button variant="contained" color="primary" onClick={handleUndo}>
              Undo
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleComplete}>
              Mark Complete
            </Button>
          )}
        </TableCell>
        <TableCell>{isComplete ? "✅" : "🚫"}</TableCell> {/* Conditionally checking if the quest is complete and displaying appropriate symbol */}
      </TableRow>
    </>
  );
}
