class NFTInfo {
  String title = "";
  String description = "";
  String tokenId = "";
  String image = "";
  String format = "";
  String contractAddress = "";
  double balance = 0.0;
  String tokenType = "";
  double price = 0.0;
  String externalUrl = "";

  NFTInfo(
      this.tokenType,
      this.title,
      this.description,
      this.tokenId,
      this.image,
      this.format,
      this.contractAddress,
      this.price,
      this.balance,
      this.externalUrl
      );
}