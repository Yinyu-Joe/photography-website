export const site = {
  origin: "https://yinyuzhu.com",
  author: {
    name: { zh: "朱垠宇", en: "Yinyu Zhu" },
    displayName: "Yinyu Zhu",
    email: "yinyu.zhu@outlook.com",
    wechat: "ZyyZyyyy6",
    socials: [
      { id: "xiaohongshu", label: "Xiaohongshu", href: "https://xhslink.com/m/3zQMnKDmRw6", icon: "/assets/icons/xiaohongshu.svg" },
      { id: "douyin", label: "Douyin", href: "https://v.douyin.com/dit1bf5wQF0/", icon: "/assets/icons/tiktok.svg" },
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/yinyuzhu_11?igsh=MjBhbTZ4NnN6bmZl", icon: "/assets/icons/instagram.svg" },
      { id: "x", label: "X", href: "https://x.com/YinyuZhu83", icon: "/assets/icons/x.svg" }
    ]
  },
  home: {
    zh: {
      eyebrow: "摄影档案",
      // <wbr> 标出标题可以换行的位置，其他地方不会把词拆开。
      title: "光、距离，<wbr>以及记忆里<wbr>安静的地理。",
      intro: "朱垠宇的旅行、城市与日常摄影。这里收录我在不同地域移动、停留与观看时留下的片段。"
    },
    en: {
      eyebrow: "PHOTOGRAPHY ARCHIVE",
      title: "Light, distance, and the quiet geography of memory.",
      intro: "Travel, city, and everyday photography by Yinyu Zhu, gathered from moments of movement, pause, and observation across different places."
    }
  },
  about: {
    zh: [
      "我是朱垠宇（Yinyu Zhu），一名以旅行、人像、城市与日常景观为主要方向的摄影创作者。我的作品关注人在不同地域中的移动、停留与观看，并试图记录那些介于陌生与熟悉之间的瞬间。",
      "这个网站收录了我在不同国家和城市拍摄的作品，并通过地图与系列项目的方式整理这些影像。相比单纯展示目的地，我更关心照片如何保存一种具体的经验：当我经过那里时，世界曾经以这样的方式出现。"
    ],
    en: [
      "I am Yinyu Zhu (朱垠宇), a photographer working across travel, portraits, cities, and everyday landscapes. My work focuses on movement, place, and the quiet moments that appear between the unfamiliar and the familiar.",
      "This website brings together photographs made across different countries and cities, organized through series and a map-based archive."
    ]
  },
  rights: {
    zh: [
      "© Yinyu Zhu。本网站所有内容，作者保留全部权利。",
      "欢迎个人在非商业场景下保存图片，用作个人欣赏或设备壁纸。此类使用不包括重新上传、公开发布、转载、印刷、销售、改编、二次创作或任何商业用途。",
      "任何形式的图片转载皆需经过作者许可。未得许可，不得将本网站图片完整上传至 Instagram、小红书、微博或其他公共平台。",
      "欢迎分享本网站的原始页面链接。引用图片时，请注明作者、作者社交平台账号、作品来源及原始链接，且不得裁切、去除水印、修改色彩或误导性使用。",
      "禁止将本网站任何图片、文字、元数据或其衍生内容用于 AI、机器学习、计算机视觉、图像生成模型、数据集构建、模型训练、微调、评估、嵌入、特征提取或类似用途。",
      "搜索引擎可根据本站 robots.txt 设置索引和展示本网站页面及图片预览，但这不代表第三方获得复制、转载、下载、训练或商业使用授权。"
    ],
    en: [
      "© Yinyu Zhu. All content on this website is protected by copyright. All rights are reserved by the author.",
      "You are welcome to save images for personal, non-commercial use, such as private viewing or using them as wallpapers on your personal devices. This permission does not include re-uploading, public posting, reposting, printing, selling, modifying, creating derivative works, or any commercial use.",
      "Any form of image reposting requires prior permission from the author. Without permission, you may not upload any full image from this website to Instagram, Rednote, Weibo or any other public platform.",
      "You are welcome to share the original page links from this website. If you quote or reference images, please credit the author, include the author’s relevant social media account, state the source of the work, and provide the original link. Preview images may not be cropped, have watermarks removed, have their colors altered, or be used in any misleading way.",
      "The use of any images, text, metadata, or derivative content from this website for AI, machine learning, computer vision, image generation models, dataset creation, model training, fine-tuning, evaluation, embedding, feature extraction, or any similar purpose is strictly prohibited.",
      "Search engines may index and display pages and image previews from this website according to this site’s robots.txt settings. This does not grant any third party permission to copy, repost, download, train on, or commercially use any content from this website."
    ]
  }
};

export const stories = [
  {
    id: "story-20260130-7c200963",
    slug: "20260130-7c200963",
    title: {
      zh: "三十秒",
      en: "Thirty Seconds"
    },
    // 标题只在这些词组之间换行，拼起来要和中文标题完全一致。
    // body 是段落数组；excerpt 是故事列表里显示的一句话，也用作页面描述；location 和 date 显示在照片下方，没有就留 null。
    titlePhrases: ["三十秒"],
    location: { zh: "危地马拉", en: "Guatemala" },
    date: "2026",
    coverPhoto: "/assets/story/20260130-7C200963.jpg",
    width: 1425,
    height: 2400,
    alt: { zh: "夜空与喷发火山的红色熔岩", en: "Red lava erupting beneath a star-filled night sky" },
    body: {
      zh: [
        "这座山叫 Fuego，西班牙语里就是“火”。名字起得这样直，好像它从来没打算做别的。",
        "快门开了三十秒。照片里那团火像只开了一瞬，其实是这半分钟里飞出去、又落回山上的全部，一层叠一层，叠成了一朵花。同样这半分钟，星星只挪了一点点。山在烧，天在头顶慢慢地转。",
        "快十点了，天还蓝成这样。那晚的月亮再过两三天就圆，它不在画面里，可这片蓝、山坡上那层薄薄的光，都是它给的。山下很远的地方，还亮着一小撮灯。"
      ],
      en: [
        "The mountain is called Fuego, which is simply Spanish for fire. A name that plain, as if it never meant to be anything else.",
        "The shutter stayed open for thirty seconds. What looks like a single bloom of fire is the whole half minute: everything that flew out and fell back onto the slope, layered until it opened like a flower. In the same half minute, the stars barely moved. The mountain burned, and the sky turned slowly overhead.",
        "It was nearly ten, and the sky was still this blue. The moon was two or three days from full. It isn't in the frame, but the blue is its doing, and so is the thin light along the slope. Far below, a small scatter of lights was still on."
      ]
    },
    excerpt: {
      zh: "快门开了三十秒。飞出去又落回来的火，一层叠一层，叠成了一朵花。",
      en: "The shutter stayed open for thirty seconds, and the fire that flew out and fell back layered itself into a flower."
    }
  },
  {
    id: "story-20260129-7c200452",
    slug: "20260129-7c200452",
    title: {
      zh: "合影",
      en: "Group Photo"
    },
    titlePhrases: ["合影"],
    location: { zh: "危地马拉", en: "Guatemala" },
    date: "2026",
    coverPhoto: "/assets/story/20260129-7C200452.jpg",
    width: 1600,
    height: 2400,
    alt: { zh: "阳光下山坡墓地里的彩色十字架", en: "Colorful crosses in a hillside cemetery under sunlight" },
    body: {
      zh: [
        "十字架是水泥浇的，字是人蘸着漆，一笔一笔写上去的。竖杠上排着三个字母：E、P、D。En Paz Descanse，愿你安息。横臂上写名字和日子，写到头了，年份就挪到竖杠底下，2017，2020，像一句话说到一半，换了一行接着说。",
        "有的坟前插着塑料瓶，瓶里的花早就干了，还插得好好的。",
        "中午十二点多，太阳直直地照下来。长焦把整面山坡压扁，蓝的、粉的、绿的挤在一起，一个挨着一个，像一大家子人好不容易聚齐了，站在坡上，等着拍一张合影。"
      ],
      en: [
        "The crosses are poured cement, and the letters were painted on by hand, stroke by stroke. Down the upright run three letters: E, P, D. En Paz Descanse, rest in peace. The name and the date go across the arms, and when the arms run out, the year drops to the stem below. 2017. 2020. Like a sentence that ran out of room and carried on to the next line.",
        "Some graves have a plastic bottle for a vase. The flowers in them dried long ago, and they are still standing.",
        "Just past noon, the sun came straight down. A long lens pressed the whole hillside flat, and the blues and pinks and greens crowded in, shoulder to shoulder, like a big family finally all together on the slope, waiting for someone to take the picture."
      ]
    },
    excerpt: {
      zh: "名字写满了横臂，年份就挪到竖杠底下，像一句话说到一半，换了一行接着说。",
      en: "When the name fills the arms of the cross, the year moves down the stem, like a sentence carried on to the next line."
    }
  },
  {
    id: "story-20260210-7c200360",
    slug: "20260210-7c200360",
    title: {
      zh: "锈走得比它远",
      en: "The Rust Went Further"
    },
    titlePhrases: ["锈走得", "比它远"],
    location: { zh: "哈瓦那", en: "Havana" },
    date: "2026",
    coverPhoto: "/assets/story/20260210-7C200360.jpg",
    width: 1425,
    height: 2400,
    alt: { zh: "城市广场中的大型锈蚀雕塑与行人", en: "A large rusted sculpture and people in a city square" },
    body: {
      zh: [
        "铁人弯着腰，背上压着一个比它还宽的大家伙，头低得快要碰到胸口。不知道它已经背了多久。",
        "后面的水泥台上种着仙人掌，有个人也弯着腰，不知在看地上的什么。穿红衣服的老人坐在台沿，低着头，一只手拿着手机，一只手去够脚上的拖鞋。三个都弯着腰，谁也没有抬头看谁。",
        "太阳已经低了，影子拖得很长。铁人脚下那片地被锈染成了橘红，雨水把锈一点点带出去。它自己一步也没挪过，锈倒是替它走出去好远。"
      ],
      en: [
        "The iron figure bends under a load wider than itself, its head sunk almost to its chest. There's no telling how long it has been carrying it.",
        "On the concrete planter behind it, among the cacti, someone else is bent over, looking at something on the ground. The old person in red sits on the ledge, head down, a phone in one hand, the other reaching for a sandal. All three of them are bent, and none of them looks up at the others.",
        "The sun was low by then, the shadows long. The ground around the iron feet has turned a deep orange, the rust carried a little further out with every rain. The figure has never taken a step. Its rust has walked a long way on its behalf."
      ]
    },
    excerpt: {
      zh: "三个都弯着腰，谁也没有抬头看谁。",
      en: "All three of them are bent, and none of them looks up at the others."
    }
  },
  {
    id: "story-20250525-7c20284",
    slug: "20250525-7c20284",
    title: {
      zh: "远远地",
      en: "From a Distance"
    },
    titlePhrases: ["远远地"],
    location: { zh: "腾冲", en: "Tengchong" },
    date: "2025",
    coverPhoto: "/assets/story/20250525-_7C20284.jpg",
    width: 1800,
    height: 2400,
    alt: { zh: "石墙前垃圾桶里的纸杯、瓶子和纸袋", en: "A paper cup, bottle, and bag in a bin beside a stone wall" },
    body: {
      zh: [
        "这张是 200mm 拍的。一个垃圾桶，我站得远远的，像在拍一只怕人的鸟，好像再走近一步，它就会飞走。",
        "橙色的麦咖啡杯，盖子还好好地盖着。旁边是喝空的饮料瓶，一只白纸袋，袋口剪成细细的锯齿，提手是拧成绳的纸。红塑料袋翻在桶沿上，一圈一圈地起褶，像谁替它们铺好的一块红绸。桶身上还绕着一圈凸起的花纹，弯弯曲曲，绣花似的。不知道是谁，在一只垃圾桶上花了这样的心思。",
        "背后是腾冲的石墙，火山石砌的，满是气孔。很久很久以前，它也红过，也烫过。"
      ],
      en: [
        "I shot this at 200mm. It's a trash can, and I kept my distance, the way you would with a bird that scares easily, as if one step closer and it would be gone.",
        "An orange McCafé cup, the lid still neatly on. Beside it an empty bottle and a white paper bag, its edge cut in a fine zigzag, its handles twisted from paper. The red liner folds over the rim in pleat after pleat, like a length of red silk someone laid out for them. Around the can runs a raised pattern, looping and curling, almost like embroidery. Someone took that much care over a trash can.",
        "The wall behind is Tengchong stone, volcanic, riddled with air holes. Long, long ago it was red too, and hot."
      ]
    },
    excerpt: {
      zh: "一个垃圾桶，我站得远远的，像在拍一只怕人的鸟。",
      en: "It's a trash can, and I kept my distance, the way you would with a bird that scares easily."
    }
  },
  {
    id: "story-20250806-7c20019",
    slug: "20250806-7c20019",
    title: {
      zh: "海岸线",
      en: "Coastline"
    },
    titlePhrases: ["海岸线"],
    location: { zh: null, en: null },
    date: "2025",
    coverPhoto: "/assets/story/20250806-_7C20019.jpg",
    width: 1800,
    height: 2400,
    alt: { zh: "黑白画面中破裂表面的裂痕与反光", en: "Cracks and reflections across a fractured surface in black and white" },
    body: {
      zh: [
        "光圈开到 1.4，清楚的只有中间窄窄的一带。再往前，再往后，都慢慢化开了，后面的砖墙只剩一点影子。",
        "表面那层皮裂开了，边缘一点点卷起来。底下露出来的部分还是黑的，亮的，还映着一点光。",
        "看久了，像坐夜航的飞机往下望：一道海岸线，一个河口，几座叫不出名字的小岛。",
        "这个网站有一张地图，标着我拍过照片的地方。这条海岸线，不在上面。"
      ],
      en: [
        "At f/1.4, only a narrow band is sharp. Further in, further out, everything slowly dissolves, until the brick wall behind is little more than a shadow.",
        "The skin of the surface has cracked, its edges curling up bit by bit. What shows underneath is still black, still glossy, holding a little light.",
        "Look long enough and it becomes the view from a night flight: a coastline, a river mouth, a few islands you can't name.",
        "This site has a map of the places I've photographed. This coastline isn't on it."
      ]
    },
    excerpt: {
      zh: "看久了，像坐夜航的飞机往下望：一道海岸线，一个河口，几座叫不出名字的小岛。",
      en: "Look long enough and it becomes the view from a night flight: a coastline, a river mouth, a few islands you can't name."
    }
  }
].map((story, index) => ({
  ...story,
  archiveNumber: String(index + 1).padStart(2, "0"),
  photoIds: []
}));
