// CBK账户余额分账接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'trade_no', type: 'string', length: 32, required: '是', description: '分账流水号，系统方自己定义，每次请求需唯一（30s内请勿重复请求，如果该单号存在分账成功记录，无法再次请求）' },
  { name: 'account_out', type: 'string', length: 32, required: '条件必填', description: '出账方CBK账号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'merchant_out', type: 'string', length: 15, required: '条件必填', description: '出账方扫呗商户号(与扫呗商户号、CBK账号、三方编号三选一)', },
  { name: 'partner_store_no_out', type: 'string', length: 32, required: '条件必填', description: '出账方三方编号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'account_in', type: 'string', length: 32, required: '条件必填', description: '入账方CBK账号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'merchant_in', type: 'string', length: 15, required: '条件必填', description: '入账方扫呗商户号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'partner_store_no_in', type: 'string', length: 32, required: '条件必填', description: '入账方三方编号(与扫呗商户号、CBK账号、三方编号三选一)' },
  { name: 'amt', type: 'string', length: 11, required: '是', description: '分账金额,单位分' },
  { name: 'scene_no', type: 'string', length: 10, required: '否', description: '场景编号（如有指定场景需求，需提前找分账项目经理添加场景，不能随便传。不传时，默认定义为其他）' },
  { name: 'order_type', type: 'string', length: 1, required: '否', description: '业务来源类型：0余额 1微信 2支付宝 3扫呗校园外卖 4抖音 5美团 6饿了么 7通联 8快手 9大众点评 10富友 11随行付 12乐刷 13库享' },
  { name: 'notify_url', type: 'string', length: 128, required: '否', description: '回调通知地址（只有当分账状态trade_status返回3处理中时，回调才生效）' },
  { name: 'order_body', type: 'string', length: 100, required: '是', description: '交易备注' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据' },
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
  { name: 'trade_status', type: 'string', length: 1, required: '否', description: '分账状态 1：成功 2：失败 3：处理中（需使用回调或者查询）' },
  { name: 'key_sign', type: 'string', length: 1024, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no: uuid(),
    trade_no: uuid(),
    account_out: '5005210154900053410',
    merchant_out: '',
    partner_store_no_out: '',
    account_in: '5005210154905486640',
    merchant_in: '',
    partner_store_no_in: '',
    amt: '100',
    scene_no: '',
    order_type: '',
    notify_url: '',
    order_body: '分账测试',
    attach: '',
    key_sign: '',
  };
}




const AddAccountIn: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/dotrans"
      description="CBK账户余额分账"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      responseParamDefinitions={responseParamDefinitions}
    />
  );
};

export default AddAccountIn;