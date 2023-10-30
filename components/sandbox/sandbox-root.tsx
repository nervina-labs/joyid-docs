import { Sandpack, SandpackProps } from '@codesandbox/sandpack-react'
import { useSandpack } from './use-sandpack'
import { atomDark } from '@codesandbox/sandpack-themes'
import { useTheme } from 'nextra-theme-docs'

export interface SandboxProps extends SandpackProps {
  documentTitle?: string
  initConfigPackage?: string
  id?: string
  dependencies?: Record<string, string>
}

const SandboxRoot: React.FC<SandboxProps> = (props) => {
  const { files, customSetup, sandpackTemplate, options } = useSandpack({
    template: props.template,
    initPackage: props.initConfigPackage,
    files: props.files,
    dependencies: props.dependencies,
  })

  options.editorHeight = '500px'
  options.showLineNumbers = false
  const { theme, resolvedTheme } = useTheme()
  let sandpackTheme: SandboxProps['theme'] = atomDark
  if (theme === 'system') {
    sandpackTheme = resolvedTheme === 'dark' ? atomDark : 'light'
  } else if (theme === 'dark') {
    sandpackTheme = atomDark
  } else if (theme === 'light') {
    sandpackTheme = 'light'
  }
  return (
    <Sandpack
      {...props}
      options={{
        ...options,
        ...props.options,
      }}
      template={sandpackTemplate}
      theme={sandpackTheme}
      files={files}
      customSetup={customSetup}
    />
  )
}

export default SandboxRoot
