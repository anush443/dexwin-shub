import axios from "axios";
let baseurl = process.env.REACT_APP_BASE_URL;

  export const connectWalletAddress = async (address, ref) => {

    const response = await axios
    .post(`${baseurl}/api/user/connect-wallet?walletAddress=${address}`,{body: {id: ref, ethAddress:address }})
    .then(_res => console.log('Connect Successful'))
    .catch((error) => console.log('Error: ', error));

    if (response && response) {
      console.log(response);
      console.log(response.data);
    }
  }




