import css from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.copyright}>Copyright © Weather API</div>
    </footer>
  );
};

export default Footer;
