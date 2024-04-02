import { Box, useTheme } from "@mui/material";

export default function ProgressCircle({ progress = "0.75", size = "40" }) {
  const theme = useTheme();
  const colors = theme.palette;
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary.main} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.primary.dark} ${angle}deg 360deg),
            ${colors.primary.light}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
