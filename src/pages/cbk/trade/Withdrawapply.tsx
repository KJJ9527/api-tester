// CBK账户提现接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';
// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'trade_no', type: 'string', length: 32, required: '是', description: '分账流水号，系统方自己定义，每次请求需唯一（30s内请勿重复请求，如果该单号存在分账成功记录，无法再次请求）' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'partner_store_no', type: 'string', length: 32, required: '条件必填', description: '三方编号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'amt', type: 'string', length: 11, required: '是', description: '分账金额,单位分' },
  { name: 'notify_url', type: 'string', length: 128, required: '否', description: '回调通知地址（只有当分账状态trade_status返回3处理中时，回调才生效）' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
    trade_no: uuid(),
    account_no: '5005210154905486640',
    merchant_no: '',
    partner_store_no: '',
    amt: '100',
    notify_url: '',
    attach: '',
    key_sign: '',
  };
}

const Withdrawapply: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/withdrawapply"
      description="CBK账户提现"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Withdrawapply;