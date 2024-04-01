import { Box, Avatar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setStudents } from "state";
import Update from "../../components/Update";
import Delete from "../../components/Delete";

export default function GridTable() {
    const levels = useSelector(state => state.levels);
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);
    const token = useSelector((state) => state.token);
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/students/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const students = await response.json();
            if (students) {
                dispatch(
                    setStudents({
                        students: students,
                    })
                );
            }
        })();
    }, [])

    const columns = [
        { field: "imgPath", headerName: 'Avatar', width: 100, renderCell: params => <Avatar src={`http://localhost:3001/assets/${params.row.imgPath}`} />, sortable: false, filterable: false },
        { field: "firstName", headerName: 'First Name', flex: 1 },
        { field: "lastName", headerName: 'Last Name', flex: 1 },
        { field: "birthYear", headerName: 'Birth Year', flex: 1 },
        { field: "email", headerName: 'Email', flex: 1 },
        { field: "phone", headerName: 'Phone', flex: 1 },
        { field: "level", headerName: 'Level', flex: 1, type: 'singleSelect', valueOptions: levels.map((level) => level.title), editable: true },
        {
            field: 'actions', headerName: 'Actions', type: 'actions', renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
                        <Update {...{ topic: "students", params, rowId, setRowId, addition: "level/" }} />
                        <Delete {...{ topic: "students", params, rowId, setRowId, addition: "level/" }} />
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
                    rows={students}
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