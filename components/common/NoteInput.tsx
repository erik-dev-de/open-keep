"use client";

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Tooltip } from '@mui/material';
import { useState } from 'react';

interface Note {
    note_id: number,
    user_id: number,
    title: string,
    content: string
};

type NoteInputProps = {
    onCardAdd: (note: Note) => void
};

const NoteInput: React.FC<NoteInputProps> = ({
    onCardAdd
}) => {

    const [input, setInput] = useState({
        isActive: false,
        isList: false
    });

    const [note, setNote] = useState({
        title: "",
        content: "",
        user_id: 1
    });

    const handleBlur = (e: React.FormEvent) => {
        const currentTarget = e.currentTarget;

        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setInput({...input, isActive: false})
            }
        }, 0);
    };

    const handleAddNotes = async () => {
        try {
            const response = await fetch('/api/notes', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(note)
            });

            const responseBody: Note[] = await response.json();

            const noteToAdd = {
                note_id: responseBody[0].note_id,
                user_id: 1,
                title: note.title,
                content: note.content
            };

            console.log(noteToAdd)

            onCardAdd(noteToAdd);
      
            if (!response.ok) {
              throw new Error('Failed to delete notes');
            }
          } catch (e) {
            console.log(e);
          }
    };

    return (
        <>
            {!input.isActive ?
            <Box 
                className="border rounded-lg w-3/4 py-2 px-4 my-6 lg:w-2/5 shadow"
            >
                    <TextField
                        fullWidth
                        id="input-with-icon-textfield"
                        placeholder='Take a note...'
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="start">
                                    <div className='flex gap-5'>
                                        <Tooltip title="New list">
                                            <CheckBoxOutlinedIcon />
                                        </Tooltip>
                                        <Tooltip title="New note with image">
                                            <ImageOutlinedIcon />
                                        </Tooltip>
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        onFocus={() => setInput({ ...input, isActive: true })}
                    />
                </Box>
                : 
                <Box 
                    className="border rounded-lg w-3/4 py-2 px-4 my-6 lg:w-2/5" 
                    onBlur={handleBlur} 
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            handleAddNotes();
                        };
                    }}
                >
                    <TextField
                        className='mt-1'
                        fullWidth
                        id="input-with-icon-textfield"
                        placeholder='Title'
                        InputProps={{
                            disableUnderline: true
                        }}
                        variant="standard"
                        onChange={(e) => {
                            setNote({...note, title: e.target.value})
                        }}
                    /> 
                    <TextField
                        className='mt-2'
                        fullWidth
                        sx={{
                            '& input::placeholder': {
                                fontSize: '0.875rem',
                                lineHeight: '1.25rem'
                            },
                        }}
                        id="input-with-icon-textfield"
                        placeholder='Take a note...'
                        InputProps={{
                            disableUnderline: true
                        }}
                        variant="standard"
                        onChange={(e) => {
                            setNote({...note, content: e.target.value})
                        }}
                    />
                </Box>
                }

        </>

    );
}

export default NoteInput