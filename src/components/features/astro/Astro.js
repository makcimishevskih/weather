import css from "./Astro.module.scss";

import earth from "@icons/earth.png";
import { translateMoonPhase } from "@helpers/helpers";

const Astro = ({ astro, borderRadius, backgroundColor }) => {
  function formatAstro(obj) {
    const sunrise = /PM/g.test(obj.sunrise)
      ? +obj.sunrise.slice(0, 2) + 12 + obj.sunrise.slice(2, 5)
      : obj.sunrise.slice(0, 5);

    const sunset = /PM/gi.test(obj.sunset)
      ? +obj.sunset.slice(0, 2) + 12 + obj.sunset.slice(2, 5)
      : obj.sunset.slice(0, 5);

    let moonrise = /PM/i.test(obj.moonrise)
      ? +obj.moonrise.slice(0, 2) + 12 + obj.moonrise.slice(2, 5)
      : obj.moonrise.slice(0, 5);

    let moonset = /No/i.test(obj.moonset)
      ? obj.moonrise.slice(0, obj.moonrise.length - 3)
      : +obj.moonrise.slice(0, 2) + 12 + obj.moonrise.slice(2, 5);

    const riseH = +sunrise.slice(0, 2);
    const setH = +sunset.slice(0, 2);
    const riseM = +sunrise.slice(3, 5);
    const setM = +sunset.slice(3, 5);

    let diffM = setM - riseM;
    let resH = setH - riseH;
    let resM = 60;

    if (diffM < 0) {
      resH--;
      resM += diffM;
    } else {
      diffM < 10 ? (resM = `0${diffM}`) : (resM = diffM);
    }

    return {
      sunrise,
      sunset,
      moonset,
      moonrise,
      moonIllumination: obj.moon_illumination,
      moonPhase: obj.moon_phase,
      dayLight: `${resH} ч ${resM} мин`,
    };
  }

  const { sunset, sunrise, dayLight, moonPhase, moonIllumination } =
    formatAstro(astro);

  const borderStyle = borderRadius ? { borderRadius: "8px" } : undefined;

  const backgroundStyle = backgroundColor
    ? {
        background:
          "linear-gradient(180deg, rgba(246, 246, 246, 0.2),  rgba(224, 247, 247, 0.8), rgb(177, 234, 246)",
      }
    : undefined;

  const styles = { ...backgroundStyle, ...borderStyle };

  return (
    <div className={css.dayLightHours} style={styles}>
      <div className={css.title}>
        <h4 className={css.dayLight}>Световой день</h4>
        <div className={css.dayLightTime}> {dayLight}</div>
      </div>
      <div className={css.timeWrapper}>
        <div className={css.sunrise}>{sunrise}</div>
        <div className={css.earth}>
          <img src={earth} alt="Earth" />
        </div>
        <div className={css.sunset}>{sunset}</div>
      </div>
      <div className={css.dayLightHoursInfo}>
        <p>
          {moonPhase
            ? translateMoonPhase(moonPhase)
            : translateMoonPhase(astro.moonPhase)}
        </p>
        <p>
          Процент освещения луны{" "}
          {moonIllumination ? moonIllumination : astro.moonIllumination}
        </p>
      </div>
      <div className={css.circle1}></div>
      <div className={css.circle2}></div>
    </div>
  );
};

export default Astro;
