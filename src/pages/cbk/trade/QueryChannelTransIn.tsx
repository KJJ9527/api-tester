// 查询时间段内渠道入金交易明细接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';
// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'brand_no', type: 'string', length: 8, required: '是', description: '品牌编号' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'trans_in_date', type: 'string', length: 10, required: '是', description: '入金日期，（格式YYYY-MM-DD）' },
  { name: 'current_pageid', type: 'int', length: 8, required: '是', description: '页码，初始值为1' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  {
    name: 'transDataList', type: 'string', length: 1024, required: '否', description: '挂账交易详情',
    childrenFields:
      [
        {
          name: 'trans_date', type: 'string', length: 8, required: '否', description: '交易日期，格式：YYYY- MM - DD'
        },
        { name: 'trans_amt', type: 'Number', length: 12, required: '否', description: '交易金额，单位：分' },
        { name: 'bank_info', type: 'string', length: 50, required: '否', description: '转账银行信息' },
        { name: 'remark', type: 'string', length: 50, required: '否', description: '转账备注' },
        { name: 'channel_trade_no', type: 'string', length: 50, required: '否', description: '渠道流水号' },
        { name: 'account_no_in', type: 'string', length: 32, required: '否', description: 'CBK账号（api_ver=110时返回）' },
        { name: 'trans_in_no', type: 'string', length: 25, required: '否', description: '入金账号' },
        { name: 'trans_in_name', type: 'string', length: 25, required: '否', description: '入金账户名称' },
        { name: 'trans_out_no', type: 'string', length: 25, required: '否', description: '出金账号' },
        { name: 'trans_out_name', type: 'string', length: 25, required: '否', description: '出金账户名称' },
        {
          name: 'trans_type', type: 'string', length: 2, required: '否', description: '01：转账入金;02：会员充值/ 退票入账;03：支付渠道入金'
        },
      ]
  },
  { name: 'total_page', type: 'string', length: 15, required: '否', description: '总页数' },
  { name: 'total_number', type: 'string', length: 15, required: '否', description: '记录总数' },
  { name: 'account_channel', type: 'string', length: 11, required: '否', description: 'CBK账号所属通道' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '60898677',
    trace_no: uuid(),
    trans_in_date: '2026-06-01',
    current_pageid: 1,
    key_sign: '',
  };
}

const QueryChannelTransIn: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/manager/queryChannelTransIn"
      description="查询时间段内渠道入金交易明细"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default QueryChannelTransIn;