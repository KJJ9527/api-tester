// CBK分账数据列表查询接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';
// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '是', description: 'CBK账号' },
  { name: 'start_date', type: 'string', length: 8, required: '是', description: '查询开始日期，格式为yyyyMMdd' },
  { name: 'end_date', type: 'string', length: 8, required: '是', description: '查询结束日期，格式为yyyyMMdd' },
  { name: 'page', type: 'string', length: 11, required: '是', description: '页码' },
  {
    name: 'query_flag', type: 'string', length: 1, required: '否', description: '查询标志,中信：不需要传这个字段，默认查所有类型数据;平安：必传参数：1：交易明细汇总 2：提现 3：清分'
  },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  {
    name: 'tradeDataList', type: 'string', length: 1024, required: '否', description: '入账订单集合',
    childrenFields:
      [
        { name: 'trans_date', type: 'string', length: 8, required: '是', description: '交易日期，格式：YYYYMMDD' },
        { name: 'trans_time', type: 'String', length: 6, required: '是', description: '交易时间，格式：HHMMSS' },
        { name: 'trans_type', type: 'string', length: 1, required: '是', description: '交易类型: 1.订单分账 2.余额分账3. 充值 4.提现 5.分账退回 6. 清分' },
        { name: 'trans_flag', type: 'string', length: 1, required: '否', description: '资金方向1：转出 2：转入' },
        { name: 'amt', type: 'string', length: 11, required: '是', description: '交易金额，单位：分' },
        { name: 'out_trade_no', type: 'string', length: 15, required: '是', description: 'CBK分账订单号' },
        { name: 'channel_trade_no', type: 'string', length: 10, required: '是', description: '通道分账订单号' },
        { name: 'trade_status', type: 'string', length: 1, required: '是', description: '0:成功' },
        { name: 'order_body', type: 'string', length: 100, required: '是', description: '交易备注' },
      ]
  },
  { name: 'total_page', type: 'string', length: 15, required: '是', description: '总页数' },
  { name: 'total_number', type: 'string', length: 15, required: '是', description: '记录总数' },
  { name: 'account_channel', type: 'string', length: 15, required: '是', description: 'CBK账号所属通道' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
    account_no: '5005210154905486640',
    start_date: '20260601',
    end_date: '20260601',
    page: '1',
    query_flag: '',
    key_sign: '',
  };
}

const QueryTradesByDate: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/queryTradesByDate"
      description="CBK分账数据列表查询"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default QueryTradesByDate;