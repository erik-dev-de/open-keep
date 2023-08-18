"use client";

import NoteCard from "@/components/common/NoteCard";
import NoteContainer from "@/components/common/NoteContainer";
import NoteInput from "@/components/common/NoteInput";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { setCheckedAndDeleted } from "./redux/checkedNotesReducer";

interface Note {
  note_id: number;
  user_id: number;
  title: string;
  content: string;
};

interface Notes {
  data: Note[];
  error?: string;
  count?: number;
  status?: number | undefined;
  statusText?: string;
};

const Home = () => {

  const checkedNotes = useSelector((state: RootState) => state.checkedNotes);
  const dispatch = useDispatch();

  const [notes, setNotes] = useState<Notes>();
  const [loading, setLoading] = useState<boolean>(true);

  const onCardCheck = (id: number) => {
    const updatedCheckedNotes = checkedNotes.checked.includes(id)
      ? checkedNotes.checked.filter(noteId => noteId !== id)
      : [...checkedNotes.checked, id];

    dispatch(setCheckedAndDeleted({
      ...checkedNotes,
      checked: updatedCheckedNotes
    }));
  };

  const onCardAdd = (note: Note) => {
    if (notes && notes.data) {
      setNotes({ ...notes, data: [...notes.data, note]})
    };
  };

  const loadNotes = async () => {
    try {
      const response = await fetch(`/api/notes`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const loadedNotes: Notes = await response.json();
      setNotes(loadedNotes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes()
  }, []);

  useEffect(() => {
    if (notes && notes.data) {
      const filteredNotes = notes.data.filter(note => !checkedNotes.deleted.includes(note.note_id));
      setNotes(prev => ({ ...prev, data: filteredNotes }));
    }
  }, [checkedNotes.deleted.length]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <NoteInput onCardAdd={onCardAdd} />
        {loading ?
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
          :
          <NoteContainer>
            {notes?.data.map((note) => (
              <NoteCard
                key={note.user_id}
                note={note}
                onCardCheck={onCardCheck}
              />
            ))}
          </NoteContainer>
        }
      </div>
    </>
  );
}

export default Home
