/// <reference types="vite/client" />

// CSS模块类型声明
declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.css?inline' {
  const content: string;
  export default content;
}
