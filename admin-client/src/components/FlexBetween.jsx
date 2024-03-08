import { Box } from "@mui/material";
import { styled } from "@mui/system";

export default function FlexBetween() {
    styled(Box)({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    });
}