import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setStudents } from "state";


export default function GridTable() {
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!students)
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
    }, [students])

    const columns = [
        { field: "imgPath", headerName: 'Avatar' },
        { field: "firstName", headerName: 'First Name', flex: 1, editable: true },
        { field: "lastName", headerName: 'Last Name', flex: 1, editable: true },
        { field: "birthYear", headerName: 'Birth Year', flex: 1, editable: true },
        { field: "email", headerName: 'Email', flex: 1, editable: true },
        { field: "phone", headerName: 'Phone', flex: 1, editable: true },
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={students}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}