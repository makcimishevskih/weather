export function getDayOfTheWeek(index) {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  return days[index];
}

export function getMonthName(monthNumber) {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return months[monthNumber];
}

export function getMonthCutName(monthNumber) {
  const months = [
    "Янв",
    "Февр",
    "Март",
    "Апр",
    "Май",
    "Июнь",
    "Июль",
    "Авг",
    "Сент",
    "Окт",
    "Нояб",
    "Дек",
  ];
  return months[monthNumber];
}

export function getCutWeekDay(weekDayNumber) {
  const weekDay = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  if (weekDayNumber < 0) weekDayNumber = weekDay.length - 1;

  return weekDay[weekDayNumber];
}

export function getWeekDay(weekDayNumber) {
  const weekDay = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  if (weekDayNumber < 0) weekDayNumber = weekDay.length - 1;

  return weekDay[weekDayNumber];
}

export function cutSyntaxMonth(month) {
  return (
    getMonthName(new Date(month).getMonth()).slice(
      0,
      getMonthName(new Date(month).getMonth()).length - 1
    ) + "я,"
  );
}

export function translateMoonPhase(phase) {
  switch (phase.toLowerCase()) {
    case "new moon":
      return "Новая Луна";
    case "first quarter":
      return "Первая четверть";
    case "full moon":
      return "Полная Луна";
    case "last quarter":
      return "Последняя четверть";
    case "waxing crescent":
      return "Растущая полумесяц";
    case "waxing gibbous":
      return "Растущая Луна";
    case "waning crescent":
      return "Убывающий полумесяц";
    default:
      return phase;
  }
}

export function translateWeatherCondition(condition) {
  switch (condition.toLowerCase()) {
    case "sunny":
      return "Солнечно";
    case "overcast":
      return "Пасмурно";

    case "light snow":
      return "Небольшой снег";
    case "heavy snow":
      return "Сильный снег";
    case "moderate snow":
      return "Снег";
    case "patchy moderate snow":
      return "Возможен снег";
    case "blowing snow":
      return "Снегопад";
    case "blizzard":
      return "Метель";
    case "moderate or heavy snow showers":
      return "Умеренный или сильный снегопад";
    case "light snow showers":
      return "Слабый снегопад";

    case "light sleet":
      return "Небольшой мокрый снег";
    case "light sleet showers":
      return "Небольшой дождь со снегом";

    case "moderate rain":
      return "Умеренный дождь";
    case "light breezing rain":
    case "light rain shower":
      return "Небольшой дождь";
    case "patchy rain possible":
      return "Возможен дождь";
    case "moderate or heavy rain with thunder":
      return "Умеренный или сильный дождь с громом";
    case "moderate or heavy rain shower":
      return "Умеренный или сильный дождь";
    case "thundery outbreaks possible":
      return "Возможен гром";

    case "cloudy":
      return "Облачно";
    case "partly cloudy":
      return "Местами облачно";

    case "mist":
      return "Туман";
    case "freezing fog":
      return "Ледяной туман";

    case "clear":
      return "Безоблачно";

    default:
      return condition;
  }
}

export function dayUVIndex(uv) {
  if (uv > -1 && uv < 3) {
    return "Низкий уровень излучения";
  } else if (uv > 2 && uv < 8) {
    return "Интенсивное излучение";
  } else if (uv > 7) {
    return "Очень высокий уровень излучения";
  }
  return "Уровень излучения не определён";
}

export const scrollToMyRef = (refEl, option) => {
  refEl.current.scrollIntoView(option);
};
