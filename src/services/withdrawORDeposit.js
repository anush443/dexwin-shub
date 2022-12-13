const popluarabi = require("./ABI.json");
const erc20abi = require("./erc20.json");
const Web3 = require("web3");
//const ethers = require("ethers");
const privtekey =
  "1941513d63965c36deed9900ac8449315645848df2a5eea731ec590f14d005fa";
const contractAddress = "0x895d947674Db8819Db32A1eb6510A0febDbf22b6"; //"0xd3b3f6540704e0e1bc42204250a8c29a584324a8";
const erc20addresss = "0x5542d426446Bc1A4Bc92990297d2CCF5228FC477";
const url =
  "https://wandering-sparkling-ensemble.matic-testnet.discover.quiknode.pro/ba4696ce9640d389c8492143fe155d61ac971f31/";
let web3;
let web3New = new Web3(
  window.ethereum
  //url
);
let sigUtil = require("eth-sig-util");
const { Biconomy } = require("@biconomy/mexa");
const Contract = {
  address: "0x953060B762c8aa151D00f014b19EE86F8e71F732",
  //"0x1c77930fEED5580431679066D260348E91B05D72",
  //"0x94c0104e7a296efde81cb69e2a5295a675e594b8",
  //"0x3Bfff6a44BbEd2956601aC33000bfa745565CaD6",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address payable",
          name: "relayerAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "functionSignature",
          type: "bytes",
        },
      ],
      name: "MetaTransactionExecuted",
      type: "event",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "balance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "claim",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "a",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "deposit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "functionSignature",
          type: "bytes",
        },
        {
          internalType: "bytes32",
          name: "sigR",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "sigS",
          type: "bytes32",
        },
        {
          internalType: "uint8",
          name: "sigV",
          type: "uint8",
        },
      ],
      name: "executeMetaTransaction",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "getNonce",
      outputs: [
        {
          internalType: "uint256",
          name: "nonce",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "palcebet",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "quote",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

const domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const metaTransactionType = [
  { name: "nonce", type: "uint256" },
  { name: "from", type: "address" },
  { name: "functionSignature", type: "bytes" },
];

let domainData = {
  name: "TestContract",
  version: "1",
  verifyingContract: Contract.address,
};

var selectedAddress = "";

var metaTxEnabled = true;
let contract1;
let transactionHash;

// Initialize Biconomy
export async function initBiconomy() {
  if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
    // Ethereum user detected. You can now use the provider.
    const provider = window["ethereum"];
    await provider.enable();
    if (provider.networkVersion == "80001") {
      domainData.chainId = 80001;
      const biconomy = new Biconomy(provider, {
        apiKey: process.env.REACT_APP_BICONOMY_API_KEY,
        //"O3-IjZClP.ce1ab5be-6f1d-4355-a450-f6a553818f12"//"MublK0H-b.864389b3-e421-4ddb-b56b-e5a1bca3e109"
        debug: true,
      });
      web3 = new Web3(biconomy);

      biconomy
        .onEvent(biconomy.READY, () => {
          // Initialize your dapp here like getting user accounts etc
          contract1 = new web3.eth.Contract(Contract.abi, Contract.address);
          selectedAddress = provider.selectedAddress;
          // getQuoteFromNetwork();
          provider.on("accountsChanged", function (accounts) {
            selectedAddress = accounts[0];
          });
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
        });
        console.log('initalization complete');
     
    } else {
    }
  } else {
  }
}

const onBiconomy = async (amount) => {
  if (contract1) {
    transactionHash = "";
    if (metaTxEnabled) {
      let userAddress = selectedAddress;
      let nonce = await contract1.methods.getNonce(userAddress).call();
      amount = web3.utils.toBN(amount).toString();
      amount = web3.utils.toWei(amount, "ether");

      let functionSignature = contract1.methods
        .deposit("0x953060B762c8aa151D00f014b19EE86F8e71F732", amount)
        .encodeABI();
      let message = {};
      message.nonce = parseInt(nonce);
      message.from = userAddress;
      message.functionSignature = functionSignature;

      const dataToSign = JSON.stringify({
        types: {
          EIP712Domain: domainType,
          MetaTransaction: metaTransactionType,
        },
        domain: domainData,
        primaryType: "MetaTransaction",
        message: message,
      });

      web3.currentProvider.send(
        {
          jsonrpc: "2.0",
          id: 999999999999,
          method: "eth_signTypedData_v4",
          params: [userAddress, dataToSign],
        },
        function (error, response) {
          if (error || (response && response.error)) {
            alert("Could not get user signature. Please retry!");
          } else if (response && response.result) {
            let { r, s, v } = getSignatureParameters(response.result);

            return sendSignedTransaction(
              userAddress,
              functionSignature,
              r,
              s,
              v
            );
          }
        }
      );

      console.log('tx complete')
    } else {
      contract1.methods
        .transferer20("0x94c0104e7a296efde81cb69e2a5295a675e594b8", "1")
        .send({ from: selectedAddress })
        .on("transactionHash", function (hash) {})
        .once("confirmation", function (confirmationNumber, receipt) {
          var transactionHash = receipt.transactionHash;
        });
    }
  } else {
  }
};

const onBiconomy1 = async (address, amount) => {
  if (contract1) {
    transactionHash = "";
    if (metaTxEnabled) {
      let userAddress = selectedAddress;
      let nonce = await contract1.methods.getNonce(userAddress).call();
      amount = web3.utils.toBN(amount).toString();
      amount = web3.utils.toWei(amount, "ether");

      // let functionSignature = contract1.methods.transfertouser(
      // 	address,
      // 	//"0x94c0104e7a296efde81cb69e2a5295a675e594b8",
      // 	amount
      // 	).encodeABI();
      //let functionSignature = contract.methods.placebet("1","1","324","0","moneyline","278").encodeABI();
      let functionSignature = contract1.methods.withdraw(amount).encodeABI();

      let message = {};
      message.nonce = parseInt(nonce);
      message.from = userAddress;
      message.functionSignature = functionSignature;

      const dataToSign = JSON.stringify({
        types: {
          EIP712Domain: domainType,
          MetaTransaction: metaTransactionType,
        },
        domain: domainData,
        primaryType: "MetaTransaction",
        message: message,
      });

      web3.currentProvider.send(
        {
          jsonrpc: "2.0",
          id: 999999999999,
          method: "eth_signTypedData_v4",
          params: [userAddress, dataToSign],
        },
        function (error, response) {
          if (error || (response && response.error)) {
            alert("Could not get user signature. Please retry!");
          } else if (response && response.result) {
            let { r, s, v } = getSignatureParameters(response.result);
            console.log("running status")
            return sendSignedTransaction(
              userAddress,
              functionSignature,
              r,
              s,
              v
            );
          }
        }
      );
    } else {
      contract1.methods
        .transferer20("0x94c0104e7a296efde81cb69e2a5295a675e594b8", "1")
        .send({ from: selectedAddress })
        .on("transactionHash", function (hash) {})
        .once("confirmation", function (confirmationNumber, receipt) {
          var transactionHash = receipt.transactionHash;
        });
    }
  } else {
  }
};

const sendSignedTransaction = async (userAddress, functionData, r, s, v) => {
  if (web3 && contract1) {
    try {
      let gasLimit = await contract1.methods
        .executeMetaTransaction(userAddress, functionData, r, s, v)
        .estimateGas({ from: userAddress });
      let gasPrice = await web3.eth.getGasPrice();

      let tx = contract1.methods
        .executeMetaTransaction(userAddress, functionData, r, s, v)
        .send({
          from: userAddress,
          gasPrice: gasPrice,
          gasLimit: gasLimit,
        });

      tx.on("transactionHash", function (hash) {}).once(
        "confirmation",
        function (confirmationNumber, receipt) {
          transactionHash = receipt.transactionHash;

          return {
            status: "success",
            message: "Transaction confirmed on chain",
            hash: transactionHash,
          };
        }
      );
    } catch (error) {}
  }
};

const getSignatureParameters = (signature) => {
  if (!web3.utils.isHexStrict(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = web3.utils.hexToNumber(v);
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v,
  };
};

async function getAccount() {
  if (window.ethereum) {
    await window.ethereum.send("eth_requestAccounts");
    window.web3 = new Web3(window.ethereum);
    var accounts = await window.web3.eth.getAccounts();

    return accounts[0];
  } else {
    return "Not Connected";
  }
}

var contractNEW = new web3New.eth.Contract(popluarabi, contractAddress);
var ERC = new web3New.eth.Contract(erc20abi, erc20addresss);

const init = async (accounts) => {
  let initbla = await ERC.methods.balanceOf(accounts).call();
};

const approve = async (amount, accounts) => {
  const appr1 = await ERC.methods
    .approve(contractAddress, amount)
    .send({ from: accounts, gasLimit: 300000 });
};

initBiconomy();

export const deposit1 = async (amount) => {
  try {
    const accountsNew = await getAccount([0]);
    const amountnew = web3.utils.toWei(amount);
    const createReceipt = await ERC.methods
      .approve("0x953060b762c8aa151d00f014b19ee86f8e71f732", amountnew)
      .send({ from: accountsNew, gasLimit: 300000 });
    const biconomy = await onBiconomy(amount);

    if (createReceipt) {
      return createReceipt;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const withdraw1 = async (value) => {
  try {
    const accountsNew = await getAccount([0]);
    const biconomy = await onBiconomy1(accountsNew, value * 1 ** 18);

    const amount = Number(0 * 1e18).toFixed(0);
    const data = await ERC.methods
      .approve("0x953060b762c8aa151d00f014b19ee86f8e71f732", amount)
      .encodeABI();
    const createTransaction = await web3New.eth.accounts.signTransaction(
      {
        from: accountsNew,
        to: erc20addresss,
        data: data,
        gas: "500000",
      },
      privtekey // private key variable
    );
    const createReceipt = await web3New.eth.sendSignedTransaction(
      createTransaction.rawTransaction
    );

    if (createReceipt) {
      return createReceipt;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
