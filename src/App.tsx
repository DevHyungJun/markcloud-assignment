import "./App.css";
import { QueryClientProvider } from "@/providers";
import { HomePage } from "@/pages";
import { TopScrollButton } from "@/components/common";

function App() {
  return (
    <QueryClientProvider>
      <HomePage />
      <TopScrollButton />
    </QueryClientProvider>
  );
}

export default App;
