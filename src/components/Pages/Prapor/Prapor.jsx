import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, 
    Paper, Typography } from "@mui/material"; // Material-UI imports //
import { Pagination } from "@mui/material";
import './Prapor.css';

export default function Prapor() {
    const dispatch = useDispatch();
    const traderId = 1;
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
        <div className="background-prapor">
            <div className="prapor-page">
                <Typography variant="h4" component="h2" className="header" sx={{ mb: '20px' }}>
                    Prapor
                </Typography>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TableContainer component={Paper} elevation={3} sx={{
                        width: 1300, margin: "0 auto",
                        backgroundColor: "rgba(255, 255, 255, 0.75)"
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ maxWidth: 300 }} align="center">Name</TableCell> {/* Quest name column */}
                                    <TableCell sx={{ maxWidth: 700 }} align="center">Description</TableCell> {/* Quest description column */}
                                    <TableCell sx={{ width: 150 }} align="center">Mark Complete</TableCell> {/* Mark complete column */}
                                    <TableCell sx={{ width: 150 }} align="center">Completed?</TableCell> {/* Completed status column */}
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
                            color='primary'
                            sx={{ color: '#0021f5' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
