import plugin from './plugin'
import type Editor from './components/Editor.vue';
import type EnkiView from './components/EnkiView.vue';
import type ListBase from './components/ListBase.vue';
export { default as createRouter } from "./router";
export type * from './types';
export default plugin;
declare module "vue" {
    interface GlobalComponents {
        Editor: typeof Editor,
        EnkiView: typeof EnkiView,
        ListBase: typeof ListBase
    }
}