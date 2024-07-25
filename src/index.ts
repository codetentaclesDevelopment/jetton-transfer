import { WalletContractV4, internal, Address, beginCell, toNano } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { getJettonWalletAddress, initializeClient } from "./utils";

export async function sendJetton(
  mnemonic: string,
  fromWallet: string,
  toWallet: string,
  amount: string,
  jettonMasterAddress: string,
  network: 'testnet' | 'mainnet' = 'testnet'
): Promise<void> {
  try {
    // Initialize TON Client
    const client = await initializeClient(network);

    // Load sender's wallet
    const key = await mnemonicToPrivateKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    const walletContract = client.open(wallet);

    // Get the sender's jetton wallet address
    const jettonWalletAddress = await getJettonWalletAddress(client, fromWallet, jettonMasterAddress);
    const destinationAddress = Address.parse(toWallet);

    const forwardPayload = beginCell()
        .storeUint(0, 32) // 0 opcode means we have a comment
        .storeStringTail('Jetton transfer')
        .endCell();

    const body = beginCell()
        .storeUint(0xf8a7ea5, 32) // opcode for jetton transfer
        .storeUint(0, 64) // query id
        .storeCoins(toNano(amount)) // jetton amount
        .storeAddress(destinationAddress) // TON wallet destination address
        .storeAddress(Address.parse(fromWallet)) // response excess destination
        .storeBit(0) // no custom payload
        .storeCoins(0) // forward amount (if >0, will send notification message)
        .storeBit(1) // we store forwardPayload as a reference
        .storeRef(forwardPayload)
        .endCell();

    // Prepare the transaction
    const seqno = await walletContract.getSeqno();
    const transfer = walletContract.createTransfer({
      seqno,
      secretKey: key.secretKey,
      messages: [
        internal({
          to: jettonWalletAddress,
          value: toNano(0.05), // for commission fees, excess will be returned
          body: body,
        })
      ],
    });

    // Send the transaction
    const result = await client.sendExternalMessage(wallet, transfer);
    console.log("Transaction done it will reflect 1-2 minutes check following link :", network==='testnet'? `https://testnet.tonviewer.com/${fromWallet}` :`https://tonviewer.com/${fromWallet}`);

  } catch (error) {
    console.error("Error in sendJetton:", error);
  }
}
