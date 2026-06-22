// CBK中信交易明细电子回单申请接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';


// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'brand_no', type: 'string', length: 8, required: '是', description: '品牌编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号二选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与CBK账号二选一)' },
  { name: 'partner_store_no', type: 'string', length: 15, required: '否', description: '通道子账户编号' },
  {
    name: 'trans_type', type: 'string', length: 2, required: '是', description: '交易类型:01-入金分账:02-交易划转:03-提现:04-提现手续费:05-提现退汇:06-渠道来账:07-支付交易:08-退款交易:09-平台商户预付交易:11-平台扣罚:12-平台补贴:13-实时预清分:99-所有'
  },
  { name: 'trans_start_date', type: 'string', length: 8, required: '是', description: '交易开始日期 格式: yyyyMMdd' },
  { name: 'trans_end_date', type: 'string', length: 8, required: '是', description: '交易结束日期 格式: yyyyMMdd' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  { name: 'file_name', type: 'string', length: 2048, required: '否', description: '文件名格式： 商户编号(15 位)+文件类型（3 位，828）+当前日期（6 位， 格式：yyMMdd）+19 位序号+4 位后缀(.ZIP)根据此文件名可查询文件处理 状态及下载文件' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '60898677',
    trace_no: uuid(),
    account_no: '5005210154905486640',
    merchant_no: '',
    partner_store_no: '1',
    trans_type: '99',
    trans_start_date: '20260601',
    trans_end_date: '20260601',
    key_sign: '',
  };
}

const Apply: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/zx/open/electronicReceipt/apply"
      description="中信交易明细电子回单申请"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default Apply;