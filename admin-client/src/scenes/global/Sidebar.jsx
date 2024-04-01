import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'; // teachers
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'; // courses
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'; // schedules
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'; // tests
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'; // edubackgrounds
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined'; // emotions
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined'; // preparations
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined'; // levels
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined'; // students
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = theme.palette;
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.primary.main,
            }}
            onClick={() => { setSelected(title) }}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

export default function Sidebar() {
    const theme = useTheme();
    const colors = theme.palette;
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.background.default} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: `${colors.secondary.main} !important`,
                },
                "& .pro-menu-item.active": {
                    color: `${colors.secondary.main} !important`,
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.primary.main} fontWeight="bold">
                                    EClass
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon style={{ color: colors.primary.main }} />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/dashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            fontSize="12px"
                            fontWeight="bold"
                            color={colors.primary.light}
                            sx={{ m: "15px 0 5px 15px" }}
                        >
                            Manage
                        </Typography>
                        <Item
                            title="Teachers"
                            to="/teachers"
                            icon={<GroupsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Courses"
                            to="/courses"
                            icon={<BallotOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Schedules"
                            to="/schedules"
                            icon={<CalendarMonthOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Students"
                            to="/students"
                            icon={<RecentActorsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Feedbacks"
                            to="/feedbacks"
                            icon={<ChatOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            fontSize="12px"
                            fontWeight="bold"
                            color={colors.primary.light}
                            sx={{ m: "15px 0 5px 15px" }}
                        >
                            Prefix
                        </Typography>
                        <Item
                            title="Education Backgrounds"
                            to="/eduBackgrounds"
                            icon={<SchoolOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Emotions"
                            to="/emotions"
                            icon={<SentimentSatisfiedOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Preparations"
                            to="/preps"
                            icon={<FitnessCenterOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Levels"
                            to="/levels"
                            icon={<GradeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Tests"
                            to="/tests"
                            icon={<ArticleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            fontSize="12px"
                            fontWeight="bold"
                            color={colors.primary.light}
                            sx={{ m: "0 0 5px 15px" }}
                        >
                            Charts
                        </Typography>
                        <Item
                            title="Bar Chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}