# initConfig

Config your app name and logo, and the JoyID wallet URL you want to connect to.

## Types

```ts
function initConfig(config?: DappConfig): DappConfig
```

### DappConfig

```ts
interface DappConfig {
  /**
   * The name of your app
   */
  name?: string
  /**
   * The logo of your app
   */
  logo?: string
  /**
   * The URL of JoyID app url that your app is integrated with, defaults to https://testnet.joyid.dev
   */
  joyidAppURL?: string
}
```
