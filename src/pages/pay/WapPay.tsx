// 支付2.0Wap支付接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付类型,000 自动判断（不填默认000）,010 微信,020 支付宝,110 银联云闪付,180 微企付,190 支付宝商转,company_flag 为2时，设置180、190可限制只能使用产业付。或者传000可实现自动识别,注意: 此字段不参与签名' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'company_flag', type: 'string', length: 8, required: '是', description: '是否使用产业付产品:0：否（默认0）1：产业付和普通支付混合,2：只能产业付 （即pay_type只能使用180或者190）' },
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

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_type: '000',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    company_flag: '',
    terminal_trace: uuid(),
    terminal_time: currentDateTime(),
    total_fee: '1',
    order_body: '',
    notify_url: '',
    attach: '',
    repeated_trace: '3',
    auto_pay: '1',
    key_sign: '',
  };
}

const WapPay: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method=""
      path=""
      description="wap支付接口"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default WapPay;

