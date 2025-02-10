import React from 'react'
import HeaderSection from '../common/headerSection/HeaderSection'
import { useTranslations } from 'next-intl';
import Button from '../common/button/Button';

export default function DiplomaDetailsFooter() {
    const t = useTranslations();
  return (
      <div className='diploma_details_footer p-lg py'>
          <HeaderSection
          title={t("diplomaDetails.footer.title")}
          />
          <div className="diploma_details_footer_container">
              {new Array(6).fill(0).map((item, index) => <p key={index} className='p1'>Lorem ipsum dolor sit amet.</p>)}
          </div>
          <div className="diploma_details_footer_btn">
              <Button title={t("diplomaDetails.footer.btn")} red/>
          </div>
    </div>
  )
}
