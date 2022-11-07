**WandyApi Backend**

1. **API List**
  1. createWallet(String mnemonic)
  2. getBalance(String walletAddress, String tokenAddress)
  3. transfer(String mnemonic, String tokenAddress, double amount, String toAddress)
  4. getNFTsByOwner(String walletAddress)
  5. transferNFT(String mnemonic, String tokenAddress, String tokenId, double amount, String toAddress)
  6. getEstimateGasFee(String fromAddress, String tokenAddress, double amount, String toAddress)

2. **firebase** - Build api on Google firebase cloud.
  
3. **aws** - Build api on aws or your own cloud.

  aws supports more apis, please check the codes.
  
  7.
  8.
  9.

You can choose **one of them** to be your own backend. 
Each one has the capacity to handle millions of users.

4. **How to call firebase api?** 
  Please check the demo codes.
   
5. **How to call aws api?**
  Please visit https://api.wandyapi.xyz

6. **How to install backend on firebase?**


7. **How to install backend on aws?**
