import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import moment from "moment";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./NoteItem.css";

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_NOTE", payload: { noteId: note.id } });
  };

  const handleUpdate = () => {
    dispatch({
      type: "UPDATE_NOTE",
      payload: {
        title: newNoteTitle,
        description: newNoteDesc,
        noteId: note.id,
      },
    });
    swal2();
  };

  const swal = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f50000',
      cancelButtonColor: '#0021f5',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your note has been deleted.',
          'success',
          handleDelete()
        );
      };
    });
  };

  const swal2 = () => {
    let timerInterval;
    Swal.fire({
      title: "Note has been updated!",
      html: 'I will close in <b></b> milliseconds.',
      timer: 1200,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{note.title}</TableCell>
        <TableCell align="center">{note.description}</TableCell>
        <TableCell align="center">{moment(note.timestamp).calendar()}</TableCell>
        <TableCell>
          <div className="edit-delete-btns">
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={swal}>
              <DeleteIcon />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
      <Modal
        open={isModalOpen}
        onClose={handleCancel}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ bgcolor: "blanchedalmond", p: 4 }}>
          <p>Edit Note</p>
          <TextField
            type="text"
            label="Title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            multiline
            rows={3}
            label="Description"
            value={newNoteDesc}
            onChange={(e) => setNewNoteDesc(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="secondary" onClick={handleCancel} id="cancel-btn">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate} id="save-btn">
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default NoteItem;
