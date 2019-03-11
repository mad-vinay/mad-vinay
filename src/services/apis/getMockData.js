export const getMockData = fileName => {
  return import(`../../services/apis/mocks/${fileName}.json`);
};
