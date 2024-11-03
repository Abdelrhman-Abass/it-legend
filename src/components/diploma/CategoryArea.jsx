import React from "react";

function FeatureBox({ delay, icon, color, title, text }) {
  return (
    <div
      className="col-lg-4 col-md-6"
      data-aos-delay={delay}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className={`features-box features-style-4 ${color}`}>
        <div className="icon">
          <i className={`icon-${icon}`}></i>
        </div>
        <div className="content">
          <h5 className="title">{title}</h5>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

const CategoryArea = () => {
  return (
    <div className="features-area-4">
      <div className="container">
        <div
          className="section-title section-center"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span className="pre-title pre-textsecondary">السمات</span>
          <h2 className="title">
            السمات الشخصية اللي لو فيك هتساعدك على التألق في العمل بالمجال ده
            ووانت بتتعلم المسار ده
          </h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
        </div>
        <div className="row">
          <FeatureBox
            delay="50"
            color="color-primary-style"
            icon="84"
            title="الإبداع"
            text="يساعدك على ابتكار أفكار جديدة وحلول مبتكرة."
          />
          <FeatureBox
            delay="100"
            color="color-secondary-style"
            icon="85"
            title="التحليل المنطقي"
            text="يمكنك من فهم المشكلات وتحليلها بشكل فعال."
          />
          <FeatureBox
            delay="150"
            color="color-extra02-style"
            icon="86"
            title="المرونة"
            text="يساعدك على التكيف مع التغيرات السريعة في مجال العمل."
          />
          <FeatureBox
            delay="50"
            color="color-extra03-style"
            icon="87"
            title="مهارات التواصل"
            text="تساعدك على التعبير عن أفكارك بشكل واضح ومؤثر."
          />
          <FeatureBox
            delay="100"
            color="color-extra04-style"
            icon="88"
            title="العمل الجماعي"
            text="يعزز من قدرتك على التعاون مع الآخرين لتحقيق الأهداف."
          />
          <FeatureBox
            delay="150"
            color="color-extra05-style"
            icon="89"
            title="التحفيز الذاتي"
            text="يساعدك على البقاء متحفزًا ومركزًا أثناء التعلم."
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryArea;
