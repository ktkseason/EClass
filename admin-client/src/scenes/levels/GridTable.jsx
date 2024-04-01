import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLevels } from "state";
import Update from "../../components/Update";
import Delete from "../../components/Delete";

export default function GridTable() {
    const dispatch = useDispatch();
    const levels = useSelector(state => state.levels);
    const token = useSelector((state) => state.token);
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/levels/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const levels = await response.json();
            if (levels) {
                dispatch(
                    setLevels({
                        levels: levels,
                    })
                );
            }
        })();
    }, [])

    const columns = [
        { field: "title", headerName: "Title", flex: 1, editable: true },
        { field: "minScore", headerName: "Minimum Score", flex: 1, editable: true },
        { field: "maxScore", headerName: "Maximum Score", flex: 1, editable: true },
        {
            field: 'actions', headerName: 'Actions', type: 'actions', renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
                        <Update {...{ topic: "levels", params, rowId, setRowId, addition: "" }} />
                        <Delete {...{ topic: "levels", params, rowId, setRowId, addition: "" }} />
                    </Box>
                )
            }
        }
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={levels}
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