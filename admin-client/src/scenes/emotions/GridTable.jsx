import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEmotions } from "state";
import Update from "../../components/Update";
import Delete from "../../components/Delete";

export default function GridTable() {
    const dispatch = useDispatch();
    const emotions = useSelector(state => state.emotions);
    const token = useSelector((state) => state.token);
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/emotions/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const emotions = await response.json();
            if (emotions) {
                dispatch(
                    setEmotions({
                        emotions: emotions,
                    })
                );
            }
        })();
    }, [])

    const columns = [
        { field: "title", headerName: "Title", flex: 1, editable: true },
        {
            field: 'actions', headerName: 'Actions', type: 'actions', renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
                        <Update {...{ topic: "emotions", params, rowId, setRowId, addition: "" }} />
                        <Delete {...{ topic: "emotions", params, rowId, setRowId, addition: "" }} />
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
                    rows={emotions}
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