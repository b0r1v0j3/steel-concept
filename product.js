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
const pageCanonical = document.querySelector("[data-page-canonical]");
const pageOgUrl = document.querySelector("[data-page-og-url]");
const pageOgTitle = document.querySelector("[data-page-og-title]");
const pageOgDescription = document.querySelector("[data-page-og-description]");
const pageOgImage = document.querySelector("[data-page-og-image]");
const pageOgImageAlt = document.querySelector("[data-page-og-image-alt]");
const pageTwitterTitle = document.querySelector("[data-page-twitter-title]");
const pageTwitterDescription = document.querySelector("[data-page-twitter-description]");
const pageTwitterImage = document.querySelector("[data-page-twitter-image]");
const pageTwitterImageAlt = document.querySelector("[data-page-twitter-image-alt]");
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
    .map((entry) => sanitizeProductCopy(entry, item))
    .filter(Boolean)
    .map((entry) => `<p>${escapeHtml(entry)}</p>`)
    .join("");

const toAbsoluteUrl = (value) => {
  if (!value) {
    return "";
  }

  try {
    return new URL(value, window.location.href).href;
  } catch {
    return value;
  }
};

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

const copyToClipboard = async (value) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = value;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.append(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
};

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

const setPageMeta = (item) => {
  const title = `${getDisplayTitle(item)} | Steel Concept`;
  const descriptionText = `${getDisplayTitle(item)}. ${item.summary}`;
  const pageUrl = window.location.href;
  const imageUrl = toAbsoluteUrl(item.image);
  const imageAlt = getDisplayTitle(item);

  document.title = title;

  pageDescription?.setAttribute("content", descriptionText);
  pageCanonical?.setAttribute("href", pageUrl);
  pageOgUrl?.setAttribute("content", pageUrl);
  pageOgTitle?.setAttribute("content", title);
  pageOgDescription?.setAttribute("content", descriptionText);
  pageOgImage?.setAttribute("content", imageUrl);
  pageOgImageAlt?.setAttribute("content", imageAlt);
  pageTwitterTitle?.setAttribute("content", title);
  pageTwitterDescription?.setAttribute("content", descriptionText);
  pageTwitterImage?.setAttribute("content", imageUrl);
  pageTwitterImageAlt?.setAttribute("content", imageAlt);
};

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
  const shareButtons = Array.from(document.querySelectorAll("[data-share-button]"));
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

  setPageMeta(product);

  if (name) {
    name.textContent = getDisplayTitle(product);
  }

  if (summary) {
    summary.textContent = product.summary;
  }

  const shareFeedbackTimeouts = new WeakMap();
  const setShareFeedback = (message, feedbackNode) => {
    if (!feedbackNode) {
      return;
    }

    window.clearTimeout(shareFeedbackTimeouts.get(feedbackNode));
    feedbackNode.textContent = message;

    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      feedbackNode.textContent = "";
    }, 2200);

    shareFeedbackTimeouts.set(feedbackNode, timeoutId);
  };

  shareButtons.forEach((shareButton) => {
    shareButton.addEventListener("click", async () => {
      const shareFeedback = shareButton.parentElement?.querySelector("[data-share-feedback]");
      const shareData = {
        title: getDisplayTitle(product),
        text: product.summary,
        url: window.location.href
      };

      try {
        if (typeof navigator.share === "function") {
          await navigator.share(shareData);
          setShareFeedback("Link podeljen", shareFeedback);
          return;
        }

        await copyToClipboard(shareData.url);
        setShareFeedback("Link kopiran", shareFeedback);
      } catch (error) {
        if (error?.name === "AbortError") {
          setShareFeedback("", shareFeedback);
          return;
        }

        try {
          await copyToClipboard(shareData.url);
          setShareFeedback("Link kopiran", shareFeedback);
        } catch {
          setShareFeedback("Deljenje nije uspelo", shareFeedback);
        }
      }
    });
  });

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
