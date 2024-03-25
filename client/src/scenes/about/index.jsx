import { Box, Typography, useTheme } from "@mui/material";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export default function About() {
    const theme = useTheme();
    const colors = theme.palette;

    return (
        <Box minHeight="92vh">
            <Box
                padding="1rem"
                paddingTop="5rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2.7rem"
            >
                <Typography variant="h3" textAlign="center" color={colors.secondary.main} fontWeight="bold"><span style={{ textTransform: "uppercase", color: `${colors.primary.main}` }}>About</span> EClass</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" gap="2rem" color={colors.secondary.dark}>
                    <CastForEducationIcon sx={{ width: "64px", height: "64px" }} />
                    <LightbulbIcon sx={{ width: "64px", height: "64px" }} />
                    <QuestionAnswerIcon sx={{ width: "64px", height: "64px" }} />
                </Box>
                <Typography variant="h6" paddingX="1rem" maxWidth="800px" textAlign="center" color={colors.text.default}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius esse ullam nihil atque cupiditate doloremque deserunt corrupti quidem ipsam nam eum provident dignissimos voluptate natus sint dolor necessitatibus inventore, magnam impedit quasi molestiae iste laudantium consectetur? Eius, commodi sed magni similique dolorum doloribus ipsa nemo beatae modi iusto esse minima explicabo rem non natus eum laboriosam ipsam in placeat. Earum tempore dolor at quibusdam cupiditate aperiam molestias quam, numquam nobis aut architecto reiciendis.Iure recusandae ipsum a cum similique officiis ratione odio iusto nam id autem, inventore optio soluta eaque provident delectus repudiandae illum culpa. <br />Praesentium quidem placeat rem consectetur!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis ipsum quos modi, tenetur officia eius tempora illum provident, libero nobis tempore et neque amet vitae corrupti in fugiat non numquam.
                </Typography>
            </Box>
        </Box>
    )
}