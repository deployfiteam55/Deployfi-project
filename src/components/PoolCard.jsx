function PoolCard({ pool }) {
  return (
    <div>
      <h3>{pool.name}</h3>

      <p>APY: {pool.apy}</p>

      <p>Token: {pool.token}</p>
    </div>
  );
}

export default PoolCard;