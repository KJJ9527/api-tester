// 查询时间段内渠道入金交易明细接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

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

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {

  const trace_no = uuidv4().replace(/-/g, '');

  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '60898677',
    trace_no,
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
    />
  );
};

export default QueryChannelTransIn;