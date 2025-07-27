import { initialItemCategoryRepository } from './albion/repositories/item-category.repository';
import { initialItemRepository } from './albion/repositories/item.repository';
import { initialCraftingService } from './albion/services/crafting.service';
import { initialInventoryService } from './albion/services/inventory.service';
import { initialItemCatalogService } from './albion/services/item-catalog.service';

const ItemCategoryRepository = initialItemCategoryRepository();
const ItemRepository = initialItemRepository();

export const ItemCatalogService = initialItemCatalogService(ItemCategoryRepository, ItemRepository);
export const InventoryService = initialInventoryService(ItemRepository);
export const CraftingService = initialCraftingService(ItemRepository);
