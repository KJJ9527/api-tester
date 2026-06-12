import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

// 获取并格式化当前时间
export const currentDateTime = () => {
    return format(new Date(), 'yyyyMMddHHmmss');
};

export const uuid = () => {
    return uuidv4().replace(/-/g, '');
};
