// CBK账户余额分账接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与扫呗商户号、CBK账号、三方编号三选一)', },
  { name: 'partner_store_no', type: 'string', length: 32, required: '条件必填', description: '三方编号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '响应码 01:成功 02:失败。响应码仅代表通信状态，不代表业务结果' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '受理（业务）结果 01:成功 02:失败 03:受理中' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  { name: 'account_no', type: 'string', length: 32, required: '否', description: 'CBK账号' },
  { name: 'account_status', type: 'string', length: 1, required: '否', description: '账户状态,枚举值： 0未申请 1正常 2法人上游签约中 3已冻结 4法人上游待签约 9已关闭 10已注销' },
  { name: 'account_sign_url', type: 'string', length: 1, required: '否', description: '开户签约地址' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
    account_no: '5005210154900053410',
    merchant_no: '',
    partner_store_no: '',
    key_sign: '',
  };
}




const GetSignUrl: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="v2/getSignUrl"
      description="富友和网商通道生成签约链接"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default GetSignUrl;