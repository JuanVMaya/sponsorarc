const toHumanReadableNumbers = (num) => {
  const numInt = parseInt(num);

  if (numInt >= 1000000000) {
    return (numInt / 1000000000).toFixed(2) + "B";
  }
  if (numInt >= 1000000) {
    return (numInt / 1000000).toFixed(2) + "M";
  }
  if (numInt >= 1000) {
    return (numInt / 1000).toFixed(2) + "K";
  }
  return numInt.toString();
};

module.exports = { toHumanReadableNumbers };
