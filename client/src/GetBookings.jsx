import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const GetBookings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/booking/all-bookings`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => setData(json.data || []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
