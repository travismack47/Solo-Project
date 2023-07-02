import React from "react";
import { useDispatch } from "react-redux";
import { TableCell, TableRow, Button } from "@mui/material"; // Imports from Material-UI //
import Swal from "sweetalert2"; // Importing Sweet Alert //
import './QuestItem.css';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

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

  const swal = () => { // Sweet alert that pops up when a user presses undo on a completed quest // 
    let timerInterval
    Swal.fire({
      title: 'Quest marked complete!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
        handleComplete();
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  const swal2 = () => { // Sweet alert that pops up when a user presses undo on a completed quest // 
    let timerInterval
    Swal.fire({
      title: 'Completion status reversed!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
        handleUndo();
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
  
  const isComplete = !!quest.user_quest_id; // Checking if a user_quest id exists for that quest, meaning it has been completed

  return (
      <TableRow key={quest.id} style={{ height: 50 }}>
        <TableCell>{quest.name}</TableCell> {/* Displaying quest name */}
        <TableCell>{quest.description}</TableCell> {/* Displaying quest description */}
        <TableCell align="center">
          {isComplete ? (
            <Button variant="contained" color="primary" id="undo-btn" onClick={swal2}>
              Undo
            </Button>
          ) : (
            <Button variant="contained" color="primary" id="complete-btn" onClick={swal}>
             Complete
            </Button>
          )}
        </TableCell>
        <TableCell align="center">{isComplete && <CheckIcon />}</TableCell> {/* Conditionally checking if the quest is complete and displaying appropriate symbol */}
      </TableRow>
  );
}
