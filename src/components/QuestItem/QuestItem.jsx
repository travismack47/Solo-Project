import React from "react";
import { useDispatch } from "react-redux";
import { TableCell, TableRow, Button } from "@mui/material"; // Imports from Material-UI //
import Swal from "sweetalert2"; // Importing Sweet Alert //

export default function QuestItem({ quest, traderId }) {
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch({ type: 'MARK_COMPLETE', payload: { questId: quest.id, traderId: traderId } }); 
  }; // Dispatching mark complete action which adds the quest to the user_quests table, meaning it has been completed //

  const handleUndo = () => {
    dispatch({
      type: 'UNDO_COMPLETION',
      payload: { questId: quest.id, traderId: traderId },
    });
  };

  const swal = () => { // Sweet alert that pops up when a user clicks mark complete, having then confirm the completion //
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark complete!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Completed!',
          'Your quest has been marked complete.',
          'success',
          handleComplete() // Marks the quest complete if the user confirms in the alert //
        )
      }
    })
  }

  const swal2 = () => { // Sweet alert that pops up when a user presses undo on a completed quest // 
    Swal.fire({
      title: 'Quest completion status has been reversed',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    handleUndo() // Reverses completed status of the quest // 
  }
  
  const isComplete = !!quest.user_quest_id; // Checking if a user_quest id exists for that quest, meaning it has been completed

  return (
    <>
      <TableRow key={quest.id} style={{ height: 50 }}>
        <TableCell>{quest.name}</TableCell> {/* Displaying quest name */}
        <TableCell>{quest.description}</TableCell> {/* Displaying quest description */}
        <TableCell>
          {isComplete ? (
            <Button variant="contained" color="primary" sx={{ width: 120, height: 50 }} onClick={swal2}>
              Undo
            </Button>
          ) : (
            <Button variant="contained" color="primary" sx={{ width: 120, height: 50 }} onClick={swal}>
              Mark Complete
            </Button>
          )}
        </TableCell>
        <TableCell>{isComplete ? "✅" : "🚫"}</TableCell> {/* Conditionally checking if the quest is complete and displaying appropriate symbol */}
      </TableRow>
    </>
  );
}
