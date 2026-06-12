// 支付2.0退款申请接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值202' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式：000自动识别类型' },
  { name: 'service_id', type: 'string', length: 3, required: '是', description: '接口类型，当前类型 030' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'device_no', type: 'string', length: 32, required: '否', description: '商户侧门店或者终端编号,请先与运营同事确认是否在扫呗平台配置过映射，若没有配置映射，请勿传值，否则支付会报错' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '退款流水号(不要和支付单号或者要退款的单号用一样的值)，可填写商户系统的退款流水号，每次请求需新生成。该值可对应用在4.9退款订单查询接口的pay_trace字段' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '实时时间，yyyyMMddHHmmss，全局统一时间格式，每次请求新生成。该值可对应用在4.9退款订单查询接口的pay_time字段' },
  { name: 'repeated_trace', type: 'string', length: 14, required: '是', description: '是否允许订单重复1：不允许terminal_trace重复,2：不允许terminal_trace+ terminal_time重复,0或不传: 允许重复' },
  {
    name: 'refund_fee', type: 'string', length: 14, required: '是', description: '退款金额，单位分，小于2147483647'
  },
  { name: 'pay_trace', type: 'string', length: 32, required: '条件必填', description: '需要退款的业务订单号，请使用支付请求里的终端流水号（terminal_trace），与pay_time同时传递' },
  { name: 'pay_time', type: 'string', length: 14, required: '条件必填', description: '退款订单的支付时间，请使用支付请求里的终端交易时间，yyyyMMddHHmmss，与pay_trace同时传递' },
  { name: 'out_trade_no', type: 'string', length: 14, required: '条件必填', description: '要退款的扫呗订单号，传支付请求里返回的out_trade_no（也可使用支付接口返回的channel_trade_no或channel_order_no）' },
  { name: 'order_body', type: 'string', length: 14, required: '否', description: '退款订单备注' },
  { name: 'attach', type: 'string', length: 14, required: '否', description: '附加数据' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '202',
    pay_type: '000',
    service_id: '030',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    device_no: '',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    repeated_trace: '',
    refund_fee: '1',
    pay_trace: '',
    pay_time: '',
    out_trade_no: '343419630021126061211211300007',
    key_sign: '',
  };
}

const Refund: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/refund"
      description="支付退款接口"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Refund;

