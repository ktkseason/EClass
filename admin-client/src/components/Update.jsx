import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check'; import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

export default function Update({ topic, params, rowId, setRowId, addition }) {
  const theme = useTheme();
  const token = useSelector(state => state.token);
  const colors = theme.palette;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await fetch(
      `http://localhost:3001/${topic}/update/${addition}${params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(params.row),
      }
    );
    const result = await response.json();

    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
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
      {success ? (
        <IconButton
          sx={{
            color: colors.background.default,
            width: "22px",
            height: "22px",
            bgcolor: colors.secondary.main,
            '&:hover': { bgcolor: colors.secondary.light },
          }}
        >
          <CheckIcon />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          sx={{
            width: "22px",
            height: "22px",
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <SaveIcon />
        </IconButton>
      )}
    </Box>
  );
};
