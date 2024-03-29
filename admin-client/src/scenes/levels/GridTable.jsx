import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLevels } from "state";


export default function GridTable() {
    const dispatch = useDispatch();
    const levels = useSelector(state => state.levels);
    const token = useSelector((state) => state.token);
    const [pageSize, setPageSize] = useState(null);

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
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={levels}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageChange={(newPageSize) => setPageSize(newPageSize)}
                />
            </Box>
        </Box>
    )
}