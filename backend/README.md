## WandyApi Backend

1. **API List**  
  (1) *createWallet(String mnemonic)*  
  (2) *getBalance(String walletAddress, String tokenAddress)*  
  (3) *transfer(String mnemonic, String tokenAddress, double amount, String toAddress)*  
  (4) *getNFTsByOwner(String walletAddress)*  
  (5) *transferNFT(String mnemonic, String tokenAddress, String tokenId, double amount, String toAddress)*  
  (6) *getEstimateGasFee(String fromAddress, String tokenAddress, double amount, String toAddress)*  

2. **firebase** - Build api on Google firebase cloud.  
   Please create a config file **.env** in firebase/functions  
   *RPC_API_KEY_SOLANA="xxxxxxxxxx"  
   RPC_API_KEY_ETHEREUM="xxxxxxxxxx"  
   RPC_API_KEY_ETHEREUMPOW="xxxxxxxxxx"  
   NFT_API_KEY_SOLANA="xxxxxxxxxx"  
   NFT_API_KEY_BINANCE="xxxxxxxxxx"  
   NFT_API_KEY_ETHEREUM="xxxxxxxxxx"*  
   ![.env](images/png.env.png)
   
  
3. **aws** - Build api on aws or your own cloud.  
  aws supports more apis, please check the codes.
    
  You can choose $\color[RGB]{255,66,66} one of them$ to be your own backend.   
  Each one has the capacity to handle millions of users.

4. **How to call api on firebase?**  
  Please check the demo codes.
   
5. **How to call api on aws?**  

6. **How to install backend on firebase?**  
  https://firebase.google.com/docs/functions/get-started

7. **How to install backend on aws?**
