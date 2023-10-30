const buildReactIndexFile = (npm?: string) => {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import { initConfig } from "${npm}";
import App from "./App";
import "./styles.css";
import '@unocss/reset/tailwind.css'
import 'uno.css'

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
import '@unocss/reset/tailwind.css'
import 'uno.css'

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

export const reactViteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import unocss from 'unocss/vite'
import {presetUno} from 'unocss'
import {presetDaisy} from 'unocss-preset-daisy-cjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unocss({
			presets: [presetUno(), presetDaisy()],
		}),
  ],
})
`

export const getViteConfig = (template: string) =>
  template.includes('react') ? reactViteConfig : vueViteConfig

export const vueViteConfig = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import {presetUno} from 'unocss'
import {presetDaisy} from 'unocss-preset-daisy-cjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unocss({
			presets: [presetUno(), presetDaisy()],
		}),
  ],
})
`

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
