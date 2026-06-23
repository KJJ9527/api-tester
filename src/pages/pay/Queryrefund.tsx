// 支付2.0退款订单查询接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值202' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式：000自动识别类型' },
  { name: 'service_id', type: 'string', length: 3, required: '是', description: '接口类型，当前类型 031' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'device_no', type: 'string', length: 32, required: '否', description: '商户侧门店或者终端编号,请先与运营同事确认是否在扫呗平台配置过映射，若没有配置映射，请勿传值，否则支付会报错' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求新生成（不是传要查询的退款单号，要查询的退款单号传在pay_trace或者out_refund_no）' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '退款查询时间，yyyyMMddHHmmss，全局统一时间格式' },
  {
    name: 'pay_trace', type: 'string', length: 32, required: '条件必填', description: '退款申请接口里的终端退款流水号（terminal_trace），与pay_time同时传递'
  },
  {
    name: 'pay_time', type: 'string', length: 14, required: '条件必填', description: '退款申请接口里的终端交易时间（terminal_time），与pay_trace同时传递'
  },
  { name: 'out_refund_no', type: 'string', length: 32, required: '条件必填', description: '平台唯一退款订单号，退款请求里返回的out_refund_no' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  {
    name: 'return_code', type: 'string', length: 2, required: '是', description: '响应码：01成功 ，02失败，说明：先判断该字段，再判断result_code，若该字段返回02，无需再做其它操作'
  },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务结果：01成功 ，02失败' },
  {
    name: 'pay_type', type: 'string', length: 3, required: '否', description: '支付方式：010 微信，020 支付宝，060 qq钱包，090 抖音支付，100 翼支付，110 银联云闪付，120 龙支付（建行通道可用），140 和包支付（和包通道可用），160 数字人民币，170 招行APP（招行通道可用），180 微企付，190 支付宝商转 ，200 微信B2b'
  },
  { name: 'merchant_name', type: 'string', length: 40, required: '否', description: '商户名称' },
  { name: 'merchant_no', type: 'string', length: 15, required: '否', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '否', description: '终端号' },
  { name: 'device_no', type: 'string', length: 32, required: '否', description: '商户终端设备号(商户自定义，如门店编号),必须在平台已配置过' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '否', description: '终端流水号，商户系统的支付订单号，系统原样返回' },
  { name: 'terminal_time', type: 'string', length: 14, required: '否', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式，系统原样返回' },
  { name: 'refund_fee', type: 'string', length: 10, required: '否', description: '退款金额，单位分' },
  { name: 'refund_receipt_fee', type: 'string', length: 12, required: '否', description: '退商家实收金额（分）' },
  { name: 'refund_buyer_pay_fee', type: 'string', length: 12, required: '否', description: '退买家实付金额（分）' },
  { name: 'refund_platform_discount_fee', type: 'string', length: 12, required: '否', description: '退平台优惠金额（分）' },
  { name: 'refund_merchant_discount_fee', type: 'string', length: 12, required: '否', description: '退商家优惠金额（分）' },
  { name: 'refund_promotion_detail', type: 'string', length: 6000, required: '否', description: '退优惠明细，详情见《优惠字段说明》' },
  { name: 'end_time', type: 'string', length: 14, required: '否', description: '退款完成时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'out_refund_no', type: 'string', length: 32, required: '否', description: '扫呗退款订单号' },
  { name: 'out_trade_no', type: 'string', length: 32, required: '否', description: '原支付扫呗订单号' },
  {
    name: 'trade_state', type: 'string', length: 10, required: '否', description: '退款订单状态：SUCCESS退款成功，FAIL退款失败，REFUNDING退款中，NOREFUND退款超时等'
  },
  { name: 'channel_trade_no', type: 'string', length: 32, required: '是', description: '微信订单号、支付宝订单号等（建议系统方取值后入库）' },
  { name: 'channel_order_no', type: 'string', length: 32, required: '否', description: '收单通道侧订单号（建议系统方取值后入库）' },
  { name: 'user_id', type: 'string', length: 32, required: '否', description: '付款方用户id，服务商appid下的“微信openid”、“支付宝账户' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据,原样返回' },
  { name: 'pay_trace', type: 'string', length: 32, required: '否', description: '退款终端流水号' },
  { name: 'pay_time', type: 'string', length: 14, required: '否', description: '退款终端交易时间' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '202',
    pay_type: '000',
    service_id: '031',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    device_no: '',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    pay_trace: '',
    pay_time: '',
    out_refund_no: '343419630021126061211211300007',
    key_sign: '',
  };
}

const Queryrefund: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/queryrefund"
      description="退款订单查询"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default Queryrefund;

