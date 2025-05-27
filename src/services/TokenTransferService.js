import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

const USDT_MINT = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
const RPC_URL =
  "https://yolo-prettiest-daylight.solana-mainnet.quiknode.pro/936aa4affd3be470b2673cf5be2f50e295867270";

const TokenTransferService = {
  sendUSDT: async (wallet, recipientAddress, amount) => {
    try {
      if (!wallet.publicKey || !wallet.signTransaction) {
        throw new Error(
          "Wallet not connected or doesn't support required methods"
        );
      }

      const connection = new Connection(RPC_URL, "confirmed");

      // Convert amount to proper decimals (USDT has 6 decimals)
      const adjustedAmount = Math.floor(amount * 1000000);

      const mintPubkey = new PublicKey(USDT_MINT);
      const recipientPubkey = new PublicKey(recipientAddress);

      // Get the sender's ATA (Associated Token Account)
      const senderATA = await getAssociatedTokenAddress(
        mintPubkey,
        wallet.publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Get the recipient's ATA
      const recipientATA = await getAssociatedTokenAddress(
        mintPubkey,
        recipientPubkey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Check if recipient's ATA exists
      const recipientAccount = await connection.getAccountInfo(recipientATA);

      // Create transaction
      const transaction = new Transaction();

      // If recipient's ATA doesn't exist, create it
      if (!recipientAccount) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey, // payer
            recipientATA, // associatedToken
            recipientPubkey, // owner
            mintPubkey, // mint
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        );
      }

      // Add transfer instruction
      transaction.add(
        createTransferInstruction(
          senderATA, // source
          recipientATA, // destination
          wallet.publicKey, // owner
          adjustedAmount, // amount
          [], // multiSigners
          TOKEN_PROGRAM_ID
        )
      );

      // Get latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      // Sign and send transaction
      const signed = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());

      // Wait for confirmation
      await connection.confirmTransaction(signature);

      return {
        success: true,
        signature,
        amount: adjustedAmount,
      };
    } catch (error) {
      console.error("USDT transfer error:", error);
      throw error;
    }
  },

  sendBulkUSDT: async (wallet, distributions) => {
    try {
      if (!wallet.publicKey || !wallet.signTransaction) {
        throw new Error(
          "Wallet not connected or doesn't support required methods"
        );
      }

      const connection = new Connection(RPC_URL, "confirmed");
      const mintPubkey = new PublicKey(USDT_MINT);

      const senderATA = await getAssociatedTokenAddress(
        mintPubkey,
        wallet.publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const transaction = new Transaction();

      // Process each distribution
      for (const dist of distributions) {
        const recipientPubkey = new PublicKey(dist.wallet);
        const adjustedAmount = Math.floor(dist.price * 1000000); // USDT has 6 decimals

        // Get recipient's ATA
        const recipientATA = await getAssociatedTokenAddress(
          mintPubkey,
          recipientPubkey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );

        // Check if recipient's ATA exists
        const recipientAccount = await connection.getAccountInfo(recipientATA);

        // If recipient's ATA doesn't exist, create it
        if (!recipientAccount) {
          transaction.add(
            createAssociatedTokenAccountInstruction(
              wallet.publicKey, // payer
              recipientATA, // associatedToken
              recipientPubkey, // owner
              mintPubkey, // mint
              TOKEN_PROGRAM_ID,
              ASSOCIATED_TOKEN_PROGRAM_ID
            )
          );
        }

        // Add transfer instruction
        transaction.add(
          createTransferInstruction(
            senderATA, // source
            recipientATA, // destination
            wallet.publicKey, // owner
            adjustedAmount, // amount
            [], // multiSigners
            TOKEN_PROGRAM_ID
          )
        );
      }

      // Get latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      // Sign and send transaction
      const signed = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());

      // Wait for confirmation
      await connection.confirmTransaction(signature);

      return {
        success: true,
        signature,
      };
    } catch (error) {
      console.error("Bulk USDT transfer error:", error);
      throw error;
    }
  },
};

export default TokenTransferService;
