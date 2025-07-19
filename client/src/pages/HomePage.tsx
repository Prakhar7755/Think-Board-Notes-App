import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

import api from "../lib/axios.js";
import Navbar from "../components/Navbar.js";
import RateLimitedUI from "../components/RateLimitedUI.js";
import NotesNotFound from "../components/NotesNotFound.js";
import NoteCard from "../components/NoteCard.js";
import { AxiosError } from "axios";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

const HomePage: React.FC = () => {
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        // const res = await axios.get("http://localhost:5001/api/notes");
        const res = await api.get("/notes");
        console.info(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (err) {
        console.error("Failed to fetch the notes :: ", err);
        if (err instanceof AxiosError) {
          if (err.response?.status == 429) {
            setIsRateLimited(true);
          } else {
            toast.error("Failed to fetch notes on homepage");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      {isRateLimited ? <RateLimitedUI /> : null}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            <span>Loading Notes...</span>
            <LoaderIcon className="animate-spin w-8 h-8 text-primary" />
          </div>
        )}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
