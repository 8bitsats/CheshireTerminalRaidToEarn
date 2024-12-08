import { Connection, PublicKey } from "@solana/web3.js";
import { WALLET_CONSTANTS } from './constants';

const connection = new Connection(WALLET_CONSTANTS.HELIUS_RPC_URL);

export const getGrinBalance = async (walletAddress: string): Promise<number> => {
  try {
    const GRIN_MINT = new PublicKey("GRiNKnzCkhgVHVbjYi9RkzV4SqVWVuHSpk6CQhuTxwh3");
    
    // Get all token accounts for the wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(walletAddress),
      { mint: GRIN_MINT }
    );

    // Sum up the balance from all accounts
    let totalBalance = 0;
    for (const account of tokenAccounts.value) {
      const tokenAmount = account.account.data.parsed.info.tokenAmount;
      totalBalance += Number(tokenAmount.amount) / Math.pow(10, tokenAmount.decimals);
    }

    return totalBalance;
  } catch (error) {
    console.error('Error fetching GRIN balance:', error);
    throw error;
  }
};

export const getCheshireBalance = async (): Promise<number> => {
  try {
    const response = await connection.getBalance(new PublicKey(WALLET_CONSTANTS.CHESHIRE_WALLET));
    return response / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching Cheshire balance:', error);
    throw error;
  }
};