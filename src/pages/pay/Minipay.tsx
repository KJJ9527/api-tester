// 支付2.0小程序下单接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值202' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式:010 微信,020 支付宝,090 抖音支付' },
  { name: 'service_id', type: 'string', length: 3, required: '是', description: '接口类型，当前类型 015' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'terminal_ip', type: 'string', length: 16, required: '否', description: '用户手机端IP(IPV4格式 ，人行侧风控主要依据，请真实填写)' },
  { name: 'device_no', type: 'string', length: 32, required: '否', description: '商户侧门店或者终端编号,请先与运营同事确认是否在扫呗平台配置过映射，若没有配置映射，请勿传值，否则支付会报错' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '终端流水号，可填写商户系统的业务订单号（扫呗不做该值的验重，若多次请求使用同一个值，会导致一个单号有多条订单记录）。该值可对应用在4.5支付查询、4.6退款申请、4.7撤销交易接口的pay_trace字段' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式。该值可对应用在4.5支付查询、4.6退款申请、4.7撤销交易接口的pay_time字段' },
  { name: 'total_fee', type: 'string', length: 10, required: '是', description: '金额，单位分，小于2147483647' },
  { name: 'sub_appid', type: 'string', length: 16, required: '是', description: '传商户自己的小程序appid。（即获取open_id所使用的appid）。pay_type为010及020时必填' },
  { name: 'open_id', type: 'string', length: 10, required: '是', description: '用户标识（微信openid，支付宝userid），pay_type为010及020时必填' },
  { name: 'order_body', type: 'string', length: 128, required: '否', description: '订单描述,显示在消费者账单详情页面的商品信息，禁止使用+，空格，/，?，%，#，&，=，【这几类特殊符号' },
  {
    name: 'notify_url', type: 'string', length: 255, required: '否', description: '支付结果接收地址，请按4.10回调通知接口编写接口接收。注：该字段若不传递，需要通过4.5支付查询接口确认订单支付状态'
  },
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
  { name: 'timeout_express', type: 'string', length: 3, required: '否', description: '订单交易关闭时间（单位分，不传默认120）。 如果小程序有设置订单失效时间的，建议和订单失效时间设置一致。该字段部分收单通道支持，若遇到不生效的情况，即为收单通道不支持。' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '202',
    pay_type: '010',
    service_id: '015',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    terminal_ip: '',
    terminal_location: '',
    device_no: '',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    total_fee: '1',
    sub_appid: '',
    order_body: '',
    notify_url: '',
    attach: '',
    goods_detail: '',
    goods_tag: '',
    custom_store_id: '',
    official_store_id: '',
    food_order_type: '',
    timeout_express: '',
    key_sign: '',
  };
}

const Minipay: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/minipay"
      description="小程序下单接口"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      stringifyFields={['goods_detail']} // 指定需要转为字符串的字段
    />
  );
};

export default Minipay;

