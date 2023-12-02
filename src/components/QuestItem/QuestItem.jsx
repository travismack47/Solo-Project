import React from "react";
import { useDispatch } from "react-redux";
import { TableCell, TableRow, Button, styled } from "@mui/material"; 
import Swal from "sweetalert2"; 
import './QuestItem.css';
import CheckIcon from '@mui/icons-material/Check';

export default function QuestItem({ quest, traderId }) {
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch({ type: 'MARK_COMPLETE', payload: { questId: quest.id, traderId: traderId } });
  }; 

  const handleUndo = () => {
    dispatch({
      type: 'UNDO_COMPLETION',
      payload: { questId: quest.id, traderId: traderId },
    });
  };

  const StyledQuestButton = styled(Button)(({ theme }) => ({
    color: '#000',
    backgroundColor: 'transparent',
    padding: '6px 12px',
    fontSize: '0.875rem',
    fontWeight: 500,
    border: '2px solid transparent',
    borderRadius: '4px',
    transition: 'border-color 0.3s ease',
  
    '&:hover': {
      borderColor: '#000',
    },
  }));

  const swal = () => { 
    let timerInterval
    Swal.fire({
      title: 'Quest marked complete!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1200,
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
      timer: 1200,
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
      <TableCell align="center">{quest.name}</TableCell> {/* Displaying quest name */}
      <TableCell align="center">{quest.description}</TableCell> {/* Displaying quest description */}
      <TableCell align="center">
        {isComplete ? (
          <StyledQuestButton variant="text" onClick={swal2}>
            Undo
          </StyledQuestButton>
        ) : (
          <StyledQuestButton variant="text" onClick={swal}>
            Complete
          </StyledQuestButton>
        )}
      </TableCell>
      <TableCell align="center">{isComplete && <CheckIcon />}</TableCell> 
    </TableRow>
  );
}
