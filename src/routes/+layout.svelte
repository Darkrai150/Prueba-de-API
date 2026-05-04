<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	let { children } = $props(); //esta etiqueta permite que el contenido de page.svelte se vea
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
