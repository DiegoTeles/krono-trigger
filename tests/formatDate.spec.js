const { formatDate } = require("../src/utils/formatDate");

test('Format Date: 20221206 -> 2022-12-06T03:00:00.000Z', () => {
  const dateString = '20221206';
  const result = formatDate(dateString);
  const expectedDate = new Date(2022, 11, 6);
  expect(result).toEqual(expectedDate);
});
