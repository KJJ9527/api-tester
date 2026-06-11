// CBK交易详情查询接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  {
    name: 'trade_no', type: 'string', length: 32, required: '条件必填', description: '交易请求(分账、提现、退回)流水号。使用2.1账户余额分账接口进行分账时，该字段传2.1账户余额分账接口里返回的trade_no；使用2.2批量订单分账接口进行分账时，该字段传递2.2批量订单分账接口里返回的allocate_trace；查询提现明细时，该字段传递2.3账户提现接口的trade_no;查询退回明细时，该字段传递2.8分账交易退回接口的trade_no;trade_no和out_trade_no两者选其一'
  },
  {
    name: 'out_trade_no', type: 'string', length: 32, required: '条件必填', description: 'CBK分账交易订单号（使用2.1账户余额分账接口进行分账时，该字段传2.1账户余额分账接口里返回的out_trade_no。使用2.2批量订单分账接口进行分账时，该字段传递2.2批量订单分账接口里返回的sub_trade_no）,trade_no和out_trade_no两者选其一'
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
    trade_no: '57b2940f9dba4734a944f6b8e94aad05',
    out_trade_no: '',
    key_sign: '',
  };
}

const Queryorder: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/queryorder"
      description="CBK交易详情查询"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Queryorder;