// Pure JS:
document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('accountList')
    .addEventListener('click', changeAccount);
  document.getElementById('userAddress').addEventListener('click', copyAddress);
  document.getElementById('transferFund').addEventListener('click', handler);

  document.getElementById('buyButton').addEventListener('click', buyToken);

  document
    .getElementById('header_network')
    .addEventListener('click', getOpenNetwork);

  document
    .getElementById('network_item')
    .addEventListener('click', getSelectedNetwork);

  document.getElementById('add_network').addEventListener('click', setNetwork);

  document.getElementById('loginAccount').addEventListener('click', loginUser);

  document
    .getElementById('accountCreate')
    .addEventListener('click', createUser);

  document.getElementById('openCreate').addEventListener('click', openCreate);

  document.getElementById('sign_up').addEventListener('click', signUp);
  document.getElementById('login_up').addEventListener('click', login);
  document.getElementById('logout').addEventListener('click', logout);

  document
    .getElementById('open_Transfer')
    .addEventListener('click', openTransfer);

  document.getElementById('goBack').addEventListener('click', goBack);

  document.getElementById('open_Import').addEventListener('click', openImport);

  document
    .getElementById('goBack_import')
    .addEventListener('click', importGoBack);

  document.getElementById('open_assets').addEventListener('click', openAssets);

  document
    .getElementById('open_activity')
    .addEventListener('click', openActivity);

  document.getElementById('goHomePage').addEventListener('click', goHomePage);

  document
    .getElementById('openAccountImport')
    .addEventListener('click', openImportModel);

  document
    .getElementById('close_import_account')
    .addEventListener('click', closeImportModel);

  document.getElementById('add_new_token').addEventListener('click', addToken);

  document
    .getElementById('add_New_Account')
    .addEventListener('click', addAcount);
});

let providerURL =
  'https://polygonzkevm-mainnet.g.alchemy.com/v2/T8kiU2dx5O-m1wApcEbS1fWosm61aLAR';

const allToken = [
  {
    name: 'MATIC',
    address: '0x0000000000000000000000000000000000001010',
    symbol: 'MATIC',
  },
  {
    name: '@NodeNinjas',
    address: '0xb309098bcB51E5C687a16FA41bD6055f47c9eBb0',
    symbol: 'TBC',
  },
];

let privateKey;
let address;

function buyToken() {
  window.location.href = 'https://faucet.polygon.technology/';
}

function handler() {
  document.getElementById('transfer_center').style.display = 'flex';

  const amount = document.getElementById('amount').value;
  const address = document.getElementById('address').value;

  p = 'f2211d726b37710b750fa80da41f73172853fa2ac82181aca2ff4233e3c6ce9f';
  a = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

  //PROVIDER
  const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mumbai.g.alchemy.com/v2/0awa485pp03Dww2fTjrSCg7yHlZECw-K'
  );

  let wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  };

  // var a = document.getElementById("link");
  // a.href = "somelink url";

  const url =
    'https://dinowallet-backend.onrender.com/api/v1/tokens/sendNotifiction';

  const data = {
    receiver: address,
    title: "Received Funds!",
    body: `You have received from ${ethers.utils.parseEther(amount)} from ${address}`,
    fromAddress: wallet,
  };

  // fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // }).then((response) => response.json())
  // .catch((error) => console.log(error));

  // wallet.sendTransaction(tx).then((txObj) => {
  //   console.log("txHash", txObj.hash);
  //   document.getElementById("transfer_center").style.display = "none";
  //   const a = document.getElementById("link");
  //   a.href = `https://mumbai.polygonscan.com/tx/${txObj.hash}`;
  //   document.getElementById("link").style.display = "block";
  // });
  var a = document.getElementById('link');
  a.href = 'somelink url';

  wallet.sendTransaction(tx).then((txObj) => {
    console.log('txHash', txObj.hash);
    document.getElementById('transfer_center').style.display = 'none';
    const a = document.getElementById('link');
    a.href = `https://mumbai.polygonscan.com/tx/${txObj.hash}`;
    document.getElementById('link').style.display = 'block';
  });
}

function checkBlance(address) {
  //PROVIDER
  const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mumbai.g.alchemy.com/v2/0awa485pp03Dww2fTjrSCg7yHlZECw-K'
  );
  provider.getBalance(address).then((balance) => {
    const balanceInEth = ethers.utils.formatEther(balance);

    console.log('MATIC', balanceInEth);

    document.getElementById(
      'accountBlance'
    ).innerHTML = `${balanceInEth} MATIC`;
    document.getElementById('userAddress').innerHTML = `${address.slice(
      0,
      15
    )}..`;
  });
}

function getOpenNetwork() {
  document.getElementById('network').style.display = 'block';
}

function getSelectedNetwork(e) {
  const element = document.getElementById('selected_network');
  element.innerHTML = e.target.innerHTML;

  if (e.target.innerHTML === 'Ethereum Mainnet') {
    providerURL =
      'https://eth-mainnet.g.alchemy.com/v2/opB4Iw25A0nPWESS7wHxPb_JKigMmAPD';
    document.getElementById('network').style.display = 'none';
  } else if (e.target.innerHTML === 'Polygon Mainnet') {
    providerURL = 'https://rpc.ankr.com/polygon';
    document.getElementById('network').style.display = 'none';
  } else if (e.target.innerHTML === 'Polygon Mumbai') {
    providerURL =
      'https://polygon-mumbai.g.alchemy.com/v2/0awa485pp03Dww2fTjrSCg7yHlZECw-K';
    document.getElementById('network').style.display = 'none';
  } else if (e.target.innerHTML === 'Goerli test network') {
    providerURL =
      'https://eth-goerli.g.alchemy.com/v2/cnURwhLXPAyeILTBwvvC3qw-iVg2VMmp';
    document.getElementById('network').style.display = 'none';
  } else if (e.target.innerHTML === 'Sepolia test network') {
    providerURL = 'https://rpc.ankr.com/eth_sepolia';
    document.getElementById('network').style.display = 'none';
  }

  console.log(providerURL);
}

function setNetwork() {
  document.getElementById('network').style.display = 'none';
}

function loginUser() {
  document.getElementById('createAccount').style.display = 'none';
  document.getElementById('LoginUser').style.display = 'block';
}

function createUser() {
  document.getElementById('createAccount').style.display = 'block';
  document.getElementById('LoginUser').style.display = 'none';
}

function openCreate() {
  document.getElementById('createAccount').style.display = 'none';
  document.getElementById('create_popUp').style.display = 'block';
}

function signUp() {
  const name = document.getElementById('sign_up_name').value;
  const email = document.getElementById('sign_up_email').value;
  const password = document.getElementById('sign_up_password').value;
  const passwordConfirm = document.getElementById(
    'sign_up_passwordConfirm'
  ).value;
  const aadhar = document.getElementById('sign_up_aadhar').value;
  const pancard = document.getElementById('sign_up_pancard').value;
  document.getElementById('field').style.display = 'none';
  document.getElementById('center').style.display = 'block';
  // console.log(name, email, password, passwordConfirm);

  const wallet = ethers.Wallet.createRandom();

  if (wallet.address) {
    console.log('address:', wallet.address);
    console.log('mnemonic:', wallet.mnemonic.phrase);
    console.log('privateKey:', wallet.privateKey);
    //API CALL
    const url = 'https://dinowallet-backend.onrender.com/api/v1/user/signup';
    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      aadhar: aadhar,
      pancard: pancard,
      address: wallet.address,
      private_key: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };

    console.log({ data });

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        document.getElementById('createdAddress').innerHTML = wallet.address;
        document.getElementById('createdPrivateKey').innerHTML =
          wallet.privateKey;
        document.getElementById('createdMnmonic').innerHTML =
          wallet.mnemonic.phrase;
        document.getElementById('center').style.display = 'none';
        document.getElementById('accountData').style.display = 'block';
        document.getElementById('sign_up').style.display = 'none';

        const userWallet = {
          address: wallet.address,
          private_key: wallet.privateKey,
          mnemonic: wallet.mnemonic.phrase,
        };
        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem('userWallet', jsonObj);
        document.getElementById('goHomePage').style.display = 'block';

        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
    //END OF API CALL
  }
}

function login() {
  document.getElementById('login_form').style.display = 'none';
  document.getElementById('center').style.display = 'block';
  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;

  //API CALL
  const url = 'https://dinowallet-backend.onrender.com/api/v1/user/login';
  const data = {
    email: email,
    password: password,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response data
      console.log(result.data.user);
      const userWallet = {
        address: result.data.user.address,
        private_key: result.data.user.private_key,
        mnemonic: result.data.user.mnemonic,
      };
      const jsonObj = JSON.stringify(userWallet);
      localStorage.setItem('userWallet', jsonObj);
      window.location.reload();
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });
  //END OF API CALL
}

function logout() {
  localStorage.removeItem('userWallet');
  window.location.reload();
}

function openTransfer() {
  document.getElementById('transfer_form').style.display = 'block';
  document.getElementById('home').style.display = 'none';
}

function goBack() {
  document.getElementById('transfer_form').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

function openImport() {
  document.getElementById('import_token').style.display = 'block';
  document.getElementById('home').style.display = 'none';
}

function importGoBack() {
  document.getElementById('import_token').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

function openActivity() {
  document.getElementById('activity').style.display = 'block';
  document.getElementById('assets').style.display = 'none';
}

function openAssets() {
  document.getElementById('activity').style.display = 'none';
  document.getElementById('assets').style.display = 'block';
}

function goHomePage() {
  document.getElementById('create_popUp').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

function openImportModel() {
  document.getElementById('import_account').style.display = 'block';
  document.getElementById('home').style.display = 'none';
}

function closeImportModel() {
  document.getElementById('import_account').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

function addToken() {
  const address = document.getElementById('token_address').value;
  const name = document.getElementById('token_name').value;
  const symbol = document.getElementById('token_symbol').value;

  //API CALL
  const url =
    'https://dinowallet-backend.onrender.com/api/v1/tokens/createtoken';
  const data = {
    name: name,
    address: address,
    symbol: symbol,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response data
      console.log(result.data.createToken);
      window.location.reload();
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });
  //END OF API CALL
}

function addAcount() {
  const privateKey = document.getElementById('add_account_private_key').value;
  const p = 'f2211d726b37710b750fa80da41f73172853fa2ac82181aca2ff4233e3c6ce9f';

  const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mumbai.g.alchemy.com/v2/0awa485pp03Dww2fTjrSCg7yHlZECw-K'
  );

  let wallet = new ethers.Wallet(privateKey, provider);

  console.log(wallet.address);

  //API CALL
  const url =
    'https://dinowallet-backend.onrender.com/api/v1/account/createaccount';
  const data = {
    privateKey: privateKey,
    address: wallet.address,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      // window.location.reload();
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });
  //END OF API CALL
}

function myFunction() {
  const str = localStorage.getItem('userWallet');
  const parsedObj = JSON.parse(str);

  if (parsedObj?.address) {
    document.getElementById('LoginUser').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    privateKey = parsedObj.private_key;
    address = parsedObj.address;

    checkBlance(parsedObj.address);
  }

  const tokenRender = document.querySelector('.assets');
  const accountRender = document.querySelector('.accountList');
  //API CALL

  fetch('https://dinowallet-backend.onrender.com/api/v1/tokens/alltoken')
    .then((response) => response.json())
    .then((data) => {
      let elements = '';
      data.data.tokens.map(
        (token) =>
          (elements += `
          <div class="assets_item">
          <img
            class="assets_item_img"
            src="./assets/dragon.png"
            alt=""
          />

          <span>${token.address.slice(0, 15)}...</span>

          <span>${token.symbol}</span>

        </div>
        `)
      );

      tokenRender.innerHTML = elements;
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });

  //END API CALL
  fetch('https://dinowallet-backend.onrender.com/api/v1/account/allaccount')
    .then((response) => response.json())
    .then((data) => {
      let accounts = '';
      data.data.accounts.map(
        (account, i) =>
          (accounts += `
             <div  class="lists">
                <p>${i + 1}</p>
                <p class="accountValue" data-address=${
                  account.address
                } data-privateKey=${account.privateKey}>${account.address.slice(
            0,
            25
          )}..</p>
              </div>
        `)
      );

      accountRender.innerHTML = accounts;
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });

  console.log(privateKey);
}

function copyAddress() {
  navigator.clipboard.writeText(address);
}

function changeAccount() {
  const data = document.querySelector('.accountValue');
  const address = data.getAttribute('data-address');
  const privateKey = data.getAttribute('data-privateKey');

  console.log(privateKey, address);
  const userWallet = {
    address: address,
    private_key: privateKey,
    mnemonic: 'Changed',
  };
  const jsonObj = JSON.stringify(userWallet);
  localStorage.setItem('userWallet', jsonObj);
  window.location.reload();
}

window.onload = myFunction;
