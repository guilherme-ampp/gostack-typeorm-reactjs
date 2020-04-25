const formatValue = (value: number): string => {
  const formattedNumber = value
    ? Intl.NumberFormat(['pt-BR'], {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
    : '';
  return formattedNumber;
};

export default formatValue;
