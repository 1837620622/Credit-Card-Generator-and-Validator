<div align="center">

# Credit Card Generator & Validator

<p align="center">
  <strong>Professional Virtual Card Generation & Validation Tools</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#contact">Contact</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=flat-square&logo=tailwind-css" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

**[English](#english)** | **[中文](#中文)**

</div>

---

## English

### Overview

A professional-grade credit card generator and validator built with React and modern web technologies. This tool provides comprehensive features for generating test credit card numbers, virtual identities, and validating card information through various external services.

### Features

- **Card Generation**: Generate valid test credit card numbers using the Luhn algorithm
- **Multiple Card Types**: Support for Visa, MasterCard, American Express, Discover, UnionPay, JCB, Maestro, Diners Club
- **Custom BIN Support**: Generate cards with specific BIN prefixes
- **Country-Specific BINs**: Generate cards with BINs from 20+ countries
- **Multiple Output Formats**: PIPE, CSV, JSON, XML, SQL formats
- **Identity Generation**: Generate complete virtual identities for 15+ countries
- **External Resources**: Quick access to validation and generation services
- **Modern UI**: Sleek, minimalist dark theme design

### Installation

#### Prerequisites
- Node.js 18+ 
- npm or yarn

#### Steps

```bash
# Clone the repository
git clone https://github.com/1837620622/Credit-Card-Generator-and-Validator.git

# Navigate to project directory
cd Credit-Card-Generator-and-Validator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

1. **Generate Cards**: Select card type, country, quantity and format, then click "Generate Cards"
2. **Copy Results**: Click "Copy All" or hover over individual cards to copy
3. **Check BIN**: Click the external link icon to verify BIN information
4. **Generate Identity**: Switch to Identity tab, select country and generate
5. **External Resources**: Access third-party generators and validators

### Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | Frontend Framework |
| Vite | Build Tool |
| TailwindCSS 4 | Styling |
| Lucide React | Icons |

### Project Structure

```
src/
├── App.jsx              # Main application component
├── index.css            # Global styles
├── main.jsx             # Entry point
├── services/
│   └── externalAPI.js   # External service integrations
└── utils/
    ├── cardGenerator.js    # Card generation logic
    └── identityGenerator.js # Identity generation logic
```

---

## 中文

### 概述

一款基于 React 和现代 Web 技术构建的专业级信用卡生成器和验证器。该工具提供全面的功能，用于生成测试信用卡号、虚拟身份信息，并通过各种外部服务验证卡片信息。

### 功能特性

- **卡号生成**：使用 Luhn 算法生成有效的测试信用卡号
- **多种卡类型**：支持 Visa、MasterCard、American Express、Discover、银联、JCB、Maestro、Diners Club
- **自定义 BIN**：支持使用特定 BIN 前缀生成卡号
- **国家特定 BIN**：支持 20+ 国家的 BIN 生成
- **多种输出格式**：PIPE、CSV、JSON、XML、SQL 格式
- **身份生成**：为 15+ 国家生成完整的虚拟身份信息
- **外部资源**：快速访问验证和生成服务
- **现代界面**：简约高级的深色主题设计

### 安装部署

#### 环境要求
- Node.js 18+
- npm 或 yarn

#### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/1837620622/Credit-Card-Generator-and-Validator.git

# 进入项目目录
cd Credit-Card-Generator-and-Validator

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 使用说明

1. **生成卡号**：选择卡类型、国家、数量和格式，点击"Generate Cards"
2. **复制结果**：点击"Copy All"复制全部，或悬停单张卡片复制
3. **查询 BIN**：点击外链图标验证 BIN 信息
4. **生成身份**：切换到 Identity 标签页，选择国家并生成
5. **外部资源**：访问第三方生成器和验证器

### 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | 前端框架 |
| Vite | 构建工具 |
| TailwindCSS 4 | 样式框架 |
| Lucide React | 图标库 |

### 项目结构

```
src/
├── App.jsx              # 主应用组件
├── index.css            # 全局样式
├── main.jsx             # 入口文件
├── services/
│   └── externalAPI.js   # 外部服务集成
└── utils/
    ├── cardGenerator.js    # 卡号生成逻辑
    └── identityGenerator.js # 身份生成逻辑
```

---

<div align="center">

### Disclaimer / 免责声明

**This tool is for educational and testing purposes only.**  
**本工具仅供学习和测试使用。**

Do not use generated card numbers for any illegal activities.  
请勿将生成的卡号用于任何非法活动。

---

### Contact / 联系方式

**WeChat / 微信**: 1837620622  
**Author / 作者**: 传康kk  
**Bilibili / 咸鱼**: 万能程序员  
**Email / 邮箱**: 2040168455@qq.com

---

<p align="center">
  Made with ❤️ by 传康kk
</p>

</div>
