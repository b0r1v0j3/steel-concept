(() => {
  const normalizeText = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const slugify = (value) =>
    normalizeText(value)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const getSeriesLabel = (type) => (type === "zidni" ? "Zidni panel" : "Krovni panel");
  const getDisplayTitle = (type) =>
    type === "zidni" ? "Zidni sendvič paneli" : "Krovni sendvič paneli";

  const products = [
    {
      name: "ISOFRIG LS",
      fullName: "ISOFRIG LS zidni sendvič paneli",
      type: "zidni",
      core: "PUR",
      fixation: "Frigo spoj",
      application: ["Rashladne komore"],
      summary: "PUR frigo panel za hladnjače i prostore sa kontrolisanom temperaturom.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isofrig-7016-horizontal-front-view-ro-v1QE9SF.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isogrig-sistem-panela"
    },
    {
      name: "ISOFRIG RF LS",
      fullName: "ISOFRIG RF LS zidni sendvič paneli",
      type: "zidni",
      core: "PIR",
      fixation: "Frigo spoj",
      application: ["Rashladne komore"],
      summary: "PIR varijanta frigo sistema za rashladne komore i hladne magacine.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isofrig-9007-horizontal-front-view-ro-v14RSP1.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/zidni-paneli-isofrig-rf"
    },
    {
      name: "ISOPERa LS",
      fullName: "ISOPERa LS termoizolacioni zidni paneli",
      type: "zidni",
      core: "PUR",
      fixation: "Skriveni spoj",
      application: ["Industrijski / trgovački"],
      summary: "Zidni panel sa skrivenim spojem za čist fasadni izgled i dobru zaptivenost.",
      image: "https://terasteel.blob.core.windows.net/cmsresources/ISOPERa-LS-2-7016GFCL6.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isopera-ls-zidni-panel"
    },
    {
      name: "ISOPERa MW LS",
      fullName: "ISOPERa MW LS zidni sendvič paneli",
      type: "zidni",
      core: "Mineralna vuna",
      fixation: "Skriveni spoj",
      application: ["Industrijski / trgovački"],
      summary: "Mineralna vuna i skriveni spoj za projekte sa višim protivpožarnim zahtevima.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/ISOPERa-MW-LS-2-701631CUA.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isoperamw-zidni-sendvic-paneli"
    },
    {
      name: "ISOPERa RF LS",
      fullName: "ISOPERa RF LS zidni sendvič paneli",
      type: "zidni",
      core: "PIR",
      fixation: "Skriveni spoj",
      application: ["Industrijski / trgovački"],
      summary: "PIR zidni panel sa skrivenim spojem za savremene industrijske fasade.",
      image: "https://terasteel.blob.core.windows.net/cmsresources/ISOPERa-LS-2-9007K2UZZ.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/zidni-paneli-isopera-rf"
    },
    {
      name: "ISOPERn LS",
      fullName: "ISOPERn LS termoizolacioni zidni paneli",
      type: "zidni",
      core: "PUR",
      fixation: "Vidljivi spoj",
      application: ["Industrijski / trgovački"],
      summary: "PUR zidni panel sa vidljivim spojem za racionalne industrijske objekte.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isopern-7016-horizontal-front-view-ro-v1PGD5E.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/zidni-paneli-isopern"
    },
    {
      name: "ISOPERn MW LS",
      fullName: "ISOPERn MW LS termoizolacioni zidni paneli",
      type: "zidni",
      core: "Mineralna vuna",
      fixation: "Vidljivi spoj",
      application: ["Industrijski / trgovački"],
      summary: "Zidni panel sa mineralnom vunom za dugotrajnost i protivpožarnu sigurnost.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/ISOPERn-MW-LS-2-7016BQQKM.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isopern-zidni-sendvic-paneli"
    },
    {
      name: "ISOPERn RF LS",
      fullName: "ISOPERn RF LS termoizolacioni zidni paneli",
      type: "zidni",
      core: "PIR",
      fixation: "Vidljivi spoj",
      application: ["Industrijski / trgovački"],
      summary: "PIR zidni panel sa vidljivim spojem za efikasnu i brzu izvedbu.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isopern-9007-horizontal-front-view-ro-v1MIA0W.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/zidni-paneli-isopern-rf"
    },
    {
      name: "ISOSANOa LS",
      fullName: "ISOSANOa LS termoizolacioni zidni paneli",
      type: "zidni",
      core: "PUR",
      fixation: "Skriveni spoj",
      application: ["Stroge higijenske primene"],
      summary: "PUR panel za higijenski osetljive prostore sa čistim završnim izgledom.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/ISOSANOa-LS-2-9007GDYUA.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isosanoa-zidni-paneli"
    },
    {
      name: "ISOSANOa RF LS",
      fullName: "ISOSANOa RF LS termoizolacioni zidni paneli",
      type: "zidni",
      core: "PIR",
      fixation: "Skriveni spoj",
      application: ["Stroge higijenske primene"],
      summary: "PIR higijenski panel za prostore sa povećanim bezbednosnim zahtevima.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/ISOSANOa-LS-1-90078BBAB.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isosanoa-rf-zidni-paneli"
    },
    {
      name: "ISOSANOn LS",
      fullName: "ISOSANOn LS termoizolacioni zidni paneli",
      type: "zidni",
      core: "PUR",
      fixation: "Vidljivi spoj",
      application: ["Stroge higijenske primene"],
      summary: "PUR sistem sa zaštitnim oblogama za enterijere koji traže lakše održavanje.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isosanon-9010-horizontal-front-view-ro-v16KXDD.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isosanon-zidni-paneli"
    },
    {
      name: "ISOSANOn RF LS",
      fullName: "ISOSANOn RF LS termoizolacioni zidni paneli",
      type: "zidni",
      core: "PIR",
      fixation: "Vidljivi spoj",
      application: ["Stroge higijenske primene"],
      summary: "PIR higijenski panel za enterijere sa strožim tehničkim zahtevima.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isosanon-9010-horizontal-right-view-ro-v1ED22B.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isosanon-rf-zidni-paneli"
    },
    {
      name: "ISOAC5 LS",
      fullName: "Termoizolacioni krovni paneli ISOAC5 LS",
      type: "krovni",
      core: "PUR",
      fixation: "Vidljivi spoj",
      application: ["Industrijski / trgovački"],
      summary: "Krovni panel sa pet rebara i PUR jezgrom za industrijske i komercijalne krovove.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isoac5-7016-horizontal-front-view-ro-v102ZDS.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isoac5rs-krovni-sendvic-paneli"
    },
    {
      name: "ISOAC5 MW LS",
      fullName: "Termoizolacioni krovni paneli ISOAC5 MW LS",
      type: "krovni",
      core: "Mineralna vuna",
      fixation: "Vidljivi spoj",
      application: ["Industrijski / trgovački"],
      summary: "Krovni panel sa mineralnom vunom za projekte sa većim protivpožarnim zahtevima.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/ISOAC5-MW-LS-2-70161ZV6Y.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/krovni-paneli-isoac5-mw"
    },
    {
      name: "ISOAC5 RF LS",
      fullName: "Termoizolacioni krovni paneli ISOAC5 RF LS",
      type: "krovni",
      core: "PIR",
      fixation: "Vidljivi spoj",
      application: ["Industrijski / trgovački"],
      summary: "PIR krovni panel sa pet rebara za dugotrajna i termoefikasna rešenja.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isoac5-9007-horizontal-front-view-ro-v1OWQDD.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/krovni-paneli-isoac5-rf"
    },
    {
      name: "ISOSANO5 LS",
      fullName: "Termoizolacioni krovni paneli ISOSANO5 LS",
      type: "krovni",
      core: "PUR",
      fixation: "Vidljivi spoj",
      application: ["Stroge higijenske primene"],
      summary: "PUR krovni panel za objekte koji traže higijenski prilagođene završne obloge.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isosano5-9010-7016-horizontal-up-front-view-ro-v1CRP0M.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isosano-5-krovni-paneli"
    },
    {
      name: "ISOSANO5 RF LS",
      fullName: "Termoizolacioni krovni paneli ISOSANO5 RF LS",
      type: "krovni",
      core: "PIR",
      fixation: "Vidljivi spoj",
      application: ["Stroge higijenske primene"],
      summary: "PIR krovni sistem za higijenski zahtevne krovne primene.",
      image:
        "https://terasteel.blob.core.windows.net/cmsresources/terasteel-render-isosano5-9010-7016-horizontal-up-front-view-ro-v1GX5QZ.jpg",
      sourceUrl: "https://terasteel.rs/proizvoda/isosano-5-rf-krovni-paneli"
    }
  ].map((product) => {
    const slug = slugify(product.name);

    return {
      ...product,
      displayName: getSeriesLabel(product.type),
      displayFullName: getDisplayTitle(product.type),
      slug,
      pageHref: `proizvod.html?slug=${encodeURIComponent(slug)}`
    };
  });

  window.STEEL_CONCEPT_PRODUCTS = products;
  window.STEEL_CONCEPT_PRODUCT_MAP = Object.fromEntries(
    products.map((product) => [product.slug, product])
  );
})();
