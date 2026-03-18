document.documentElement.classList.add("js");

const products = window.STEEL_CONCEPT_PRODUCTS ?? [];
const header = document.querySelector("[data-header]");
const grid = document.querySelector("[data-product-grid]");
const count = document.querySelector("[data-count]");
const emptyState = document.querySelector("[data-empty]");
const activeFilters = document.querySelector("[data-active-filters]");
const searchInput = document.querySelector("[data-search]");
const filterInputs = Array.from(document.querySelectorAll("[data-filter]"));
const clearButtons = Array.from(document.querySelectorAll("[data-clear]"));
const filterPanel = document.querySelector("[data-filter-panel]");
const filterToggle = document.querySelector("[data-filter-toggle]");
const filterBackdrop = document.querySelector("[data-filter-backdrop]");
const filterCloseButtons = Array.from(document.querySelectorAll("[data-filter-close]"));

const state = {
  search: "",
  type: new Set(),
  core: new Set(),
  fixation: new Set(),
  application: new Set()
};

const labelMap = {
  type: {
    zidni: "Zidni paneli",
    krovni: "Krovni paneli"
  },
  application: {
    "Objekti za uzgoj životinja": "Agro / uzgoj životinja"
  }
};

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const getDisplayTitle = (product) =>
  product.displayFullName ?? (product.type === "zidni" ? "Zidni sendvič paneli" : "Krovni sendvič paneli");

const syncHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 12);
};

const matchesSet = (productValue, activeValues) => {
  if (activeValues.size === 0) {
    return true;
  }

  if (Array.isArray(productValue)) {
    return productValue.some((item) => activeValues.has(item));
  }

  return activeValues.has(productValue);
};

const getFilteredProducts = () => {
  const search = normalize(state.search.trim());

  return products.filter((product) => {
    const haystack = normalize(
      [
        product.name,
        product.fullName,
        product.summary,
        product.type,
        product.core,
        product.fixation,
        ...product.application
      ].join(" ")
    );

    if (search && !haystack.includes(search)) {
      return false;
    }

    if (!matchesSet(product.type, state.type)) {
      return false;
    }

    if (!matchesSet(product.core, state.core)) {
      return false;
    }

    if (!matchesSet(product.fixation, state.fixation)) {
      return false;
    }

    if (!matchesSet(product.application, state.application)) {
      return false;
    }

    return true;
  });
};

const renderActiveFilters = () => {
  if (!activeFilters) {
    return;
  }

  const pills = [];

  if (state.search.trim()) {
    pills.push(`<span class="active-pill">Pretraga: ${escapeHtml(state.search.trim())}</span>`);
  }

  ["type", "core", "fixation", "application"].forEach((group) => {
    state[group].forEach((value) => {
      const label = labelMap[group]?.[value] ?? value;
      pills.push(`<span class="active-pill">${escapeHtml(label)}</span>`);
    });
  });

  activeFilters.innerHTML = pills.join("");
};

const renderProducts = () => {
  if (!grid || !count || !emptyState) {
    return;
  }

  const filtered = getFilteredProducts();

  count.textContent = `${filtered.length} proizvoda`;
  renderActiveFilters();

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  grid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <a class="product-card-link" href="${product.pageHref}" aria-label="${escapeHtml(getDisplayTitle(product))}">
            <div class="product-media">
              <img src="${product.image}" alt="${escapeHtml(getDisplayTitle(product))}" loading="lazy" />
            </div>
            <div class="product-body">
              <h3>${escapeHtml(getDisplayTitle(product))}</h3>
              <p>${escapeHtml(product.summary)}</p>
            </div>
          </a>
        </article>
      `
    )
    .join("");
};

const resetFilters = () => {
  state.search = "";

  if (searchInput) {
    searchInput.value = "";
  }

  ["type", "core", "fixation", "application"].forEach((group) => {
    state[group].clear();
  });

  filterInputs.forEach((input) => {
    input.checked = false;
  });

  renderProducts();
};

const openFilters = () => {
  if (!filterPanel) {
    return;
  }

  filterPanel.classList.add("is-open");
  document.body.classList.add("filters-open");

  if (filterBackdrop) {
    filterBackdrop.hidden = false;
  }

  filterToggle?.setAttribute("aria-expanded", "true");

  filterCloseButtons.forEach((button) => {
    button.hidden = false;
  });
};

const closeFilters = () => {
  if (!filterPanel) {
    return;
  }

  filterPanel.classList.remove("is-open");
  document.body.classList.remove("filters-open");

  if (filterBackdrop) {
    filterBackdrop.hidden = true;
  }

  filterToggle?.setAttribute("aria-expanded", "false");

  filterCloseButtons.forEach((button) => {
    button.hidden = window.innerWidth > 980;
  });
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

searchInput?.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

filterInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    const group = event.target.dataset.filter;
    const value = event.target.value;

    if (event.target.checked) {
      state[group].add(value);
    } else {
      state[group].delete(value);
    }

    renderProducts();
  });
});

clearButtons.forEach((button) => {
  button.addEventListener("click", resetFilters);
});

filterToggle?.addEventListener("click", () => {
  const isOpen = filterPanel?.classList.contains("is-open");

  if (isOpen) {
    closeFilters();
  } else {
    openFilters();
  }
});

filterCloseButtons.forEach((button) => {
  button.addEventListener("click", closeFilters);
});

filterBackdrop?.addEventListener("click", closeFilters);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFilters();
  }
});

renderProducts();
closeFilters();
