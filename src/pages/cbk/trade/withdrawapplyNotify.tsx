// CBK账户提现回调通知

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'account_in', type: 'string', length: 32, required: '否', description: '入账银行账号' },
  { name: 'account_out', type: 'string', length: 32, required: '否', description: '出账CBK账号' },
  { name: 'merchant_out', type: 'string', length: 15, required: '否', description: '出账扫呗商户号' },
  { name: 'trade_no', type: 'string', length: 32, required: '否', description: '商户交易流水号' },
  { name: 'out_trade_no', type: 'string', length: 32, required: '否', description: '提现订单号' },
  { name: 'sub_out_trade_no', type: 'string', length: 32, required: '否', description: '提现子订单号' },
  { name: 'amt', type: 'string', length: 11, required: '否', description: '提现金额,单位分' },
  { name: 'total_transfer_amt', type: 'string', length: 11, required: '否', description: '提现总金额,单位分' },
  { name: 'trade_status', type: 'string', length: 1, required: '否', description: '提现状态1:成功，2:失败' },
  { name: 'trade_type', type: 'string', length: 1, required: '否', description: '交易类型: 4.提现' },
  { name: 'scene_no', type: 'string', length: 11, required: '否', description: '场景编号' },
  { name: 'finish_time', type: 'string', length: 19, required: '否', description: '提现完成时间yyyy-MM-dd HH:mm:ss' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '提现备注' },
  { name: 'order_body', type: 'string', length: 100, required: '否', description: '备用字段' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {};
}

const WithdrawapplyNotify: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method=""
      path=""
      description="CBK账户提现回调通知参数"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default WithdrawapplyNotify;