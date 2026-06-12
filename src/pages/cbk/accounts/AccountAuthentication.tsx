// CBK账户鉴权接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号账号二选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与CBK账号二选一)' },
  { name: 'contract_type', type: 'string', length: 1, required: '否', description: '签约类型1.短信 2.签约链接 ， 不传默认1(富友通道重新发起签约传此字段)' },
  { name: 'authentication_channel', type: 'string', length: 1, required: '否', description: '当contract_type为2时，可指定返回的鉴权链接通道：1.阿里鉴权链接、2.旷世鉴权链接。不设置时默认1' },
  { name: 'back_path', type: 'string', length: 999, required: '否', description: '小程序场景下授权完成后的回跳路径（格式： /pages/index/index）' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
    account_no: '5005210154905486640',
    merchant_no: '',
    contract_type: '',
    authentication_channel: '',
    back_path: '',
    key_sign: '',
  };
}




const AccountAuthentication: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/accountAuthentication"
      description="创建CBK账户并返回账户账号"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default AccountAuthentication;