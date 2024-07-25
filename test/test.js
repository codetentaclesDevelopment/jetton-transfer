const { sendJetton } = require('../dist/index');

const mnemonic = "candy elite ability tumble miracle luggage energy budget pluck snap engage season neglect uniform bamboo sausage guess uncover rebel narrow option obtain path jeans";
const fromWallet = "EQCKM7NhPW8y7Bg5wSpxMeEtkyaoxZUPXKZTYr2GnH_Tg_5d";
const toWallet = "0QDTdoOcmN44KWTToHvfQzZYzZHP4n3k9R5rEaRGc5fFXWOM";
const amount = "1"; // Amount in TON (will be converted to nano)
const jettonMasterAddress = "kQA6f2rGxoeh7TSY6d4POay_veD3RiZSOwTBsba09tMXzKWr";
const network = "testnet"; // Can be "testnet" or "mainnet"

sendJetton(mnemonic, fromWallet, toWallet, amount, jettonMasterAddress, network)
  .then(() => {
    console.log('Jetton transfer successful');
  })
  .catch((error) => {
    console.error('Error during jetton transfer:', error);
  });