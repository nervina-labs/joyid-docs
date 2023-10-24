import { Tabs, Tab, Pre, Code } from 'nextra/components';
import { Npm } from './icons/npm';
import { Yarn } from './icons/yarn';
import { Pnpm } from './icons/pnpm';
import { Bun } from './icons/bun';

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

export interface PackageManagerTabProps {
  command:
  | string
  | {
    npm: string;
    yarn: string;
    pnpm: string;
    bun: string;
  };
  additionalTabs?: {
    tool: PackageManager;
    icon?: React.ReactNode;
  }[];
}

function normalizeCommand(command: string): string {
  if (!command.includes('install')) {
    return command;
  }
  // If command include `install` and package name, replace `install` with `add`
  const pureCommand = command
    .split(' ')
    .filter(item => !item.startsWith('-') && !item.startsWith('--'))
    .join(' ');
  if (pureCommand === 'yarn install' || pureCommand === 'bun install') {
    return command;
  } else {
    return command.replace('install', 'add');
  }
}

export function PackageManagerTabs({
  command,
  additionalTabs = [],
}: PackageManagerTabProps) {
  let commandInfo: {
    npm: string;
    yarn: string;
    pnpm: string;
    bun: string;
    [key: string]: string;
  };

  // Init Icons
  const packageMangerToIcon: Record<PackageManager, React.ReactNode> = {
    npm: <Npm />,
    yarn: <Yarn />,
    pnpm: <Pnpm />,
    bun: <Bun />,
  };
  additionalTabs.forEach(tab => {
    packageMangerToIcon[tab.tool] = tab.icon;
  });

  // Init Command
  if (typeof command === 'string') {
    commandInfo = {
      npm: `npm ${command}`,
      yarn: `yarn ${command}`,
      pnpm: `pnpm ${command}`,
      bun: `bun ${command}`,
    };
    additionalTabs.forEach(tab => {
      commandInfo[tab.tool] = `${tab.tool} ${command}`;
    });
  } else {
    commandInfo = command;
  }

  // Normalize yarn/bun command
  commandInfo.yarn = normalizeCommand(commandInfo.yarn);
  commandInfo.bun = normalizeCommand(commandInfo.bun);
  commandInfo.pnpm = normalizeCommand(commandInfo.pnpm);

  return (
    <Tabs
      items={Object.entries(commandInfo).map(([key]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 15,
          }}
        >
          {packageMangerToIcon[key as PackageManager]}
          <span style={{ marginLeft: 6, marginBottom: 2 }}>{key}</span>
        </div>
      ))}
    >
      {Object.entries(commandInfo).map(([key, value]) => (
        <Tab key={key}>
          <Pre hasCopyCode>
            <Code>{value}</Code>
          </Pre>
        </Tab>
      ))}
    </Tabs>
  );
}
