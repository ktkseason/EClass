import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCourses } from "state";
import Update from "../../components/Update";
import Delete from "../../components/Delete";

export default function GridTable({ levels }) {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses);
    const token = useSelector((state) => state.token);
    const [rowId, setRowId] = useState(null);

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
    }, []);

    const columns = [
        { field: "title", headerName: "Title", flex: 2, editable: true },
        { field: "level", headerName: "Level", flex: 2, type: 'singleSelect', valueOptions: levels.map((level) => level.title), editable: true },
        { field: "duration", headerName: "Duration (month)", flex: 1, editable: true },
        { field: "price", headerName: "Price (MMK)", flex: 1, editable: true },
        { field: "description", headerName: "Description", flex: 3, editable: true },
        {
            field: 'actions', headerName: 'Actions', type: 'actions', renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
                        <Update {...{ topic: "courses", params, rowId, setRowId, addition: "" }} />
                        <Delete {...{ topic: "courses", params, rowId, setRowId, addition: "" }} />
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
                    rows={courses}
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