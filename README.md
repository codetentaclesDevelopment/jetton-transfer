# Jetton Transfer

A library for transferring jettons in TON (The Open Network) using Node.js.

## Installation

First, install the package using npm:

```bash
npm install jetton-transfer 

Usage
Import the Library

import { sendJetton } from 'jetton-transfer';


Exlample
import { sendJetton } from 'jetton-transfer';

const mnemonic = "your mnemonic phrase here";
const fromWallet = "EQCKM7NhPW8y7Bg5wSpxMeEtkyaoxZUPXKZTYr2GnH_Tg_5d";
const toWallet = "0QDTdoOcmN44KWTToHvfQzZYzZHP4n3k9R5rEaRGc5fFXWOM";
const amount = "1"; // Amount in TON (will be converted to nano)
const jettonMasterAddress = "kQA6f2rGxoeh7TSY6d4POay_veD3RiZSOwTBsba09tMXzKWr";
const network = "mainnet"; // Can be "testnet" or "mainnet"

sendJetton(mnemonic, fromWallet, toWallet, amount, jettonMasterAddress, network)
  .then(() => {
    console.log('Jetton transfer successful');
  })
  .catch((error) => {
    console.error('Error during jetton transfer:', error);
  });

API

`sendJetton`

Transfers jettons from one wallet to another.

Parameters

mnemonic (string): The mnemonic phrase of the sender's wallet.

fromWallet (string): The address of the sender's wallet.

toWallet (string): The address of the recipient's wallet.

amount (string): The amount of jettons to transfer (in TON, will be converted to nano).

jettonMasterAddress (string): The address of the jetton master contract.

network (string): The network to use ("testnet" or "mainnet"). Defaults to "testnet".


Returns

A Promise that resolves when the transfer is complete.




Replace the placeholders like `"your mnemonic phrase here"` and the wallet addresses with the appropriate values. Also, make sure to update the GitHub URL with your actual repository link. This `README.md` provides a comprehensive guide on how to use, develop, and contribute to the `jetton-transfer` library.

