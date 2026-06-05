/* ============================================
   APEX PC — JavaScript
   Features: Loader, cursor, navbar scroll,
   cart, stats counter, testimonial slider,
   newsletter toast, product wishlist
============================================ */

// =========================================
// LOADER
// =========================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.querySelector('.hero').classList.add('loaded');
  }, 1800);
});

// =========================================
// CUSTOM CURSOR
// =========================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Expand follower on hoverable elements
document.querySelectorAll('a, button, .cat-card, .product-card, .btn-add-cart, .nav-cart').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorFollower.style.width = '60px';
    cursorFollower.style.height = '60px';
    cursorFollower.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.width = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.opacity = '0.6';
  });
});

// =========================================
// NAVBAR SCROLL
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =========================================
// CART STATE
// =========================================
let cart = {};

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  const totalItems = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const totalPrice = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

  cartCount.textContent = totalItems;

  if (totalItems === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Giỏ hàng của bạn đang trống.</p>';
  } else {
    cartItemsEl.innerHTML = Object.entries(cart).map(([id, item]) => `
      <div class="cart-item">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">
          <button data-action="dec" data-id="${id}" aria-label="Giảm">−</button>
          <span class="cart-item-count">${item.qty}</span>
          <button data-action="inc" data-id="${id}" aria-label="Tăng">+</button>
        </div>
        <div class="cart-item-price">${formatVND(item.price * item.qty)}</div>
      </div>
    `).join('');

    // Bind qty buttons
    cartItemsEl.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        if (action === 'inc') {
          cart[id].qty++;
        } else {
          cart[id].qty--;
          if (cart[id].qty <= 0) delete cart[id];
        }
        updateCartUI();
      });
    });
  }

  cartTotalEl.textContent = formatVND(totalPrice);
}

function formatVND(num) {
  return num.toLocaleString('vi-VN') + '₫';
}

function addToCart(id, name, price) {
  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = { name, price, qty: 1 };
  }
  updateCartUI();
  showToast(`✓ Đã thêm "${name}" vào giỏ hàng`);
  openCart();
}

// =========================================
// CART DRAWER
// =========================================
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

document.getElementById('nav-cart').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('btn-checkout').addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    showToast('Giỏ hàng trống. Hãy thêm sản phẩm trước!');
    return;
  }
  showToast('🎉 Cảm ơn bạn! Đơn hàng đang được xử lý...');
  setTimeout(() => {
    cart = {};
    updateCartUI();
    closeCart();
  }, 1500);
});

// Add-to-cart buttons
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    addToCart(id, name, price);
  });
});

// =========================================
// TOAST
// =========================================
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// =========================================
// WISHLIST
// =========================================
document.querySelectorAll('.product-wishlist').forEach(btn => {
  btn.addEventListener('click', function () {
    const isWished = this.dataset.wished === '1';
    if (isWished) {
      this.textContent = '♡';
      this.dataset.wished = '0';
      this.style.color = '';
    } else {
      this.textContent = '♥';
      this.dataset.wished = '1';
      this.style.color = '#c9a84c';
      showToast('♥ Đã thêm vào danh sách yêu thích');
    }
  });
});

// =========================================
// STATS COUNTER
// =========================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      counter.textContent = value.toLocaleString('vi-VN');
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target.toLocaleString('vi-VN');
    }
    requestAnimationFrame(update);
  });
}

// Intersection Observer for stats
const statsSection = document.querySelector('.stats');
let statsAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateCounters();
    }
  });
}, { threshold: 0.4 });
if (statsSection) statsObserver.observe(statsSection);

// =========================================
// TESTIMONIAL SLIDER
// =========================================
const testiCards = document.querySelectorAll('.testi-card');
const dotBtns = document.querySelectorAll('.dot-btn');
let currentTesti = 0;
let testiInterval;

function goToTesti(idx) {
  testiCards[currentTesti].classList.remove('active');
  dotBtns[currentTesti].classList.remove('active');
  currentTesti = idx;
  testiCards[currentTesti].classList.add('active');
  dotBtns[currentTesti].classList.add('active');
}

function startTestiAuto() {
  testiInterval = setInterval(() => {
    goToTesti((currentTesti + 1) % testiCards.length);
  }, 5000);
}
startTestiAuto();

dotBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    clearInterval(testiInterval);
    goToTesti(i);
    startTestiAuto();
  });
});

// =========================================
// NEWSLETTER FORM
// =========================================
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  if (email) {
    showToast('✓ Đăng ký thành công! Chào mừng bạn đến với LUXURY PC.');
    document.getElementById('newsletter-email').value = '';
  }
});

// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================
const revealTargets = document.querySelectorAll(
  '.product-card, .cat-card, .build-feat, .stat-item, .testi-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(el);
});

// =========================================
// CATEGORY FILTER (simple highlight)
// =========================================
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.dataset.cat;
    showToast(`Đang xem danh mục: ${card.querySelector('.cat-name').textContent}`);
    // Scroll to products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
});

// =========================================
// HERO PARALLAX
// =========================================
window.addEventListener('scroll', () => {
  const heroImg = document.getElementById('hero-img');
  if (heroImg && window.scrollY < window.innerHeight) {
    heroImg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.15}px)`;
  }
});

// =========================================
// BUILD PC BUTTON
// =========================================
document.getElementById('btn-build-pc').addEventListener('click', () => {
  showToast('🔧 Tính năng tư vấn Build PC đang được phát triển. Vui lòng gọi 1800-LUXURY-PC!');
});

// =========================================
// FLASH SALE COUNTDOWN (6 giờ từ lúc load)
// =========================================
(function initCountdown() {
  const endTime = Date.now() + 6 * 60 * 60 * 1000; // 6 hours from now

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now = Date.now();
    const remaining = Math.max(0, endTime - now);

    const totalSec = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    const hEl = document.getElementById('fs-hours');
    const mEl = document.getElementById('fs-minutes');
    const sEl = document.getElementById('fs-seconds');

    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(minutes);
    if (sEl) sEl.textContent = pad(seconds);

    if (remaining <= 0) {
      clearInterval(countdownInterval);
    }
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
})();

// =========================================
// VOUCHER MODAL
// =========================================
const voucherData = {
  apex10: {
    badge: 'Giảm Giá',
    pct: '10%',
    code: 'APEX10',
    desc: 'Giảm 10% cho tất cả đơn hàng',
    apply: 'Tất cả sản phẩm',
    expire: '31/03/2026',
    limit: 'Không giới hạn'
  },
  apex15: {
    badge: 'Giảm Giá',
    pct: '15%',
    code: 'APEX15',
    desc: 'Giảm 15% cho đơn từ 10 triệu',
    apply: 'Tất cả sản phẩm',
    expire: '31/03/2026',
    limit: '1 lần / khách hàng'
  },
  vip20: {
    badge: 'VIP Exclusive',
    pct: '20%',
    code: 'VIP20',
    desc: 'Giảm 20% dành riêng cho thành viên VIP',
    apply: 'Thành viên hạng VIP trở lên',
    expire: '30/06/2026',
    limit: '3 lần / tháng'
  },
  freeship: {
    badge: 'Miễn Phí Ship',
    pct: 'FREE',
    code: 'FREESHIP',
    desc: 'Miễn phí vận chuyển toàn quốc',
    apply: 'Tất cả đơn hàng',
    expire: '15/04/2026',
    limit: 'Không giới hạn'
  },
  newuser: {
    badge: 'Khách Mới',
    pct: '12%',
    code: 'NEWUSER',
    desc: 'Ưu đãi chào mừng khách hàng đăng ký lần đầu',
    apply: 'Đơn hàng đầu tiên',
    expire: '31/12/2026',
    limit: '1 lần / tài khoản'
  },
  cpu500k: {
    badge: 'Danh Mục CPU',
    pct: '500K',
    code: 'CPU500K',
    desc: 'Giảm trực tiếp 500.000₫ khi mua bất kỳ CPU',
    apply: 'Danh mục CPU (đơn ≥ 5.000.000₫)',
    expire: '30/04/2026',
    limit: '2 lần / khách hàng'
  }
};

const modalOverlay = document.getElementById('voucher-modal-overlay');
const modalClose = document.getElementById('voucher-modal-close');
const copyBtn = document.getElementById('vmodal-copy-btn');

function openVoucherModal(key) {
  const data = voucherData[key];
  if (!data) return;

  document.getElementById('vmodal-badge').textContent = data.badge;
  document.getElementById('vmodal-pct').textContent = data.pct;
  document.getElementById('vmodal-code').textContent = data.code;
  document.getElementById('vmodal-desc').textContent = data.desc;
  document.getElementById('vmodal-apply').textContent = data.apply;
  document.getElementById('vmodal-expire').textContent = data.expire;
  document.getElementById('vmodal-limit').textContent = data.limit;
  copyBtn.dataset.code = data.code;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVoucherModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Open modal on voucher card click
document.querySelectorAll('.voucher-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.voucher;
    openVoucherModal(key);
  });
});

// Close modal
modalClose.addEventListener('click', closeVoucherModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeVoucherModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVoucherModal();
});

// Copy code button (UI only — shows toast)
copyBtn.addEventListener('click', () => {
  const code = copyBtn.dataset.code || 'APEX10';
  showToast(`✓ Đã sao chép mã: ${code}`);
});

// Expand cursor follower on new interactive elements
document.querySelectorAll('.flash-product-card, .voucher-card, .vmodal-copy-btn, .voucher-modal-close').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorFollower.style.width = '60px';
    cursorFollower.style.height = '60px';
    cursorFollower.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.width = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.opacity = '0.6';
  });
});

// =========================================
// PRODUCT CATALOG DATA (for search)
// =========================================
let productCatalog = [];

async function loadProductCatalog() {
  try {
    const response = await fetch('/api/products');
    productCatalog = await response.json();
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
  }
}

// Khởi chạy việc lấy dữ liệu khi trang HTML vừa tải xong
document.addEventListener('DOMContentLoaded', loadProductCatalog);

// =========================================
// SEARCH OVERLAY
// =========================================
const searchOverlay = document.getElementById('search-overlay');
const navSearchBtn = document.getElementById('nav-search-btn');
const searchCloseBtn = document.getElementById('search-close');
const searchInput = document.getElementById('search-input');
const searchClearBtn = document.getElementById('search-clear');
const searchResults = document.getElementById('search-results');

function openSearch() {
  searchOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput.focus(), 350);
}
function closeSearch() {
  searchOverlay.classList.remove('open');
  document.body.style.overflow = '';
  searchInput.value = '';
  searchClearBtn.classList.remove('visible');
  searchResults.innerHTML = '<p class="search-hint">Nhập từ khóa để tìm kiếm sản phẩm LUXURY PC.</p>';
}

navSearchBtn.addEventListener('click', openSearch);
searchCloseBtn.addEventListener('click', closeSearch);
searchOverlay.addEventListener('click', (e) => {
  if (e.target === searchOverlay) closeSearch();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchOverlay.classList.contains('open')) closeSearch();
});

// Live search input
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (q.length > 0) {
    searchClearBtn.classList.add('visible');
  } else {
    searchClearBtn.classList.remove('visible');
  }
  renderSearchResults(q);
});

searchClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchClearBtn.classList.remove('visible');
  searchResults.innerHTML = '<p class="search-hint">Nhập từ khóa để tìm kiếm sản phẩm LUXURY PC.</p>';
  searchInput.focus();
});

// Quick tag click
document.querySelectorAll('.search-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const q = tag.dataset.query.toLowerCase();
    searchInput.value = tag.dataset.query;
    searchClearBtn.classList.add('visible');
    renderSearchResults(q);
    searchInput.focus();
  });
});

function renderSearchResults(query) {
  if (!query) {
    searchResults.innerHTML = '<p class="search-hint">Nhập từ khóa để tìm kiếm sản phẩm LUXURY PC.</p>';
    return;
  }
  const matches = productCatalog.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.cat.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = `<p class="search-no-result">Không tìm thấy sản phẩm phù hợp với "<em>${query}</em>"</p>`;
    return;
  }

  searchResults.innerHTML = `
    <div class="search-result-grid">
      ${matches.map(p => `
        <div class="search-result-item" onclick="${p.id ? `document.getElementById('${p.id}').scrollIntoView({behavior:'smooth'}); closeSearch();` : 'closeSearch();'}">
          <div class="sri-icon">${p.icon}</div>
          <div class="sri-info">
            <div class="sri-name">${p.name}</div>
            <div class="sri-cat">${p.cat}</div>
          </div>
          <div class="sri-price">${p.price}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// =========================================
// FILTER & SORT BAR
// =========================================
const filterChips = document.querySelectorAll('.filter-chip');
const sortSelect = document.getElementById('sort-select');
const resultCount = document.getElementById('result-count');
const productsGrid = document.getElementById('products-grid');

let activeCategory = 'all';
let activeSort = 'default';

function applyFilterAndSort() {
  const cards = Array.from(productsGrid.querySelectorAll('.product-card'));

  // Step 1: Filter by category
  let filtered = cards.filter(card => {
    if (activeCategory === 'all') return true;
    return card.dataset.cat === activeCategory;
  });
  const hidden = cards.filter(c => !filtered.includes(c));

  // Hide non-matching
  hidden.forEach(c => {
    c.classList.add('hidden-by-filter');
    c.classList.remove('filter-fade-in');
  });

  // Step 2: Sort visible cards
  filtered.sort((a, b) => {
    const priceA = parseInt(a.dataset.price) || 0;
    const priceB = parseInt(b.dataset.price) || 0;
    const popA = parseInt(a.dataset.popularity) || 0;
    const popB = parseInt(b.dataset.popularity) || 0;
    if (activeSort === 'price-asc') return priceA - priceB;
    if (activeSort === 'price-desc') return priceB - priceA;
    if (activeSort === 'popular') return popB - popA;
    if (activeSort === 'newest') return Math.random() - 0.5; // UI demo only
    return 0; // default — leave original order
  });

  // Re-append in sorted order with animation
  filtered.forEach((card, i) => {
    card.classList.remove('hidden-by-filter');
    card.classList.remove('filter-fade-in');
    // Force reflow
    void card.offsetWidth;
    card.classList.add('filter-fade-in');
    card.style.animationDelay = `${i * 60}ms`;
    productsGrid.appendChild(card);
  });

  // Update count
  if (resultCount) resultCount.textContent = filtered.length;
}

// Category chip click
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCategory = chip.dataset.cat;
    applyFilterAndSort();
  });
});

// Sort select change
if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    activeSort = sortSelect.value;
    applyFilterAndSort();
  });
}

// Expand cursor on new elements
document.querySelectorAll('.nav-search-btn, .search-close, .search-tag, .search-result-item, .filter-chip, .sort-select').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorFollower.style.width = '60px';
    cursorFollower.style.height = '60px';
    cursorFollower.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.width = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.opacity = '0.6';
  });
});

// LOGIN
async function login() {

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-pw").value;

  const data = {
    email: email,
    password: password
  };

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result != null) {
      alert("Đăng nhập thành công!");
      window.location.href = "/";
    } else {
      alert("Sai email hoặc mật khẩu!");
    }

  } catch (error) {
    console.error(error);
    alert("Lỗi kết nối server");
  }
}

// REGISTER
async function register() {

  const firstname = document.getElementById("reg-fname").value;
  const lastname = document.getElementById("reg-lname").value;
  const email = document.getElementById("reg-email").value;
  const phone = document.getElementById("reg-phone").value;
  const password = document.getElementById("reg-pw").value;

  const data = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    phone: phone,
    password: password
  };

  try {

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result) {
      alert("Đăng ký thành công!");
    } else {
      alert("Đăng ký thất bại!");
    }

  } catch (error) {
    console.error(error);
    alert("Lỗi server");
  }
}
