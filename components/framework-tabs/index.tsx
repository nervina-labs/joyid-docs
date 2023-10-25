import { Tabs, Tab } from '@/components/tabs';
import { ReactIcon } from './icons/react';
import { VueIcon } from './icons/vue';

export function FrameworkTabs({
  children
}: React.PropsWithChildren<any>) {
  return (
    <Tabs
      items={[
        (<div
          key="react"
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 15,
          }}
        >
          <ReactIcon />
          <span style={{ marginLeft: 6, marginBottom: 2 }}>React</span>
        </div>)
        ,
        (<div
          key="vue"
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 15,
          }}
        >
          <VueIcon />
          <span style={{ marginLeft: 6, marginBottom: 2 }}>Vue</span>
        </div>)
      ]}
    >
      {children}
    </Tabs>
  );
}


// eslint-disable-next-line react/display-name
FrameworkTabs.React = ({ children }: React.PropsWithChildren<any>) => {
  return <Tab key='react' value="0">{children}</Tab>
}

// eslint-disable-next-line react/display-name
FrameworkTabs.Vue = ({ children }: React.PropsWithChildren<any>) => {
  return <Tab key='vue' value="1">{children}</Tab>
}
