import { SegmentedOption } from '@/types/menu';
import { cbkMenuConfig } from './cbk';
import { payMenuConfig } from './pay';

export const segmentedOptions: SegmentedOption[] = [cbkMenuConfig, payMenuConfig];