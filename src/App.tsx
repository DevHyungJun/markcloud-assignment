import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@/providers";
import { HomePage, FavoritesPage, StatisticsPage } from "@/pages";
import { TopScrollButton } from "@/components/common";

const App = () => {
  return (
    <QueryClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
        <TopScrollButton />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
