import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"; // Importing MaterialUI for styling

export default function Mechanic() {
  const dispatch = useDispatch();
  const traderId = 6;

  useEffect(() => { // Runs the FETCH_TRADER_QUESTS action upon page re-render //
    dispatch({ type: "FETCH_TRADER_QUESTS", payload: traderId });
  }, []);

  const quests = useSelector((store) => store.quests); // Pulling quests from the Redux store // 

  const handleComplete = (questId) => { // Dispatching the MARK_COMPLETE action when a quest is marked complete //
    dispatch({ type: "MARK_COMPLETE", payload: { id: questId } });
  };

  return (
    <>
      <div>
        <h1>Mechanic's Quests</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell> {/* Headers for the table */}
                <TableCell>Description</TableCell>
                <TableCell>Mark Complete</TableCell>
                <TableCell>Completed?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quests.map((quest) => ( // Mapping over quests and using the item ID as a key when rendering QuestItem component //
                <QuestItem key={quest.id} quest={quest} handleComplete={handleComplete} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}