import { NFTStorage, File } from "nft.storage";

const NFT_STORAGE_KEY = "PASTE_YOUR_API_KEY";

export const uploadTokenToIPFS = async (imageFile, tokenInfo) => {
  try {
    const client = new NFTStorage({ token: NFT_STORAGE_KEY });

    const metadata = await client.store({
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      description: tokenInfo.description,
      image: new File([imageFile], "token.png", { type: "image/png" }),
    });

    return metadata.url;
  } catch (err) {
    console.error("IPFS Error:", err);
  }
};