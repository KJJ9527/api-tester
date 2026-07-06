// 修改结算卡

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '否', description: 'CBK账号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '否', description: '扫呗商户号(与扫呗商户号、CBK账号、三方编号三选一)', },
  { name: 'partner_store_no', type: 'string', length: 32, required: '否', description: '三方编号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'account_cardno', type: 'string', length: 32, required: '是', description: '结算卡号' },
  { name: 'new_account_cardno', type: 'string', length: 32, required: '否', description: '需更新卡号（可不传）' },
  { name: 'account_name', type: 'string', length: 32, required: '是', description: '结算卡开户姓名,绑定卡是对公卡，户名是企业名称，如果对私，户名是法人姓名' },
  { name: 'bank_code', type: 'string', length: 32, required: '是', description: '支行编号' },
  { name: 'account_idnum', type: 'string', length: 32, required: '是', description: '结算卡身份证号' },
  { name: 'account_phone', type: 'string', length: 32, required: '是', description: '银行预留手机号' },
  { name: 'bank_name', type: 'string', length: 32, required: '是', description: '支行名称' },
  { name: 'province_code', type: 'string', length: 32, required: '是', description: '省code' },
  { name: 'city_code', type: 'string', length: 32, required: '是', description: '市code' },
  { name: 'county_code', type: 'string', length: 32, required: '否', description: '区code' },
  { name: 'account_type', type: 'string', length: 32, required: '是', description: '结算类型 1对公 2对私' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '响应码 01:成功 02:失败。响应码仅代表通信状态，不代表业务结果' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 2, required: '否', description: '受理（业务）结果 01:成功 02:失败 03:受理中' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '原请求流水号' },
  { name: 'bind_status', type: 'string', length: 32, required: '是', description: '结算卡绑定状态 枚举值：0.未绑定；1.绑定成功；2.绑定失败；3.绑定审核中' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
    account_no: '5005210154900053410',
    merchant_no: '',
    partner_store_no: '',
    account_cardno: '6228480402564890018',
    new_account_cardno: '',
    account_name: '',
    bank_code: '',
    account_idnum: '',
    account_phone: '',
    bank_name: '',
    province_code: '',
    city_code: '',
    county_code: '',
    account_type: '2',
    key_sign: '',
  };
}




const UpdateCard: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="v2/updateCard"
      description="修改结算卡"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default UpdateCard;