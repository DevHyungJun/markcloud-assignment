import "./App.css";
import QueryClientProvider from "./providers/QueryClientProvider";
import { HomePage } from "./pages/HomePage";
import TopScrollButton from "./components/common/TopScrollButton";

function App() {
  return (
    <QueryClientProvider>
      <HomePage />
      <TopScrollButton />
    </QueryClientProvider>
  );
}

export default App;
