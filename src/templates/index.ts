import { Component, ref } from "vue";
const templatesList = ref<Record<string, Component>>({});
export const addTemplates = (templates: Record<string, Component>) => {
    Object.assign(templatesList.value, templates)
}
export { default as Base } from './Base.vue';
export default templatesList;