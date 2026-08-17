/* ==========================================================================
   FRESHMART FMCG - DATABASE DATA ENGINE
   Purely dynamic datastore with built-in catalog fallback & live MongoDB API sync
   ========================================================================== */

const DEFAULT_CATEGORIES = [
  {
    "id": "cat-detergent",
    "rawId": "cat-detergent",
    "name": "Detergent Powder",
    "icon": "🧼",
    "count": 6,
    "description": "High-action stain removal & fabric care powders",
    "image": "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-shampoo",
    "rawId": "cat-shampoo",
    "name": "Shampoo",
    "icon": "🧴",
    "count": 6,
    "description": "Nourishing, anti-dandruff & hair strengtheners",
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-tape",
    "rawId": "cat-tape",
    "name": "Adhesive Tape",
    "icon": "🎞️",
    "count": 6,
    "description": "Heavy-duty industrial & household sealing tapes",
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-cleaner",
    "rawId": "cat-cleaner",
    "name": "Toilet Cleaner",
    "icon": "🧽",
    "count": 6,
    "description": "99.9% germ kill formula for hygienic washrooms",
    "image": "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-dishwash",
    "rawId": "cat-dishwash",
    "name": "Dish Wash Bar",
    "icon": "🍽️",
    "count": 6,
    "description": "Grease-cutting lemon & neem dishwashing soaps",
    "image": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-repellent",
    "rawId": "cat-repellent",
    "name": "Mosquito Repellent",
    "icon": "🦟",
    "count": 6,
    "description": "Vaporizers, coils & skin protection creams",
    "image": "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-perfume",
    "rawId": "cat-perfume",
    "name": "Perfume",
    "icon": "✨",
    "count": 6,
    "description": "Long-lasting luxury fragrances & body sprays",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-rosewater",
    "rawId": "cat-rosewater",
    "name": "Rose Water",
    "icon": "🌹",
    "count": 6,
    "description": "100% pure organic facial toners & skin refreshers",
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-softtoys",
    "rawId": "cat-softtoys",
    "name": "Soft Toys",
    "icon": "🧸",
    "count": 6,
    "description": "Ultra-soft, child-safe plush cuddly companions",
    "image": "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80"
  }
];

const DEFAULT_PRODUCTS = [
  {
    "id": "p-1",
    "category": "cat-detergent",
    "category_id": "cat-detergent",
    "categoryName": "Detergent Powder",
    "name": "Surf Excel",
    "brand": "Surf",
    "shortDesc": "High quality Surf Excel for wholesale & retail supply.",
    "fullDesc": "Premium quality Surf Excel distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/83ec4dd2-72f6-4c64-9a37-c38b32612db8.png"
  },
  {
    "id": "p-2",
    "category": "cat-detergent",
    "category_id": "cat-detergent",
    "categoryName": "Detergent Powder",
    "name": "Ariel",
    "brand": "Ariel",
    "shortDesc": "High quality Ariel for wholesale & retail supply.",
    "fullDesc": "Premium quality Ariel distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1782191834621-115.png"
  },
  {
    "id": "p-3",
    "category": "cat-detergent",
    "category_id": "cat-detergent",
    "categoryName": "Detergent Powder",
    "name": "Tide",
    "brand": "Tide",
    "shortDesc": "High quality Tide for wholesale & retail supply.",
    "fullDesc": "Premium quality Tide distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1782363634419-260.png"
  },
  {
    "id": "p-4",
    "category": "cat-detergent",
    "category_id": "cat-detergent",
    "categoryName": "Detergent Powder",
    "name": "Wheel",
    "brand": "Wheel",
    "shortDesc": "High quality Wheel for wholesale & retail supply.",
    "fullDesc": "Premium quality Wheel distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770608647712-619.png"
  },
  {
    "id": "p-5",
    "category": "cat-detergent",
    "category_id": "cat-detergent",
    "categoryName": "Detergent Powder",
    "name": "Rin",
    "brand": "Rin",
    "shortDesc": "High quality Rin for wholesale & retail supply.",
    "fullDesc": "Premium quality Rin distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1783062678774-50.png"
  },
  {
    "id": "p-6",
    "category": "cat-detergent",
    "category_id": "cat-detergent",
    "categoryName": "Detergent Powder",
    "name": "gaddi",
    "brand": "gaddi",
    "shortDesc": "High quality gaddi for wholesale & retail supply.",
    "fullDesc": "Premium quality gaddi distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/97331802-4ed8-4575-94ba-fe2ca04c91e3.png"
  },
  {
    "id": "p-7",
    "category": "cat-shampoo",
    "category_id": "cat-shampoo",
    "categoryName": "Shampoo",
    "name": "Dove",
    "brand": "Dove",
    "shortDesc": "High quality Dove for wholesale & retail supply.",
    "fullDesc": "Premium quality Dove distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771931062015-101.png"
  },
  {
    "id": "p-8",
    "category": "cat-shampoo",
    "category_id": "cat-shampoo",
    "categoryName": "Shampoo",
    "name": "Pantene",
    "brand": "Pantene",
    "shortDesc": "High quality Pantene for wholesale & retail supply.",
    "fullDesc": "Premium quality Pantene distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1771923717021-2152.png"
  },
  {
    "id": "p-9",
    "category": "cat-shampoo",
    "category_id": "cat-shampoo",
    "categoryName": "Shampoo",
    "name": "Clinic Plus",
    "brand": "Clinic",
    "shortDesc": "High quality Clinic Plus for wholesale & retail supply.",
    "fullDesc": "Premium quality Clinic Plus distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1782497147859-245.png"
  },
  {
    "id": "p-10",
    "category": "cat-shampoo",
    "category_id": "cat-shampoo",
    "categoryName": "Shampoo",
    "name": "Tresemmé",
    "brand": "Tresemmé",
    "shortDesc": "High quality Tresemmé for wholesale & retail supply.",
    "fullDesc": "Premium quality Tresemmé distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1785314876361-271.png"
  },
  {
    "id": "p-11",
    "category": "cat-shampoo",
    "category_id": "cat-shampoo",
    "categoryName": "Shampoo",
    "name": "Head & Shoulders",
    "brand": "Head",
    "shortDesc": "High quality Head & Shoulders for wholesale & retail supply.",
    "fullDesc": "Premium quality Head & Shoulders distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1775553956612-416.png"
  },
  {
    "id": "p-12",
    "category": "cat-shampoo",
    "category_id": "cat-shampoo",
    "categoryName": "Shampoo",
    "name": "Sunsilk",
    "brand": "Sunsilk",
    "shortDesc": "High quality Sunsilk for wholesale & retail supply.",
    "fullDesc": "Premium quality Sunsilk distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1776155891120-393.png"
  },
  {
    "id": "p-13",
    "category": "cat-tape",
    "category_id": "cat-tape",
    "categoryName": "Adhesive Tape",
    "name": "Cello Tape",
    "brand": "Cello",
    "shortDesc": "High quality Cello Tape for wholesale & retail supply.",
    "fullDesc": "Premium quality Cello Tape distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1778348720635-260.png"
  },
  {
    "id": "p-14",
    "category": "cat-tape",
    "category_id": "cat-tape",
    "categoryName": "Adhesive Tape",
    "name": "Scotch Magic",
    "brand": "Scotch",
    "shortDesc": "High quality Scotch Magic for wholesale & retail supply.",
    "fullDesc": "Premium quality Scotch Magic distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/16deb312-96c1-4779-a835-bf8e67c2c61f.png"
  },
  {
    "id": "p-15",
    "category": "cat-tape",
    "category_id": "cat-tape",
    "categoryName": "Adhesive Tape",
    "name": "Brown Packing Tape",
    "brand": "Brown",
    "shortDesc": "High quality Brown Packing Tape for wholesale & retail supply.",
    "fullDesc": "Premium quality Brown Packing Tape distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/42b276c3-269c-4c81-94ed-0f87556aa82e.png"
  },
  {
    "id": "p-16",
    "category": "cat-tape",
    "category_id": "cat-tape",
    "categoryName": "Adhesive Tape",
    "name": "Double Sided Tape",
    "brand": "Double",
    "shortDesc": "High quality Double Sided Tape for wholesale & retail supply.",
    "fullDesc": "Premium quality Double Sided Tape distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1783777892241-378.png"
  },
  {
    "id": "p-17",
    "category": "cat-tape",
    "category_id": "cat-tape",
    "categoryName": "Adhesive Tape",
    "name": "Electrical Tape",
    "brand": "Electrical",
    "shortDesc": "High quality Electrical Tape for wholesale & retail supply.",
    "fullDesc": "Premium quality Electrical Tape distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/4296149b-03bf-4ed2-ac31-4dda4377c88a.png"
  },
  {
    "id": "p-18",
    "category": "cat-tape",
    "category_id": "cat-tape",
    "categoryName": "Adhesive Tape",
    "name": "Masking Tape",
    "brand": "Masking",
    "shortDesc": "High quality Masking Tape for wholesale & retail supply.",
    "fullDesc": "Premium quality Masking Tape distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/9bce141b-e18b-40a9-97a4-5c5fd5481c26.png"
  },
  {
    "id": "p-19",
    "category": "cat-cleaner",
    "category_id": "cat-cleaner",
    "categoryName": "Toilet Cleaner",
    "name": "Harpic",
    "brand": "Harpic",
    "shortDesc": "High quality Harpic for wholesale & retail supply.",
    "fullDesc": "Premium quality Harpic distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770705263225-1744.png"
  },
  {
    "id": "p-20",
    "category": "cat-cleaner",
    "category_id": "cat-cleaner",
    "categoryName": "Toilet Cleaner",
    "name": "Domex",
    "brand": "Domex",
    "shortDesc": "High quality Domex for wholesale & retail supply.",
    "fullDesc": "Premium quality Domex distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1783077693193-275.png"
  },
  {
    "id": "p-21",
    "category": "cat-cleaner",
    "category_id": "cat-cleaner",
    "categoryName": "Toilet Cleaner",
    "name": "Lizol",
    "brand": "Lizol",
    "shortDesc": "High quality Lizol for wholesale & retail supply.",
    "fullDesc": "Premium quality Lizol distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/9b416fba-d920-43c2-beb4-bc5764685779.png"
  },
  {
    "id": "p-22",
    "category": "cat-cleaner",
    "category_id": "cat-cleaner",
    "categoryName": "Toilet Cleaner",
    "name": "Sanifresh",
    "brand": "Sanifresh",
    "shortDesc": "High quality Sanifresh for wholesale & retail supply.",
    "fullDesc": "Premium quality Sanifresh distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/363be46e1ebc405cb7122ff8914a5ab8.png"
  },
  {
    "id": "p-23",
    "category": "cat-cleaner",
    "category_id": "cat-cleaner",
    "categoryName": "Toilet Cleaner",
    "name": "Beco",
    "brand": "Beco",
    "shortDesc": "High quality Beco for wholesale & retail supply.",
    "fullDesc": "Premium quality Beco distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/fd7d2070-6ed5-42d1-8bb8-a1d9dfb92234.png"
  },
  {
    "id": "p-24",
    "category": "cat-cleaner",
    "category_id": "cat-cleaner",
    "categoryName": "Toilet Cleaner",
    "name": "Taski",
    "brand": "Taski",
    "shortDesc": "High quality Taski for wholesale & retail supply.",
    "fullDesc": "Premium quality Taski distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://jkdenterprises.in/wp-content/uploads/2026/01/2X9A6091-600x600.jpg.webp"
  },
  {
    "id": "p-25",
    "category": "cat-dishwash",
    "category_id": "cat-dishwash",
    "categoryName": "Dish Wash Bar",
    "name": "Vim",
    "brand": "Vim",
    "shortDesc": "High quality Vim for wholesale & retail supply.",
    "fullDesc": "Premium quality Vim distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/78958301-ced4-4c8a-965d-557816188552.png"
  },
  {
    "id": "p-26",
    "category": "cat-dishwash",
    "category_id": "cat-dishwash",
    "categoryName": "Dish Wash Bar",
    "name": "Exo",
    "brand": "Exo",
    "shortDesc": "High quality Exo for wholesale & retail supply.",
    "fullDesc": "Premium quality Exo distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1772698047485-566.png"
  },
  {
    "id": "p-27",
    "category": "cat-dishwash",
    "category_id": "cat-dishwash",
    "categoryName": "Dish Wash Bar",
    "name": "Pril",
    "brand": "Pril",
    "shortDesc": "High quality Pril for wholesale & retail supply.",
    "fullDesc": "Premium quality Pril distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://m.media-amazon.com/images/I/41BM2nfDqXL._SY300_SX300_QL70_FMwebp_.jpg"
  },
  {
    "id": "p-28",
    "category": "cat-dishwash",
    "category_id": "cat-dishwash",
    "categoryName": "Dish Wash Bar",
    "name": "Patanjali",
    "brand": "Patanjali",
    "shortDesc": "High quality Patanjali for wholesale & retail supply.",
    "fullDesc": "Premium quality Patanjali distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/803bf85e-c0ba-426d-a706-ba651a3e7dc8.png"
  },
  {
    "id": "p-29",
    "category": "cat-dishwash",
    "category_id": "cat-dishwash",
    "categoryName": "Dish Wash Bar",
    "name": "Genteel",
    "brand": "Genteel",
    "shortDesc": "High quality Genteel for wholesale & retail supply.",
    "fullDesc": "Premium quality Genteel distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2eded8dc-1d48-42c9-929e-805f17150bce.png"
  },
  {
    "id": "p-30",
    "category": "cat-dishwash",
    "category_id": "cat-dishwash",
    "categoryName": "Dish Wash Bar",
    "name": "Power Bar",
    "brand": "Power",
    "shortDesc": "High quality Power Bar for wholesale & retail supply.",
    "fullDesc": "Premium quality Power Bar distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://m.media-amazon.com/images/I/51iLZ0DIKZL._SY450_PIbundle-2,TopRight,0,0_AA450SH20_.jpg"
  },
  {
    "id": "p-31",
    "category": "cat-repellent",
    "category_id": "cat-repellent",
    "categoryName": "Mosquito Repellent",
    "name": "Good Knight",
    "brand": "Good",
    "shortDesc": "High quality Good Knight for wholesale & retail supply.",
    "fullDesc": "Premium quality Good Knight distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/50ea9735-da4d-497a-a275-4256b0aaac17.png"
  },
  {
    "id": "p-32",
    "category": "cat-repellent",
    "category_id": "cat-repellent",
    "categoryName": "Mosquito Repellent",
    "name": "All Out",
    "brand": "All",
    "shortDesc": "High quality All Out for wholesale & retail supply.",
    "fullDesc": "Premium quality All Out distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1770729565288-23.png"
  },
  {
    "id": "p-33",
    "category": "cat-repellent",
    "category_id": "cat-repellent",
    "categoryName": "Mosquito Repellent",
    "name": "Mortein",
    "brand": "Mortein",
    "shortDesc": "High quality Mortein for wholesale & retail supply.",
    "fullDesc": "Premium quality Mortein distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2952cc25-5e85-4fd4-b3d0-e430ac7679ee.png"
  },
  {
    "id": "p-34",
    "category": "cat-repellent",
    "category_id": "cat-repellent",
    "categoryName": "Mosquito Repellent",
    "name": "Odomos",
    "brand": "Odomos",
    "shortDesc": "High quality Odomos for wholesale & retail supply.",
    "fullDesc": "Premium quality Odomos distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1784006908318-63.png"
  },
  {
    "id": "p-35",
    "category": "cat-repellent",
    "category_id": "cat-repellent",
    "categoryName": "Mosquito Repellent",
    "name": "Good Knight",
    "brand": "Good",
    "shortDesc": "High quality Good Knight for wholesale & retail supply.",
    "fullDesc": "Premium quality Good Knight distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/6b171896-87a6-455f-a8a8-7497a999f492.png"
  },
  {
    "id": "p-36",
    "category": "cat-repellent",
    "category_id": "cat-repellent",
    "categoryName": "Mosquito Repellent",
    "name": "Hit",
    "brand": "Hit",
    "shortDesc": "High quality Hit for wholesale & retail supply.",
    "fullDesc": "Premium quality Hit distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rc-upload-1772535388856-702.png"
  },
  {
    "id": "p-37",
    "category": "cat-perfume",
    "category_id": "cat-perfume",
    "categoryName": "Perfume",
    "name": "Fogg",
    "brand": "Fogg",
    "shortDesc": "High quality Fogg for wholesale & retail supply.",
    "fullDesc": "Premium quality Fogg distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1775639803874-2359.png"
  },
  {
    "id": "p-38",
    "category": "cat-perfume",
    "category_id": "cat-perfume",
    "categoryName": "Perfume",
    "name": "Denver",
    "brand": "Denver",
    "shortDesc": "High quality Denver for wholesale & retail supply.",
    "fullDesc": "Premium quality Denver distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1772698047485-215.png"
  },
  {
    "id": "p-39",
    "category": "cat-perfume",
    "category_id": "cat-perfume",
    "categoryName": "Perfume",
    "name": "Wild Stone",
    "brand": "Wild",
    "shortDesc": "High quality Wild Stone for wholesale & retail supply.",
    "fullDesc": "Premium quality Wild Stone distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1775639803874-2431.png"
  },
  {
    "id": "p-40",
    "category": "cat-perfume",
    "category_id": "cat-perfume",
    "categoryName": "Perfume",
    "name": "Bella Vita",
    "brand": "Bella",
    "shortDesc": "High quality Bella Vita for wholesale & retail supply.",
    "fullDesc": "Premium quality Bella Vita distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1775639803874-2371.png"
  },
  {
    "id": "p-41",
    "category": "cat-perfume",
    "category_id": "cat-perfume",
    "categoryName": "Perfume",
    "name": "Park Avenue",
    "brand": "Park",
    "shortDesc": "High quality Park Avenue for wholesale & retail supply.",
    "fullDesc": "Premium quality Park Avenue distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/0240eaae-585c-4896-b719-f9c001c1315c.png"
  },
  {
    "id": "p-42",
    "category": "cat-perfume",
    "category_id": "cat-perfume",
    "categoryName": "Perfume",
    "name": "Engage",
    "brand": "Engage",
    "shortDesc": "High quality Engage for wholesale & retail supply.",
    "fullDesc": "Premium quality Engage distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1782457177707-15.png"
  },
  {
    "id": "p-43",
    "category": "cat-rosewater",
    "category_id": "cat-rosewater",
    "categoryName": "Rose Water",
    "name": "Dabur Gulabari",
    "brand": "Dabur",
    "shortDesc": "High quality Dabur Gulabari for wholesale & retail supply.",
    "fullDesc": "Premium quality Dabur Gulabari distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/64c5c9d2-ab78-43ef-9fd3-6c247c540b1f.png"
  },
  {
    "id": "p-44",
    "category": "cat-rosewater",
    "category_id": "cat-rosewater",
    "categoryName": "Rose Water",
    "name": "Khadi",
    "brand": "Khadi",
    "shortDesc": "High quality Khadi for wholesale & retail supply.",
    "fullDesc": "Premium quality Khadi distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://rukminim2.flixcart.com/image/1536/1536/xif0q/cleanser/5/j/3/210-ayurvedic-pure-rose-water-skin-toner-dead-skin-removal-anti-original-imah2xyxkkyknfma.jpeg?q=90"
  },
  {
    "id": "p-45",
    "category": "cat-rosewater",
    "category_id": "cat-rosewater",
    "categoryName": "Rose Water",
    "name": "VLCC",
    "brand": "VLCC",
    "shortDesc": "High quality VLCC for wholesale & retail supply.",
    "fullDesc": "Premium quality VLCC distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/6e0e8a38dc2040c1bb829de5ccf72b9b.png"
  },
  {
    "id": "p-46",
    "category": "cat-rosewater",
    "category_id": "cat-rosewater",
    "categoryName": "Rose Water",
    "name": "Patanjali",
    "brand": "Patanjali",
    "shortDesc": "High quality Patanjali for wholesale & retail supply.",
    "fullDesc": "Premium quality Patanjali distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://www.patanjaliayurved.net/assets/product_images/400x500/1766643853gulab1.webp"
  },
  {
    "id": "p-47",
    "category": "cat-rosewater",
    "category_id": "cat-rosewater",
    "categoryName": "Rose Water",
    "name": "Kama Ayurveda",
    "brand": "Kama",
    "shortDesc": "High quality Kama Ayurveda for wholesale & retail supply.",
    "fullDesc": "Premium quality Kama Ayurveda distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://static.kamaayurveda.in/cdn-cgi/image/width=1200,format=auto/media/catalog/product/0/1/01_rose-floral-water-50ml_1_.png?store=default&image-type=image"
  },
  {
    "id": "p-48",
    "category": "cat-rosewater",
    "category_id": "cat-rosewater",
    "categoryName": "Rose Water",
    "name": "Biotique",
    "brand": "Biotique",
    "shortDesc": "High quality Biotique for wholesale & retail supply.",
    "fullDesc": "Premium quality Biotique distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://rukminim2.flixcart.com/image/1536/1536/xif0q/toner/5/g/q/-original-imagg4fcqmfrgwpf.jpeg?q=90"
  },
  {
    "id": "p-49",
    "category": "cat-softtoys",
    "category_id": "cat-softtoys",
    "categoryName": "Soft Toys",
    "name": "Teddy Bear",
    "brand": "Teddy",
    "shortDesc": "High quality Teddy Bear for wholesale & retail supply.",
    "fullDesc": "Premium quality Teddy Bear distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/225a3630-9cd3-4919-b867-3722dbb73154.png"
  },
  {
    "id": "p-50",
    "category": "cat-softtoys",
    "category_id": "cat-softtoys",
    "categoryName": "Soft Toys",
    "name": "Rabbit",
    "brand": "Rabbit",
    "shortDesc": "High quality Rabbit for wholesale & retail supply.",
    "fullDesc": "Premium quality Rabbit distributed by FreshMart FMCG.",
    "price": 279,
    "originalPrice": 321,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/c63fdd48-b152-47af-a822-9a227089e3f5.png"
  },
  {
    "id": "p-51",
    "category": "cat-softtoys",
    "category_id": "cat-softtoys",
    "categoryName": "Soft Toys",
    "name": "Panda",
    "brand": "Panda",
    "shortDesc": "High quality Panda for wholesale & retail supply.",
    "fullDesc": "Premium quality Panda distributed by FreshMart FMCG.",
    "price": 99,
    "originalPrice": 114,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1784173376253-237.png"
  },
  {
    "id": "p-52",
    "category": "cat-softtoys",
    "category_id": "cat-softtoys",
    "categoryName": "Soft Toys",
    "name": "Elephant",
    "brand": "Elephant",
    "shortDesc": "High quality Elephant for wholesale & retail supply.",
    "fullDesc": "Premium quality Elephant distributed by FreshMart FMCG.",
    "price": 144,
    "originalPrice": 166,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1770221714496-1135.png"
  },
  {
    "id": "p-53",
    "category": "cat-softtoys",
    "category_id": "cat-softtoys",
    "categoryName": "Soft Toys",
    "name": "Dog",
    "brand": "Dog",
    "shortDesc": "High quality Dog for wholesale & retail supply.",
    "fullDesc": "Premium quality Dog distributed by FreshMart FMCG.",
    "price": 189,
    "originalPrice": 217,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1770221714496-1187.png"
  },
  {
    "id": "p-54",
    "category": "cat-softtoys",
    "category_id": "cat-softtoys",
    "categoryName": "Soft Toys",
    "name": "Unicorn",
    "brand": "Unicorn",
    "shortDesc": "High quality Unicorn for wholesale & retail supply.",
    "fullDesc": "Premium quality Unicorn distributed by FreshMart FMCG.",
    "price": 234,
    "originalPrice": 269,
    "rating": 4.8,
    "stock": "In Stock",
    "badge": "Popular",
    "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/rc-upload-1770221714496-1097.png"
  }
];

let FMCG_CATEGORIES = [...DEFAULT_CATEGORIES];
let FMCG_PRODUCTS = [...DEFAULT_PRODUCTS];

const isProductionHost = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_BASE_URL = window.API_BASE_URL || window.VITE_API_URL || (isProductionHost ? 'https://fresh-mart-1gla.onrender.com' : 'http://localhost:5000');

const CATEGORY_META = {
  'detergent': { icon: '🧼', desc: 'High-action stain removal & fabric care powders' },
  'shampoo': { icon: '🧴', desc: 'Nourishing, anti-dandruff & hair strengtheners' },
  'tape': { icon: '🎞️', desc: 'Heavy-duty industrial & household sealing tapes' },
  'cleaner': { icon: '🧽', desc: '99.9% germ kill formula for hygienic washrooms' },
  'dishwash': { icon: '🍽️', desc: 'Grease-cutting lemon & neem dishwashing soaps' },
  'repellent': { icon: '🦟', desc: 'Vaporizers, coils & skin protection creams' },
  'perfume': { icon: '✨', desc: 'Long-lasting luxury fragrances & body sprays' },
  'rosewater': { icon: '🌹', desc: '100% pure organic facial toners & skin refreshers' },
  'softtoys': { icon: '🧸', desc: 'Ultra-soft, child-safe plush cuddly companions' }
};

/**
 * Fetch Categories and Products dynamically from MongoDB API (with instant fallback)
 */
async function loadFreshMartDataFromBackend() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const [catRes, prodRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/get`, { signal: controller.signal }),
      fetch(`${API_BASE_URL}/api/product/get`, { signal: controller.signal })
    ]);
    clearTimeout(timeoutId);

    if (!catRes.ok || !prodRes.ok) {
      console.warn(`Database API status issue - Categories: ${catRes.status}, Products: ${prodRes.status}. Using rich fallback catalog.`);
      return false;
    }

    const catData = await catRes.json();
    const prodData = await prodRes.json();

    if (catData.categories && catData.categories.length > 0) {
      FMCG_CATEGORIES = catData.categories.map(cat => {
        const key = (cat.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        let icon = '🛒';
        let desc = 'Quality FMCG products for wholesale & retail';

        Object.keys(CATEGORY_META).forEach(metaKey => {
          if (key.includes(metaKey) || metaKey.includes(key)) {
            icon = CATEGORY_META[metaKey].icon;
            desc = CATEGORY_META[metaKey].desc;
          }
        });

        return {
          id: cat._id,
          rawId: cat._id,
          name: cat.name,
          icon: icon,
          count: 0,
          description: desc,
          image: cat.image || 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=600&q=80'
        };
      });
    }

    if (prodData.products && prodData.products.length > 0) {
      const catMap = {};
      FMCG_CATEGORIES.forEach(c => { catMap[c.id] = c.name; });

      FMCG_PRODUCTS = prodData.products.map(p => {
        const catIdStr = typeof p.category_id === 'object' ? p.category_id?._id : p.category_id;
        const catName = catMap[catIdStr] || 'General';

        return {
          id: p._id,
          category: catIdStr,
          category_id: catIdStr,
          categoryName: catName,
          name: p.name,
          brand: p.brand || p.name.split(' ')[0] || 'FreshMart',
          shortDesc: p.description ? (p.description.length > 95 ? p.description.substring(0, 95) + '...' : p.description) : 'High quality ' + p.name + ' for wholesale & retail.',
          fullDesc: p.description || 'Premium quality ' + p.name + ' distributed by FreshMart FMCG.',
          price: p.price || 99,
          originalPrice: Math.round((p.price || 99) * 1.15),
          rating: 4.8,
          stock: p.stock ? `${p.stock} In Stock` : 'In Stock',
          badge: 'Popular',
          image: p.image || 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=500&q=80'
        };
      });

      FMCG_CATEGORIES.forEach(c => {
        c.count = FMCG_PRODUCTS.filter(p => p.category === c.id).length;
      });
    }

    console.log(`Database Connected: Synced ${FMCG_CATEGORIES.length} categories & ${FMCG_PRODUCTS.length} products from live API.`);
    return true;
  } catch (err) {
    console.warn('Backend API connection offline/sleeping - Displaying full 54 product catalog:', err);
    return false;
  }
}

async function sendContactMessageToBackend(contactData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error sending contact message to API:', err);
    throw err;
  }
}
