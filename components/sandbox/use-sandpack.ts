import {
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackProps,
} from '@codesandbox/sandpack-react'

import { getFileEntry, stylesCss } from './templates/common'

export interface UseSandpackProps {
  files?: SandpackFiles
  template?: SandpackPredefinedTemplate
  dependencies?: Record<string, string>
  initPackage?: string
  options?: SandpackProps['options']
}

export const useSandpack = ({
  files = {},
  template = 'react-ts',
  dependencies = {},
  initPackage,
  options = {},
}: UseSandpackProps) => {
  const isReact = template.includes('react')
  const sandpackTemplate: SandpackPredefinedTemplate = isReact
    ? 'react-ts'
    : 'vue-ts'

  // get entry file by current template
  const entryFile = isReact ? 'index.tsx' : 'src/main.ts'

  // filter files by current template
  const filteredFiles = {
    ...files,
  }

  const customSetup: SandpackProps['customSetup'] = {
    dependencies,
    entry: entryFile,
  }

  options.editorHeight = '500px'
  options.showLineNumbers = false
  options.externalResources = [
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/daisyui@3.9.3/dist/full.css',
  ]

  return {
    customSetup,
    files: {
      [entryFile]: {
        code: getFileEntry(sandpackTemplate, initPackage),
        hidden: false,
      },
      [isReact ? 'styles.css' : 'src/styles.css']: {
        code: stylesCss,
        hidden: true,
      },
      '/sandbox.config.json': {
        code: `{
  "infiniteLoopProtection": false,
  "hardReloadOnChange": false,
  "view": "browser"
}`,
        hidden: true,
      },
      ...filteredFiles,
    },
    entryFile,
    sandpackTemplate: sandpackTemplate,
    options,
  }
}
