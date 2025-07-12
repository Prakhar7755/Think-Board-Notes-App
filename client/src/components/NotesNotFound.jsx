import { NotebookIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-200">
          <NotebookIcon className="w-8 h-8 text-indigo-600" />
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold text-blue-400">
          You're all caught up
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-base leading-relaxed">
          Looks like you haven’t created any notes yet. Start capturing your thoughts, tasks, or ideas — they’re just one click away.
        </p>

        {/* CTA */}
        <div>
          <Link
            to="/create"
            className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition"
          >
            + Create Your First Note
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotesNotFound;
