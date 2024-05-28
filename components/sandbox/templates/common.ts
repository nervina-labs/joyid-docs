const buildReactIndexFile = (npm?: string) => {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import { initConfig } from "${npm}";
import App from "./App";
import "./styles.css";

${
  npm
    ? `initConfig({
  name: "JoyID demo",
  logo: "https://fav.farm/🆔",
  joyidAppURL: "https://testnet.joyid.dev",
});`
    : ''
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`
}

const buildVueIndexFile = (npm?: string) => {
  return `import { createApp } from 'vue'
import App from './App.vue'
${npm ? `import { initConfig } from "${npm}";` : ''}
import "./styles.css";

${
  npm
    ? `initConfig({
  name: "JoyID demo",
  logo: "https://fav.farm/🆔",
  joyidAppURL: "https://testnet.joyid.dev",
});`
    : ''
}

createApp(App).mount('#app')
`
}

export const getFileEntry = (template: string, initPackage?: string) =>
  template.includes('react')
    ? buildReactIndexFile(initPackage)
    : buildVueIndexFile(initPackage)

export const stylesCss = `h1 {
  word-break: break-all;
}

#app,
#root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
}`
