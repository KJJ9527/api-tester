// CBK结算信息修改接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: 'CBK账号(与扫呗商户号、三方编号三选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '扫呗商户号(与CBK账号、三方编号三选一)' },
  { name: 'partner_store_no', type: 'string', length: 32, required: '条件必填', description: '三方编号(与CBK账号、扫呗商户号三选一)' },
  {
    name: 'account_info', type: 'string', length: 2, required: '否', description: '结算信息 JSON格式字符串',
    // 子表格的数据
    childrenFields:
      [
        { name: 'account_cardno', type: 'string', length: 32, required: '否', description: '结算银行卡号' },
        { name: 'account_name', type: 'string', length: 32, required: '否', description: '结算卡开户姓名,绑定卡是对公卡，户名是企业名称，如果对私，户名是法人姓名' },
        { name: 'bank_no', type: 'string', length: 25, required: '否', description: '支行编号,支行编号的值参见银行简称附录.银行编号表下载.' },
        { name: 'bank_name', type: 'int', length: 64, required: '否', description: '开户支行名称' },
        { name: 'province_code', type: 'string', length: 8, required: '否', description: '银联省code 省市区编号表下载' },
        { name: 'city_code', type: 'string', length: 8, required: '否', description: '银联市code' },
        { name: 'account_idnum', type: 'string', length: 20, required: '是', description: '结算卡身份证号' },
        { name: 'account_phone', type: 'string', length: 11, required: '否', description: '银行预留手机号（若需要只修改手机号，可只传该字段，其它字段可不传）' },
      ]
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
    account_no: '5005210154905486640',
    merchant_no: '',
    partner_store_no: '',
    account_info: {   // 对象形式，编辑器会展示为多行
      account_cardno: '9144010155235195XR',
      account_name: '广州市番禺区老湘村餐馆',
      bank_no: '302100011000',
      bank_name: '中信银行',
      province_code: '110',
      city_code: '1000',
      account_idnum: '540329197712286446',
      account_phone: '15196529736',
    },
    key_sign: '',
  };
}




const Updateaccount: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/updateaccount"
      description="修改CBK账户结算信息"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      stringifyFields={['account_info']} // 指定需要转为字符串的字段
    />
  );
};

export default Updateaccount;