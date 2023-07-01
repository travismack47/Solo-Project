import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, TextField, Button, Modal, Box, IconButton } from "@mui/material";
import moment from "moment";
import Swal from "sweetalert2";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './NoteItem.css';

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    Swal.fire({
      title: 'Note has been updated',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
    dispatch({
      type: "UPDATE_NOTE",
      payload: {
        title: newNoteTitle,
        description: newNoteDesc,
        noteId: note.id,
      },
    });

    setIsEditable(false);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_NOTE", payload: { noteId: note.id } });
  };

  const swal = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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

  return (
    <>
      <TableRow>
        <TableCell align="center">
          {isEditable ? (
            // Render the editable text field when in edit mode
            <TextField
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
          ) : (
            // Render the note title when not in edit mode
            note.title
          )}
        </TableCell>
        <TableCell align="center">
          {isEditable ? (
            // Render the editable text field when in edit mode
            <TextField
              multiline
              rows={3}
              value={newNoteDesc}
              onChange={(e) => setNewNoteDesc(e.target.value)}
            />
          ) : (
            // Render the note description when not in edit mode
            note.description
          )}
        </TableCell>
        <TableCell align="center">{moment(note.timestamp).calendar()}</TableCell>
        <TableCell>
          {isEditable ? (
            // Render the cancel and save buttons inside the modal when in edit mode
            <>
              <Button variant="contained" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save
              </Button>
            </>
          ) : (
            // Render the edit and delete buttons when not in edit mode
            <div className="edit-delete-btns">
              <IconButton>
                <EditIcon onClick={handleEdit} />
              </IconButton>
              <IconButton>
                <DeleteIcon onClick={swal} />
              </IconButton>
            </div>
          )}
        </TableCell>
      </TableRow>
      <Modal
        open={isModalOpen}
        onClose={handleCancel}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ bgcolor: "background.paper", p: 4 }}>
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
