function formatDate(dateString) {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6) - 1;
  const day = dateString.substring(6, 8);

  return new Date(year, month, day);
}

module.exports = { formatDate };
