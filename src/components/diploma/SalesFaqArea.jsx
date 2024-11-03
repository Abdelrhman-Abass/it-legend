import React from "react";

const SingleFaq = ({ show = false, id, title, desc }) => {
  return (
    <div className="accordion-item">
      <h5 className="accordion-header">
        <button
          className={`accordion-button ${show ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#question-${id}`}
          aria-expanded={show ? "true" : "false"}
        >
          {title}
        </button>
      </h5>
      <div
        id={`question-${id}`}
        className={`accordion-collapse collapse ${show ? "show" : ""}`}
        data-bs-parent="#faq-accordion"
      >
        <div className="accordion-body">
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

// function NavTab({ active = false, id, title }) {
//   return (
//     <li className="nav-item" role="presentation">
//       <button
//         className={`nav-link ${active ? "active" : ""}`}
//         data-bs-toggle="tab"
//         data-bs-target={`#${id}`}
//         type="button"
//         role="tab"
//         aria-selected={active ? "true" : "false"}
//       >
//         {title}
//       </button>
//     </li>
//   );
// }

const SalesFaqArea = () => {
  return (
    <section className="edu-section-gap faq-page-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="faq-page-nav">
              <h3 className="title">أسئلة شائعة حول الدبلومة وكورساتها</h3>
              {/* <p>
                Lorem ipsum dolor sit amet consectur adipiscing elit sed eius
                mod ex tempor incididunt labore.
              </p> */}

              {/* <ul className="nav nav-tabs" role="tablist">
                <NavTab active={true} id="gn-ques" title="General Questions" />
                <NavTab id="rg-ques" title="Regular Questions" />
                <NavTab id="ad-ques" title="Advanced Questions" />
                <NavTab id="com-policy" title="Company Policies" />
                <NavTab id="pay-option" title="Payment Options" />
                <NavTab id="terms-condition" title="Terms & Conditions" />
              </ul> */}
            </div>
          </div>
          <div className="col-lg-8">
            <div
              className="tab-content faq-page-tab-content"
              id="faq-accordion"
            >
              <div
                className="tab-pane fade show active"
                id="gn-ques"
                role="tabpanel"
              >
                <div className="faq-accordion">
                  <div className="accordion">
                    <SingleFaq
                      show={true}
                      id="1"
                      title="ما هي متطلبات الالتحاق بدورة تعلم تطبيقات الويب؟"
                      desc="لا توجد متطلبات مسبقة للالتحاق بالدورة، حيث أنها مصممة لتناسب جميع المستويات. نحن نأخذك من الصفر، مما يعني أنك لست بحاجة إلى أي خبرة سابقة في البرمجة أو تطوير الويب. سنبدأ بتعليم الأساسيات ونبني على ذلك لنضمن فهمك الكامل لكل المفاهيم اللازمة."
                    />

                    <SingleFaq
                      id="2"
                      title="كم تستغرق مدة الدورة؟"
                      desc="تستغرق الدورة حوالي 8 أسابيع، حيث تحتوي على جلسة واحدة أسبوعياً. خلال هذه الفترة، ستتعلم مجموعة متنوعة من المواضيع، بدءًا من HTML وCSS وصولاً إلى JavaScript وأطر العمل الحديثة. نحن نحرص على أن تكون كل جلسة مليئة بالمعلومات القيمة والممارسة العملية."
                    />

                    <SingleFaq
                      id="3"
                      title="هل سأحصل على شهادة بعد إتمام الدورة؟"
                      desc="نعم، ستحصل على شهادة إتمام الدورة عند تحقيق المتطلبات المطلوبة. هذه الشهادة ستكون دليلاً على المهارات التي اكتسبتها، مما يمكن أن يساعدك في تعزيز سيرتك الذاتية وزيادة فرصك في سوق العمل. سنقوم بإجراء تقييمات للتأكد من فهمك للمحتوى."
                    />

                    <SingleFaq
                      id="4"
                      title="هل يمكنني الالتحاق بالدورة إذا كنت مبتدئًا تمامًا؟"
                      desc="بالطبع! هذه الدورة مصممة خصيصًا للمبتدئين، لذا لا داعي للقلق إذا لم تكن لديك أي خلفية تقنية. نحن نأخذ بيدك خطوة بخطوة، ونشرح كل مفهوم بوضوح. ستحصل على الدعم اللازم من المدربين لتطوير مهاراتك، مما يجعلها تجربة تعليمية مثمرة وممتعة."
                    />
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="rg-ques" role="tabpanel">
                <div className="faq-accordion">
                  <div className="accordion">
                    <SingleFaq
                      show={true}
                      id="8"
                      title="How long is my personal free trial?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="9"
                      title="How do I find a school where I want to study?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="10"
                      title="Where should I study abroad?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="11"
                      title="Where can I find information on private companies?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="12"
                      title="How do I find a study abroad program?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="13"
                      title="Am I eligible for admission?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="ad-ques" role="tabpanel">
                <div className="faq-accordion">
                  <div className="accordion">
                    <SingleFaq
                      show={true}
                      id="14"
                      title="Where can I find information on private companies?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="15"
                      title="How do I find a study abroad program?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="16"
                      title="Am I eligible for admission?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="17"
                      title="What kind of support does EduBlink provide?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="com-policy" role="tabpanel">
                <div className="faq-accordion">
                  <div className="accordion">
                    <SingleFaq
                      show={true}
                      id="18"
                      title="How do I find a study abroad program?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="19"
                      title="Where can I find information on private companies?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="20"
                      title="What kind of support does EduBlink provide?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="21"
                      title="Am I eligible for admission?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="pay-option" role="tabpanel">
                <div className="faq-accordion">
                  <div className="accordion">
                    <SingleFaq
                      show={true}
                      id="22"
                      title="How do I find a school where I want to study?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="23"
                      title=" Where should I study abroad?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="24"
                      title="Where can I find information on private companies?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="25"
                      title="How do I find a study abroad program?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="terms-condition"
                role="tabpanel"
              >
                <div className="faq-accordion">
                  <div className="accordion">
                    <SingleFaq
                      show={true}
                      id="26"
                      title=" Where should I study abroad?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="27"
                      title="How do I find a school where I want to study?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="28"
                      title="How do I find a study abroad program?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />

                    <SingleFaq
                      id="29"
                      title="Where can I find information on private companies?"
                      desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesFaqArea;
