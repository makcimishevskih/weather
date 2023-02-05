import css from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={css.footer}>
      FOOTER
      <div className={css.copyright}>Copyright © Weather API</div>
      <ul className={css.footerList}>
        <li className={css.footerItem}>
          <a className={css.footerLink}>
            <img src="" alt="github-logo-link" />
            GITHUB
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
