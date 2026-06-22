// CBK分账关系查询接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';
// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no_out', type: 'string', length: 32, required: '条件必填', description: '出账方CBK账号(与扫呗商户号、三方编号三选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '出账方扫呗商户号(与CBK账号、三方编号三选一)' },
  { name: 'partner_store_no_out', type: 'string', length: 32, required: '条件必填', description: '出账方三方编号(与CBK账号、扫呗商户号三选一)' },
  { name: 'account_no_in', type: 'string', length: 32, required: '否', description: '分账入账方CBK账号' },
  { name: 'partner_store_no_in', type: 'string', length: 32, required: '否', description: '分账入账方三方编号' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 32, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  {
    name: 'account_in_list', type: 'string', length: 32, required: '是', description: 'JsonArray 入账方',
    childrenFields:
      [
        { name: 'account_no_in', type: 'string', length: 32, required: '是', description: '分账入账户' },
        { name: 'account_name_in', type: 'string', length: 32, required: '是', description: '入账方方名称' },
        { name: 'allocate_scale', type: 'string', length: 32, required: '是', description: '分账比例（10000即100%）' },
        { name: 'ledger_status', type: 'string', length: 32, required: '是', description: '分账状态：0正常 1已失效 2申请中 3未申请' },
      ]
  },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
    account_no_out: '5005210154905486640',
    merchant_no: '',
    partner_store_no_out: '',
    account_no_in: '',
    partner_store_no_in: '',
    key_sign: '',
  };
}




const QueryAccountIn: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/queryAccountIn"
      description="CBK账分账关系查询"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default QueryAccountIn;