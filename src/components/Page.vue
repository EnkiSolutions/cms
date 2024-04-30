<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router'
import { Base, default as templates } from '../templates'
import { Sitemap } from '../types';
const edit = ref(false);
const { fullPath } = useRoute();
const sitemap = inject<Sitemap>("sitemap")!;
const splittedPath = fullPath.split("/");
splittedPath.shift();
const page = splittedPath.pop()!;
const root = splittedPath.pop()??"$r";
const title = sitemap[root].find(v => v.path == page)?.title;
const { template, content } = await import(`@/${root}/${page}.json`);
localStorage.setItem('origin', fullPath);
const login = localStorage.getItem('login')
const onModified = async (c: string) => await fetch(
	window.location.origin + '/api/github/updateFile',
	{
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			root: root,
			page: page,
			content: JSON.stringify({content: c})
		})
	}
);
</script>

<template>
	<div class="page">
		<div id="title">
			{{ title }}
			<button v-if="login"
				@click="edit = !edit">
				{{ edit ? "Mettre-à-jour" : "Editer" }}
			</button>
		</div>
		<component v-if="template"
			:is="templates[template]"
			:content="content"
			:edit="edit"
			@modified="onModified" />
		<Base v-else
			:content="content"
			:edit="edit"
			@modified="onModified" />
	</div>
</template>

<style>
#title {
	text-align: center;
	font-size: 2rem;
}
.page {
    height: calc(100vh - 392px);
    overflow-y: auto;
	animation: 1s show;
    margin: 16px 0px;
    padding: 0 16px;
}
@keyframes show {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@media screen and (max-width: 720px) /*Phone media querie*/
{
	.page {
		height: 67vh;
		scroll-snap-type: y mandatory;
    	margin: 0;
	}

	#title {
		display: none;
	}
}
</style>