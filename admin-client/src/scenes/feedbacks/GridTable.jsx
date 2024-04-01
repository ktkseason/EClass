import { Box } from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFeedbacks } from "state";

export default function GridTable() {
    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.feedbacks);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/feedbacks/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const feedbacks = await response.json();
            if (feedbacks) {
                dispatch(
                    setFeedbacks({
                        feedbacks: feedbacks,
                    })
                );
            }
        })();
    }, []);

    const columns = [
        { field: "name", headerName: 'Name', flex: 1 },
        { field: "email", headerName: 'Email', flex: 1 },
        { field: "subject", headerName: 'Subject', flex: 1 },
        { field: "content", headerName: 'content', flex: 3 },
    ]

    return (
        <Box>
            <Box height="80vh">
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={feedbacks}
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
                    getRowHeight={() => "auto"}
                    sx={{
                        [`& .${gridClasses.cell}`]: {
                            paddingY: "1rem",
                        },
                    }}
                />
            </Box>
        </Box>
    )
}