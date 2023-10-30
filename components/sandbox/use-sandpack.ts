import {
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackProps,
} from '@codesandbox/sandpack-react'

import { getFileEntry, stylesCss, getViteConfig } from './templates/common'

export interface UseSandpackProps {
  files?: SandpackFiles
  template?: SandpackPredefinedTemplate
  dependencies?: Record<string, string>
  initPackage?: string
  options?: SandpackProps['options']
}

export const useSandpack = ({
  files = {},
  template = 'vite-react',
  dependencies = {},
  initPackage,
  options = {},
}: UseSandpackProps) => {
  const isReact = template.includes('react')
  const sandpackTemplate: SandpackPredefinedTemplate = isReact
    ? 'vite-react-ts'
    : 'vite-vue-ts'

  // get entry file by current template
  const entryFile = isReact ? 'index.tsx' : 'src/main.ts'

  // filter files by current template
  const filteredFiles = {
    ...files,
  }

  const customSetup: SandpackProps['customSetup'] = {
    dependencies,
    entry: entryFile,
    devDependencies: {
      daisyui: '^3.9.3',
      unocss: '^0.57.1',
      'unocss-preset-daisy-cjs': '^7.0.1',
      '@unocss/reset': '0.57.1',
      typescript: '^5.2.2',
    },
  }

  options.editorHeight = '500px'
  options.showLineNumbers = false

  return {
    customSetup,
    files: {
      ...filteredFiles,
      [entryFile]: {
        code: getFileEntry(sandpackTemplate, initPackage),
        hidden: false,
      },
      'vite.config.ts': {
        code: getViteConfig(sandpackTemplate),
        hidden: true,
      },
      [isReact ? 'styles.css' : 'src/styles.css']: {
        code: stylesCss,
        hidden: true,
      },
    },
    entryFile,
    sandpackTemplate: sandpackTemplate,
    options,
  }
}
