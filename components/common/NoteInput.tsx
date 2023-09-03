"use client";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { Tooltip } from "@mui/material";
import { ThemeContext } from "../layout/Theme";
import { useEffect, useRef, useState, useContext } from "react";

interface Note {
    note_id: number;
    user_id: number;
    title: string;
    content: string;
}

type NoteInputProps = {
    onCardAdd: (note: Note) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
};

const NoteInput: React.FC<NoteInputProps> = ({
    onCardAdd,
    setLoading,
    loading,
}) => {
    const inputBoxRef = useRef<HTMLDivElement | null>(null);
    const [input, setInput] = useState({
        isActive: false,
        isList: false,
    });

    const [note, setNote] = useState({
        title: "",
        content: "",
        user_id: 1,
    });

    const resetFields = () => {
        setNote({
            title: "",
            content: "",
            user_id: 1,
        });
    };

    const { isDarkTheme } = useContext(ThemeContext);

    const handleAddNotes = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(note),
            });

            const responseBody: Note[] = await response.json();

            const noteToAdd = {
                note_id: responseBody[0].note_id,
                user_id: 1,
                title: note.title,
                content: note.content,
            };

            onCardAdd(noteToAdd);
            if (!response.ok) {
                throw new Error("Failed to delete notes");
            }
        } catch (e) {
            console.log(e);
        } finally {
            resetFields();
            setInput({ ...input, isActive: false });
            setLoading(false);
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            inputBoxRef.current &&
            !inputBoxRef.current.contains(e.target as Node)
        ) {
            setInput({ ...input, isActive: false });
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (
            !input.isActive &&
            (note.content.trim().length > 0 || note.title.trim().length > 0)
        ) {
            handleAddNotes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input.isActive, note.content.length, note.title.length]);

    return (
        <>
            {!input.isActive ? (
                <Box
                    className="border rounded-lg w-3/4 py-2 px-4 my-6 lg:w-2/5 shadow"
                    sx={{
                        borderColor: `${isDarkTheme ? "#5f6368" : "#e0e0e0"}`,
                    }}
                >
                    <TextField
                        fullWidth
                        id="input-with-icon-textfield"
                        placeholder="Take a note..."
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="start">
                                    <div className="flex gap-5">
                                        <Tooltip title="New list">
                                            <CheckBoxOutlinedIcon className="cursor-pointer" />
                                        </Tooltip>
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        value={""}
                        onFocus={() => setInput({ ...input, isActive: true })}
                    />
                </Box>
            ) : (
                <Box
                    className="border rounded-lg w-3/4 py-2 px-4 my-6 lg:w-2/5"
                    sx={{
                        borderColor: `${isDarkTheme ? "#5f6368" : "#e0e0e0"}`,
                    }}
                    ref={inputBoxRef}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !loading) {
                            handleAddNotes();
                        }
                    }}
                >
                    <TextField
                        multiline
                        className="mt-1"
                        disabled={loading}
                        fullWidth
                        id="input-with-icon-textfield"
                        placeholder="Title"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        variant="standard"
                        value={note.title}
                        onChange={(e) => {
                            setNote({ ...note, title: e.target.value });
                        }}
                    />
                    <TextField
                        multiline
                        className="mt-2"
                        fullWidth
                        disabled={loading}
                        sx={{
                            "& input::placeholder": {
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                            },
                            wordBreak: "break-word",
                        }}
                        id="input-with-icon-textfield"
                        placeholder="Take a note..."
                        InputProps={{
                            disableUnderline: true,
                        }}
                        variant="standard"
                        autoFocus
                        value={note.content}
                        onChange={(e) => {
                            setNote({ ...note, content: e.target.value });
                        }}
                    />
                </Box>
            )}
        </>
    );
};

export default NoteInput;
