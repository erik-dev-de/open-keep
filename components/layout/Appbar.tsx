import { AppBar, Toolbar, IconButton, Avatar, Box, InputBase, Tooltip, Slide, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import Settings from "./Settings";
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCheckedAndDeleted } from "@/app/redux/checkedNotesReducer";

type AppbarProps = {
    drawerWidth: number,
    handleDrawerToggle: () => void
};

const Appbar: React.FC<AppbarProps> = ({
    drawerWidth,    
    handleDrawerToggle
}) => {

    const checkedNotes = useSelector((state: RootState) => state.checkedNotes);
    const [prevLength, setPrevLength] = useState(checkedNotes.checked.length);

    const dispatch = useDispatch();

    const handleDeleteNotes = async () => {
        try {
            const queryParams = new URLSearchParams();
            checkedNotes.checked.forEach(id => queryParams.append('ids', id.toString()));

            const response = await fetch(`/api/notes?${queryParams.toString()}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            dispatch(setCheckedAndDeleted({
                checked: [],
                deleted: [...checkedNotes.deleted, ...checkedNotes.checked],
            }));

            if (!response.ok) {
                throw new Error('Failed to delete notes');
            }
        } catch (e) {
            console.log(e);
        };
    };

    useEffect(() => {
        checkedNotes.checked.length > 0 && setPrevLength(checkedNotes.checked.length);
    }, [checkedNotes.checked.length])
    


    return (
        <>
            <Slide in={checkedNotes.checked.length > 0}>
                <AppBar
                    elevation={0}
                    position="absolute"
                    sx={{
                        width: { md: `calc(100% - ${drawerWidth}px)` },
                        ml: { md: `${drawerWidth}px` },
                        zIndex: '2',
                    }}
                    className='p-2'
                >
                    <Toolbar>
                        <Box className="w-full flex items-center mt-2 sm:mt-0">
                            <div
                                className="flex items-center rounded p-2 mb-1 w-full lg:w-2/4 mr-2"
                            >
                                <div className="flex">
                                    <Tooltip title='Clear selection'
                                        className='cursor-pointer'
                                        // onClick={() => dispatch(setCheckedNotes())}
                                    >
                                        <CloseIcon />
                                    </Tooltip>
                                    <Typography sx={{ marginLeft: '0.5rem' }}>
                                        {`${checkedNotes.checked.length === 0 ? prevLength : checkedNotes.checked.length} selected`}
                                    </Typography>
                                </div>

                            </div>
                        </Box>

                        <Box className='flex gap-6'>

                            <Tooltip
                                title="Delete notes" className="cursor-pointer">
                                <DeleteIcon onClick={handleDeleteNotes} />
                            </Tooltip>

                            <Tooltip title="Add reminder" className="cursor-pointer">
                                <NotificationAddIcon />
                            </Tooltip>
                        </Box>

                    </Toolbar>
                </AppBar>
            </Slide>

            <AppBar
                elevation={0}
                position="absolute"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    zIndex: '1'
                }}
                className='p-2'
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box className="w-full flex items-center mt-2 sm:mt-0">
                        <div
                            className="flex items-center rounded p-2 mb-1 w-full lg:w-2/4 mr-2"
                            style={{ backgroundColor: '#525356' }}
                        >
                            <SearchIcon sx={{ mr: 1 }} />
                            <InputBase
                                placeholder="Search..."
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{ color: 'inherit', width: '100%' }}
                            />
                        </div>
                        <div className="flex items-center ml-auto gap-5">
                            <Settings />
                            <Tooltip title="Account">
                                <Avatar
                                    src="https://cdn.britannica.com/47/80547-050-8B316D38/Field-green-tea-Mount-Fuji-Shizuoka-prefecture.jpg"
                                    sx={{ marginLeft: 'auto' }}
                                />
                            </Tooltip>
                        </div>
                    </Box>
                </Toolbar>
            </AppBar>

        </>

    );
};

export default Appbar;