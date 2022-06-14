import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <header>
        <h1>Animal Zoo</h1>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
}

export default Layout;
