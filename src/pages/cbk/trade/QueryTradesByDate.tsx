// CBK分账数据列表查询接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

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

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {

  const trace_no = uuidv4().replace(/-/g, '');

  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no,
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
    />
  );
};

export default QueryTradesByDate;