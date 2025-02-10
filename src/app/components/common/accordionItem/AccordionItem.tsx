import React from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';

interface AccordionItemProps {
  items: CollapseProps['items'];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ items }) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse size="large" className='accordion_item'  items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default AccordionItem;
