import { getLiveSOLPrice } from "../utils/pyth";
import { getBestYieldPools } from "../utils/kamino";
import { getSwapQuote } from "../utils/jupiter";

export const fetchDashboardData = async () => {
  try {
    const [price, pools, quote] = await Promise.all([
      getLiveSOLPrice(),
      getBestYieldPools(),
      getSwapQuote(),
    ]);

    return {
      price,
      pools,
      quote,
    };
  } catch (err) {
    console.error("Dashboard Error:", err);
  }
};
