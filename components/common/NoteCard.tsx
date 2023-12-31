import React, { useContext, useState } from "react";
import { Box, Typography, Fade } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ThemeContext } from "../layout/Theme";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

type NoteCardProps = {
    note: {
        title: string;
        content: string;
        note_id: number;
        user_id: number;
    };
    className?: string;
    onCardCheck: (id: number) => void;
};

const NoteCard: React.FC<NoteCardProps> = ({
    note,
    onCardCheck,
    className,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const checkedNotes = useSelector((state: RootState) => state.checkedNotes);
    const { theme, isDarkTheme } = useContext(ThemeContext);

    return (
        <Fade in>
            <Box
                className={`rounded-lg border p-4 flex flex-col ${
                    checkedNotes.checked.length >= 1 ? "cursor-pointer" : ""
                }`}
                sx={{
                    position: "relative",
                    transition: "0.3s ease-in-out",
                    zIndex: 0,
                    borderColor: checkedNotes.checked.includes(note.note_id)
                        ? theme.palette.primary.main
                        : `${isDarkTheme ? "#5f6368" : "#e0e0e0"}`,
                }}
                onClick={() =>
                    checkedNotes.checked.length >= 1
                        ? onCardCheck(note.note_id)
                        : ""
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Fade
                    in={
                        isHovered || checkedNotes.checked.includes(note.note_id)
                    }
                    timeout={200}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "-14px",
                            left: "-10px",
                            zIndex: 1,
                            cursor: "pointer",
                            backgroundColor: theme.palette.background.default,
                            borderRadius: "100%",
                        }}
                        onClick={() => {
                            onCardCheck(note.note_id);
                        }}
                    >
                        <CheckCircleIcon />
                    </Box>
                </Fade>
                <Typography variant="h6" sx={{ wordBreak: "break-word" }}>
                    {note.title}
                </Typography>
                <Typography
                    className="mt-2 text-sm"
                    sx={{ wordBreak: "break-word" }}
                >
                    {note.content}
                </Typography>
            </Box>
        </Fade>
    );
};

export default NoteCard;
