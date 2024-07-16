import type { IRawItemData } from '../types';
import { MagicFrostStaffData } from './magic/frost-staff';
import { ResourceData } from './resource';

export const ItemData: Record<string, IRawItemData> = {
	...ResourceData,
	...MagicFrostStaffData
};
