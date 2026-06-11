// CBK中信交易明细电子回单申请接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'pay_type', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'service_id', type: 'string', length: 8, required: '是', description: '品牌编号，扫呗分配' },
  { name: 'merchant_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'terminal_id', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号二选一)' },
  { name: 'terminal_ip', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与CBK账号二选一)' },
  { name: 'terminal_location', type: 'string', length: 15, required: '否', description: '通道子账户编号' },
  {
    name: 'device_no', type: 'string', length: 2, required: '是', description: '交易类型:01-入金分账:02-交易划转:03-提现:04-提现手续费:05-提现退汇:06-渠道来账:07-支付交易:08-退款交易:09-平台商户预付交易:11-平台扣罚:12-平台补贴:13-实时预清分:99-所有'
  },
  { name: 'terminal_trace', type: 'string', length: 8, required: '是', description: '交易开始日期 格式: yyyyMMdd' },
  { name: 'terminal_time', type: 'string', length: 8, required: '是', description: '交易结束日期 格式: yyyyMMdd' },
  { name: 'auth_no', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'total_fee', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'sub_appid', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'order_body', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'attach', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'goods_detail', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'goods_tag', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'custom_store_id', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'official_store_id', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'food_order_type', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'coupon_no', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'coupon_credential', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'sence_no', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'timeout_express', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {

  const trace_no = uuidv4().replace(/-/g, '');

  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '60898677',
    trace_no,
    account_no: '5005210154905486640',
    merchant_no: '',
    partner_store_no: '1',
    trans_type: '99',
    trans_start_date: '20260601',
    trans_end_date: '20260601',
    key_sign: '',
  };
}

const Barcodepay: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/barcodepay"
      description="付款码支付（B扫C）"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Barcodepay;