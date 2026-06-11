// 扫呗订单预分账

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'trade_no', type: 'string', length: 32, required: '是', description: '分账流水号，商户可自己定义，多次请求时请勿使用同一个值，每次请求需使用不同的值' },
  { name: 'account_no', type: 'string', length: 32, required: '条件必填', description: '出账方CBK账号(与扫呗商户号、CBK账号二选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '出账方扫呗商户号(与扫呗商户号、CBK账号二选一)', },
  {
    name: 'rule_list_json', type: 'string', length: 1024, required: '是', description: '分账列表,json字符串',
    childrenFields:
      [
        { name: 'account_in', type: 'string', length: 32, required: '是', description: '入账的CBK账号' },
        { name: 'allocate_amt', type: 'Integer', length: 11, required: '是', description: '分账固定金额 单位：分' },
        { name: 'allocate_trace', type: 'string', length: 32, required: '是', description: '入账流水号（需生成唯一值，后续用于分账查询）' },
      ]
  },
  { name: 'scene_no', type: 'string', length: 10, required: '否', description: '场景编号（如有指定场景需求，需提前找分账项目经理添加场景，不能随便传。不传时，默认定义为其他）' },
  { name: 'order_type', type: 'string', length: 1, required: '否', description: '业务来源类型：0余额 1微信 2支付宝 3扫呗校园外卖 4抖音 5美团 6饿了么 7通联 8快手 9大众点评 10富友 11随行付 12乐刷 13库享' },
  { name: 'out_trade_no_list', type: 'List', length: 1, required: '是', description: '扫呗支付订单号（该参数拼接签名串时，[ ]号内的参数不需要加""号，即&out_trade_no_list=[aaaaaaa]&）' },
  { name: 'notify_url', type: 'string', length: 128, required: '否', description: '回调通知地址（只有当分账状态trade_status返回3处理中时，回调才生效）' },
  { name: 'order_body', type: 'string', length: 100, required: '否', description: '交易备注' },
  { name: 'attach', type: 'string', length: 128, required: '否', description: '附加数据' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {

  const trace_no = uuidv4().replace(/-/g, '');
  const trade_no = uuidv4().replace(/-/g, '');
  const allocate_trace = uuidv4().replace(/-/g, '');

  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no,
    trade_no,
    account_no: '5005210154900053410',
    merchant_no: '',
    rule_list_json: [{
      account_in: '5005210154905486640',
      allocate_amt: '100',
      allocate_trace
    }],
    scene_no: '',
    order_type: '',
    out_trade_no_list: ['165073479621626060910075500609'],
    notify_url: '',
    order_body: '分账测试',
    attach: '',
    key_sign: '',
  };
}




const DatchAllocate: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/batchAllocate"
      description="扫呗订单预分账"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      stringifyFields={['rule_list_json']} // 指定需要转为字符串的字段
    />
  );
};

export default DatchAllocate;