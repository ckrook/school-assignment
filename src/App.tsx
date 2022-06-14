import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Animal from "./components/pages/Animal";
import NotFound from "./components/pages/NotFound";
import { Provider } from "react-redux";
import Store from "./redux/Store";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/animal/:id" element={<Animal />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
