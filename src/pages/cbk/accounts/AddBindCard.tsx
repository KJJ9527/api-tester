// CBK新增绑定结算接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'brand_no', type: 'string', length: 8, required: '否', description: '品牌编号' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no', type: 'string', length: 32, required: '是', description: 'CBK账号' },
  { name: 'account_cardno', type: 'string', length: 32, required: '是', description: '结算银行卡号' },
  { name: 'account_name', type: 'string', length: 32, required: '是', description: '结算卡开户姓名,绑定卡是对公卡，户名是企业名称，如果对私，户名是法人姓名' },
  { name: 'bank_no', type: 'string', length: 25, required: '是', description: '支行编号' },
  { name: 'account_idnum', type: 'string', length: 20, required: '是', description: '结算卡身份证号' },
  { name: 'account_phone', type: 'string', length: 11, required: '是', description: '银行预留手机号' },
  { name: 'bank_name', type: 'string', length: 64, required: '是', description: '开户支行名称' },
  { name: 'province_code', type: 'string', length: 32, required: '是', description: '银联省code' },
  { name: 'city_code', type: 'string', length: 8, required: '是', description: '银联市code' },
  { name: 'county_code', type: 'string', length: 8, required: '否', description: '银联区code' },
  { name: 'parent_bank_no', type: 'string', length: 8, required: '是', description: '开户行code' },
  { name: 'settle_type', type: 'string', length: 8, required: '是', description: '结算类型 1对公 2对私' },
  { name: 'bind_type', type: 'string', length: 4, required: '是', description: '0：新增 1：新增并切同时绑定' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {

  const trace_no = uuidv4().replace(/-/g, '');

  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '',
    trace_no,
    account_no: '5005210154905486640',
    account_cardno: '8110701014001268543',
    account_name: '广州市番禺区老湘村餐馆',
    bank_no: '302100011000',
    account_idnum: '540329197712286446',
    account_phone: '15196529736',
    bank_name: '中信银行',
    province_code: '110',
    city_code: '1000',
    county_code: '1001',
    parent_bank_no: '302100011000',
    settle_type: '1',
    bind_type: '0',
    key_sign: '',
  };
}




const AddBindCard: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/addBindCard"
      description="新增CBK账户提现银行卡"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      stringifyFields={['account_rule']} // 指定需要转为字符串的字段
    />
  );
};

export default AddBindCard;