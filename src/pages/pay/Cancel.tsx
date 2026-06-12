// 支付2.0撤销交易接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值201' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式：000自动识别类型' },
  { name: 'service_id', type: 'string', length: 3, required: '是', description: '接口类型，当前类型 040' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'device_no', type: 'string', length: 32, required: '否', description: '商户侧门店或者终端编号,请先与运营同事确认是否在扫呗平台配置过映射，若没有配置映射，请勿传值，否则支付会报错' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求新生成（不是传要撤销的支付单号，要撤销的单号传在pay_trace或者out_trade_no）' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '实时时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'pay_trace', type: 'string', length: 32, required: '条件必填', description: '要撤销的业务订单号，传支付请求里的terminal_trace终端流水号，与pay_time同时传递' },
  { name: 'pay_time', type: 'string', length: 14, required: '条件必填', description: '撤销订单的支付时间，传支付请求里的terminal_time终端交易时间，与pay_trace同时传递' },
  { name: 'out_trade_no', type: 'string', length: 14, required: '条件必填', description: '要撤销的扫呗订单号，传支付请求里返回的out_trade_no' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '201',
    pay_type: '000',
    service_id: '040',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    device_no: '',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    pay_trace: '',
    pay_time: '',
    out_trade_no: '343419630021126061211211300007',
    key_sign: '',
  };
}

const Cancel: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/cancel"
      description="支付撤销接口,只适用B扫C的支付单撤销,人工确认后撤销"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Cancel;

