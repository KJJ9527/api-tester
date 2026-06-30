// 支付2.0付款码接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值202' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式:000 自动识别类型,010 微信,020 支付宝,060 qq钱包,090 抖音支付,100 翼支付,110 银联云闪付,120 龙支付（建行通道可用）,140 和包支付（和包通道可用）,160 数字人民币,170 招行APP（招行通道可用）' },
  { name: 'service_id', type: 'string', length: 3, required: '是', description: '接口类型，当前类型 010' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'terminal_ip', type: 'string', length: 16, required: '是', description: '收银机、POS机等收款设备的公网IP,特殊说明：IPV4格式 ，人行侧风控主要依据，请真实填写。有网络的设备都会有ip，服务端可以从网络请求中获取到交互设备的ip' },
  { name: 'terminal_location', type: 'string', length: 128, required: '否', description: '受理终端设备实时经纬度信息，格式为（纬度/经度）：+31.2579921/-120.729388,+表示北纬、东经,-表示南纬、西经。经度是向东到180°或向西到180°,纬度是0至90度之间' },
  {
    name: 'device_no', type: 'string', length: 32, required: '否', description: '商户侧门店或者终端编号,请先与运营同事确认是否在扫呗平台配置过映射，若没有配置映射，请勿传值，否则支付会报错'
  },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '终端流水号，可填写商户系统的业务订单号（扫呗不做该值的验重，若多次请求使用同一个值，会导致一个单号有多条订单记录）。该值可对应用在4.5支付查询、4.6退款申请、4.7撤销交易接口的pay_trace字段' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式。该值可对应用在4.5支付查询、4.6退款申请、4.7撤销交易接口的pay_time字段' },
  { name: 'auth_no', type: 'string', length: 128, required: '是', description: '微信、支付宝等支付方式里的付款码（条形码或者二维码对应的数字）' },
  { name: 'total_fee', type: 'string', length: 10, required: '是', description: '金额，单位分，小于2147483647' },
  { name: 'sub_appid', type: 'string', length: 16, required: '否', description: '微信侧商户主体一致的公众号或小程序appid，（有支付后通过返回的用户标识，匹配会员信息需求的可传）' },
  { name: 'order_body', type: 'string', length: 128, required: '否', description: '订单描述,显示在消费者账单详情页面的商品信息，禁止使用+，空格，/，?，%，#，&，=，【这几类特殊符号' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据,原样返回' },
  {
    name: 'goods_detail', type: 'string', length: 2048, required: '否', description: '订单包含的商品列表信息，Json数组格式。pay_type为010、020、110时，可选填此字段《字段说明》',
    childrenFields:
      [
        { name: 'goods_id', type: 'string', length: 32, required: '是', description: '商品编号(若要匹配单品活动，需与发布的活动商品编号一致)' },
        { name: 'goods_name', type: 'string', length: 256, required: '是', description: '商品名称' },
        { name: 'quantity', type: 'string', length: 10, required: '是', description: '商品数量，需为整数，不要带小数点' },
        { name: 'price', type: 'string', length: 9, required: '是', description: '商品单价，单位为分' },
      ]
  },
  { name: 'goods_tag', type: 'string', length: 32, required: '否', description: '微信侧订单优惠标记（需提前配置），代金券或立减优惠功能的参数' },
  { name: 'custom_store_id', type: 'string', length: 32, required: '否', description: '微信门店编号和支付宝外部自定义门店编号,透传。微信对应scene_info(场景信息)中的门店id。 支付宝自定义门店编号不能随便传，在确认门店编号存在的情况下传值，否则影响支付' },
  { name: 'official_store_id', type: 'string', length: 32, required: '否', description: '支付宝官方门店编号，透传' },
  { name: 'food_order_type', type: 'string', length: 32, required: '否', description: '点餐场景类型：qr_order（店内扫码点餐）、pre_order（预点到店自提）、home_delivery （外送到家）、direct_payment（直接付款）、other（其他）' },
  { name: 'coupon_no', type: 'string', length: 128, required: '否', description: '优惠券串码' },
  { name: 'coupon_credential', type: 'string', length: 255, required: '否', description: '优惠券凭证' },
  { name: 'sence_no', type: 'string', length: 64, required: '否', description: '支付宝外部业务号，用于标识这笔解码请求。若使用了支付宝付款码查询过用户标识，该参数必传。若付款码没有查询过用户标识，请勿传递该参数，否则会导致提示付款码需刷新' },
  { name: 'timeout_express', type: 'string', length: 3, required: '否', description: '订单交易关闭时间，单位分。默认120min，上限：360min。该字段只有部分通道和部分支付方式支持，若设置后不生效，即为通道侧或者支付方式不支持，可自行调用4.7撤销交易接口' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'pay_type', type: 'string', length: 3, required: '否', description: '支付方式：010 微信，020 支付宝，060 qq钱包，090 抖音支付，100 翼支付，110 银联云闪付，120 龙支付（建行通道可用），140 和包支付（和包通道可用），160 数字人民币，170 招行APP（招行通道可用）' },
  { name: 'merchant_name', type: 'string', length: 40, required: '否', description: '商户名称' },
  { name: 'merchant_no', type: 'string', length: 15, required: '否', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '否', description: '终端号' },
  { name: 'device_no', type: 'string', length: 32, required: '否', description: '商户终端设备号(商户自定义，如门店编号),必须在平台已配置过' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '否', description: '终端流水号，商户系统的支付订单号，系统原样返回' },
  { name: 'terminal_time', type: 'string', length: 14, required: '否', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式，系统原样返回' },
  { name: 'total_fee', type: 'string', length: 10, required: '否', description: '金额，单位分' },
  { name: 'receipt_fee', type: 'string', length: 12, required: '否', description: '商家实收金额（分）' },
  { name: 'buyer_pay_fee', type: 'string', length: 12, required: '否', description: '买家实付金额（分）pay_ver为202时返回' },
  { name: 'platform_discount_fee', type: 'string', length: 12, required: '否', description: '平台优惠金额（分）pay_ver为202时返回' },
  { name: 'merchant_discount_fee', type: 'string', length: 12, required: '否', description: '商家优惠金额（分）pay_ver为202时返回' },
  { name: 'end_time', type: 'string', length: 14, required: '否', description: '支付完成时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'out_trade_no', type: 'string', length: 32, required: '否', description: '扫呗订单号' },
  { name: 'channel_trade_no', type: 'string', length: 32, required: '否', description: '微信订单号、支付宝订单号等（建议系统方取值后入库）' },
  { name: 'channel_order_no', type: 'string', length: 32, required: '否', description: '收单通道侧订单号（建议系统方取值后入库）' },
  { name: 'user_id', type: 'string', length: 32, required: '否', description: '付款方用户id，服务商appid下的“微信openid”、“支付宝账户' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据,原样返回' },
  { name: 'bank_type', type: 'string', length: 16, required: '否', description: '银行类型，采用字符串类型的银行标识。微信官方提供：银行类型对照表' },
  {
    name: 'promotion_detail', type: 'string', length: 255, required: '否', description: '官方营销详情,pay_ver为202时返回.本交易支付时使用的所有优惠券信息 ，单品优惠功能字段，详情见《优惠字段说明》'
  },
  { name: 'order_body', type: 'string', length: 128, required: '否', description: '订单描述,pay_ver为202时返回' },
  { name: 'sub_openid', type: 'string', length: 32, required: '否', description: '微信子商户sub_appid对应的用户标识,pay_ver为202时返回' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '202',
    pay_type: '000',
    service_id: '010',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    terminal_ip: '',
    terminal_location: '',
    device_no: '',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    auth_no: '20260601',
    total_fee: '1',
    sub_appid: '',
    order_body: '',
    attach: '',
    goods_detail: '',
    goods_tag: '',
    custom_store_id: '',
    official_store_id: '',
    food_order_type: '',
    coupon_no: '',
    coupon_credential: '',
    sence_no: '',
    timeout_express: '',
    key_sign: '',
  };
}

const Add: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/merchant/200/add"
      description="该接口为收单场景的商户号创建"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
      stringifyFields={['goods_detail']} // 指定需要转为字符串的字段
    />
  );
};

export default Add;

