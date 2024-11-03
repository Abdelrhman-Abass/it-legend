import { Wrapper } from "@/layout";

const RootLayout = ({ children }) => {
  return (
    <Wrapper inSign={true} isSticky={false} hideFooter={true}>
      <section className="account-page-area section-gap-equal">
        <div className="container position-relative">
          <div className="row g-5 justify-content-between">
            <div
              className="col-lg-6 order-card-2"
              style={{ position: "relative", zIndex: 99 }}
            >
              {children}
            </div>
            <div className="col-xl-4 col-lg-6 order-card-1">
              <div className="contact-us-info">
                <h3 className="heading-title">مرحبا بك ي صديقي</h3>
                <ul className="address-list">
                  <li>
                    <h5 className="title">مستعد؟</h5>
                    <p>هل انت مستعد لمواكبة سوق العمل التي سوف نوفرها لك؟</p>
                  </li>
                  <li>
                    <h5 className="title">الوقت</h5>
                    <p>كل ماهو عليك ان توفر وقت وسوف نطور مستواك</p>
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
