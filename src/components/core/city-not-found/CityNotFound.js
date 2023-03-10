import css from "./CityNotFound.module.scss";

const CityNotFound = () => {
  return (
    <h2 className={css.notFoundTitle}>По вашему запросу ничего не нашлось</h2>
  );
};

export default CityNotFound;
