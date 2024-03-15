import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setEduBackgrounds } from "state";


export default function GridTable() {
    const dispatch = useDispatch();
    const eduBackgrounds = useSelector(state => state.eduBackgrounds);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/eduBackgrounds/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const eduBackgrounds = await response.json();
            if (eduBackgrounds) {
                dispatch(
                    setEduBackgrounds({
                        eduBackgrounds: eduBackgrounds,
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
                    rows={eduBackgrounds}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}