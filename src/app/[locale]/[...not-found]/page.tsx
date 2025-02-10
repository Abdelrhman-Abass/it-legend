import Button from '@/app/components/common/button/Button'
import { useTranslations } from 'next-intl';
import React from 'react'

export default function page() {
  const t = useTranslations();
  return (
    <section className='not_found py p-lg'>
      <div className="not_found_page">
        <div className="not_found_page_image"></div>
        <div className="not_found_page_content">
          <h2>{t("error404.title")}</h2>
          <p>{t("error404.message")}</p>
          <Button title={t("common.return_home")} url='/' customClass='flip_icon'/>
        </div>
      </div>
    </section>
  )
}
