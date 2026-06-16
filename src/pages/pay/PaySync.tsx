// 支付2.0回调通知

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值240' },
  { name: 'card_type', type: 'string', length: 2, required: '否', description: '用户银联卡类型 0 储蓄卡， 1 信用卡， 2 未知' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'merchant_name', type: 'string', length: 40, required: '是', description: '商户名称' },
  {
    name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号'
  },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式（01时参与拼接）' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '终端流水号，此处传商户发起预支付或公众号支付时所传入的交易流水号' },
  { name: 'out_trade_no', type: 'string', length: 32, required: '是', description: '扫呗订单号（pay_status_code=5退款时，该字段为退款单号）' },
  { name: 'out_refund_no', type: 'string', length: 32, required: '是', description: 'pay_status_code=5退款时，该字段对应原支付数据里的out_trade_no字段值' },
  {
    name: 'total_fee', type: 'string', length: 32, required: '是', description: '订单金额，单位分'
  },
  { name: 'pay_type', type: 'string', length: 12, required: '是', description: '支付方式： 010 微信， 020 支付宝，030 刷银行卡， 060 qq钱包， 080 京东钱包， 090 口碑， 100 翼支付， 110 银联二维码' },
  { name: 'end_time', type: 'string', length: 3, required: '是', description: '支付完成时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'attach', type: 'string', length: 14, required: '是', description: '附加数据，原样返回' },
  { name: 'user_id', type: 'string', length: 128, required: '是', description: '付款方用户id，“微信openid”、“支付宝账户”、“qq号”等' },
  { name: 'channel_trade_no', type: 'string', length: 32, required: '是', description: '微信订单号、支付宝订单号等' },
  { name: 'channel_order_no', type: 'string', length: 32, required: '否', description: '收单通道侧订单号。推送版本配置240时返回' },
  { name: 'pay_status_code', type: 'string', length: 32, required: '是', description: '付状态， 1 支付成功， 2 支付失败， 3 支付中， 4 已撤销， 5 退款成功， 6 退款失败' },
  { name: 'order_body', type: 'string', length: 2, required: '否', description: '订单描述,显示在消费者账单详情页面的商品信息' },
  { name: 'buyer_pay_fee', type: 'string', length: 128, required: '否', description: '买家实付金额（分）' },
  { name: 'platform_discount_fee', type: 'string', length: 32, required: '否', description: '平台优惠金额（分）' },
  { name: 'merchant_discount_fee', type: 'string', length: 12, required: '否', description: '商家优惠金额（分）' },
  { name: 'bank_type', type: 'string', length: 16, required: '否', description: '银行类型，采用字符串类型的银行标识。微信官方提供：银行类型对照表' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return { "attach": "", "card_type": "0", "channel_trade_no": "4200003122202606153992930000", "end_time": "20260615141554", "key_sign": "aa793cafdb6f89b4880325980b3dbef3", "merchant_name": "电脑维修便利连锁", "merchant_no": "852107629000100", "out_refund_no": "", "out_trade_no": "174872366321126061514155300000", "pay_status_code": 1, "pay_type": "010", "pay_ver": "210", "terminal_id": "17487236", "terminal_time": "20260615141551", "terminal_trace": "287275350709494995", "total_fee": "24000", "user_id": "obnG9jvh1kEqPilkMyOW3IuYNCMY" }
}

const PaySync: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method=""
      path=""
      description="交易实时同步"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default PaySync;

