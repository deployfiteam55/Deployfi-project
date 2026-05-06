const SOL_PRICE_FEED =
  "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";

export const getLiveSOLPrice = async () => {
  try {
    const res = await fetch(
      `https://hermes.pyth.network/api/latest_price_feeds?ids[]=${SOL_PRICE_FEED}`
    );

    const data = await res.json();

    const raw = data[0].price;

    return {
      price: (raw.price * Math.pow(10, raw.expo)).toFixed(2),
      confidence: raw.conf,
      timestamp: raw.publish_time,
    };
  } catch (err) {
    console.error("Pyth Error:", err);
  }
};