import { initialCraftingService } from './albion/services/crafting.service';
import { initialInventoryService } from './albion/services/inventory.service';
import { initialItemCatalogService } from './albion/services/item-catalog.service';

export const ItemCatalogService = initialItemCatalogService();
export const InventoryService = initialInventoryService();
export const CraftingService = initialCraftingService();
