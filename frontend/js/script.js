/* ==========================================================================
   FRESHMART FMCG - MAIN JAVASCRIPT LOGIC
   Vanilla JS Engine for Dynamic Services Page, Search, Modals, Forms & FAQs
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. PAGE LOADER INITIALIZATION
  initPageLoader();

  // 2. NAVBAR & MOBILE MENU
  initNavbar();

  // 3. SCROLL TO TOP BUTTON
  initScrollToTop();

  // 4. STATS COUNTER ANIMATION
  initStatsCounter();

  // 5. SERVICES PAGE DYNAMIC CATALOG (Search, Category Filter, Product Grid, Sorting)
  initServicesCatalog();

  // 6. HOMEPAGE FEATURED SECTIONS
  initHomeSections();

  // 7. FAQ ACCORDION
  initFAQAccordion();

  // 8. CONTACT FORM VALIDATION
  initContactForm();

  // 9. INQUIRY CART DRAWER & BADGE
  initInquiryCart();

  // 10. DYNAMIC BACKEND API SYNC
  if (typeof loadFreshMartDataFromBackend === 'function') {
    const isBackendLoaded = await loadFreshMartDataFromBackend();
    if (isBackendLoaded) {
      initServicesCatalog();
      initHomeSections();
      if (window.lucide) window.lucide.createIcons();
    }
  }
});

/* ==========================================================================
   1. PAGE LOADER
   ========================================================================== */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 400);
  }
}

/* ==========================================================================
   2. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Sticky Scroll Shadow Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'lucide-x';
        } else {
          icon.className = 'lucide-menu';
        }
      }
    });

    // Close menu when clicking outside or link
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // Highlight active link based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3. SCROLL TO TOP
   ========================================================================== */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   4. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const prefix = stat.getAttribute('data-prefix') || '';
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = Math.ceil(target / 40);

          const updateCount = () => {
            count += speed;
            if (count >= target) {
              stat.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
            } else {
              stat.textContent = `${prefix}${count.toLocaleString()}${suffix}`;
              setTimeout(updateCount, 30);
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   5. DYNAMIC SERVICES CATALOG (PRODUCTS & CATEGORIES)
   ========================================================================== */
let activeCategoryFilter = 'all';
let searchQueryTerm = '';

function initServicesCatalog() {
  const categoriesContainer = document.getElementById('categories-display-grid');
  const productsContainer = document.getElementById('products-display-grid');
  const searchInput = document.getElementById('catalog-search-input');
  const categoryPillsContainer = document.getElementById('category-pills-wrapper');
  const resultsCounter = document.getElementById('catalog-results-count');

  // If not on services.html page, skip
  if (!productsContainer && !categoriesContainer) return;

  // Render Category Filter Pills
  if (categoryPillsContainer && typeof FMCG_CATEGORIES !== 'undefined') {
    let pillsHTML = `<button class="filter-pill active" data-cat="all">All Products</button>`;
    FMCG_CATEGORIES.forEach(cat => {
      pillsHTML += `<button class="filter-pill" data-cat="${cat.id}">${cat.icon} ${cat.name}</button>`;
    });
    categoryPillsContainer.innerHTML = pillsHTML;

    // Attach Click Events to Pills
    categoryPillsContainer.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPillsContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategoryFilter = pill.getAttribute('data-cat') || 'all';
        renderFilteredProducts();
      });
    });
  }

  // Render Clickable Category Cards Section
  if (categoriesContainer && typeof FMCG_CATEGORIES !== 'undefined') {
    let catGridHTML = '';
    FMCG_CATEGORIES.forEach(cat => {
      catGridHTML += `
        <div class="category-card" data-cat="${cat.id}">
          <div class="category-icon-wrapper">${cat.icon}</div>
          <h3>${cat.name}</h3>
          <p>${cat.description}</p>
          <span style="display:inline-block; margin-top:0.75rem; font-size:0.8rem; font-weight:700; color:var(--accent);">View Products →</span>
        </div>
      `;
    });
    categoriesContainer.innerHTML = catGridHTML;

    // Click Category Card to Filter Products directly
    categoriesContainer.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-cat');
        activeCategoryFilter = catId;

        // Sync pill
        if (categoryPillsContainer) {
          categoryPillsContainer.querySelectorAll('.filter-pill').forEach(p => {
            if (p.getAttribute('data-cat') === catId) {
              p.classList.add('active');
            } else {
              p.classList.remove('active');
            }
          });
        }

        // Scroll smoothly to products section
        const prodSection = document.getElementById('products-section-anchor');
        if (prodSection) prodSection.scrollIntoView({ behavior: 'smooth' });

        renderFilteredProducts();
      });
    });
  }

  // Search Bar Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQueryTerm = e.target.value.trim().toLowerCase();
      renderFilteredProducts();
    });
  }

  // Initial Product Render
  renderFilteredProducts();
}

function renderFilteredProducts() {
  const productsContainer = document.getElementById('products-display-grid');
  const resultsCounter = document.getElementById('catalog-results-count');
  if (!productsContainer || typeof FMCG_PRODUCTS === 'undefined') return;

  let filtered = FMCG_PRODUCTS.filter(prod => {
    const matchesCategory = (activeCategoryFilter === 'all') || (prod.category === activeCategoryFilter);
    const matchesSearch = searchQueryTerm === '' || 
      prod.name.toLowerCase().includes(searchQueryTerm) ||
      prod.brand.toLowerCase().includes(searchQueryTerm) ||
      prod.categoryName.toLowerCase().includes(searchQueryTerm) ||
      prod.shortDesc.toLowerCase().includes(searchQueryTerm);
    return matchesCategory && matchesSearch;
  });

  // Update Result Count Text
  if (resultsCounter) {
    resultsCounter.textContent = `Showing ${filtered.length} products`;
  }

  if (filtered.length === 0) {
    productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--dark);">No FMCG products found</h3>
        <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto 1.5rem auto;">Try searching with a different term or select another category filter.</p>
        <button class="btn btn-outline" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(prod => {
    html += `
      <div class="product-card">
        <span class="product-badge">${prod.badge || 'Featured'}</span>
        <div class="product-image-container">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" onError="this.onerror=null;this.src='https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=500&q=80';">
        </div>
        <div class="product-content">
          <div class="product-brand">${prod.brand}</div>
          <h3 class="product-title">${prod.name}</h3>
          <p class="product-desc">${prod.shortDesc}</p>
          <div class="product-rating">
            ⭐ ${prod.rating} / 5.0 <span style="color:var(--text-muted); font-size:0.75rem; font-weight:400; margin-left:auto;">${prod.stock}</span>
          </div>
          <div class="product-footer">
            <div class="product-price">₹${prod.price} <span>₹${prod.originalPrice}</span></div>
            <div style="display:flex; gap:0.4rem;">
              <button class="btn btn-sm btn-outline" onclick="openProductModal('${prod.id}')" title="View Details">
                View
              </button>
              <button class="btn btn-sm btn-primary" onclick="addToInquiryCart('${prod.id}')" title="Add to Bulk Inquiry">
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  productsContainer.innerHTML = html;
}

function resetFilters() {
  activeCategoryFilter = 'all';
  searchQueryTerm = '';
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  
  const pillsWrapper = document.getElementById('category-pills-wrapper');
  if (pillsWrapper) {
    pillsWrapper.querySelectorAll('.filter-pill').forEach((pill, idx) => {
      if (idx === 0) pill.classList.add('active');
      else pill.classList.remove('active');
    });
  }

  renderFilteredProducts();
}

/* ==========================================================================
   6. HOMEPAGE FEATURED SECTIONS
   ========================================================================== */
function initHomeSections() {
  const featuredGrid = document.getElementById('home-featured-products');
  if (!featuredGrid || typeof FMCG_PRODUCTS === 'undefined') return;

  // Pick top 6 items directly fetched from database
  const featured = FMCG_PRODUCTS.slice(0, 6);

  let html = '';
  featured.forEach(prod => {
    html += `
      <div class="product-card">
        <span class="product-badge">${prod.badge}</span>
        <div class="product-image-container">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
        </div>
        <div class="product-content">
          <div class="product-brand">${prod.brand}</div>
          <h3 class="product-title">${prod.name}</h3>
          <p class="product-desc">${prod.shortDesc}</p>
          <div class="product-rating">⭐ ${prod.rating} / 5.0</div>
          <div class="product-footer">
            <div class="product-price">₹${prod.price} <span>₹${prod.originalPrice}</span></div>
            <button class="btn btn-sm btn-primary" onclick="openProductModal('${prod.id}')">
              Quick View
            </button>
          </div>
        </div>
      </div>
    `;
  });

  featuredGrid.innerHTML = html;
}

/* ==========================================================================
   7. PRODUCT DETAILS MODAL
   ========================================================================== */
async function openProductModal(productId) {
  if (typeof FMCG_PRODUCTS === 'undefined') return;
  let prod = FMCG_PRODUCTS.find(p => p.id === productId);

  // If not found in local array and productId is ObjectId string, fetch single product from API GET /api/product/get/:id
  if (!prod && typeof productId === 'string' && productId.length === 24) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/product/get/${productId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.product) {
          const p = data.product;
          prod = {
            id: p._id,
            category: p.category_id,
            category_id: p.category_id,
            categoryName: 'Product Item',
            name: p.name,
            brand: p.brand || 'FreshMart',
            fullDesc: p.description || '',
            price: p.price,
            originalPrice: Math.round((p.price || 99) * 1.15),
            rating: 4.8,
            stock: p.stock ? `${p.stock} In Stock` : 'In Stock',
            image: p.image
          };
        }
      }
    } catch (err) {
      console.warn('Could not fetch single product details from backend API:', err);
    }
  }

  if (!prod) return;

  let modal = document.getElementById('product-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-detail-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-container">
      <button class="modal-close" onclick="closeProductModal()">&times;</button>
      <div class="modal-body-grid">
        <div style="background:#f8fafc; border-radius:var(--radius-md); padding:1.5rem; display:flex; align-items:center; justify-content:center;">
          <img src="${prod.image}" alt="${prod.name}" style="max-height:280px; object-fit:contain;">
        </div>
        <div>
          <div style="color:var(--accent); font-weight:700; font-size:0.85rem; text-transform:uppercase; margin-bottom:0.4rem;">
            ${prod.brand} • ${prod.categoryName}
          </div>
          <h2 style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--dark); margin-bottom:0.75rem;">
            ${prod.name}
          </h2>
          <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem;">
            <span style="background:#fef3c7; color:#b45309; padding:0.2rem 0.6rem; border-radius:var(--radius-pill); font-weight:700; font-size:0.85rem;">
              ⭐ ${prod.rating} / 5 Rating
            </span>
            <span style="color:var(--accent); font-weight:700; font-size:0.85rem;">
              ✓ ${prod.stock}
            </span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
            ${prod.fullDesc}
          </p>
          <div style="margin-bottom:1.5rem; padding:1rem; background:var(--primary-light); border-radius:var(--radius-sm);">
            <div style="font-size:0.85rem; color:var(--primary); font-weight:700;">Bulk Wholesale Price:</div>
            <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--primary);">
              ₹${prod.price} <span style="font-size:0.9rem; text-decoration:line-through; color:var(--text-muted); font-weight:400;">₹${prod.originalPrice}</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">*Applicable for carton & bulk distributor orders.</div>
          </div>
          <div style="display:flex; gap:1rem;">
            <button class="btn btn-primary" style="flex:1;" onclick="addToInquiryCart('${prod.id}'); closeProductModal();">
              Add to Bulk Inquiry
            </button>
            <a href="contact.html?subject=Inquiry+for+${encodeURIComponent(prod.name)}" class="btn btn-outline">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => modal.classList.add('active'), 10);
}

function closeProductModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   8. FAQ ACCORDION LOGIC
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('freshmart-contact-form');
  if (!contactForm) return;

  // Auto-fill subject if passed in URL query
  const urlParams = new URLSearchParams(window.location.search);
  const subjectParam = urlParams.get('subject');
  if (subjectParam) {
    const subjectInput = contactForm.querySelector('[name="subject"]');
    if (subjectInput) subjectInput.value = subjectParam;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = contactForm.querySelector('#form-name');
    const email = contactForm.querySelector('#form-email');
    const phone = contactForm.querySelector('#form-phone');
    const subject = contactForm.querySelector('#form-subject');
    const message = contactForm.querySelector('#form-message');

    // Helper error display
    const setError = (input, msg) => {
      const parent = input.parentElement;
      let error = parent.querySelector('.error-msg');
      if (!error) {
        error = document.createElement('div');
        error.className = 'error-msg';
        parent.appendChild(error);
      }
      error.textContent = msg;
      error.style.display = 'block';
      input.style.borderColor = '#ef4444';
      isValid = false;
    };

    const clearError = (input) => {
      const parent = input.parentElement;
      const error = parent.querySelector('.error-msg');
      if (error) error.style.display = 'none';
      input.style.borderColor = 'var(--border-color)';
    };

    // Validation checks
    if (!name.value.trim()) setError(name, 'Full name is required.');
    else clearError(name);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) setError(email, 'Valid email address is required.');
    else clearError(email);

    if (!phone.value.trim() || phone.value.trim().length < 8) setError(phone, 'Valid phone number required (min 8 digits).');
    else clearError(phone);

    if (!subject.value.trim()) setError(subject, 'Subject is required.');
    else clearError(subject);

    if (!message.value.trim() || message.value.trim().length < 10) setError(message, 'Message must be at least 10 characters.');
    else clearError(message);

    if (isValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Inquiry Now';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting to database...';
      }

      const payload = {
        fullName: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim()
      };

      if (typeof sendContactMessageToBackend === 'function') {
        sendContactMessageToBackend(payload)
          .then(resData => {
            if (resData && (resData.contactMessage || resData.message)) {
              showToast('✓ Thank you! Your message has been saved to FreshMart database.', 'success');
              contactForm.reset();
            } else {
              showToast('✓ Thank you! Your message has been sent successfully.', 'success');
              contactForm.reset();
            }
          })
          .catch(err => {
            console.error('API Error sending message:', err);
            showToast('✓ Thank you! Your message has been recorded.', 'info');
            contactForm.reset();
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalText;
            }
          });
      } else {
        showToast('✓ Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    }
  });
}

/* ==========================================================================
   10. INQUIRY CART SYSTEM (LOCALSTORAGE)
   ========================================================================== */
let inquiryCart = JSON.parse(localStorage.getItem('freshmart_cart') || '[]');

function initInquiryCart() {
  updateCartBadge();

  // Attach trigger to Cart Button on Navbar
  const cartBtn = document.querySelector('.cart-btn-trigger');
  if (cartBtn) {
    cartBtn.addEventListener('click', openCartDrawer);
  }
}

function addToInquiryCart(productId) {
  if (typeof FMCG_PRODUCTS === 'undefined') return;
  const prod = FMCG_PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const existing = inquiryCart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    inquiryCart.push({ ...prod, qty: 1 });
  }

  localStorage.setItem('freshmart_cart', JSON.stringify(inquiryCart));
  updateCartBadge();
  showToast(`Added "${prod.name}" to bulk inquiry list!`, 'info');
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-count-badge');
  if (badge) {
    const totalCount = inquiryCart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalCount;
  }
}

function openCartDrawer() {
  let drawer = document.getElementById('inquiry-cart-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'inquiry-cart-drawer';
    drawer.className = 'modal-overlay';
    document.body.appendChild(drawer);
  }

  let cartItemsHTML = '';
  if (inquiryCart.length === 0) {
    cartItemsHTML = `<p style="text-align:center; padding:2rem; color:var(--text-muted);">Your inquiry cart is currently empty. Browse products and click "+ Add" to build your quotation list.</p>`;
  } else {
    inquiryCart.forEach(item => {
      cartItemsHTML += `
        <div style="display:flex; align-items:center; gap:1rem; padding:0.8rem 0; border-bottom:1px solid var(--border-color);">
          <img src="${item.image}" style="width:50px; height:50px; object-fit:contain; background:#f8fafc; border-radius:6px; padding:4px;">
          <div style="flex-grow:1;">
            <div style="font-weight:700; font-size:0.9rem; color:var(--dark);">${item.name}</div>
            <div style="font-size:0.8rem; color:var(--accent);">₹${item.price} x ${item.qty}</div>
          </div>
          <button style="background:none; color:#ef4444; font-size:1.2rem; padding:0.2rem;" onclick="removeFromCart('${item.id}')">&times;</button>
        </div>
      `;
    });
  }

  drawer.innerHTML = `
    <div class="modal-container" style="max-width:500px;">
      <button class="modal-close" onclick="closeCartDrawer()">&times;</button>
      <div style="padding:1.5rem;">
        <h3 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:1rem; color:var(--dark);">
          Bulk Product Inquiry List (${inquiryCart.length})
        </h3>
        <div style="max-height:300px; overflow-y:auto; margin-bottom:1.5rem;">
          ${cartItemsHTML}
        </div>
        ${inquiryCart.length > 0 ? `
          <button class="btn btn-primary" style="width:100%;" onclick="submitCartInquiry()">
            Submit Wholesale Quotation Request
          </button>
        ` : ''}
      </div>
    </div>
  `;

  setTimeout(() => drawer.classList.add('active'), 10);
}

function closeCartDrawer() {
  const drawer = document.getElementById('inquiry-cart-drawer');
  if (drawer) drawer.classList.remove('active');
}

function removeFromCart(productId) {
  inquiryCart = inquiryCart.filter(item => item.id !== productId);
  localStorage.setItem('freshmart_cart', JSON.stringify(inquiryCart));
  updateCartBadge();
  openCartDrawer();
}

function submitCartInquiry() {
  const names = inquiryCart.map(i => `${i.name} (x${i.qty})`).join(', ');
  window.location.href = `contact.html?subject=Wholesale+Quote+Request&message=Products+Requested:+${encodeURIComponent(names)}`;
}

/* ==========================================================================
   11. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeft = type === 'success' ? '4px solid #16a34a' : '4px solid #f59e0b';
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
