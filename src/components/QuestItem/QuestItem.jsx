import React from "react";
import { useDispatch } from "react-redux";
import { TableCell, TableRow, Button } from "@mui/material";
import Swal from "sweetalert2";

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

  const swal = () => {
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
          handleComplete()
        )
      }
    })
  }

  const swal2 = () => {
    Swal.fire({
      title: 'Quest completion status has been reversed',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    handleUndo()
  }
  
  const isComplete = !!quest.user_quest_id; // Checking if a user_quest id exists for that quest, meaning it has been completed

  return (
    <>
      <TableRow key={quest.id}>
        <TableCell>{quest.name}</TableCell> {/* Displaying quest name */}
        <TableCell>{quest.description}</TableCell> {/* Displaying quest description */}
        <TableCell>
          {isComplete ? (
            <Button variant="contained" color="primary" onClick={swal2}>
              Undo
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={swal}>
              Mark Complete
            </Button>
          )}
        </TableCell>
        <TableCell>{isComplete ? "✅" : "🚫"}</TableCell> {/* Conditionally checking if the quest is complete and displaying appropriate symbol */}
      </TableRow>
    </>
  );
}
