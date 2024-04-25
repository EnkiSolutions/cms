import { OhVueIcon, addIcons } from "oh-vue-icons"
import { Plugin as VuePlugin } from "vue";
import Editor from './components/Editor.vue';
import EnkiView from './components/EnkiView.vue';
import ListBase from './components/ListBase.vue';
import {
    RiArrowGoBackLine,
    RiArrowGoForwardLine,
    RiFormatClear,
    RiBold,
    RiItalic,
    RiLink,
    BiBlockquoteLeft,
    RiImageLine,
    RiSeparator,
    RiTextWrap,
    RiAddLine,
    RiDragMove2Fill
} from "oh-vue-icons/icons";

export { default as createRouter } from "./router";
export type * from './types';
export default {
    install:(app, sitemap) => {
        addIcons(
            RiArrowGoBackLine,
            RiArrowGoForwardLine,
            RiFormatClear,
            RiBold,
            RiItalic,
            RiLink,
            BiBlockquoteLeft,
            RiImageLine,
            RiSeparator,
            RiTextWrap,
            RiAddLine,
            RiDragMove2Fill
        );
        app
            .component("Editor", Editor)
            .component("EnkiView", EnkiView)
            .component("v-icon", OhVueIcon)
            .provide("sitemap", sitemap)
    }
} as VuePlugin
declare module "vue" {
    export interface GlobalComponents {
        Editor: typeof Editor,
        EnkiView: typeof EnkiView,
        ListBase: typeof ListBase
    }
}