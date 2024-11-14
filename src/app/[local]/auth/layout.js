import { Wrapper } from "@/layout";
import { useTranslations } from "next-intl";

const RootLayout = ({ children }) => {
  const t = useTranslations("auth");
  return (
    <Wrapper inSign={true} isSticky={false} hideFooter={true}>
      <section className="account-page-area section-gap-equal">
      <div className="container position-relative" style={{paddingTop:100}}>
          <div className="row g-5 justify-content-between">
            <div
              className="col-lg-6 order-card-2"
              style={{ position: "relative", zIndex: 99 }}
            >
              {children}
            </div>
            <div className="col-xl-4 col-lg-6 order-card-1">
              <div className="contact-us-info">
                <h3 className="heading-title">{t("welcome")}</h3>
                <ul className="address-list">
                  <li>
                    <h5 className="title">{t("ready")}</h5>
                    <p>{t("readyDesc")}</p>
                  </li>
                  <li>
                    <h5 className="title">{t("time")}</h5>
                    <p>{t("timeDesc")}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="shape-group">
            <li className="shape-1 scene">
              <img src="/assets/images/about/shape-07.png" alt="Shape" />
            </li>
            <li className="shape-2 scene">
              <img src="/assets/images/about/shape-13.png" alt="Shape" />
            </li>
            <li className="shape-3 scene">
              <img src="/assets/images/counterup/shape-02.png" alt="Shape" />
            </li>
          </ul>
        </div>
      </section>
    </Wrapper>
  );
};

export default RootLayout;
