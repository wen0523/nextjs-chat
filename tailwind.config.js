const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/icon/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/ui/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  // daisyUI 配置（可选 - 这里是默认值）
  daisyui: {
    themes: ["light", "dark", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "aqua", "dracula", "lemonade"], // false: 仅使用 light 和 dark 主题 | true: 使用所有主题 | array: 指定特定主题，例如 ["light", "dark", "cupcake"]
    darkTheme: "dark", // 黑暗模式下使用的主题名称（从包含的主题中选择一个）
    base: true, // 默认情况下为根元素应用背景色和前景色
    styled: true, // 为所有组件包含 daisyUI 的颜色和设计决策
    utils: true, // 添加响应式和修饰符的实用类
    prefix: "", // daisyUI 类名的前缀（包括组件、修饰符和响应式类名。不包括颜色）
    logs: true, // 构建 CSS 时在控制台显示 daisyUI 版本和使用的配置信息
    themeRoot: ":root", // 接收主题颜色 CSS 变量的元素
  },
  plugins: [
    require('daisyui'),
  ],
}
