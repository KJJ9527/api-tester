// CBK账户开户接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'group_no', type: 'string', length: 32, required: '否', description: '集团编号' },
  { name: 'brand_no', type: 'enum', length: 8, required: '是', description: '品牌编号' },
  {
    name: 'merchant_no', type: 'string', length: 15, required: '否', description: '扫呗商户号(传扫呗商户号,则基于该商户的主体资料开户)注：register_type=0或5时，该字段必传'
  },
  {
    name: 'cust_info', type: 'string', length: 1024, required: '否', description: '开户信息,JSON字符串,注：register_type=1时必传',
    // 子表格的数据
    childrenFields: [
      { name: 'business_license_type', type: 'string', length: 1, required: '是', description: '开户类型 1企业，2个体工商户，3个人(小微商户)' },
      { name: 'id_card_type', type: 'string', length: 1, required: '是', description: '身份证件类型 0身份证 1香港通行证 2澳门通行证 3台湾通行证4外国人永久居留证' },
      { name: 'bank_account_type', type: 'string', length: 1, required: '否', description: '银行账户类型0未知，2平安产业结算通' },
      { name: 'license_name', type: 'string', length: 100, required: '否', description: '工商注册名称（与注册工商信息时一致）(企业与个体户必传)' },
      { name: 'license_no', type: 'string', length: 32, required: '否', description: '营业执照号码,与企业证件类型对应的企业注册号(企业与个体户必传)' },
      { name: 'license_begintime', type: 'string', length: 10, required: '否', description: '证件的开始日期。日期格式：YYYY-MM-DD' },
      { name: 'license_expire', type: 'string', length: 10, required: '否', description: '营业执照到期日（格式YYYY-MM-DD），如果证件到期日期为“长期”，则传：“2999-12-31”(企业与个体户必传)' },
      { name: 'login_phone', type: 'string', length: 11, required: '是', description: '登录手机号' },
      { name: 'legal_phone', type: 'string', length: 11, required: '是', description: '法人手机号' },
      { name: 'legal_idnum', type: 'string', length: 20, required: '否', description: '法人证件号码,用于实名认证企业的法人身份证号码（与注册工商信息时一致）(企业与个体户必传)' },
      { name: 'legal_name', type: 'string', length: 32, required: '否', description: '法人姓名,用于实名认证企业的法人姓名（与注册工商信息时一致）(企业与个体户必传)' },
      { name: 'id_card_start_date', type: 'string', length: 10, required: '是', description: '证件发证日期 yyyy-MM-dd（企业与个体户传法人，小微传负责人）' },
      { name: 'id_card_end_date', type: 'string', length: 10, required: '否', description: '证件到期日期 yyyy-MM-dd,如果证件到期日期为“长期”，则传：“2999-12-31”（企业与个体户传法人，小微传负责人）' },
      { name: 'account_type', type: 'string', length: 1, required: '是', description: '结算卡业务类型 枚举值：1：对公2：对私' },
      { name: 'account_phone', type: 'string', length: 11, required: '是', description: '结算卡银行预留手机号' },
      { name: 'account_name', type: 'string', length: 32, required: '是', description: '结算卡开户姓名,绑定卡是对公卡，户名是企业名称，如果对私，户名是法人姓名（同一套资料开多个户时，需要设置merchant_name，且merchant_name名称不能重复）' },
      { name: 'account_cardno', type: 'string', length: 30, required: '是', description: '结算银行卡号' },
      { name: 'account_idnum', type: 'string', length: 20, required: '是', description: '结算卡身份证号' },
      {
        name: 'merchant_name', type: 'string', length: 20, required: '是', description: 'CBK账户名称或者简称。当account_name长度大于20时必传该字段，否则会因为account_name过长报错；!注意：同一品牌下账户名称重复，或使用account_temp字段进行账户资料复用开户时必传，否则会报CBK名称已存在（一套资料创建多个账户时，可在CBK账户名称后增加数字或者其它简称）'
      },
      { name: 'bank_name', type: 'string', length: 64, required: '否', description: '开户支行名称' },
      { name: 'bank_no', type: 'string', length: 25, required: '否', description: '支行编号。银行编号表下载.' },
      { name: 'image_business_license', type: 'string', length: 255, required: '否', description: '营业执照图片url' },
      { name: 'business_location', type: 'string', length: 32, required: '否', description: '经营地址' },
      { name: 'img_idcard_front', type: 'string', length: 255, required: '是', description: '身份证正面照url' },
      { name: 'img_idcard_back', type: 'string', length: 255, required: '是', description: '身份证背面照url' },
      { name: 'img_logo', type: 'string', length: 255, required: '是', description: '商户门头照片url' },
      { name: 'img_contract', type: 'string', length: 255, required: '是', description: '店内环境照片url' },
      { name: 'province_code', type: 'string', length: 8, required: '是', description: '银联省code 省市区编号表下载' },
      { name: 'city_code', type: 'string', length: 8, required: '是', description: '银联市code' },
      { name: 'county_code', type: 'string', length: 8, required: '是', description: '银联区code' },
      { name: 'mcc_code', type: 'string', length: 8, required: '是', description: '行业类目' },
      { name: 'home_addr', type: 'string', length: 8, required: '是', description: '法人户籍地址' },
      { name: 'account_email', type: 'string', length: 8, required: '是', description: '联系人邮箱' },
    ]
  },
  { name: 'register_type', type: 'string', length: 1, required: '是', description: '开户类型：0.扫呗商户开户 1.资料开户 2.门店账户克隆 5.归集账户' },
  {
    name: 'account_temp_no', type: 'string', length: 32, required: '否', description: '要克隆的CBK账户，注：register_type=2时必传'
  },
  {
    name: 'identity_id', type: 'string', length: 11, required: '是', description: '账户类型id，值见下方说明',
    customChildrenData: [
      { id: '6', name: '入账方', description: '仅能入账和提现，不能分账' },
      { id: '8', name: '门店', description: '能入账、分账、提现。优先使用该类型' },
      { id: '16', name: '归集商户', description: '富友归集场景可用，其它分账通道不可用。不能出账、不能入账，资金仅能被归集到总户' },
      { id: '', name: '品牌储值、直营门店、联营门店，等等', description: '若有使用其它类型的需求，先和分账项目经理确认品牌在使用的类型，再获取对应类型id' },
    ],
    subColumns: [
      { title: '账户类型id', dataIndex: 'id', key: 'id', width: 100 },
      { title: '账户类型名称', dataIndex: 'name', key: 'name', width: 150 },
      { title: '描述', dataIndex: 'description', key: 'description' },
    ],
  },

  { name: 'account_channel', type: 'string', length: 32, required: '否', description: '品牌通道' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 响应参数定义（根据实际接口文档填写）
const responseParamDefinitions: ParamDefinition[] = [
  { name: 'return_code', type: 'string', length: 2, required: '是', description: '响应码 01:成功 02:失败。响应码仅代表通信状态，不代表业务结果' },
  { name: 'return_msg', type: 'string', length: 128, required: '是', description: '业务响应描述' },
  { name: 'result_code', type: 'string', length: 32, required: '否', description: '业务处理响应码，01成功 02失败' },
  { name: 'trace_no', type: 'string', length: 2, required: '是', description: '原请求流水号' },
  { name: 'account_no', type: 'string', length: 32, required: '否', description: '扫呗CBK账户账号用于分账,提现,查询余额等接口交互' },
  { name: 'account_core_no', type: 'string', length: 19, required: '否', description: '通道子账户' },
  { name: 'cust_info', type: 'string', length: 19, required: '是', description: '返回信息,JSON字符串,需要转义' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    brand_no: '60898677',
    group_no: '',
    trace_no: uuid(),
    merchant_no: '',
    account_temp_no: '',
    cust_info: {   // 对象形式，编辑器会展示为多行
      business_license_type: '2',
      id_card_type: '0',
      bank_account_type: '',
      license_no: '9144010155235195XR',
      license_begintime: '',
      license_name: '广州市番禺区老湘村餐馆',
      license_expire: '2099-12-31',
      login_phone: '15196529736',
      legal_name: '易丹',
      legal_idnum: '540329197712286446',
      id_card_start_date: '2020-01-01',
      id_card_end_date: '2999-12-31',
      legal_phone: '15196529736',
      account_type: '1',
      account_name: '广州市番禺区老湘村餐馆',
      merchant_name: '广州市番禺区老湘村餐馆123',
      account_cardno: '8110701014001268543',
      account_phone: '15196529736',
      account_idnum: '540329197712286446',
      bank_name: '中信银行',
      bank_no: '302100011000',
      province_code: '110',
      city_code: '1000',
      county_code: '1001',
      mcc_code: '',
      home_addr: '',
      account_email: '',
      image_business_license: '',
      business_location: '',
      img_idcard_front: '',
      img_idcard_back: '',
      img_logo: '',
      img_contract: ''
    },
    register_type: '1',
    identity_id: '8',
    account_channel: '6',
    key_sign: '',
  };
}




const CreateAccount: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="v2/createAccount"
      description="创建CBK账户并返回账户账号"
      paramDefinitions={paramDefinitions}
      responseParamDefinitions={responseParamDefinitions}
      defaultRequestJson={defaultRequestJson}
      stringifyFields={['cust_info']} // 指定需要转为字符串的字段
    />
  );
};

export default CreateAccount;