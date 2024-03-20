import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTeachers } from "state";


export default function GridTable() {
    const dispatch = useDispatch();
    const teachers = useSelector(state => state.teachers);
    const token = useSelector((state) => state.token);

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
    }, [teachers])

    const columns = [
        { field: "imgPath", headerName: 'Avatar' },
        { field: "firstName", headerName: 'First Name' },
        { field: "lastName", headerName: 'Last Name' },
        { field: "birthYear", headerName: 'Birth Year' },
        { field: "email", headerName: 'Email' },
        { field: "phone", headerName: 'Phone' },
        { field: "employedYear", headerName: 'Employed Year' },
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={teachers}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}