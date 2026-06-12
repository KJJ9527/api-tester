// 支付2.0(刷脸)自助收银SDK调用凭证获取接口

import React, { useMemo } from 'react';
import ApiTester, { ParamDefinition } from '@/components/RequestTester';
import { currentDateTime, uuid } from '@/utils/tools';

// 定义当前接口的参数表格数据
const paramDefinitions: ParamDefinition[] = [
  { name: 'pay_ver', type: 'string', length: 3, required: '是', description: '接口内业务逻辑兼容号，可用值201' },
  {
    name: 'pay_type', type: 'string', length: 3, required: '是', description: '支付方式，010 微信，020 支付宝'
  },
  { name: 'sub_appid', type: 'string', length: 3, required: '是', description: '子商户绑定的公众号/小程序 appid(服务商模式)' },
  { name: 'merchant_no', type: 'string', length: 15, required: '是', description: '商户号' },
  { name: 'terminal_id', type: 'string', length: 8, required: '是', description: '终端号' },
  { name: 'rawdata', type: 'string', length: 32, required: '否', description: '微信、支付宝人脸识别SDK初始化数据' },
  { name: 'trace_no', type: 'string', length: 32, required: '是', description: '请求流水号，不可重复' },
  { name: 'terminal_time', type: 'string', length: 14, required: '是', description: '实时时间，yyyyMMddHHmmss，全局统一时间格式' },
  { name: 'key_sign', type: 'string', length: 32, required: '是', description: '签名检验串，点击查看签名算法' },
];

// 生成动态默认 JSON 的函数
const getDynamicDefaultRequestJson = () => {
  return {
    pay_ver: '201',
    pay_type: '010',
    sub_appid: '',
    merchant_no: '860204816000056',
    terminal_id: '34341963',
    rawdata: '',
    trace_no: uuid(),
    terminal_time: currentDateTime(),
    key_sign: '',
  };
}

const Faceinfo: React.FC = () => {
  const defaultRequestJson = useMemo(() => getDynamicDefaultRequestJson(), []);
  return (
    <ApiTester
      method="POST"
      path="/pay/open/faceinfo"
      description="(刷脸)自助收银SDK调用凭证获取接口"
      paramDefinitions={paramDefinitions}
      defaultRequestJson={defaultRequestJson}
    />
  );
};

export default Faceinfo;

