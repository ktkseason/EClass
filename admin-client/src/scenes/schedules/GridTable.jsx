import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSchedules } from "state";


export default function GridTable() {
    const dispatch = useDispatch();
    const schedules = useSelector(state => state.schedules);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!schedules)
            (async () => {
                const response = await fetch("http://localhost:3001/schedules/", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
                const schedules = await response.json();
                if (schedules) {
                    dispatch(
                        setSchedules({
                            schedules: schedules,
                        })
                    );
                }
            })();
    }, [schedules])

    const columns = [
        { field: "courseTitle", headerName: "Course Title", editable: true },
        { field: "courseLevel", headerName: "Level", editable: true },
        { field: "courseDuration", headerName: "Duration (month)", editable: true },
        { field: "coursePrice", headerName: "Price (MMK)", editable: true },
        { field: "teacherFirstName", headerName: "Teacher First Name", editable: true },
        { field: "teacherLastName", headerName: "Teacher Last Name", editable: true },
        { field: "startDate", headerName: "Start Date", editable: true },
        { field: "time", headerName: "Time", editable: true },
        { field: "location", headerName: "Location", editable: true },
        { field: "studentNumbers", headerName: "Number of Students", editable: true },
        { field: "description", headerName: "Description", editable: true },
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={schedules}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}