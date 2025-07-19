import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { AxiosError } from "axios";

const CreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("🚨 Please fill in both the Title and Content fields!");
      return;
    }

    setLoading(true);

    try {
      // await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/notes/`, {
      //   title,
      //   content,
      // });
      await api.post("/notes", {
        title,
        content,
      });

      toast.success(`🎉 Note titled "${title}" has been created successfully!`);

      navigate("/");
    } catch (err) {
      console.error("❌ Error while creating the note:", err);

      if (err instanceof AxiosError) {
        if (err.response?.status === 429) {
          toast.error(
            "💀 Whoa! You're creating notes too quickly. Slow down!",
            {
              duration: 4000,
            }
          );
        } else {
          toast.error("⚠️ Something went wrong. Couldn't create your note.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back navigation */}
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">📝 Create New Note</h2>

              {/* Note creation form */}
              <form onSubmit={handleSubmit}>
                {/* Title input */}

                <div className="form-control mb-4">
                  <label className="label mr-4" htmlFor="note-title">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    id="note-title"
                    type="text"
                    placeholder="Enter note title"
                    className="input input-bordered"
                    value={title}
                    maxLength={30}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content input */}
                <div className="form-control mb-4">
                  <label className="label mr-4" htmlFor="note-content">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    id="note-content"
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    maxLength={500}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Submit button */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn text-white btn-primary"
                  >
                    {loading ? "✍️ Creating..." : "📝 Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
