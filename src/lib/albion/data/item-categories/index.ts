import type { IRawItemCategoryData } from '../types';
import { MagicCategoryData } from './magic';
import { ResourceCategoryData } from './resource';

export const ItemCategoryData: Record<string, IRawItemCategoryData> = {
	...ResourceCategoryData,
	...MagicCategoryData
};
