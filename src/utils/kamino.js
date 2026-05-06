export const getBestYieldPools = async () => {
  try {
    const res = await fetch(
      "https://api.kamino.finance/strategies"
    );

    const data = await res.json();

    console.log("Raw Kamino Data:", data);

    return data.slice(0, 5).map((pool) => ({
      name: pool.strategyName || "Unknown",
      apy: pool.apy || 0,
    }));
  } catch (err) {
    console.error("Kamino Error:", err);
  }
};