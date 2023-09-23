import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
        <Link to="/" className="text-3xl normal-case btn btn-ghost">
          <span>🍕 Pizza</span>
          <span className="text-accent">App</span>
        </Link>
      </div>
      <div className="max-w-xl p-4 mx-auto rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};
