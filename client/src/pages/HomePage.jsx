import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import axios from "axios";


import api from "../lib/axios.js";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import NoteCard from "../components/NoteCard.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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
        if (err.response?.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes on homepage");
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
      {isRateLimited ? <RateLimitedUI /> : ""}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes </div>
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
