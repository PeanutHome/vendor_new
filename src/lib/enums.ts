export enum PackType {
  BOTTLE = 'bottle',
  BOX = 'box',
  POUCH = 'pouch',
  SACHET = 'sachet',
  TUBE = 'tube',
  JAR = 'jar',
  BAG = 'bag',
  CAN = 'can',
}

export enum Gender {
  MEN = 'men',
  WOMEN = 'women',
  UNISEX = 'unisex',
  KIDS = 'kids',
  BABY = 'baby',
}

export enum Language {
  EN = 'en',
  MY = 'my',
}

export enum ProductStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DRAFT = 'draft',
}

export enum ReturnPolicy {
  NO_RETURN = 'no_return',
  SEVEN_DAYS = '7_days',
  FIFTEEN_DAYS = '15_days',
  THIRTY_DAYS = '30_days',
}

export enum ProductType {
  FEATURED = 'featured',
  LATEST = 'latest',
  BEST_SELLERS = 'best_sellers',
  HOT_DEALS = 'hot_deals',
  TRENDING = 'trending',
  RECOMMENDED = 'recommended',
  FLASH_SALE = 'flash_sale',
}

// Additional enums that might be needed based on the API error
export enum DispatchTime {
  ONE_DAY = '1_day',
  TWO_THREE_DAYS = '2_3_days',
  FIVE_SEVEN_DAYS = '5_7_days',
  ONE_WEEK = '1_week',
}



export enum PublishStatus {
  DRAFT = 'draft',
  PREVIEW = 'preview',
  PUBLISHED = 'published',
}
