export const mapCurrencyData = (apiResponse) => {
  const result = [];

  for (const [date, valueObject] of Object.entries(apiResponse)) {
    const value = Object.values(valueObject)[0];
    result.push({
      date,
      value: parseFloat(value).toFixed(2),
    });
  }

  return result;
};
