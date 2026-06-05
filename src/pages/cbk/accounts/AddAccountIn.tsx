// CBK添加分账关系接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { v4 as uuidv4 } from 'uuid';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'api_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，固定值100' },
  { name: 'inst_no', type: 'string', length: 8, required: '是', description: '机构编号，扫呗分配' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，每次请求不可重复' },
  { name: 'account_no_out', type: 'string', length: 32, required: '条件必填', description: '出账方CBK账号(与扫呗商户号账号二选一)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '条件必填', description: '出账方扫呗商户号(与CBK账号账号二选一)' },
  {
    name: 'account_rule', type: 'string', length: 1024, required: '是', description: '分账规则,Json格式',
    childrenFields:
      [
        { name: 'account_no_in', type: 'string', length: 32, required: '是', description: '入账的CBK账号' },
        { name: 'allocate_scale', type: 'Integer', length: 5, required: '是', description: '最大可分账比例，固定传10000（即100%内任意比例都可用于计算分账金额）' },
      ]
  },
  { name: 'contract_type', type: 'string', length: 1, required: '否', description: '签约类型 1.短信 2.签约链接' },
  { name: 'authentication_channel', type: 'string', length: 11, required: '否', description: '当contract_type为2时，可指定返回的鉴权链接通道：1.阿里鉴权链接、2.旷世鉴权链接。不设置时默认1' },
  { name: 'back_path', type: 'string', length: 1024, required: '否', description: '小程序场景下授权完成后的回跳路径（格式： /pages/index/index）' },
  { name: 'relation_type', type: 'string', length: 1, required: '是', description: '分账关系类型，请固定传1' },
  { name: 'relation_mode', type: 'string', length: 11, required: '否', description: '业务关系类型，不传时默认使用0。0.账户分账关系 1.非法人结算 2.委托付款 3.资金归集' },
  { name: 'relation_img', type: 'string', length: 1024, required: '否', description: '分账关系证明图片' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {

  const trace_no = uuidv4().replace(/-/g, '');

  return {
    api_ver: '100',
    inst_no: '52101549',
    trace_no,
    account_no_out: '5005210154905486640',
    merchant_no: '',
    account_rule: '',
    contract_type: '',
    authentication_channel: '',
    back_path: '',
    relation_type: '',
    relation_mode: '',
    relation_img: '',
    key_sign: '',
  };
}




const AddAccountIn: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/account/open/addAccountIn"
      description="添加CBK分账关系"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
      stringifyFields={['account_rule']} // 指定需要转为字符串的字段
    />
  );
};

export default AddAccountIn;