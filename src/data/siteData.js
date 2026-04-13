export const sections = [
  { id: 'about', label: '个人简介' },
  { id: 'tech-stack', label: '技术栈' },
  { id: 'experience', label: '履历' },
  { id: 'portfolio', label: '作品陈列' },
  { id: 'resume', label: '简历PDF' },
  { id: 'contact', label: '联系方式' }
];

export const profile = {
  name: '姚梓杰',
  role: '求职方向：关卡美术 / 环境美术',
  intro:
    '专注于建模与环境美术、关卡美术的综合实践。具备1年相关工作经验，擅长场景搭建、植物资源制作、模型制作与灯光氛围塑造，持续以严谨流程与审美判断提升画面品质。',
  avatar: '/images/avatar.png',
  tags: ['建模', '地编', '植物资产', '场景搭建', '灯光氛围', '流程协作', '审美判断']
};

export const techStack = [
  { name: '3ds Max', accent: 'cyan', abbr: 'Max' },
  { name: 'Blender', accent: 'orange', abbr: 'BL' },
  { name: 'Substance Painter', accent: 'emerald', abbr: 'SP' },
  { name: 'Substance Designer', accent: 'blue', abbr: 'SD' },
  { name: 'Substance Sampler', accent: 'rose', abbr: 'Sa' },
  { name: 'ZBrush', accent: 'violet', abbr: 'ZB' },
  { name: 'SpeedTree', accent: 'lime', abbr: 'ST' },
  { name: 'Gaea', accent: 'slate', abbr: 'GA' },
  { name: 'Unreal', accent: 'cyan', abbr: 'UE' }
];

export const timelineData = [
  {
    company: '深圳市飞渡科技有限公司',
    position: '地编 | 美术部',
    period: '2025/07/01 - 2026/04/08',
    type: 'work',
    description:
      '负责城市、园区、工厂等场景搭建与植物、材质资产制作，熟练运用 GIS 完成底图制作与 SHP 数据获取；参与上海量子城市、复兴岛智能体等标杆项目，负责核心场景搭建与灯光氛围调整，并参与阿布扎比 ITC 交通项目植被资产制作与场景整合，积累跨国项目协作经验。',
    isLatest: true
  },
  {
    company: '深圳市飞渡科技有限公司',
    position: '地编 | 美术部',
    period: '2025/04/08 - 2025/07/01',
    type: 'internship',
    description:
      '统筹美术资源整合与场景搭建，独立完成材质、植被 LOD 优化、蓝图编写及灯光氛围布置，具备全流程场景构建能力；参与贵州贵阳大科城展示项目，将美术资源转化为高质量展示内容，累计输出 5 个公司美术视频案例，提升成果展示效果与传播力。'
  },
  {
    company: '深圳市创梦天地科技有限公司',
    position: '游戏模型师 | 地铁跑酷项目组C1工作室',
    period: '2024/12/11 - 2025/02/21',
    type: 'internship',
    description:
      '独立负责项目核心资产与场景制作，累计完成 32 件模型及 1 个古巴比伦风格场景；参与 3 次大型版本迭代，通过快速优化模型细节，确保美术资源与玩法需求高度匹配，保障项目资源稳定供给与视觉体验。'
  }
];

export const portfolioItems = [
  {
    type: 'image',
    src: '/assets/works/Gun/Pic_AR_01.png',
    thumbnail: '/assets/works/Gun/Pic_AR_01.png',
    title: '硬表面枪械',
    description: '硬表面模型制作'
  },
  {
    type: 'image',
    src: '/assets/works/Gun/Pic_AR_02.png',
    thumbnail: '/assets/works/Gun/Pic_AR_02.png',
    title: '硬表面枪械',
    description: '硬表面模型制作'
  },
  {
    type: 'marmoset',
    src: '/assets/models/MVS_AR.mview',
    thumbnail: '/assets/works/Gun/Pic_AR_03.png',
    title: '硬表面枪械',
    description: 'Marmoset Viewer 渲染展示'
  },
  {
    type: 'video',
    src: '/assets/works/Gun/Seq_Weapon_Main_web.mp4',
    thumbnail: '/assets/works/Gun/Pic_AR_04.png',
    title: '硬表面枪械',
    description: '硬表面枪械动画展示'
  },
  {
    type: 'image',
    src: '/assets/works/ForestEnviroment/Pic_FoliageAssests_01.png',
    thumbnail: '/assets/works/ForestEnviroment/Pic_FoliageAssests_01.png',
    title: '植物资产',
    description: 'ST植物资产制作'
  },
  {
    type: 'image',
    src: '/assets/works/ForestEnviroment/Pic_FoliageAssests_02.png',
    thumbnail: '/assets/works/ForestEnviroment/Pic_FoliageAssests_02.png',
    title: '植物资产',
    description: 'ST植物资产制作'
  },
  {
    type: 'image',
    src: '/assets/works/ForestEnviroment/Pic_FoliageAssests_03.png',
    thumbnail: '/assets/works/ForestEnviroment/Pic_FoliageAssests_03.png',
    title: '植物资产',
    description: 'ST植物资产制作'
  },
  {
    type: 'image',
    src: '/assets/works/ForestEnviroment/Pic_FoliageAssests_04.png',
    thumbnail: '/assets/works/ForestEnviroment/Pic_FoliageAssests_04.png',
    title: '植物资产',
    description: 'ST植物资产制作'
  },
  {
    type: 'image',
    src: '/assets/works/ForestEnviroment/Pic_ForestEnviroment_01.png',
    thumbnail: '/assets/works/ForestEnviroment/Pic_ForestEnviroment_01.png',
    title: '森林环境',
    description: '全流程森林场景构建'
  },
  {
    type: 'image',
    src: '/assets/works/ForestEnviroment/Pic_ForestEnviroment_02.png',
    thumbnail: '/assets/works/ForestEnviroment/Pic_ForestEnviroment_02.png',
    title: '森林环境',
    description: '全流程森林场景构建'
  },
  {
    type: 'image',
    src: '/assets/works/ForestEnviroment/Pic_ForestEnviroment_03.png',
    thumbnail: '/assets/works/ForestEnviroment/Pic_ForestEnviroment_03.png',
    title: '森林环境',
    description: '全流程森林场景构建'
  },
  {
    type: 'video',
    src: '/assets/works/ForestEnviroment/ForestEnviroment_Final_web.mp4',
    thumbnail: '/assets/works/ForestEnviroment/Pic_ForestEnviroment_01.png',
    title: '森林环境',
    description: '全流程森林场景构建'
  },
  {
    type: 'image',
    src: '/assets/works/AbandonRoom/Pic_AbandonedRoom_Final.png',
    thumbnail: '/assets/works/AbandonRoom/Pic_AbandonedRoom_Final.png',
    title: '废弃公寓',
    description: '写实场景氛围静帧'
  },
  {
    type: 'video',
    src: '/assets/works/AbandonRoom/AbandonedRoom_Final_web.mp4',
    thumbnail: '/assets/works/AbandonRoom/Pic_AbandonedRoom_Final.png',
    title: '废弃公寓',
    description: '写实风格场景展示'
  }
];

export const pdfSections = [
  {
    id: 'resume',
    title: '个人简历',
    subtitle: '在线预览或下载完整履历',
    file: '/resume.pdf',
    downloadLabel: '下载 PDF 简历',
    openLabel: '新窗口打开'
  },
  {
    id: 'portfolio-pdf',
    title: '作品集 PDF',
    subtitle: '在线预览或下载 PDF 版作品集',
    file: '/portfolio.pdf',
    downloadLabel: '下载 PDF 作品集',
    openLabel: '新窗口打开'
  }
];

export const contactInfo = [
  {
    label: '邮箱',
    value: '1479072966@qq.com',
    href: 'mailto:1479072966@qq.com'
  },
  {
    label: '电话',
    value: '+86 13682307878',
    href: 'tel:+8613682307878'
  },
  {
    label: '所在地',
    value: '中国·深圳'
  }
];

export const newsTicker = {
  topMessages: [
    '欢迎来到我的个人站点',
    '编程学习中ing~',
    '正在发布新的作品集',
    '学习是第一驱动力',
    '新增了交互动效展示',
    '感谢你的关注'
  ],
  bottomMessages: [
    '建模PBR全流程',
    '建模手绘风格化全流程',
    'UE地编全流程',
    'SpeedTree植物资产制作',
    '环境美术/关卡美术',
    '欢迎一起交流合作'
  ]
};
 