// 支付2.0聚合码接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值202' },
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式：000自动识别类型' },
  { name: 'service_id', type: 'string', length: 3, required: '是', description: '接口类型，当前类型 016' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '是', description: '终端流水号，可填写商户系统的业务订单号,特殊说明：,1.若repeated_trace设置1，多次请求时不可使用同一个值）,2.该值可对应用在4.5支付查询、4.6退款申请、4.8关闭订单接口的pay_trace字段' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式。该值可对应用在4.5支付查询、4.6退款申请、4.8关闭订单接口的pay_time字段' },
  { name: 'total_fee', type: 'string', length: 32, required: '是', description: '金额，单位分' },
  { name: 'order_body', type: 'string', length: 32, required: '否', description: '订单描述,显示在消费者账单详情页面的商品信息。禁止使用+，空格，/，?，%，#，&，=，【这几类特殊符号' },
  {
    name: 'notify_url', type: 'string', length: 14, required: '否', description: '支付结果接收地址，请按4.10回调通知接口编写接口接收。注：该字段若不传递，需要通过4.5支付查询接口确认订单支付状态'
  },
  { name: 'attach', type: 'string', length: 14, required: '否', description: '附加数据，原样返回' },
  { name: 'timeout_express', type: 'string', length: 14, required: '否', description: '链接失效时间，非订单关闭时间，具体请看注意事项。单位s。取值范围：1～7200的整数，不传默认7200s' },
  {
    name: 'repeated_trace', type: 'string', length: 14, required: '是', description: '是否允许重复扫码或支付:0或不传: 允许重复扫码或支付。（说明：同一终端流水号和终端交易时间会出现多笔交易）,1: 不允许重复扫码或支付。(说明：取消支付后也不可重新支付),2: 允许terminal_trace（业务订单号）值不变，但terminal_time（交易发起时间）值变化时，多次请求该接口生成收款码（说明：用于订单重新发起收款或者一个单号分不同时间多次收款）,3: 允许terminal_trace（业务订单号）+terminal_time（交易发起时间）只支付成功一次，失败情况下可重复（说明：多次扫码或者收银台多次点击支付时，只能支付成功一次）'
  },
  {
    name: 'auto_pay', type: 'string', length: 14, required: '否', description: '扫码后是否自动生成订单,1：自动拉起支付并生成订单,0或不传：手动点击页面支付按钮后生成订单'
  },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  {
    name: 'return_code', type: 'string', length: 2, required: '是', description: '响应码：01成功 ，02失败；说明：先判断该字段，再判断result_code，若该字段返回02，需调用支付查询接口，确认订单状态'
  },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '返回信息提示，“预支付请求成功”，“预支付请求失败”等' },
  {
    name: 'result_code', type: 'string', length: 2, required: '否', description: '业务结果：01成功 ，02失败'
  },
  { name: 'merchant_name', type: 'string', length: 40, required: '否', description: '商户名称' },
  { name: 'merchant_no', type: 'string', length: 15, required: '否', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '否', description: '终端号' },
  { name: 'terminal_trace', type: 'string', length: 32, required: '否', description: '终端流水号，商户系统的订单号，扫呗系统原样返回' },
  { name: 'terminal_time', type: 'string', length: 14, required: '否', description: '终端交易时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'total_fee', type: 'string', length: 12, required: '否', description: '金额，单位分' },
  { name: 'qr_url', type: 'string', length: 128, required: '否', description: '短链接，需调用方自己转换成二维码或直接在微信和支付宝、云闪付内打开链接' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '202',
    pay_type: '000',
    service_id: '016',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    total_fee: '1',
    order_body: '',
    notify_url: '',
    attach: '',
    timeout_express: '',
    repeated_trace: '3',
    auto_pay: '1',
    key_sign: '',
  };
}

const Qrpay: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/qrpay"
      description="聚合码接口(C扫B)"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default Qrpay;

