import * as React from 'react'
import { verifyTypedData, Hex } from 'viem'
import { useChainId, useSignTypedData } from 'wagmi'

const buildTypedData = (chainId: number) => {
  return {
    domain: {
      name: 'Ether Mail',
      version: '1',
      chainId,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    types: {
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
      ],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
      ],
    },
    primaryType: 'Mail',
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
  } as const
}

export const SignTypedData = ({ address }: { address?: Hex }) => {
  const [signature, setSignature] = React.useState<Hex>('0x')
  const { signTypedDataAsync } = useSignTypedData()
  const chainId = useChainId()
  const typedData = buildTypedData(chainId)
  const onSign = async () => {
    const sig = await signTypedDataAsync(typedData)
    setSignature(sig)
  }
  const onVerify = async () => {
    try {
      const res = await verifyTypedData({
        ...typedData,
        address: address!,
        signature,
      })
      alert(res)
    } catch (error: any) {
      alert(error.message)
    }
  }
  return address ? (
    <div className="w-full">
      <h2 className="mb-4 text-lg text-center">Sign Type Data</h2>
      <label className="label">Signature:</label>
      <textarea
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Signature"
        value={signature}
        disabled></textarea>

      <button className="btn btn-primary mb-4 mr-4" onClick={onSign}>
        Sign
      </button>

      <button className="btn btn-primary btn-outline mb-4" onClick={onVerify}>
        Verify
      </button>

      <div className="divider"></div>
    </div>
  ) : null
}
