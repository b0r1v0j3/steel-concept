const products = window.STEEL_CONCEPT_PRODUCTS ?? [];
const productMap = window.STEEL_CONCEPT_PRODUCT_MAP ?? {};
const productDescriptions = window.STEEL_CONCEPT_PRODUCT_DESCRIPTIONS ?? {};
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

const getSeriesLabel = (item) => (item.type === "zidni" ? "Zidni panel" : "Krovni panel");

const renderParagraphs = (items = []) =>
  items
    .filter(Boolean)
    .map((item) => `<p>${escapeHtml(cleanCopy(item))}</p>`)
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

const renderSpecs = (item) => {
  const specs = [
    { label: "Tip panela", value: getSeriesLabel(item) },
    { label: "Jezgro", value: item.core },
    { label: "Spoj", value: item.fixation },
    { label: "Primena", value: item.application.join(", ") }
  ];

  return specs
    .map(
      (spec) => `
        <article class="spec-card">
          <span>${escapeHtml(spec.label)}</span>
          <strong>${escapeHtml(spec.value)}</strong>
        </article>
      `
    )
    .join("");
};

const renderChips = (item) => `
  <span class="product-chip">${escapeHtml(item.core)}</span>
  <span class="product-chip">${escapeHtml(item.fixation)}</span>
  ${item.application
    .map((entry) => `<span class="product-chip">${escapeHtml(entry)}</span>`)
    .join("")}
`;

const renderTechnicalRows = (rows = []) =>
  rows
    .map(
      ([label, value]) => `
        <tr>
          <th scope="row">${escapeHtml(cleanCopy(label))}</th>
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
  const series = document.querySelector("[data-product-series]");
  const chips = document.querySelector("[data-product-chips]");
  const specs = document.querySelector("[data-product-specs]");
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

  document.title = `${product.name} | Steel Concept`;

  if (pageDescription) {
    pageDescription.setAttribute("content", `${product.fullName}. ${product.summary}`);
  }

  if (name) {
    name.textContent = product.name;
  }

  if (summary) {
    summary.textContent = product.summary;
  }

  if (image) {
    image.src = product.image;
    image.alt = product.fullName;
  }

  if (series) {
    series.textContent = getSeriesLabel(product);
  }

  if (chips) {
    chips.innerHTML = renderChips(product);
  }

  if (specs) {
    specs.innerHTML = renderSpecs(product);
  }

  if (descriptionCopy) {
    descriptionCopy.innerHTML = renderParagraphs(description.paragraphs);
  }

  setFigureImage(
    diagramWrap,
    diagramImage,
    description.diagramImage,
    `${product.fullName} tehnička skica`
  );
  setFigureImage(
    detailImageWrap,
    detailImage,
    description.detailImage,
    `${product.fullName} detalj panela`
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
    mainFeatures.innerHTML = renderParagraphs(details.mainFeatures);
  }

  if (accessories) {
    accessories.innerHTML = renderParagraphs(details.accessories);
  }

  if (packaging) {
    packaging.innerHTML = renderParagraphs(details.packaging);
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
