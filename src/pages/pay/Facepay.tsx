// 支付2.0(刷脸)自助收银SDK调用凭证获取接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值202' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式，010 微信，020 支付宝' },
  { name: 'service_id', type: 'string', length: 3, required: '是', description: '接口类型，当前类型016' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'terminal_ip', type: 'string', length: 16, required: '是', description: '交易终端公网IP(IPV4格式 ，人行侧风控主要依据，请真实填写)' },
  { name: 'device_no', type: 'string', length: 32, required: '否', description: '商户侧门店编号或者终端设备号,请先与运营同事确认是否在扫呗平台配置过映射，若没有配置映射，请勿传值，否则支付会报错' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '终端流水号，可填写商户系统的业务订单号，多次请求时不可使用同一个值' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'auth_no', type: 'string', length: 4096, required: '是', description: '微信、支付宝人脸凭证（微信为 face_code值，支付宝为ftoken值）' },
  {
    name: 'out_trade_no', type: 'string', length: 32, required: '是', description: '扫呗订单号，来自自助收银SDK调用凭证获取接口，仅微信刷脸支付必传'
  },
  { name: 'open_id', type: 'string', length: 128, required: '否', description: '用户标识（微信openid），用于调起微信刷脸SDK' },
  { name: 'total_fee', type: 'string', length: 12, required: '是', description: '金额，单位分' },
  { name: 'order_body', type: 'string', length: 128, required: '否', description: '订单描述,显示在消费者账单详情页面的商品信息。禁止使用+，空格，/，?，%，#，&，=，【这几类特殊符号' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据，原样返回' },
  { name: 'custom_store_id', type: 'string', length: 32, required: '否', description: '外部自定义门店编号,透传' },
  { name: 'official_store_id', type: 'string', length: 32, required: '否', description: '支付宝和微信系统官方门店编号，透传' },
  { name: 'device_type', type: 'string', length: 2, required: '否', description: '新增字段，解决不同刷脸设备不需要传产品协议问题 设备类型，1支付宝自助收银设备【传协议】、2微信自助收银设备 、3支付宝蜻蜓设备、 4微信青蛙刷脸设备 5银联刷脸设备6.支付宝海马S1离线刷脸' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  {
    name: 'return_code', type: 'string', length: 2, required: '是', description: '响应码：01成功 ，02失败；说明：先判断该字段，再判断result_code，若该字段返回02，需调用支付查询接口，确认订单状态'
  },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '返回信息提示，“凭证获取成功”，“凭证获取失败”等' },
  {
    name: 'result_code', type: 'string', length: 2, required: '否', description: '业务结果：01成功 ，02失败，03 支付中'
  },
  { name: 'pay_type', type: 'string', length: 3, required: '否', description: '支付方式，010 微信，020 支付宝' },
  { name: 'merchant_no', type: 'string', length: 15, required: '否', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '否', description: '终端号' },
  { name: 'device_no', type: 'string', length: 32, required: '否', description: '商户侧门店编号或者终端设备号,请先与运营同事确认是否在扫呗平台配置过映射，若没有配置映射，请勿传值，否则支付会报错' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '否', description: '终端流水号，填写商户系统的订单号' },
  { name: 'terminal_time', type: 'string', length: 14, required: '否', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'total_fee', type: 'string', length: 12, required: '否', description: '金额，单位分' },
  { name: 'receipt_fee', type: 'string', length: 12, required: '否', description: '商家实收金额（分）' },
  { name: 'buyer_pay_fee', type: 'string', length: 12, required: '否', description: '买家实付金额（分）' },
  { name: 'platform_discount_fee', type: 'string', length: 12, required: '否', description: '平台优惠金额（分）' },
  { name: 'merchant_discount_fee', type: 'string', length: 12, required: '否', description: '商家优惠金额（分）' },
  { name: 'end_time', type: 'string', length: 128, required: '否', description: '支付完成时间' },
  { name: 'out_trade_no', type: 'string', length: 32, required: '否', description: '扫呗订单号' },
  { name: 'order_body', type: 'string', length: 128, required: '否', description: '订单描述（官方账单里显示为商品名称）' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据，原样返回' },
  { name: 'user_id', type: 'string', length: 32, required: '否', description: '付款方用户id，“微信openid”、“支付宝账户”、“qq号”等，返回时不参与签名' },
  { name: 'sub_openid', type: 'string', length: 32, required: '否', description: '子商户appid下用户唯一标识，如需返回则请求时需要传sub_appid' },
  { name: 'channel_trade_no', type: 'string', length: 32, required: '否', description: '通道订单号，微信订单号、支付宝订单号等' },
  { name: 'channel_order_no', type: 'string', length: 64, required: '否', description: '银行渠道订单号，微信支付时显示在支付成功页面的条码，可用作扫' },
  { name: 'bank_type', type: 'string', length: 16, required: '否', description: '银行类型，采用字符串类型的银行标识。微信官方提供：银行类型对照表' },
  { name: 'promotion_detail', type: 'string', length: 6000, required: '否', description: '本交易支付时使用的所有优惠券信息 ，单品优惠功能字段，详情见《优惠字段说明》' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '201',
    pay_type: '010',
    service_id: '010',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    terminal_ip: '',
    device_no: '',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    auth_no: '',
    out_trade_no: '',
    open_id: '',
    total_fee: '1',
    order_body: '',
    attach: '',
    custom_store_id: '',
    official_store_id: '',
    device_type: '',
    key_sign: '',
  };
}

const Facepay: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/facepay"
      description="(刷脸)自助收银SDK调用凭证获取接口"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default Facepay;

