import { SegmentedOption } from '@/types/menu';
import { cbkMenuConfig } from './cbk';
import { payMenuConfig } from './pay';
import { merchantConfig } from './merchant';
import { cbkv2MenuConfig } from './cbkv2';

export const segmentedOptions: SegmentedOption[] = [cbkMenuConfig, cbkv2MenuConfig, payMenuConfig, merchantConfig];