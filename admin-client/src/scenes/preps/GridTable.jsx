import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPreps } from "state";


export default function GridTable() {
    const dispatch = useDispatch();
    const preps = useSelector(state => state.preps);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/preps/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const preps = await response.json();
            if (preps) {
                dispatch(
                    setPreps({
                        preps: preps,
                    })
                );
            }
        })();
    }, [preps])

    const columns = [
        { field: "title", headerName: "Title", flex: 1, editable: true },
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={preps}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}