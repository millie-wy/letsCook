import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountProvider from "./components/context/AccountContext";
import Layout from "./components/Layout";
import ProfileOverviewPage from "./components/pages/Profile/ProfileOverviewPage";
import RecipeDetailPage from "./components/pages/RecipeStart/RecipeDetailPage";
import RecipeStartPage from "./components/pages/RecipeStart/RecipeStartPage";
import SearchResult from "./components/pages/RecipeStart/SearchResult";
import SignIn from "./components/pages/SignInUp/SignIn";
import SignUp from "./components/pages/SignInUp/SignUp";
import StartPage from "./components/pages/StartPage";
import RecipeForm from "./components/pages/RecipeStart/RecipeForm";
import CreateRecipe from "./components/pages/RecipeStart/CreateRecipe";

const App = () => {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StartPage />} />
            <Route path="/start" element={<RecipeStartPage />} />
            <Route path="/recipe/:recipe" element={<RecipeDetailPage />} />
            <Route path="/recipe/edit" element={<RecipeForm />} />
            <Route path="/recipe/create" element={<CreateRecipe />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<ProfileOverviewPage />} />
          </Route>
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
};

export default App;
