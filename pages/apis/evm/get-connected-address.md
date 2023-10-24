# getConnectedAddress

Get an ethereum address of connected account from local storage.

## Types

```ts
function getConnectedAddress(): `0x${string}` | null
```

## Example

```tsx filename="App.tsx" /getConnectedAddress/
import { connect, disconnect, getConnectedAddress } from '@joyid/evm'
export default function App() {
  const [address, setAddress] = React.useState<Address | null>(getConnectedAddress());
  const onConnect = async () => {
    try {
      const res = await connect();
      setAddress(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="app">
      {address ? (
        <>
          <h1 className="text-xl mb-4">{`Connected: ${address}`}</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              disconnect();
              setAddress(null);
            }}
          >
            Disconnect
          </button>
          <div className="divider" />
        </>
      ) : (
        <button className="btn btn-primary" onClick={onConnect}>
          Connect JoyID
        </button>
      )}
    </div>
  );
}
```
