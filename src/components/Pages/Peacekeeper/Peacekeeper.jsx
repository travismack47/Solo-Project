import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { Pagination } from "@mui/material";
import './Peacekeeper.css';

export default function Peacekeeper() {
  const dispatch = useDispatch();
  const traderId = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const questsPerPage = 5;

  useEffect(() => {
    dispatch({ type: "FETCH_TRADER_QUESTS", payload: traderId });
  }, []);

  const quests = useSelector((store) => store.quests);

  const indexOfLastQuest = currentPage * questsPerPage;
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;
  const currentQuests = quests.slice(indexOfFirstQuest, indexOfLastQuest);

  const handleChangePage = (event, page) => {
      setCurrentPage(page);
  };

  return (
    <div className="background-peacekeeper">
        <div className="peacekeeper-page">
        <div style={{ display: "flex", flexDirection: "column" }}>
                    <TableContainer component={Paper} elevation={3} sx={{ width: 1300, margin: "0 auto", backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
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
                                {currentQuests.map((quest) => (
                                    <QuestItem key={quest.id} quest={quest} traderId={traderId} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto", width: "fit-content" }}>
                        <Pagination
                            count={Math.ceil(quests.length / questsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                            sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        />
                    </div>
                </div>
            </div>
            </div>
  );
}
