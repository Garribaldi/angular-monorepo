export interface InventoryDto {
  plu: number,
  supplier: string,
  name: string,
  inStock: number,
  price: number,
  currency: string
}

export type Inventory = InventoryDto;
