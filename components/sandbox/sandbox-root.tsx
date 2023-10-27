import {
  Sandpack,
  SandpackProps,
  SandpackOptions,
} from '@codesandbox/sandpack-react'

export interface SandboxProps extends SandpackProps {
  documentTitle?: string
  initConfigPackage?: string
  id?: string
}

const buildHtmlFile = (temaplte?: string, documentTitle?: string) => {
  if (temaplte === 'react-ts') {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentTitle || 'JoyID Demo'}</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.2/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="
    https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/lib/index.min.js
    "></script>
    <link href="
    https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/tailwind.min.css
    " rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
  }
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentTitle || 'JoyID Demo'}</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.2/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="
    https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/lib/index.min.js
    "></script>
    <link href="
    https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/tailwind.min.css
    " rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>`
}

const stylesCssFile = `h1 {
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

const buildReactIndexFile = (npm: string) => {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import { initConfig } from "${npm}";
import App from "./App";
import "./styles.css";

initConfig({
  name: "JoyID demo",
  logo: "https://fav.farm/🆔",
  joyidAppURL: "https://testnet.joyid.dev",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`
}

const buildVueIndexFile = (npm: string) => {
  return `import { createApp } from 'vue'
import App from './App.vue'
import { initConfig } from "${npm}";
import "./styles.css";

initConfig({
  name: "JoyID demo",
  logo: "https://fav.farm/🆔",
  joyidAppURL: "https://testnet.joyid.dev",
});

createApp(App).mount('#app')
`
}

const SandboxRoot: React.FC<SandboxProps> = (props) => {
  const {
    template,
    documentTitle,
    initConfigPackage,
    files: _files,
    id,
    options: _options,
    ...restProps
  } = props
  const htmlFile = buildHtmlFile(template, documentTitle)
  const files: Record<string, string> = {
    '/public/index.html': htmlFile,
    ..._files,
  }

  const options: SandpackOptions = {
    // initMode: "user-visible",
    // initModeObserverOptions: { rootMargin: '1400px 0px' },
    editorHeight: 500,
    externalResources: [
      'https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/lib/index.min.js',
      'https://cdn.jsdelivr.net/npm/daisyui@3.9.3/dist/full.css',
      'https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/tailwind.min.css',
    ],
    ..._options,
  }
  if (template === 'react-ts') {
    files['/styles.css'] = stylesCssFile
    if (initConfigPackage) {
      files['/index.tsx'] = buildReactIndexFile(initConfigPackage)
    }
    if (!options?.activeFile) {
      options.activeFile = '/App.tsx'
    }
    options.visibleFiles = ['/App.tsx', '/index.tsx'].concat(
      options.visibleFiles || []
    )
  } else if (template === 'vue-ts') {
    files['/src/styles.css'] = stylesCssFile
    if (initConfigPackage) {
      files['/src/main.ts'] = buildVueIndexFile(initConfigPackage)
    }
    if (!options.activeFile) {
      options.activeFile = '/src/App.vue'
    }
    options.visibleFiles = ['/src/App.vue', '/src/main.ts'].concat(
      options.visibleFiles || []
    )
  }
  if (id) {
    options.id = id
  }

  return (
    <Sandpack
      theme="dark"
      template={template}
      files={files}
      options={options}
      {...restProps}
    />
  )
}

export default SandboxRoot
