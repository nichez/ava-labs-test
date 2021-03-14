import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useBookSearch(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setCrypto([]);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=${pageNumber}&sparkline=true`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setCrypto((prevCrypto) => {
          return [
            ...new Set([...prevCrypto, ...res.data.map((crypto) => crypto)]),
          ];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, crypto, hasMore };
}
