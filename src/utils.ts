import { TonClient, beginCell, Address } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

export async function getJettonWalletAddress(client: TonClient, ownerAddress: string, jettonMasterAddress: string): Promise<string> {
  const result = await client.runMethod(
    Address.parse(jettonMasterAddress),
    "get_wallet_address",
    [{
      type: "slice",
      cell: beginCell()
        .storeAddress(Address.parse(ownerAddress))
        .endCell(),
    }]
  );
  return result.stack.readAddress().toString();
}

export async function initializeClient(network: 'testnet' | 'mainnet'): Promise<TonClient> {
  const endpoint = await getHttpEndpoint({ network });
  return new TonClient({ endpoint });
}
