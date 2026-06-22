// CBK处理不明来账接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'brand_no', type: 'string', length: 8, required: '是', description: '品牌编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'operate_type', type: 'string', length: 8, required: '是', description: '操作类型0：退回' },
  { name: 'account_type', type: 'string', length: 15, required: '是', description: '交易资金账户类型1：内部账' },
  { name: 'account', type: 'string', length: 1, required: '是', description: '交易资金账号:查询接口返回' },
  { name: 'trdt', type: 'string', length: 1, required: '是', description: '交易日期:查询接口返回' },
  { name: 'jrno', type: 'string', length: 1, required: '是', description: '交易日志号:查询接口返回' },
  { name: 'time_stampe', type: 'string', length: 1, required: '是', description: '时间戳:查询接口返回' },
  { name: 'opbn', type: 'string', length: 1, required: '是', description: '对方行号:退款时必输，重新匹配时可为空' },
  { name: 'tram', type: 'string', length: 1, required: '是', description: '交易金额:查询接口返回' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '60898677',
    trace_no: uuid(),
    operate_type: '0',
    account_type: '1',
    account: '5005210154905486640',
    trdt: '',
    jrno: '',
    time_stampe: '',
    opbn: '',
    tram: '',
    key_sign: '',
  };
}

const HandleUnknownAccount: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/zx/handleUnknownAccount"
      description="处理不明来账"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default HandleUnknownAccount;