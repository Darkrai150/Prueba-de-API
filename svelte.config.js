import adapter from '@sveltejs/adapter-static';

export default {
    kit: {
        adapter: adapter({
            fallback: '404.html'
        }),
        paths: {
            base: '/Prueba-de-API'  // ← el nombre exacto de tu repo en GitHub
        }
    }
};