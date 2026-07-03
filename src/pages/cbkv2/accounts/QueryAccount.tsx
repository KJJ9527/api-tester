// CBK账户余额分账接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'brand_no', type: 'string', length: 8, required: '否', description: '品牌编号' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与扫呗商户号、CBK账号、三方编号三选一)', },
  { name: 'partner_store_no', type: 'string', length: 32, required: '条件必填', description: '三方编号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '响应码 01:成功 02:失败。响应码仅代表通信状态，不代表业务结果' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '受理（业务）结果 01:成功 02:失败 03:受理中' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  { name: 'group_no', type: 'string', length: 16, required: '是', description: '集团编号' },
  { name: 'brand_no', type: 'string', length: 16, required: '是', description: '品牌编号' },
  { name: 'account_no', type: 'string', length: 32, required: '否', description: 'CBK账号' },
  { name: 'account_name', type: 'string', length: 32, required: '否', description: '结算卡开户姓名' },
  { name: 'account_phone', type: 'string', length: 11, required: '否', description: '结算人手机号' },
  { name: 'account_idnum', type: 'string', length: 20, required: '否', description: '结算人证件号' },
  { name: 'account_cardno', type: 'string', length: 64, required: '否', description: '结算银行卡号' },
  { name: 'bank_code', type: 'string', length: 16, required: '否', description: '银行代码' },
  { name: 'bank_name', type: 'string', length: 64, required: '否', description: '发卡行名称' },
  { name: 'account_channel', type: 'string', length: 2, required: '否', description: 'CBK账户当前分账通道' },
  { name: 'channel_account_no', type: 'string', length: 32, required: '否', description: '对应通道账号' },
  { name: 'agreement_status', type: 'string', length: 2, required: '否', description: '协议签署状态 0-未签署，1-已签署' },
  { name: 'channel_fail_reason', type: 'string', length: 64, required: '否', description: '通道入驻驳回原因' },
  { name: 'account_type', type: 'string', length: 2, required: '否', description: '结算卡类型 1.对公 2.对私' },
  { name: 'business_license_type', type: 'string', length: 2, required: '否', description: '账户类型：1企业，2个体工商户，3个人(小微商户)' },
  { name: 'license_name', type: 'string', length: 64, required: '否', description: '营业执照名称' },
  { name: 'license_no', type: 'string', length: 32, required: '否', description: '社会统一信用代码' },
  { name: 'legal_name', type: 'string', length: 32, required: '否', description: '法人名称' },
  { name: 'legal_idnum', type: 'string', length: 32, required: '否', description: '法人身份证号' },
  { name: 'account_custom_name', type: 'string', length: 64, required: '否', description: 'CBK账户名' },
  { name: 'id_card_type', type: 'string', length: 2, required: '否', description: '身份证件类型 0身份证 1香港通行证 2澳门通行证 3台湾通行证4外国人永久居留证' },
  { name: 'identity_id', type: 'string', length: 16, required: '否', description: '角色id' },
  { name: 'identity_name', type: 'string', length: 16, required: '否', description: '账户身份名称' },
  { name: 'open_time', type: 'string', length: 19, required: '否', description: '开户时间yyyy-MM-dd HH:mm:ss' },
  { name: 'account_status', type: 'string', length: 2, required: '否', description: '账户状态,枚举值： 0未申请 1正常 2法人上游签约中 3已冻结 4法人上游待签约 9已关闭 10已注销' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '',
    trace_no: uuid(),
    account_no: '5005210154900053410',
    merchant_no: '',
    partner_store_no: '',
    key_sign: '',
  };
}




const QueryAccount: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="v2/queryAccount"
      description="CBK账户查询"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default QueryAccount;