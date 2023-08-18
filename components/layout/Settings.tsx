import React, { useContext } from 'react';
import { Tooltip, Menu, MenuItem, IconButton } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ThemeContext } from "@/components/layout/Theme";


const Settings = () => {
    
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Settings">
                <IconButton aria-label="settings" onClick={handleClick}>
                    <SettingsOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={() => {handleClose(); toggleTheme() }}>{isDarkTheme ? 'Disable dark theme' : 'Enable dark theme'}</MenuItem>
            </Menu>
        </>
    );
};

export default Settings;
