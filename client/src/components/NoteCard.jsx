import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate(); 

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    const confirmed = window.confirm(
      "⚠️ Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("🗑️ Note deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting note:", err);
      if (err.response?.status === 404) {
        toast.error("⚠️ Note not found. It might have already been deleted.");
      } else {
        toast.error("🚫 Failed to delete note. Please try again.");
      }
    }
  };

  return (
    <div
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D] cursor-pointer"
    >
      {/* Clicking the title or content navigates to the note detail page */}
      <Link to={`/note/${note._id}`} className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
      </Link>

      {/* Footer with created date and action buttons */}
      <div className="card-actions justify-between items-center px-4 pb-4">
        <span className="text-sm text-base-content/60">
          {formatDate(new Date(note.createdAt))}
        </span>

        <div className="flex items-center gap-1">
          <button
            className="btn btn-ghost btn-xs text-warning"
            onClick={() => navigate(`/note/${note._id}`)}
            title="Edit note"
          >
            <PenSquareIcon className="size-4" />
          </button>

          <button
            className="btn btn-ghost btn-xs text-error"
            onClick={(e) => handleDelete(e, note._id)}
            title="Delete note"
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
