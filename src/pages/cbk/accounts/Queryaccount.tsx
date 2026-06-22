// CBK账户查询接口

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
  { name: 'identity_name', type: 'string', length: 32, required: '否', description: '账户类型名称' },
  { name: 'account_no', type: 'string', length: 32, required: '是', description: '扫呗CBK账号' },
  { name: 'account_custom_name', type: 'string', length: 32, required: '否', description: 'CBK账户名' },
  { name: 'account_name', type: 'string', length: 32, required: '是', description: '结算卡开户姓名' },
  { name: 'account_cardno', type: 'string', length: 32, required: '是', description: '结算银行卡号' },
  { name: 'account_status', type: 'string', length: 1, required: '是', description: '账户状态,枚举值：1正常 4未激活 9已关闭' },
  { name: 'bank_name', type: 'string', length: 30, required: '是', description: '开户支行名称' },
  { name: 'open_time', type: 'string', length: 19, required: '是', description: '开户时间yyyy-MM-dd HH:mm:ss' },
  { name: 'account_channel', type: 'string', length: 1, required: '是', description: 'CBK账户当前分账通道：5.富友 6中信 7平安' },
  { name: 'channel_account_no', type: 'string', length: 32, required: '否', description: '通道子帐号' },
  { name: 'sub_account_list', type: 'string', length: 128, required: '否', description: '子账户列表（多通道时返回）' },
  { name: 'account_core_no', type: 'string', length: 32, required: '否', description: '二级账户号(智能清分时转账所需账号)' },
  { name: 'register_status', type: 'string', length: 1, required: '否', description: '分账通道申请状态 0未申请 1入驻开通成功 2待鉴权 3入驻申请中 4入驻申请驳回 5更换银行卡失败 6已风控 7其他错误 9已关闭' },
  { name: 'channel_fail_reason', type: 'string', length: 32, required: '否', description: '通道入驻驳回原因' },
  { name: 'account_idnum', type: 'string', length: 20, required: '是', description: '结算人身份证号' },
  { name: 'account_type', type: 'string', length: 1, required: '是', description: '结算卡类型：1对公 2对私' },
  { name: 'account_phone', type: 'string', length: 11, required: '是', description: '结算人手机号' },
  { name: 'business_license_type', type: 'string', length: 1, required: '否', description: '账户类型：1企业，2个体工商户，3个人(小微商户)' },
  { name: 'license_name', type: 'string', length: 32, required: '否', description: '营业执照名称' },
  { name: 'license_no', type: 'string', length: 32, required: '否', description: '营业执照编号' },
  { name: 'legal_name', type: 'string', length: 32, required: '否', description: '法人名称' },
  { name: 'legal_idnum', type: 'string', length: 32, required: '否', description: '法人身份证号' },
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




const Queryaccount: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/queryaccount"
      description="CBK账户查询"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default Queryaccount;