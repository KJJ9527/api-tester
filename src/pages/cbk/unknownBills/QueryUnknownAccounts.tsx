// CBK查询不明来账接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'brand_no', type: 'string', length: 8, required: '是', description: '品牌编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'page', type: 'string', length: 8, required: '是', description: '页码，从1开始, 每页默认为20条' },
  { name: 'trans_date', type: 'string', length: 15, required: '是', description: '交易日期，格式为yyyyMMdd' },
  {
    name: 'trans_status', type: 'string', length: 1, required: '是', description: '交易状态:0：未处理，1：处理成功，9：所有'
  },
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
    page: '1',
    trans_date: '20260601',
    trans_status: '9',
    key_sign: '',
  };
}

const QueryUnknownAccounts: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/zx/queryUnknownAccounts"
      description="查询不明来账"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default QueryUnknownAccounts;