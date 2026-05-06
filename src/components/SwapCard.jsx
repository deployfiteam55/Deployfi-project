function SwapCard({ quote }) {
  return (
    <div>
      <h2>Jupiter Quote</h2>

      <p>Route: {quote?.route}</p>

      <p>
        Output: {quote?.outAmountFormatted} USDC
      </p>
    </div>
  );
}

export default SwapCard;