# University Picker - 大学选择器项目

## 项目概述
这是一个帮助用户选择合适大学的网站项目。用户可以通过调查问卷获得大学推荐，然后查看每所大学的详细信息。

## 项目结构

### 核心文件
- **Front-Page.html** - 调查问卷页面（用户填写偏好获得推荐）
- **List.html** - 大学列表页面（显示所有大学，可点击查看详情）
- **university-detail.html** - 大学详细信息页面（你负责的部分）

### 样式文件
- **Front-Page.css** - 调查问卷页面样式
- **List.css** - 大学列表页面样式
- **university-detail.css** - 大学详细信息页面样式（苹果风格设计）

### 功能文件
- **Front-Page.js** - 调查问卷逻辑
- **university-detail.js** - 大学详细信息页面功能（你负责的部分）
- **UniList.json** - 大学数据文件

## 功能说明

### 1. 调查问卷 (Front-Page.html)
- 用户填写学习偏好、预算、地理位置等
- 系统根据用户偏好推荐合适的大学

### 2. 大学列表 (List.html)
- 显示所有可选择的大学
- 每个大学名称都是可点击的链接
- 点击后跳转到详细信息页面

### 3. 大学详细信息 (university-detail.html) ⭐ 你负责的部分
- **页面头部**: 返回按钮、页面标题、操作按钮（收藏、对比）
- **大学英雄区域**: 大学名称、排名、位置、Logo
- **费用概览**: 学费、生活费、额外费用、年度总费用
- **详细信息网格**:
  - 左侧：合作项目信息、校园设施
  - 右侧：地理位置详情、交通信息
- **行动按钮**: 申请大学、联系招生办、预约校园参观

## 技术特点

### 苹果风格设计
- 使用苹果官方配色方案
- 毛玻璃效果（backdrop-filter）
- 优雅的动画和过渡效果
- 响应式设计，支持移动端

### 交互功能
- 收藏功能（localStorage存储）
- 对比功能（可添加到对比列表）
- 动态数据加载（从JSON文件读取）
- 实时费用计算

### 数据展示
- 自动计算年度总费用
- 动态显示合作项目级别
- 校园设施状态显示
- 地理位置和交通信息

## 使用方法

### 1. 查看大学列表
访问 `List.html` 查看所有大学

### 2. 查看大学详情
点击任意大学名称，或直接访问：
```
university-detail.html?university=McGill University
university-detail.html?university=University of Toronto
```

### 3. 测试功能
- 点击收藏按钮收藏大学
- 点击对比按钮添加到对比列表
- 点击各种操作按钮测试功能

## 数据格式

### UniList.json 结构
```json
{
  "University": "大学名称",
  "Tuition": 学费（加元/年）,
  "Location": "位置（省份）",
  "Living": 生活费（加元/月）,
  "Co-op": "合作项目级别（Extensive/Mid/Limited）",
  "Food": 是否有餐饮服务（true/false）,
  "Extra": 额外费用（加元/年）,
  "Rank": 排名
}
```

## 开发说明

### 你负责的部分 (university-detail.html)
1. **HTML结构**: 完整的页面布局和内容
2. **CSS样式**: 苹果风格的现代化设计
3. **JavaScript功能**: 数据加载、交互逻辑、动态内容更新

### 文件说明
- **university-detail.html**: 主页面文件，包含所有HTML结构
- **university-detail.css**: 苹果风格的CSS样式文件
- **university-detail.js**: 所有JavaScript功能实现

### 主要功能函数
- `loadUniversityData()`: 加载大学数据
- `displayUniversityData()`: 显示大学信息
- `toggleFavorite()`: 切换收藏状态
- `addToComparison()`: 添加到对比列表
- `calculateTotalCost()`: 计算总费用

## 下一步开发建议

1. **添加更多大学信息**: 专业设置、录取要求、学生评价等
2. **实现对比功能**: 创建大学对比页面
3. **添加搜索和筛选**: 按专业、费用、位置等筛选大学
4. **集成地图API**: 显示大学实际地理位置
5. **添加用户账户**: 保存用户偏好和收藏列表

## 技术栈
- HTML5
- CSS3 (CSS变量、Grid布局、Flexbox)
- JavaScript (ES6+)
- Font Awesome 图标
- Google Fonts

## 浏览器支持
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

**注意**: 这是一个模板项目，你可以根据实际需求进行修改和扩展。所有注释都使用中文，方便你理解代码逻辑。