// 支付2.0小程序下单接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值201' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式:010 微信，020 支付宝，000 自动识别' },
  { name: 'service_id', type: 'string', length: 3, required: '是', description: '接口类型，当前类型 080' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求新生成（不是传要查询的单号，要查询的单号传在pay_trace或者out_trade_no）' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '实时时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'auth_no', type: 'string', length: 128, required: '是', description: '微信、支付宝等支付方式里的付款码（条形码或者二维码对应的数字）' },
  { name: 'sub_appid', type: 'string', length: 32, required: '否', description: '微信子商户appid（可返回appid下对应的用户标识），支付宝不需要传' },
  { name: 'sence_no', type: 'string', length: 128, required: '否', description: '支付宝条码解码时必填，用于标识这笔解码请求，且需要与付款码支付接口中的sence_no保持一致，否则支付时会提示需刷新条码' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据,原样返回' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '201',
    pay_type: '010',
    service_id: '080',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    auth_no: '',
    sub_appid: '',
    sence_no: '',
    key_sign: '',
  };
}

const Authcodetoopenid: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/authcodetoopenid"
      description="付款码查询 OPENID 接口"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Authcodetoopenid;

