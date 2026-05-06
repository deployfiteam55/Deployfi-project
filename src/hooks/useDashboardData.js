import { useEffect, useState } from "react";

import { fetchDashboardData } from "../services/defiService";

export const useDashboardData = () => {
  const [price, setPrice] = useState(null);
  const [pools, setPools] = useState([]);
  const [quote, setQuote] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await fetchDashboardData();

      setPrice(data.price);
      setPools(data.pools);
      setQuote(data.quote);

      setError(null);
    } catch (err) {
      console.error(err);

      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // auto refresh every 30 seconds
    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    price,
    pools,
    quote,
    loading,
    error,
    refresh: loadData,
  };
};