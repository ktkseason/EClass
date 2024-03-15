import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCourses } from "state";


export default function GridTable() {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/courses/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const courses = await response.json();
            if (courses) {
                dispatch(
                    setCourses({
                        courses: courses,
                    })
                );
            }
        })();
    }, [])

    const columns = [
        { field: "title", headerName: "Title", flex: 2, editable: true },
        { field: "level", headerName: "Level", flex: 2, editable: true },
        { field: "duration", headerName: "Duration (month)", flex: 1, editable: true },
        { field: "price", headerName: "Price (MMK)", flex: 1, editable: true },
        { field: "description", headerName: "Description", flex: 3, editable: true },
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={courses}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}