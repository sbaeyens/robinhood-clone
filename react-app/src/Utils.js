export const fetchStockChartData = async (ticker, dateRange = 0, setState) => {
  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;
  const dateTo = new Date();
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - dateRange);
  const to = dateTo.toISOString().slice(0, 10);
  const from = dateFrom.toISOString().slice(0, 10);
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?apiKey=${apiKey}`;
  const response = await fetch(url);
    const data = await response.json();
    console.log("data from inside fetch function", data.results)
    console.log("setUseState from inside fetch fuction", setState)
    // setState(data.results)
  return data;
};
