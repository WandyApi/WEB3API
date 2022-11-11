## WandyApi Backend

1. **API List**  
<pre>
  (1) createWallet(String mnemonic)  
  (2) getBalance(String walletAddress, String tokenAddress)  
  (3) transfer(String mnemonic, String tokenAddress, double amount, String toAddress)  
  (4) getNFTsByOwner(String walletAddress)  
  (5) transferNFT(String mnemonic, String tokenAddress, String tokenId, double amount, String toAddress)  
  (6) getEstimateGasFee(String fromAddress, String tokenAddress, double amount, String toAddress)</pre>

2. **firebase** - Build Node.js api on Google firebase cloud.  
   Important: Please create a config file **$\color[RGB]{255,66,66}.env$** in firebase/functions  
   *RPC_API_KEY_SOLANA="xxxxxxxxxx"  
   RPC_API_KEY_ETHEREUM="xxxxxxxxxx"  
   RPC_API_KEY_ETHEREUMPOW="xxxxxxxxxx"  
   NFT_API_KEY_SOLANA="xxxxxxxxxx"  
   NFT_API_KEY_BINANCE="xxxxxxxxxx"  
   NFT_API_KEY_ETHEREUM="xxxxxxxxxx"*  
   ![.env](images/png.env.png)
   
  
3. **aws** - Build api on aws or your own cloud.  
  aws supports more apis, please check the codes.
    
  You can choose $\color[RGB]{255,66,66} One Of Them$ to be your own backend.   
  Each one has the capacity to handle millions of users.

4. **How to call api on firebase?**  
  Please check the demo codes.
   
5. **How to call api on aws?**  
  Coming soon ...

6. **How to install backend on firebase?**  
  https://firebase.google.com/docs/functions/get-started

7. **How to install backend on aws?**  
  Coming soon ...

8. **Seeds Phrase**  
  The Seeds Phrase is used to generate wallet address & make transfers of token and nft on the server-side.  
  We recommend using a Secret Manager to secure your Seeds Phrase or Private Key.  
  -- Google Cloud Secret Manager  
  -- AWS Secrets Manager  
  -- Doppler  
  -- HashiCorp Vault
