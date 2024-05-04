class AlchemyClient {
  private clientSecret;
  private clientKey;

  constructor() {
    this.clientKey = process.env.ALCHEMY_CLIENT_KEY;
    this.clientSecret = process.env.ALCHEMY_CLIENT_SECRET;
  }
}
