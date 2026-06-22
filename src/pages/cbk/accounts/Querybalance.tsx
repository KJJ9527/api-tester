// CBK账户余额查询接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';
// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号、三方编号三选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与CBK账号、三方编号三选一)' },
  { name: 'partner_store_no', type: 'string', length: 32, required: '条件必填', description: '三方编号(与CBK账号、扫呗商户号三选一)' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '业务响应码，01成功 02失败' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 32, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  { name: 'account_no', type: 'string', length: 32, required: '否', description: 'CBK账号' },
  { name: 'total_bal', type: 'string', length: 11, required: '否', description: '账户总额,查询的账户的账户总额（冻结金额+账户可用金额+待结算金额）单位分' },
  { name: 'freeze_bal', type: 'string', length: 11, required: '否', description: '冻结金额,查询的账户已冻结的金额（账户总额-账户可用金额-待结算金额）单位分' },
  { name: 'available_bal', type: 'string', length: 11, required: '否', description: '账户可用金额,也为可提现金额或者可发起冻结的金额（账户总额-冻结金额-待结算金额）单位分' },
  {
    name: 'prepaid_bal', type: 'string', length: 11, required: '否', description: '待结算金额（不可提现，不可用于冻结） 单位分。特殊说明：平安通道若申请了待结算金额可用于分账，需与available_bal相加，为可分账金额'
  },
  {
    name: 'recharge_dedicated_amt', type: 'string', length: 11, required: '否', description: '一卡多户共用充值入金户的余额（不可提现，不可用于冻结，不可用于退款。api_ver=101或102时返回）特殊说明：1.中信通道开通一卡多户后，该字段会返回多账户共用账户的余额，账户可用余额+ 该字段余额即为采购可用资金。2.若系统方在自有系统为加盟商展示CBK余额，需将该字段金额单独展示为多账户共用金额'
  },
  {
    name: 'transferable_amt', type: 'string', length: 11, required: '否', description: '可分账金额(api_ver=102时返回)特殊说明：可分账金额根据CBK后台多种条件计算得出，并不一定等于接口中其它几个字段之和，具体金额明细可查阅CBK后台账户详情。可分账金额不代表可提现金额，也不代表账户实际余额，且不可用于发起冻结'
  },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
    account_no: '5005210154905486640',
    merchant_no: '',
    partner_store_no: '',
    key_sign: '',
  };
}




const Querybalance: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/querybalance"
      description="CBK账户余额查询"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default Querybalance;