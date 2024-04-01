import { Avatar, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setTeachers } from "state";
import Update from "../../components/Update";
import Delete from "../../components/Delete";

export default function GridTable() {
    const dispatch = useDispatch();
    const teachers = useSelector(state => state.teachers);
    const token = useSelector((state) => state.token);
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/teachers/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const teachers = await response.json();
            if (teachers) {
                dispatch(
                    setTeachers({
                        teachers: teachers,
                    })
                );
            }
        })();
    }, [])

    const columns = [
        { field: "imgPath", headerName: 'Avatar', width: 100, renderCell: params => <Avatar src={`http://localhost:3001/assets/${params.row.imgPath}`} />, sortable: false, filterable: false },
        { field: "firstName", headerName: 'First Name', editable: true },
        { field: "lastName", headerName: 'Last Name', editable: true },
        { field: "birthYear", headerName: 'Birth Year', editable: true },
        { field: "email", headerName: 'Email', editable: true },
        { field: "phone", headerName: 'Phone', editable: true },
        { field: "employedYear", headerName: 'Employed Year', editable: true },
        {
            field: 'actions', headerName: 'Actions', type: 'actions', renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
                        <Update {...{ topic: "teachers", params, rowId, setRowId, addition: "" }} />
                        <Delete {...{ topic: "teachers", params, rowId, setRowId, addition: "" }} />
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
                    rows={teachers}
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