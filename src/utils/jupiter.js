const SOL_MINT =
  "So11111111111111111111111111111111111111112";

const USDC_MINT =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const getSwapQuote = async () => {
  try {
    const amount = 100000000; // 0.1 SOL

    const url =
      `https://lite-api.jup.ag/swap/v1/quote` +
      `?inputMint=${SOL_MINT}` +
      `&outputMint=${USDC_MINT}` +
      `&amount=${amount}` +
      `&slippageBps=50`;

    const res = await fetch(url);

    const data = await res.json();

    console.log("Raw Jupiter Data:", data);

    return {
      inAmount: data.inAmount,
      outAmount: data.outAmount,
      outAmountFormatted: (
        Number(data.outAmount) / 1000000
      ).toFixed(2),
      route:
        data.routePlan?.[0]?.swapInfo?.label || "Unknown",
    };
  } catch (err) {
    console.error("Jupiter Error:", err);
  }
};