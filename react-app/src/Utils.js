export const fetchStockChartData = async (ticker, dateRange = 0 ) => {
  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;
  const dateTo = new Date();
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - dateRange);
  const to = dateTo.toISOString().slice(0, 10);
  const from = dateFrom.toISOString().slice(0, 10);
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const fetchStockDetails = async (ticker) => {
    const apiKey = process.env.REACT_APP_POLYGON_API_KEY;
    const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;

}

export const addCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
