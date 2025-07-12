import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10 ">
      <nav className="mx-auto max-w-6xl  p-4">
        <div className="flex   items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5 text-white"></PlusIcon>
              <span className="text-white">New Note</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
