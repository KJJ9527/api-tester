// CBK查询不明来账接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';
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

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  { name: 'total_number', type: 'string', length: 15, required: '是', description: '记录总数' },
  { name: 'total_page', type: 'string', length: 10, required: '是', description: '总页数' },
  { name: 'account_type', type: 'string', length: 1, required: '是', description: '账户类型' },
  { name: 'current_page', type: 'string', length: 10, required: '是', description: '当前页数' },
  {
    name: 'unkonwAccounts', type: 'List', length: 1024, required: '是', description: '不明来账账单',
    childrenFields:
      [
        {
          name: 'trans_status', type: 'string', length: 1, required: '是', description: '交易状态0：未处理，1：处理成功，2：处理中'
        },
        { name: 'account', type: 'string', length: 15, required: '是', description: '交易资金账号' },
        { name: 'trdt', type: 'Number', length: 8, required: '是', description: '交易日期格式：YYYYMMDD，主键组成字段' },
        { name: 'jrno', type: 'string', length: 14, required: '否', description: '交易日志号' },
        { name: 'time_stampe', type: 'string', length: 26, required: '是', description: '时间戳' },
        { name: 'opbn', type: 'string', length: 14, required: '是', description: '对方行号,退款时，必上送字段' },
        { name: 'tram', type: 'string', length: 17, required: '是', description: '交易金额' },
        { name: 'acsq', type: 'string', length: 6, required: '是', description: '账户序号,客户账返回' },
        { name: 'bkno', type: 'string', length: 3, required: '是', description: '银行号,客户账返回' },
        { name: 'actn', type: 'string', length: 13, required: '是', description: '账户交易序号,客户账返回' },
        { name: 'ftfl', type: 'string', length: 1, required: '是', description: '金融交易标识,客户账返回' },
        { name: 'remark', type: 'string', length: 100, required: '是', description: '备注' },
        { name: 'reark1', type: 'string', length: 100, required: '是', description: '备用字段1,来账账号' },
        { name: 'reark2', type: 'string', length: 100, required: '是', description: '备用字段2,来账名称' },
      ]
  },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '60898677',
    trace_no: uuid(),
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
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default QueryUnknownAccounts;