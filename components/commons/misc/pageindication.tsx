import React from 'react';
import IconMuffin from '@/components/svg/muffin';
interface PageIndicationProps {
  breadcrumb: string;
  title: string;
}

const PageIndication: React.FC<PageIndicationProps> = ({ breadcrumb, title }) => {
  return (
    <div className="flex justify-start w-1/5 items-center mb-5 mt-1">
      <IconMuffin className="w-1/6 text-gray-600 mr-2" />
      <p className="text-sl text-gray-600 pr-1">{breadcrumb} / </p>
      <p className="text-sl text-gray-700">{title}</p>
    </div>
  );
};

export default PageIndication;