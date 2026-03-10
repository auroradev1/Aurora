// Global type declarations for CSS modules
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.sass" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.less" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.styl" {
  const content: Record<string, string>;
  export default content;
}

// For side-effect imports (like globals.css)
declare module "*.css" {
  const _: string;
  export default _;
}

declare module "*.scss" {
  const _: string;
  export default _;
}

declare module "*.sass" {
  const _: string;
  export default _;
}

declare module "*.less" {
  const _: string;
  export default _;
}

declare module "*.styl" {
  const _: string;
  export default _;
}

// Window interface extension for performance detection hook
interface Window {
  __resizeTimer?: number | NodeJS.Timeout;
}
