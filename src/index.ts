import { OhVueIcon, addIcons } from "oh-vue-icons"
import { Plugin as VuePlugin } from "vue";
import Editor from "./components/Editor.vue";
import router from "./router";
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
            .component("v-icon", OhVueIcon)
            .provide("sitemap", sitemap)
            .use(router(sitemap));
    }
} as VuePlugin