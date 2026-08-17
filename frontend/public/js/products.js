/* ==========================================================================
   FRESHMART FMCG - DATABASE DATA ENGINE
   Purely dynamic datastore fetching categories and products from MongoDB API
   ========================================================================== */

let FMCG_CATEGORIES = [];
let FMCG_PRODUCTS = [];

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
 * Fetch Categories and Products dynamically from MongoDB API
 */
async function loadFreshMartDataFromBackend() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const [catRes, prodRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/get`, { signal: controller.signal }),
      fetch(`${API_BASE_URL}/api/product/get`, { signal: controller.signal })
    ]);
    clearTimeout(timeoutId);

    if (!catRes.ok || !prodRes.ok) {
      console.error(`Database Fetch Failed - Categories Status: ${catRes.status}, Products Status: ${prodRes.status}`);
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
          brand: p.brand || 'FreshMart',
          shortDesc: p.description ? (p.description.length > 95 ? p.description.substring(0, 95) + '...' : p.description) : 'High quality FMCG product.',
          fullDesc: p.description || 'Premium quality FMCG essential item.',
          price: p.price || 99,
          originalPrice: Math.round((p.price || 99) * 1.15),
          rating: 4.8,
          stock: p.stock ? `${p.stock} In Stock` : 'In Stock',
          badge: 'Popular',
          image: p.image || 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=500&q=80'
        };
      });

      // Sync category product counts dynamically from DB products
      FMCG_CATEGORIES.forEach(c => {
        c.count = FMCG_PRODUCTS.filter(p => p.category === c.id).length;
      });
    }

    console.log(`Database Connected: Loaded ${FMCG_CATEGORIES.length} categories & ${FMCG_PRODUCTS.length} products from backend database.`);
    return true;
  } catch (err) {
    console.error('Error connecting to backend database:', err);
    return false;
  }
}

/**
 * Send Contact Message to Backend API Endpoint POST /api/contact/create
 */
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
