// 支付2.0小程序下单接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_no', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'redirect_uri', type: 'string', length: 32, required: '是', description: '您的收银台的完整路径，并urlEncode（get请求拼接需要urlEncode，签名拼接不需要urlEncode），带参数则会原样返回' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式，不传默认获取微信:010 微信，110 云闪付，090 抖音支付' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  {
    name: 'openid', type: 'string', length: 64, required: '是', description: '微信（云闪付）公众号用户唯一标识，成功授权后取得，用于微信支付JSAPI接口统一下单'
  },
  { name: 'access_token', type: 'string', length: 512, required: '是', description: 'access_token是公众号的全局唯一接口调用凭据' }
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_type: '010',
    merchant_no: '860204816000056',
    terminal_no: '34341963',
    redirect_uri: '',
    key_sign: '',
  };
}

const AuthAccessToken: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="GET"
      path="/wx/jsapi/authAccessToken"
      description="付款码查询 OPENID 接口"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default AuthAccessToken;

