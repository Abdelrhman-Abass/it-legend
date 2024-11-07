"use client";
import React, { useState } from "react";

const faq_items = [
  {
    id: "1",
    show: true,
    title: "ما هي متطلبات الالتحاق بدورة تعلم تطبيقات الويب؟",
    desc: "لا توجد متطلبات مسبقة للالتحاق بالدورة، حيث أنها مصممة لتناسب جميع المستويات. نحن نأخذك من الصفر، مما يعني أنك لست بحاجة إلى أي خبرة سابقة في البرمجة أو تطوير الويب."
  },
  {
    id: "2",
    show: false,
    title: "كم تستغرق مدة الدورة؟",
    desc: "تستغرق الدورة حوالي 8 أسابيع، حيث تحتوي على جلسة واحدة أسبوعياً. خلال هذه الفترة، ستتعلم مجموعة متنوعة من المواضيع."
  },
  {
    id: "3",
    show: false,
    title: "هل يمكنني الحصول على شهادة بعد إكمال الدورة؟",
    desc: "نعم، ستحصل على شهادة إتمام معتمدة بعد إكمال جميع متطلبات الدورة بنجاح."
  },
  {
    id: "4",
    show: false,
    title: "هل هناك دعم فني متاح أثناء الدورة؟",
    desc: "نعم، نوفر دعماً فنياً كاملاً طوال فترة الدورة من خلال منصتنا التعليمية ومجموعات النقاش المخصصة."
  },
  {
    id: "5",
    show: false,
    title: "ما هي طريقة الدفع المتاحة؟",
    desc: "نوفر العديد من طرق الدفع المرنة، بما في ذلك الدفع الإلكتروني والتحويل البنكي، كما نقدم خيارات تقسيط مريحة."
  },
  {
    id: "6",
    show: false,
    title: "هل يمكنني الوصول إلى محتوى الدورة بعد انتهائها؟",
    desc: "نعم، ستحتفظ بإمكانية الوصول إلى جميع مواد الدورة لمدة عام كامل بعد انتهائها."
  }
];

const SingleFaq = ({ id, title, desc, isActive, onClick }) => {
  return (
    <div className="accordion-item">
      <h5 className="accordion-header">
        <button
          className={`accordion-button ${isActive ? "" : "collapsed"}`}
          type="button"
          onClick={onClick}
        >
          {title}
        </button>
      </h5>
      <div
        style={{
          maxHeight: isActive ? '1000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out'
        }}
      >
        <div className="accordion-body">
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

const SalesFaqArea = () => {
  const [activeId, setActiveId] = useState('1');

  return (
    <section className="edu-section-gap faq-page-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="faq-page-nav">
              <h3 className="title">أسئلة شائعة حول الدبلومة وكورساتها</h3>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="faq-accordion">
              <div className="accordion">
                {faq_items.map((item) => (
                  <SingleFaq
                    key={item.id}
                    {...item}
                    isActive={activeId === item.id}
                    onClick={() => setActiveId(activeId === item.id ? '' : item.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesFaqArea;
