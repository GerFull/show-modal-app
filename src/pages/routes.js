import { Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import ErrorPage from "./Error";
import ModelPage from "./model";


export default () => (
   <Routes>
      <Route path="/custom/" element={<HomePage />} />
      <Route path="/custom/:article" element={<ModelPage/>} />
      <Route path="*" element={<ErrorPage />} />

   </Routes>
) 