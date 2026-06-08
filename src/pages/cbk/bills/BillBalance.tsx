// CBK日终余额对账单接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'day', type: 'string', length: 8, required: '是', description: '日期，yyyyMMdd，例如：20170208' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'account_balance_day', type: 'string', length: 32, required: '是', description: 'account_balance_日期' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    day: '20260608',
    inst_no: '52101549',
    key_sign: '',
    account_balance_day: 'account_balance_20260608',
  };
}




const Bill: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="GET"
      path="/order/account/day/inst_no/key_sign/account_balance_day.txt"
      description="CBK日终余额对账单"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Bill;