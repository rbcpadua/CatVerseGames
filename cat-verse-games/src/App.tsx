import { ThemeProvider } from "./context/ThemeContext";
import { AudioProvider } from "./context/AudioContext";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <AppRoutes />
      </AudioProvider>
    </ThemeProvider>
  );
}
