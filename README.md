## Fuck or Not

上不上 AI 分析网站，基于 `Google Gemini AI`。

### 环境配置

- **Node.js**：建议使用 **18+ LTS**。
- **包管理器**：项目使用 `pnpm`（`packageManager: pnpm@10.x`）。

示例安装流程（本地开发用）：

```bash
# 安装 pnpm（前提是已经有 Node）
npm install -g pnpm
```

### 本地运行

在项目根目录执行：

```bash
pnpm install    # 安装依赖
pnpm dev        # 启动开发服务器，默认 http://localhost:3333
```

其他常用脚本：

- `pnpm build`：构建生产环境静态文件到 `dist/`
- `pnpm preview`：本地预览生产构建
- `pnpm test`：运行单元测试
- `pnpm lint`：运行 ESLint

### 配置 API 密钥

1. 打开 [Google AI Studio](https://aistudio.google.com/app/apikey) 创建 **API 密钥**。
2. 一定要复制的是「**密钥**」这一列的长 key，**不要**复制类似 `gen-lang-client-...` 的项目 ID。
3. 打开站点「设置」页面，在「Google API 秘钥」输入框粘贴刚刚复制的密钥并保存。

站点内部通过 `@vueuse/core` 的 `useStorage('google-api-key', '')` 把密钥存到浏览器 localStorage 中，仅保存在本机。

### 使用方式

也可以直接访问线上版本：`https://fuckornot.netlify.app/`。

1. 选择分析模式（简洁 / 详细 / 小说 / 自定义）。
2. 上传图片（若大于 20 MB，选择「使用 FileAPI 上传图片」）。
3. 点击「分析」按钮，等待返回结果。
4. 满意的结果可以收藏，数据保存在浏览器 `IndexedDB`，可在「收藏」页查看。

### 修改 Prompt

**在页面里改（推荐）**

- 打开「设置」页面，可以直接修改：
  - 简洁模式 Prompt
  - 详细模式 Prompt
  - 小说模式 Prompt
  - 自定义模式 Prompt
- 这些内容会自动保存到浏览器 localStorage，对应键为：
  - `concise-prompt`
  - `detailed-prompt`
  - `novel-prompt`
  - `custom-prompt`

**修改默认 Prompt（改代码）**

- 默认 Prompt 定义在 `src/logic/prompts.ts` 中：
  - `defaultConcisePrompt`
  - `defaultDetailedPrompt`
  - `defaultNovelPrompt`
- 修改上述常量即可改变「当输入框留空时」的默认提示词。

### 修改 / 增加模型

- 模型选择列表定义在首页 `src/pages/index.vue` 中的 `modelOptions`：
  - 每一项格式为：`{ label: '显示名称（可写备注）', value: '模型ID' }`
- 想新增模型，只需要在数组中追加一项，例如：

```ts
{ label: 'Gemini 2.0 Pro（需付费）', value: 'gemini-2.0-pro' },
```

- 其中：
  - `label` 是下拉框中展示给用户看的名称，可以写「需付费」等说明；
  - `value` 是传给 Gemini API 的模型 ID，需与官方文档中的 ID 一致。

### 模型推荐

体感最好的通常是 **Gemini 2.0 Flash**，不容易被安全过滤器禁止，效果也接近 **Gemini 2.5 Flash**。
