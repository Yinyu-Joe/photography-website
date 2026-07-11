window.portfolioData = {
  selectedPhotoIds: [
    "city-01",
    "abstract-12",
    "street-24",
    "landscape-02",
    "abstract-09",
    "city-09",
    "street-26",
    "abstract-05",
    "landscape-15",
    "city-03",
    "street-19",
    "abstract-03",
    "landscape-06",
    "street-08",
    "city-17",
    "abstract-07",
    "street-27",
    "landscape-12"
  ],
  series: [
    {
      id: "fragments",
      title: { zh: "片段", en: "Fragments" },
      description: {
        zh: "来自街道、表面、阴影与未完成瞬间的视觉片段。",
        en: "Small visual interruptions gathered from streets, surfaces, shadows, and unfinished moments."
      },
      coverPhotoId: "abstract-03",
      photoIds: ["abstract-03", "abstract-05", "abstract-07", "abstract-09", "abstract-12", "city-09", "street-20", "street-24"]
    },
    {
      id: "in-transit",
      title: { zh: "移动中", en: "In Transit" },
      description: {
        zh: "在出发与抵达之间，看见尚未变得熟悉的地方。",
        en: "Images made between departure and arrival, where places are seen before they become familiar."
      },
      coverPhotoId: "street-08",
      photoIds: ["street-01", "street-08", "street-21", "street-23", "street-27", "street-28", "street-29", "street-30", "city-01"]
    },
    {
      id: "human-distance",
      title: { zh: "人与距离", en: "Human Distance" },
      description: {
        zh: "人在距离、沉默、移动与空间中留下的形状。",
        en: "Portraits and figures shaped by distance, silence, movement, and the surrounding space."
      },
      coverPhotoId: "street-26",
      photoIds: ["city-01", "street-03", "street-08", "street-17", "street-18", "street-19", "street-26", "street-27", "street-28", "street-29"]
    },
    {
      id: "urban-quiet",
      title: { zh: "城市静默", en: "Urban Quiet" },
      description: {
        zh: "密集城市中的安静结构、流动光线与短暂停顿。",
        en: "Quiet structures, passing light, and the stillness hidden inside dense cities."
      },
      coverPhotoId: "city-09",
      photoIds: ["city-04", "city-05", "city-08", "city-09", "city-14", "city-16", "city-17", "street-01", "street-06", "street-07", "street-20", "street-23", "street-24"]
    },
    {
      id: "ordinary-landscapes",
      title: { zh: "日常景观", en: "Ordinary Landscapes" },
      description: {
        zh: "没有奇观的日常地点，在观看中变得稍微陌生。",
        en: "Everyday places observed without spectacle, where the ordinary becomes slightly unfamiliar."
      },
      coverPhotoId: "landscape-12",
      photoIds: ["landscape-04", "landscape-06", "landscape-08", "landscape-10", "landscape-11", "landscape-12", "landscape-13", "landscape-15", "street-09", "street-21", "street-25", "street-31", "abstract-12"]
    }
  ],
  indexFilters: [
    { id: "all", label: { zh: "全部作品", en: "All Works" } },
    {
      id: "people",
      label: { zh: "人物", en: "People" },
      photoIds: ["city-01", "abstract-07", "abstract-09", "landscape-12", "landscape-13", "landscape-15", "street-03", "street-08", "street-15", "street-17", "street-18", "street-19", "street-26", "street-27", "street-28", "street-29", "street-30"]
    },
    { id: "city", label: { zh: "城市", en: "City" }, categories: ["city"] },
    { id: "nature", label: { zh: "自然", en: "Nature" }, categories: ["landscape"] },
    { id: "street", label: { zh: "街头", en: "Street" }, categories: ["street"] },
    { id: "fragments", label: { zh: "片段", en: "Fragments" }, categories: ["abstract"] },
    {
      id: "black-and-white",
      label: { zh: "黑白", en: "Black & White" },
      photoIds: ["abstract-07", "abstract-10", "city-01", "city-09", "landscape-12", "landscape-15", "street-01", "street-06", "street-07", "street-08", "street-19", "street-20", "street-28", "street-29"]
    },
    {
      id: "color",
      label: { zh: "彩色", en: "Color" },
      excludePhotoIds: ["abstract-07", "abstract-10", "city-01", "city-09", "landscape-12", "landscape-15", "street-01", "street-06", "street-07", "street-08", "street-19", "street-20", "street-28", "street-29"]
    }
  ]
};
