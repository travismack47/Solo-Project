import React from "react";
import { useDispatch } from "react-redux";
import { TableCell, TableRow, Button } from "@mui/material";

export default function QuestItem({ quest }) {
  const dispatch = useDispatch();
  const handleComplete = () => {
    dispatch({ type: 'MARK_COMPLETE', payload: { id: quest.id } }); // Dispatching mark complete action which adds the quest to the 
    // user_quests table, meaning it has been completed //
  };

  const isComplete = !!quest.user_quest_id;

  return (
    <TableRow key={quest.id}>
      <TableCell>{quest.name}</TableCell>
      <TableCell>{quest.description}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={handleComplete}>
          Mark Complete
        </Button>
      </TableCell>
      <TableCell>{isComplete ? "Yes" : "No"}</TableCell>
    </TableRow>
  );
}
