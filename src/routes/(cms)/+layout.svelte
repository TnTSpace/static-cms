<script lang="ts">
	import { onMount } from 'svelte';
	import CMS from '@staticcms/core';
	import '@staticcms/core/dist/main.css';

	onMount(async () => {
		CMS.init({
			config: {
				backend: {
					name: 'github',
					repo: 'TnTSpace/static-cms',
					branch: 'master',
					base_url: 'https://static-cms.vercel.app',
					auth_endpoint: 'api/auth',
					auth_scope: 'repo'
				},
				publish_mode: 'editorial_workflow',
				media_folder: 'static/images/uploads',
				public_folder: '/images/uploads',
				collections: [
					{
						name: 'blog', // Used in routes, e.g., /admin/collections/blog
						label: 'Blog', // Used in the UI
						folder: 'src/content/blog', // The path to the folder where the documents are stored
						create: true, // Allow users to create new documents in this collection
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}', // Filename template, e.g., yyyy-MM-dd-title.md
						fields: [
							// The fields for each document, usually in front matter
							{ label: 'Layout', name: 'layout', widget: 'hidden', default: 'blog' },
							{ label: 'Title', name: 'title', widget: 'string' },
							{ label: 'Publish Date', name: 'date', widget: 'datetime' },
							{ label: 'Featured Image', name: 'thumbnail', widget: 'image' },
							{ label: 'Rating (scale of 1-5)', name: 'rating', widget: 'number' },
							{ label: 'Body', name: 'body', widget: 'markdown' }
						]
					}
				]
			}
		});

	});
</script>

<slot />
