import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

const NoteDetailPage: React.FC = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        toast.error("Could not load the note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete the note.");
    }
  };

  const handleSave = async () => {
    if (!note?.title.trim() || !note?.content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully.");
      navigate("/");
    } catch (err) {
      toast.error("Failed to update the note.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoaderIcon className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="btn btn-ghost gap-2">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Notes</span>
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-error gap-2"
          >
            <Trash2Icon className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>

        <div className="card shadow-lg bg-base-100">
          <div className="card-body space-y-6">
            {/* Title Input */}
            <div className="form-control">
              <label className="label font-semibold text-base">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered input-md"
                placeholder="Note title"
                value={note?.title ?? ""}
                onChange={(e) =>
                  setNote((prevNote) => ({
                    ...prevNote!,
                    title: e.target.value,
                  }))
                }
              />
            </div>

            {/* Content Textarea */}
            <div className="form-control">
              <label className="label font-semibold text-base">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered min-h-[10rem]"
                placeholder="Write your note here..."
                value={note?.content ?? ""}
                 onChange={(e) =>
                  setNote((prevNote) => ({ ...prevNote!, content: e.target.value }))
                }
              />
            </div>

            {/* Save Button */}
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <LoaderIcon className="animate-spin w-4 h-4" />
                    Saving...
                  </span>
                ) : (
                  <span>💾 Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
