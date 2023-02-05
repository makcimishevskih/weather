export const validateCityName = (city) => {
  if (!city.trim()) {
    return "Введите название города";
  }
  return "";
};
