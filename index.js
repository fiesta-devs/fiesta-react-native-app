import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import App from "./App";
import { AppRegistry } from "react-native";

AppRegistry.registerComponent("main", () => (
  <TailwindProvider utilities={utilities}>
    <App />
  </TailwindProvider>
));

export default App;
