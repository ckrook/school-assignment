import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <header>
        <div className="h-20 flex items-center justify-center">
          <h1 className="font-bold text-2xl">Animal Zoo</h1>
        </div>
      </header>
      <main className="p-[10px]">
        <Outlet></Outlet>
      </main>
      <footer>
        <div className="h-20 flex items-center justify-center">
          <h1 className="font-bold text-2xl">Footer</h1>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
