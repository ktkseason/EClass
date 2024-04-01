import { Box, IconButton, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { red } from '@mui/material/colors';
import { setCourses } from 'state';

export default function Update({ topic, params, rowId, setRowId }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = theme.palette;
    const token = useSelector(state => state.token);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        const response = await fetch(
            `http://localhost:3001/${topic}/delete/${params.id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }
        );
        const result = await response.json();

        if (result) {
            setSuccess(true);
            setRowId(null);
            dispatch(
                setCourses({
                    courses: result,
                })
            );
        }
    };

    useEffect(() => {
        if (rowId === params.id && success) setSuccess(false);
    }, [rowId]);

    return (
        <Box
            sx={{
                margin: "0.5rem",
                position: "relative",
            }}
        >
            <IconButton
                sx={{
                    color: colors.primary.light,
                    width: "22px",
                    height: "22px",
                    transition: "all 300ms ease",
                    "&:hover": { color: red[900] }
                }}
                onClick={handleSubmit}
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};
