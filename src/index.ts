import { OhVueIcon, addIcons } from "oh-vue-icons"
import { Component, Plugin as VuePlugin } from "vue";
import Editor from './components/Editor.vue';
import EnkiView from './components/EnkiView.vue';
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
import { Sitemap } from "./types";
import { addTemplates } from "./templates";

export { default as createRouter } from "./router";
export type * from './types';
export {
    Editor,
    EnkiView
}
export default {
    install:(app, options: { sitemap: Sitemap, templates: Record<string, Component> }) => {
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
        addTemplates(options.templates);
        app
            .component("Editor", Editor)
            .component("EnkiView", EnkiView)
            .component("v-icon", OhVueIcon)
            .provide("sitemap", options.sitemap)
    }
} as VuePlugin
declare module "vue" {
    export interface GlobalComponents {
        Editor: typeof Editor,
        EnkiView: typeof EnkiView
    }
}