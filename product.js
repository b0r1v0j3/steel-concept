const products = window.STEEL_CONCEPT_PRODUCTS ?? [];
const productMap = window.STEEL_CONCEPT_PRODUCT_MAP ?? {};
const productDescriptions = window.STEEL_CONCEPT_PRODUCT_DESCRIPTIONS ?? {};
const productHeroSpecs = window.STEEL_CONCEPT_PRODUCT_HERO_SPECS ?? {};
const productDetails = window.STEEL_CONCEPT_PRODUCT_DETAILS ?? {};
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug") ?? "";

const page = document.querySelector("[data-product-page]");
const missing = document.querySelector("[data-product-missing]");
const pageDescription = document.querySelector("[data-page-description]");
const product = productMap[slug];
const description = productDescriptions[slug] ?? {};
const details = productDetails[slug] ?? {};

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const cleanCopy = (value) =>
  value
    .replace(/[\u200b-\u200d\uFEFF]/g, "")
    .replace(/^["„“]+/, "")
    .replace(/["”]+$/, "")
    .replace(/\s+/g, " ")
    .trim();

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSeriesLabel = (item) => (item.type === "zidni" ? "Zidni panel" : "Krovni panel");
const getDisplayTitle = (item) =>
  item.displayFullName ?? (item.type === "zidni" ? "Zidni sendvič paneli" : "Krovni sendvič paneli");

const replaceInsensitive = (value, pattern, replacement) =>
  value.replace(new RegExp(escapeRegExp(pattern), "gi"), replacement);

const sanitizeProductCopy = (value, item) => {
  let sanitized = cleanCopy(value);

  if (!item?.name) {
    return sanitized;
  }

  const replacements = [
    [`Paneli ${item.name}`, "Paneli"],
    [`${item.name} termoizolacioni zidni paneli`, "Zidni sendvič paneli"],
    [`${item.name} termoizolacioni krovni paneli`, "Krovni sendvič paneli"],
    [`${item.name} zidni sendvič paneli`, "Zidni sendvič paneli"],
    [`${item.name} krovni sendvič paneli`, "Krovni sendvič paneli"],
    [`${item.name} termoizolacioni paneli`, "Termoizolacioni paneli"],
    [`${item.name} paneli`, "Paneli"],
    [`${item.name} predstavlja`, `Ovaj ${getSeriesLabel(item).toLowerCase()} predstavlja`],
    [item.name, getSeriesLabel(item)]
  ];

  replacements.forEach(([pattern, replacement]) => {
    sanitized = replaceInsensitive(sanitized, pattern, replacement);
  });

  return sanitized;
};

const renderParagraphs = (items = [], item) =>
  items
    .filter(Boolean)
    .map((entry) => `<p>${escapeHtml(sanitizeProductCopy(entry, item))}</p>`)
    .join("");

const setFigureImage = (figure, image, src, alt) => {
  if (!figure || !image) {
    return;
  }

  if (!src) {
    figure.hidden = true;
    image.removeAttribute("src");
    image.alt = "";
    return;
  }

  figure.hidden = false;
  image.src = src;
  image.alt = alt;
};

const renderTechnicalRows = (rows = []) =>
  rows
    .map(
      ([label, value]) => `
        <tr>
          <th scope="row">${escapeHtml(cleanCopy(label).replace(/:\s*\d+$/, "").replace(/:\s*$/, ""))}</th>
          <td>${escapeHtml(cleanCopy(value))}</td>
        </tr>
      `
    )
    .join("");

if (!product) {
  if (page) {
    page.hidden = true;
  }

  if (missing) {
    missing.hidden = false;
  }
} else {
  const name = document.querySelector("[data-product-name]");
  const summary = document.querySelector("[data-product-summary]");
  const image = document.querySelector("[data-product-image]");
  const heroSpecsWrap = document.querySelector("[data-product-hero-specs-wrap]");
  const heroSpecsTable = document.querySelector("[data-product-hero-specs]");
  const descriptionSection = document.querySelector("[data-product-description-section]");
  const descriptionCopy = document.querySelector("[data-product-description-copy]");
  const descriptionMedia = document.querySelector("[data-product-description-media]");
  const diagramWrap = document.querySelector("[data-product-diagram-wrap]");
  const diagramImage = document.querySelector("[data-product-diagram]");
  const detailImageWrap = document.querySelector("[data-product-detail-image-wrap]");
  const detailImage = document.querySelector("[data-product-detail-image]");
  const mainFeatures = document.querySelector("[data-product-main-features]");
  const accessories = document.querySelector("[data-product-accessories]");
  const packaging = document.querySelector("[data-product-packaging]");
  const technicalTable = document.querySelector("[data-product-technical-table]");

  document.title = `${getDisplayTitle(product)} | Steel Concept`;

  if (pageDescription) {
    pageDescription.setAttribute("content", `${getDisplayTitle(product)}. ${product.summary}`);
  }

  if (name) {
    name.textContent = getDisplayTitle(product);
  }

  if (summary) {
    summary.textContent = product.summary;
  }

  if (heroSpecsTable && heroSpecsWrap) {
    const rows = [["Tip panela", getSeriesLabel(product)], ...(productHeroSpecs[slug] ?? [])];
    heroSpecsTable.innerHTML = renderTechnicalRows(rows);
    heroSpecsWrap.hidden = rows.length === 0;
  }

  if (image) {
    image.src = product.image;
    image.alt = getDisplayTitle(product);
  }

  if (descriptionCopy) {
    descriptionCopy.innerHTML = renderParagraphs(description.paragraphs, product);
  }

  setFigureImage(
    diagramWrap,
    diagramImage,
    description.diagramImage,
    `${getDisplayTitle(product)} tehnička skica`
  );
  setFigureImage(
    detailImageWrap,
    detailImage,
    description.detailImage,
    `${getDisplayTitle(product)} detalj panela`
  );

  if (descriptionMedia) {
    const hasAnyVisual = Boolean(description.diagramImage || description.detailImage);
    descriptionMedia.hidden = !hasAnyVisual;
  }

  if (descriptionSection) {
    const hasDescription = Boolean(
      (description.paragraphs && description.paragraphs.length) ||
        description.diagramImage ||
        description.detailImage
    );
    descriptionSection.hidden = !hasDescription;
  }

  if (mainFeatures) {
    mainFeatures.innerHTML = renderParagraphs(details.mainFeatures, product);
  }

  if (accessories) {
    accessories.innerHTML = renderParagraphs(details.accessories, product);
  }

  if (packaging) {
    packaging.innerHTML = renderParagraphs(details.packaging, product);
  }

  if (technicalTable) {
    technicalTable.innerHTML = renderTechnicalRows(details.technicalRows);
  }

  if (page) {
    page.hidden = false;
  }

  if (missing) {
    missing.hidden = true;
  }
}
