// CBK申请电子回单接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号二选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与CBK账号二选一)' },
  { name: 'trade_type', type: 'string', length: 1, required: '是', description: '订单类型：1分账 2提现 3充值' },
  { name: 'out_trade_no', type: 'string', length: 32, required: '是', description: 'CBK分账单号' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {

  const trace_no = uuidv4().replace(/-/g, '');

  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no,
    account_no: '5005210154905486640',
    merchant_no: '',
    trade_type: '1',
    out_trade_no: '608986773306226061110562314191',
    key_sign: '',
  };
}

const Applyicreceipt: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/applyicreceipt"
      description="申请电子回单"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Applyicreceipt;