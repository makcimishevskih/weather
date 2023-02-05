import css from "./THead.module.scss";
import { getWeekDay, cutSyntaxMonth, scrollToMyRef } from "@helpers/helpers.js";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const Thead = ({ day }) => {
  const { hash } = useLocation();
  const tableRef = useRef(null);

  useEffect(() => {
    let timerId;
    if (hash && day.date && day.date === hash.slice(1, hash.length - 1))
      timerId = setTimeout(
        () =>
          scrollToMyRef(tableRef, {
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          }),
        300
      );
    return () => {
      clearTimeout(timerId);
    };
  }, [hash]);

  const thText = [
    "Давление, мм рт. ст",
    "Влажность",
    "Ветер, м/с",
    "Ощущается как",
  ];

  const thEl = thText.map((text) => <th key={text}>{text}</th>);

  const today = {
    date: new Date().getDate(),
    week: getWeekDay(new Date().getMonth()),
  };

  const tomorrow = {
    date: new Date().getDate() + 1,
  };

  const date = new Date(day.date).getDate();
  let weekDay = getWeekDay(new Date(day.date).getDay());
  const month = cutSyntaxMonth(day.date);

  if (today.date === date) {
    weekDay = "Сегодня";
  }
  if (tomorrow.date === date) {
    weekDay = "Завтра";
  }

  const dateColorStyle =
    weekDay === "Сегодня" || weekDay === "Завтра"
      ? { color: "red" }
      : { color: "black" };

  return (
    <thead className={css.thead} ref={tableRef} id={day.date}>
      <tr>
        <th colSpan="3">
          <h2 className={css.title} style={dateColorStyle}>
            {date}
            <div>
              <span>{month}</span>
              <span>{weekDay}</span>
            </div>
          </h2>
        </th>
        {thEl}
      </tr>
    </thead>
  );
};

export default Thead;
