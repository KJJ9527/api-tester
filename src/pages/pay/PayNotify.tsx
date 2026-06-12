// 支付2.0回调通知

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，返回值201、202' },
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '响应码：01成功' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '返回信息提示，“支付成功”' },
  { name: 'result_code', type: 'string', length: 2, required: '是', description: '业务结果：01成功' },
  {
    name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式：010微信，020 支付宝，060qq钱包，090 抖音支付，100翼支付，110云闪付，180 微企付，190 支付宝商转，200 微信B2b'
  },
  { name: 'user_id', type: 'string', length: 32, required: '是', description: '服务商appid下的付款方用户id，“微信openid”、“支付宝账户”、“qq号”等' },
  { name: 'merchant_name', type: 'string', length: 40, required: '是', description: '商户名称' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  {
    name: 'device_info', type: 'string', length: 32, required: '否', description: '商户侧门店或者终端编号,支付请求传递了device_no时返回'
  },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '终端流水号，此处传商户发起预支付或公众号支付时所传入的交易流水号' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式（01时参与拼接）' },
  { name: 'pay_trace', type: 'string', length: 32, required: '否', description: '当前支付终端流水号，与pay_time同时传递' },
  { name: 'pay_time', type: 'string', length: 14, required: '否', description: '当前支付终端交易时间，yyyyMMddHHmmss，全局统一时间格式，与pay_trace同时传递' },
  { name: 'end_time', type: 'string', length: 14, required: '是', description: '支付完成时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'out_trade_no', type: 'string', length: 32, required: '是', description: '扫呗订单号' },
  { name: 'channel_trade_no', type: 'string', length: 32, required: '是', description: '微信订单号、支付宝订单号等（建议系统方取值后入库）' },
  { name: 'channel_order_no', type: 'string', length: 32, required: '是', description: '收单通道侧订单号，pay_ver为202时返回（建议系统方取值后入库）' },
  { name: 'attach', type: 'string', length: 128, required: '是', description: '附加数据,原样返回' },
  { name: 'sub_openid', type: 'string', length: 32, required: '是', description: '微信子商户appid(对应微信sub_appid字段)下的付款方用户id， pay_ver为202时返回' },
  { name: 'total_fee', type: 'string', length: 12, required: '是', description: '金额，单位分' },
  { name: 'receipt_fee', type: 'string', length: 12, required: '否', description: '商家实收金额,单位分' },
  { name: 'buyer_pay_fee', type: 'string', length: 12, required: '否', description: '买家实付金额（分）pay_ver为202时返回' },
  { name: 'platform_discount_fee', type: 'string', length: 12, required: '否', description: '平台优惠金额（分）pay_ver为202时返回' },
  { name: 'merchant_discount_fee', type: 'string', length: 12, required: '否', description: '商家优惠金额（分）pay_ver为202时返回' },
  { name: 'bank_type', type: 'string', length: 16, required: '否', description: '银行类型，采用字符串类型的银行标识。微信官方提供：银行类型对照表' },
  { name: 'promotion_detail', type: 'string', length: 6000, required: '否', description: '本交易支付时使用的所有优惠券信息 ，单品优惠功能字段，详情见《优惠字段说明》' },
  { name: 'order_body', type: 'string', length: 128, required: '否', description: '订单标题描述' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return { "attach": "", "bank_type": "OTHERS", "buyer_pay_fee": "1", "channel_order_no": "181608036345", "channel_trade_no": "4500000218202606126969515748", "end_time": "20260612152536", "key_sign": "dfcdee8a3f6674d6f9bfb4458a775c25", "merchant_discount_fee": "0", "merchant_name": "对接联调专用(勿删)", "merchant_no": "860204816000056", "order_body": "123456", "out_trade_no": "343419630021326061215253000005", "pay_type": "010", "pay_ver": "202", "platform_discount_fee": "0", "receipt_fee": "1", "result_code": "01", "return_code": "01", "return_msg": "支付成功", "terminal_id": "34341963", "terminal_time": "20260612172302", "terminal_trace": "202606124204310160", "total_fee": "1", "user_id": "obnG9jg67STP_r_4AjdTO8rYeKX8" }
    ;
}

const PayNotify: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method=""
      path=""
      description="支付回调通知"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default PayNotify;

