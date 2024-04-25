import Editor from './components/Editor.vue';
import EnkiView from './components/EnkiView.vue';
import ListBase from './components/ListBase.vue';
declare module "vue" {
    interface GlobalComponents {
        Editor: typeof Editor,
        EnkiView: typeof EnkiView,
        ListBase: typeof ListBase
    }
}