const mainCategories = [
  'MEN',
  'WOMEN',
  'KIDS',
  'BAGS & LUGGAGE',
  'CAMPING'
]

const otherSubCategories = {
  APPAREL: [
    'OUTERWEAR 外套',
    'TOPS 上衣',
    'T-SHIRTS T恤',
    'PANTS 褲子',
    'HATS 帽子',
    'ACCESSORIES 配件'
  ],
  SNOWBOARDING: [
    'BOARDS 滑雪板',
    'BOOTS 雪靴',
    'BINDINGS 固定器',
    'JACKETS 雪衣',
    'PANTS 雪褲',
    'PROTECTION 護具',
    'GOGGLES 雪鏡',
    'BOARD BAGS 滑雪板袋',
    'TOOLS & ACCESSORIES 工具及配件'
  ],
  'WINTER NECESSITIES': [
    'BASE LAYER 吸濕排汗衣',
    'GLOVES 手套',
    'FACE MASKS 面罩',
    'NECK WARMERS 脖圍',
    'SOCKS 雪襪',
    'ACCESSORIES 配件'
  ],
  BAGS: [
    'BACKPACKS 中性款背包',
    'WOMEN\'S BAGS 女款背包',
    'SNOWBOARDING GEAR BAGS 滑雪周邊包類',
    'KIDS BACKPACKS 兒童款背包',
    'ACCESSORIES 配件'
  ],
  LUGGAGE: [
    'CHECKED LUGGAGE 托運行李箱',
    'CARRY-ON LUGGAGE 登機行李箱',
    'DUFFEL BAGS 旅行提袋',
    'TRAVEL ACCESSORIES 旅行配件'
  ],
  CAMPING: [
    'TENTS & FOOTPRINTS 帳篷',
    'COOLERS & KITS 啤酒袋及工具包',
    'ACCESSORIES 配件'
  ]
}

const generateCategoryRows = (mainCategory, subCategory, subSubCategories) => {
  return subSubCategories.map(subSubCategory => ({
    main_category: mainCategory,
    sub_category: subCategory,
    sub_sub_category: subSubCategory
  }))
}

const categories = mainCategories.map(mainCategory => {

  switch (mainCategory) {
    case 'MEN':
    case 'WOMEN':
    case 'KIDS':
      return ['APPAREL', 'SNOWBOARDING', 'WINTER NECESSITIES'].map(subCategory => {
        return generateCategoryRows(mainCategory, subCategory, otherSubCategories[subCategory])
      }).reduce((prev, next) => prev.concat(next))

    case 'BAGS & LUGGAGE':
      return ['BAGS', 'LUGGAGE'].map(subCategory => {
        return generateCategoryRows(mainCategory, subCategory, otherSubCategories[subCategory])
      }).reduce((prev, next) => prev.concat(next))

    case 'CAMPING':
      return ['CAMPING'].map(subCategory => {
        return generateCategoryRows(mainCategory, subCategory, otherSubCategories[subCategory])
      }).reduce((prev, next) => prev.concat(next))

    default:
      console.log(`Sorry, We don't have this ${mainCategory}`);

  }
}).reduce((prev, next) => prev.concat(next))

module.exports = categories