// 委托拍摄（/commissions）：给客户看的人像与商业案例。
// 在主导航的“委托”下，页面顶部用“概览 / 人像 / 商业”标签切换。
// 改完后运行 npm run build。

export const commissions = {
  // false：搜索引擎不收录这些页面，也不进 sitemap，只有从网站里点进来或拿到链接的人能看到。
  // 客户的人像照片因此不会出现在图片搜索里。想被搜到时改成 true。
  searchVisible: false,

  base: { zh: "常驻马德里", en: "Based in Madrid" },

  landing: {
    title: { zh: "委托拍摄", en: "Commissions" },
    lead: {
      zh: "我常驻马德里，接人像和商业拍摄。拍别人委托的照片，我用的还是拍自己作品时的办法：先找光，找地方，再等人自在下来。",
      en: "I'm based in Madrid and take on portrait and commercial work. Commissioned or not, I work the same way: find the light, find the place, then wait for the person to settle into it."
    },
    // 首屏右侧的照片，填 cases 里某一张的 id（见下方 frames 的写法）。
    cover: "boston-2025-01",
    portraitsLine: {
      zh: "个人、情侣和朋友，在城市里边走边拍。",
      en: "Individuals, couples and friends, photographed on foot around the city."
    },
    commercialLine: {
      zh: "品牌形象、企业形象、产品与广告。按项目报价，使用授权单独写明。",
      en: "Brand and company imagery, products and advertising. Quoted per project, with usage licensed in writing."
    },
    // 首页“个人作品”一栏显示的三张档案照片（photo-manifest.js 里的 id）。
    archivePhotoIds: ["city-09", "street-26", "landscape-15"]
  },

  portraits: {
    intro: {
      zh: "城市感、电影感、纪实感的人像，在街上、在自然光里拍。",
      en: "Portraits with a city, cinematic, documentary feel, made on the street in natural light."
    },
    meta: {
      zh: "常驻马德里 · 在中国、美国、墨西哥都拍过人像",
      en: "Based in Madrid · Portraits made in China, the US and Mexico"
    },
    cover: "boston-2024-01",
    coverPlace: { zh: "波士顿", en: "Boston" },
    coverYear: "2024",
    process: [
      {
        title: { zh: "拍摄之前", en: "Before the shoot" },
        text: {
          zh: "先聊好想要的风格、衣服和地点，我按你的时间排好路线。",
          en: "We agree on the style, outfits and locations, and I plan a route around your time."
        }
      },
      {
        title: { zh: "拍摄当天", en: "On the day" },
        text: {
          zh: "我会帮你摆动作、调表情，也会抓你聊天、走路时的样子。不习惯面对镜头也没关系。",
          en: "I'll guide poses and expressions, and catch you talking and walking in between. It's fine if you're not used to cameras."
        }
      },
      {
        title: { zh: "后期与交付", en: "Editing and delivery" },
        text: {
          zh: "24 小时内交付筛选后的底片，选片后 72 小时内交付精修。",
          en: "Selected proofs within 24 hours; final retouched images within 72 hours of your picks."
        }
      }
    ]
  },

  commercial: {
    intro: {
      zh: "品牌形象、企业形象、产品与广告拍摄。我习惯在真实的地方、用现场的光来拍。",
      en: "Brand and company imagery, products and advertising. I prefer real locations and the light that's already there."
    },
    // 合作流程。draft: true 的步骤是占位，写好后删掉 draft 那一行。
    process: [
      {
        draft: true,
        title: { zh: "沟通需求", en: "The brief" },
        text: { zh: "待补充：项目怎么开始，需要客户先提供什么。", en: "To write: how a project starts and what you need from the client." }
      },
      {
        draft: true,
        title: { zh: "方案与报价", en: "Plan and quote" },
        text: { zh: "待补充：方案包含什么，报价和付款怎么安排。", en: "To write: what the plan covers, and how quotes and payment work." }
      },
      {
        draft: true,
        title: { zh: "拍摄", en: "The shoot" },
        text: { zh: "待补充：拍摄当天怎么安排。", en: "To write: how the shoot day runs." }
      },
      {
        draft: true,
        title: { zh: "后期与交付", en: "Editing and delivery" },
        text: { zh: "待补充：交付时间、格式和可以修改几次。", en: "To write: delivery times, formats and rounds of changes." }
      }
    ],
    // 商业页“个人作品”里展示的系列（portfolio-data.js 里的 series id）。
    archiveSeriesIds: ["urban-quiet", "human-distance", "ordinary-landscapes"],
    archiveNote: {
      zh: "摄影档案里的几个系列，可以看出我平时怎么拍。",
      en: "A few series from the archive, which show how I usually see."
    },
    terms: {
      zh: [
        "报价按拍摄内容和使用范围来定。先告诉我照片会用在哪里、用多久，我再给方案和报价。",
        "人像约拍的照片默认只用于个人用途；用于品牌、产品、企业形象或广告时，按商业项目另行报价。"
      ],
      en: [
        "Quotes depend on what we shoot and how the images will be used. Tell me where they'll appear and for how long, and I'll come back with a plan and a price.",
        "Portrait sessions are licensed for personal use. Use for a brand, product, company or advertising is quoted as a commercial project."
      ]
    }
  },

  contact: {
    prompt: {
      zh: "说说你想拍什么、在哪里、大概什么时间。",
      en: "Tell me what you'd like to shoot, where, and roughly when."
    },
    mailSubject: { zh: "委托拍摄咨询", en: "Commission enquiry" }
  }
};

// 每个案例一段，每段有自己的页面：人像在 /commissions/portraits/<id>，商业在 /commissions/commercial/<id>。
// 人像页和商业页按这里的顺序列出案例，每个显示前三张照片。
//
// id        页面地址的最后一段，只用小写字母、数字和连字符。
// kind      "portrait"（人像）或 "commercial"（商业）。
// title     项目名。人像通常不写，直接用地点当标题。
// place     地点；year 年份，不确定就写 null。两者会显示在案例页左侧的信息栏里。
// summary   可选，一句话说明。显示在列表和案例页标题下面，也用作链接预览的描述。
// facts     可选，信息栏里的其他条目，例如客户、内容、用途、交付。
// body      可选，正文段落，显示在照片上方。
// frames    按显示顺序写文件名，文件放在 assets/commissions/，宽高构建时自动读取。
//           每张照片的 id 是文件名去掉 .jpg，例如 "boston-2025-01"。
//
// draft: true 是示例：没有照片时显示灰色占位框，并带“示例”标记，用来先看框架。
// 换成真实内容后删掉 draft 那一行。只要页面上还有示例，npm run validate 就不会通过，所以不会被误发布。
export const commissionCases = [
  {
    id: "boston-2025",
    kind: "portrait",
    place: { zh: "波士顿", en: "Boston" },
    year: "2025",
    frames: [
      "boston-2025-01.jpg",
      "boston-2025-02.jpg",
      "boston-2025-03.jpg",
      "boston-2025-04.jpg",
      "boston-2025-05.jpg",
      "boston-2025-06.jpg",
      "boston-2025-07.jpg",
      "boston-2025-08.jpg"
    ]
  },
  {
    id: "mexico-city",
    kind: "portrait",
    place: { zh: "墨西哥城", en: "Mexico City" },
    year: null,
    frames: [
      "mexico-city-01.jpg",
      "mexico-city-02.jpg",
      "mexico-city-03.jpg",
      "mexico-city-04.jpg",
      "mexico-city-05.jpg",
      "mexico-city-06.jpg",
      "mexico-city-07.jpg",
      "mexico-city-08.jpg"
    ]
  },
  {
    id: "nanjing-2023",
    kind: "portrait",
    place: { zh: "南京", en: "Nanjing" },
    year: "2023",
    frames: [
      "nanjing-2023-01.jpg",
      "nanjing-2023-02.jpg",
      "nanjing-2023-03.jpg",
      "nanjing-2023-04.jpg"
    ]
  },
  {
    id: "commercial-example-1",
    kind: "commercial",
    draft: true,
    title: { zh: "项目名称", en: "Project name" },
    place: { zh: "城市", en: "City" },
    year: null,
    summary: { zh: "一句话说明这个项目。", en: "One line about the project." },
    facts: [
      { label: { zh: "客户", en: "Client" }, value: { zh: "客户或品牌名", en: "Client or brand" } },
      { label: { zh: "内容", en: "Scope" }, value: { zh: "拍了什么", en: "What was photographed" } },
      { label: { zh: "用途", en: "Usage" }, value: { zh: "照片用在哪里", en: "Where the images run" } },
      { label: { zh: "交付", en: "Delivered" }, value: { zh: "张数与规格", en: "Number and format of images" } }
    ],
    body: {
      zh: ["背景：客户想要什么。", "拍法：在哪里拍，怎么用光，现场怎么安排。", "结果：照片用在了哪里。"],
      en: ["Brief: what the client wanted.", "Approach: where it was shot, the light, how the day ran.", "Result: where the images were used."]
    },
    placeholders: 6
  },
  {
    id: "commercial-example-2",
    kind: "commercial",
    draft: true,
    title: { zh: "项目名称", en: "Project name" },
    place: { zh: "城市", en: "City" },
    year: null,
    summary: { zh: "一句话说明这个项目。", en: "One line about the project." },
    facts: [
      { label: { zh: "客户", en: "Client" }, value: { zh: "客户或品牌名", en: "Client or brand" } },
      { label: { zh: "用途", en: "Usage" }, value: { zh: "照片用在哪里", en: "Where the images run" } }
    ],
    placeholders: 4
  }
];

// 不属于任何案例、只作封面的照片。
export const commissionExtraFrames = ["boston-2024-01.jpg"];
