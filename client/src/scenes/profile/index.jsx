import { useTheme } from "@emotion/react";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const student = useSelector(state => state.user);
    const theme = useTheme();
    const colors = theme.palette;
    const [edit, setEdit] = useState(false);

    const courseTakenColumn = [
        { field: "scheduleStartDate", headerName: "Date", flex: 1, renderCell: params => format(params.row.scheduleStartDate, "MMM d, y") },
        { field: "courseTitle", headerName: "Title", flex: 2 },
        { field: "courseLevel", headerName: "Level", flex: 2 },
        { field: "teacherFirstName", headerName: "Teacher's firt name", flex: 1 },
        { field: "teacherLastName", headerName: "Teacher's last name", flex: 1 },
    ];

    return (
        <Box
            minHeight="92vh"
            padding="1rem"
            paddingTop="5rem"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="1rem"
                textAlign="center"
            >
                <Avatar
                    src={`http://localhost:3001/assets/${student.imgPath}`}
                    sx={{
                        width: "10rem",
                        height: "10rem"
                    }}
                />
                <Box>
                    {student.level ?
                        <Typography variant="h6" fontSize="12px" fontWeight="bold" color={colors.secondary.light}>{student.level} Student</Typography>
                        :
                        <Typography variant="h6" fontSize="12px" fontWeight="bold" color={colors.secondary.light}>Level Undefined</Typography>
                    }
                    <Box display="flex" justifyContent="center" alignItems="end" gap="0.5rem">
                        <Typography variant="h3" color="primary" fontWeight="bold">{student.firstName} {student.lastName}</Typography>
                        <Typography variant="h6" fontSize="12px" color={colors.text.default}>/ {student.birthYear} Born</Typography>
                    </Box>
                    <Typography fontSize="12px" fontWeight="medium" color={colors.text.default} >{student.eduBackground} Education</Typography>
                    <Box marginTop="1rem" color={colors.text.alt}>
                        <Box display="flex" justifyContent="start" alignItems="center" gap="1rem" color={colors.text.default}>
                            <LocalPhoneIcon sx={{ color: colors.secondary.light, fontSize: "18px" }} />
                            <Typography variant="h6">{student.phone}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="start" alignItems="center" gap="1rem" color={colors.text.default}>
                            <EmailIcon sx={{ color: colors.secondary.light, fontSize: "18px" }} />
                            <Typography variant="h6">{student.email}</Typography>
                        </Box>
                    </Box>
                    <Box marginTop="1rem" display="flex" justifyContent="center" alignItems="center" gap="0.7rem">
                        <IconButton onClick={() => setEdit(!edit)}>
                            <BorderColorIcon sx={{ color: colors.primary.main, fontSize: "24px" }} />
                        </IconButton>
                        {
                            edit && (
                                <Box
                                    position="fixed"
                                    right="0"
                                    bottom="0"
                                    height="100%"
                                    width="100%"
                                    padding="1rem"
                                    zIndex="10"
                                    backgroundColor={colors.background.alt}
                                >
                                    {/* CLOSE ICON */}
                                    <Box display="flex" justifyContent="flex-end" p="1rem">
                                        <IconButton
                                            onClick={() => setEdit(!edit)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                    <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
                                        <Form edit={edit} setEdit={setEdit} />
                                    </Box>
                                </Box >
                            )
                        }
                        <IconButton onClick={() => { dispatch(setLogout()); navigate("/") }}>
                            <LogoutIcon sx={{ color: colors.primary.main, fontSize: "24px" }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box margin="3rem 0">
                <Typography variant="h4" textAlign="center" fontWeight="bold" color="primary" marginBottom="2rem">Courses Taken</Typography>
                <Box height="70vh">
                    <DataGrid
                        getRowId={(row) => row.scheduleId}
                        rows={student.coursesTaken}
                        columns={courseTakenColumn}
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
                    />
                </Box>
            </Box>
        </Box>
    )
}