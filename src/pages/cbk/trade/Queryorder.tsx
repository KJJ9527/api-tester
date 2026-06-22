// CBK交易详情查询接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';
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

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  { name: 'trade_no', type: 'string', length: 32, required: '否', description: '分账流水号,原样返回' },
  { name: 'out_trade_no', type: 'string', length: 32, required: '否', description: 'CBK分账交易订单号,分账完成后生成的唯一流水号' },
  { name: 'amt', type: 'string', length: 11, required: '否', description: '交易金额,单位分' },
  { name: 'name_out', type: 'string', length: 2, required: '否', description: '出账方姓名' },
  { name: 'account_out', type: 'string', length: 128, required: '否', description: '出账方CBK账号' },
  { name: 'account_in', type: 'string', length: 128, required: '否', description: '入账方CBK账号,提现交易返回银行卡号' },
  { name: 'name_in', type: 'string', length: 128, required: '否', description: '入账方账户名' },
  { name: 'create_time', type: 'string', length: 128, required: '否', description: '交易创建时间yyyy-MM-dd HH:mm:ss' },
  { name: 'finish_time', type: 'string', length: 128, required: '否', description: '交易完成时间yyyy-MM-dd HH:mm:ss' },
  { name: 'trade_status', type: 'string', length: 128, required: '否', description: '分账状态：0.未知 1.成功 2.失败 3.处理中 4.待分账 5.分账回退成功 6.撤销 7.未分账 8.分账回退失败 9.担保户待结算' },
  { name: 'trade_type', type: 'string', length: 128, required: '否', description: '交易类型: 0.未知 1.订单分账 2.余额分账 3.充值 4.提现 5.清分' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '交易备注' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
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
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default Queryorder;