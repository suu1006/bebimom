// png도 import 가능하게 함.
declare module "*.png" {
  const content: number;
  export default content;
}
