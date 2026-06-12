// CBK分账交易退回接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'brand_no', type: 'string', length: 8, required: '否', description: '品牌编号' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'trade_no', type: 'string', length: 32, required: '是', description: '退回请求单号(多次请求退回时，要保证每次使用的单号不同，且不能使用分账请求里的trade_no，当check_duplicate =1时不可重复)' },
  {
    name: 'check_duplicate', type: 'string', length: 1, required: '否', description: '是否对trade_no验重;0: 不需校验(不传默认为0),1: 需要校验'
  },
  { name: 'sub_trade_no', type: 'string', length: 32, required: '是', description: '要退回的原分账单号，2.1余额分账接口返回的out_trade_no(或2.2扫呗支付订单分账接口返回的sub_trade_no“利楚入账子订单号”)' },
  { name: 'allocate_amt', type: 'string', length: 11, required: '是', description: '分账退回金额 单位：分' },
  { name: 'attach', type: 'string', length: 11, required: '否', description: '附加数据,原样返回' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '',
    trace_no: uuid(),
    trade_no: uuid(),
    check_duplicate: '',
    sub_trade_no: '608986773306226061110562314191',
    allocate_amt: '100',
    attach: '',
    key_sign: '',
  };
}

const AllocateRefund: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/allocateRefund"
      description="CBK分账交易退回"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default AllocateRefund;