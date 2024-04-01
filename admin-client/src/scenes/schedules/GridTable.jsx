import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSchedules } from "state";
import Update from "../../components/Update";
import Delete from "../../components/Delete";

export default function GridTable() {
    const dispatch = useDispatch();
    const schedules = useSelector(state => state.schedules);
    const token = useSelector((state) => state.token);
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
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
    }, [])

    const columns = [
        { field: "courseTitle", headerName: "Course Title" },
        { field: "courseLevel", headerName: "Level" },
        { field: "courseDuration", headerName: "Duration (month)" },
        { field: "coursePrice", headerName: "Price (MMK)" },
        { field: "teacherFirstName", headerName: "Teacher First Name" },
        { field: "teacherLastName", headerName: "Teacher Last Name" },
        { field: "startDate", headerName: "Start Date", editable: true },
        { field: "time", headerName: "Time", editable: true },
        { field: "location", headerName: "Location", editable: true },
        { field: "studentNumbers", headerName: "Number of Students", editable: true },
        { field: "description", headerName: "Description", editable: true },
        {
            field: 'actions', headerName: 'Actions', type: 'actions', renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
                        <Update {...{ topic: "schedules", params, rowId, setRowId, addition: "" }} />
                        <Delete {...{ topic: "schedules", params, rowId, setRowId, addition: "" }} />
                    </Box>
                )
            }
        }
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    sx={{
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                            height: '0.4em',
                            borderRadius: '5px'
                        },
                    }}
                    getRowId={(row) => row._id}
                    rows={schedules}
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