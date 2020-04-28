const formatValue = (value: number): string => {
  const formattedNumber = value
    ? Intl.NumberFormat(['en'], {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    : '';
  return formattedNumber;
};

export default formatValue;
