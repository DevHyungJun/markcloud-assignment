import "./App.css";
import QueryClientProvider from "./providers/QueryClientProvider";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <QueryClientProvider>
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
