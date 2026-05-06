function PriceCard({ price }) {
  return (
    <div>
      <h2>Pyth Price Feed</h2>

      <p>SOL Price: ${price?.price}</p>

      <p>Confidence: {price?.confidence}</p>
    </div>
  );
}

export default PriceCard;