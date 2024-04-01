import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setTests } from "state";
import Update from "../../components/Update";
import Delete from "../../components/Delete";

export default function GridTable() {
    const dispatch = useDispatch();
    const tests = useSelector(state => state.tests);
    const token = useSelector((state) => state.token);
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/tests/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const tests = await response.json();
            if (tests) {
                dispatch(
                    setTests({
                        tests: tests,
                    })
                );
            }
        })();
    }, [])

    const columns = [
        { field: "question", headerName: "Question", flex: 2, editable: true },
        { field: "answer", valueGetter: params => params.row.answers[0].answer, headerName: "Right Answer", flex: 1, editable: true },
        { field: "answer1", valueGetter: params => params.row.answers[1].answer, headerName: "Wrong Answer 1", flex: 1, editable: true },
        { field: "answer2", valueGetter: params => params.row.answers[2].answer, headerName: "Wrong Answer 2", flex: 1, editable: true },
        { field: "answer3", valueGetter: params => params.row.answers[3].answer, headerName: "Wrong Answer 3", flex: 1, editable: true },
        {
            field: 'actions', headerName: 'Actions', type: 'actions', renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
                        <Update {...{ topic: "tests", params, rowId, setRowId, addition: "" }} />
                        <Delete {...{ topic: "tests", params, rowId, setRowId, addition: "" }} />
                    </Box>
                )
            }
        }
    ];

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={tests}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                    onCellEditStart={(params) => setRowId(params.id)}
                />
            </Box>
        </Box>
    )
}