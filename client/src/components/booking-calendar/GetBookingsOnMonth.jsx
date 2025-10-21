import { useEffect, useState } from "react";

export const useBookingsOnMonth = ({ month, year }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!month || !year) return; // avoid running with undefined

    setLoading(true);
    fetch(
      `http://localhost:5000/api/booking/bookings-by-month?year=${year}&month=${month}`
    )
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => setData(json.data || []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [month, year]); //refetch when month or year changes

  return { data, loading, error };
};
