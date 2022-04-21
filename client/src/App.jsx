import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RecipeStartPage from "./components/pages/RecipeStart/RecipeStartPage";
import SearchResult from "./components/pages/RecipeStart/SearchResult";
import RecipeDetailPage from "./components/pages/RecipeStart/RecipeDetailPage";
import SignIn from "./components/pages/SignInUp/SignIn";
import SignUp from "./components/pages/SignInUp/SignUp";
import StartPage from "./components/pages/StartPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StartPage />} />
          <Route path="/start" element={<RecipeStartPage />} />
          <Route path="/recipe/:recipe" element={<RecipeDetailPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
