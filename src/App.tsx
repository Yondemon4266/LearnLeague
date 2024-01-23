import { ContextProvider } from "./context/Context";
import AnimatedRoutes from "./components/AnimatedRoutes";

export default function App() {
  return (
    <ContextProvider>
      <AnimatedRoutes />
    </ContextProvider>
  );
}
