const BrandArea = ({ data }) => {
  const { pre_title, title, text, brands } = data;

  return (
    <div className="edu-brand-area brand-area-1 gap-top-equal">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="brand-section-heading">
              <div
                className="section-title section-left"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <span className="pre-title">{pre_title}</span>
                <h3 className="title">{title}</h3>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
                <p>{text}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="brand-grid-wrap">
              {brands.map((b, i) => (
                <div key={i} className="brand-grid">
                  <img src={b} alt="Brand Logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandArea;
