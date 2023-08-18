"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteIcon from '@mui/icons-material/Note';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArchiveIcon from '@mui/icons-material/Archive';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DeleteIcon from '@mui/icons-material/Delete';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Appbar from './Appbar';

const drawerWidth = 220;

export default function Sidebar() {

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar disableGutters={true} className="p-4">
                <div className="flex items-center gap-2">
                    <SummarizeIcon sx={{ color: '#902bf5' }} />
                    <Typography variant="h6" noWrap component="div">
                        Open Keep
                    </Typography>
                </div>
            </Toolbar>
            <List>
                {['Notes', 'Reminders', 'Edit labels', 'Archive', 'Bin'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index === 0 ? (
                                    <NoteIcon />
                                ) : index === 1 ? (
                                    <NotificationsIcon />
                                ) : index === 2 ? (
                                    <ModeEditIcon />
                                ) : index === 3 ? (
                                    <ArchiveIcon />
                                ) : index === 4 ? (
                                    <DeleteIcon />
                                ) : null}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Appbar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderWidth: '0' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
