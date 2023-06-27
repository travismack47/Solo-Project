import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function Therapist() {
  const dispatch = useDispatch();
  const traderId = 2;

  useEffect(() => {
    dispatch({ type: "FETCH_TRADER_QUESTS", payload: traderId });
  }, []);

  const quests = useSelector((store) => store.quests);

  return (
    <div>
      <h1>Therapist's Quests</h1>
      <TableContainer sx={{ width: 1300, margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: 300 }}>Name</TableCell>
              <TableCell sx={{ maxWidth: 700 }}>Description</TableCell>
              <TableCell sx={{ width: 150 }}>Mark Complete</TableCell>
              <TableCell sx={{ width: 150 }}>Completed?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quests.map((quest) => (
              <QuestItem key={quest.id} quest={quest} traderId={traderId} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
