import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

export default function StatBox({ title, subtitle, icon, progress }) {
  const theme = useTheme();
  const colors = theme.palette;

  return (
    <Box
      backgroundColor={colors.background.alt}
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="1rem"
    >
      <Box width="100%">
        <Box display="flex" justifyContent="space-between" alignItems="start" gap="0.5rem">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="start" gap="0.7rem" >
            <Box display="flex" justifyContent="space-between" alignItems="end" gap="0.7rem">
              {icon}
              <Typography variant="h5" sx={{ color: colors.secondary.main }}>
                {subtitle}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: colors.text.default }}
            >
              {title}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <ProgressCircle progress={progress} size="60" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
