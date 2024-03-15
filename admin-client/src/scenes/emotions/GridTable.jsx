import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setEmotions } from "state";


export default function GridTable() {
    const dispatch = useDispatch();
    const emotions = useSelector(state => state.emotions);
    const token = useSelector((state) => state.token);

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
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={emotions}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}