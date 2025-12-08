import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@/providers";
import { HomePage, FavoritesPage } from "@/pages";
import { TopScrollButton } from "@/components/common";

function App() {
  return (
    <QueryClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
        <TopScrollButton />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
