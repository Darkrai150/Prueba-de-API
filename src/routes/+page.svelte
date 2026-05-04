<script>
    import { onMount } from 'svelte';

    // Estados reactivos con Runes de Svelte 5
    let michiUrl = $state("https://placecats.com/millie/300/150");
    let cargando = $state(false);

    // Persistencia de datos 
    onMount(() => {
        const guardado = localStorage.getItem("ultimoMichi");
        if (guardado) {
            michiUrl = guardado;
        }
    });

    async function obtenerNuevoMichi() {
        cargando = true;
        const apiKey = import.meta.env.VITE_CAT_API_KEY; // Seguridad vía .env

        try {
            const respuesta = await fetch("https://api.thecatapi.com/v1/images/search", {
                headers: { 'x-api-key': apiKey }
            });
            const datos = await respuesta.json();
            michiUrl = datos[0].url;
            
            // Guardamos la selección actual en el navegador
            localStorage.setItem("ultimoMichi", michiUrl);
        } catch (error) {
            console.error("Error al invocar la API:", error);
        } finally {
            cargando = false;
        }
    }
</script>

<main class="min-h-screen flex flex-col items-center justify-center p-4">
    <!-- Tarjeta con efecto Glassmorphism usando tus variables -->
    <div 
        class="max-w-md w-full p-8 rounded-3xl border shadow-2xl backdrop-blur-md"
        style="background: rgba(255, 255, 255, 0.03); border-color: var(--st-glass-border);"
    >
        <h1 class="text-3xl font-bold mb-6 text-center tracking-wider" 
            style="color: var(--st-accent-cyber);">
            Prueba de API
        </h1>

        <!-- Contenedor de imagen con resplandor[cite: 1] -->
        <div class="relative group overflow-hidden rounded-2xl mb-8 border" 
             style="border-color: var(--st-glass-border);">
            {#if cargando}
                <div class="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
                    <span class="animate-pulse font-mono" style="color: var(--st-accent-cyber);">CARGANDO...</span>
                </div>
            {/if}
            <img 
                src={michiUrl} 
                alt="Michi del Santuario" 
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </div>

        <!-- Botón interactivo con estética Cyberpunk[cite: 1] -->
        <button 
            onclick={obtenerNuevoMichi}
            disabled={cargando}
            class="w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            style="background: transparent; border: 2px solid var(--st-accent-cyber); color: var(--st-accent-cyber); box-shadow: 0 0 15px rgba(0, 242, 255, 0.2);"
        >
            {cargando ? 'Invocando...' : 'Obtener Michi'}
        </button>
    </div>

    <footer class="mt-8 opacity-50 text-xs font-mono tracking-widest">
        Fes Aragon - Servicio Social - Práctica 2
    </footer>
</main>

<style>
    .glass-card {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        border: 1px solid var(--st-glass-border);
        border-radius: var(--st-border-radius-xl);
        padding: var(--st-spacing-lg);
        max-width: 500px;
        margin: 50px auto;
        text-align: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    img {
        width: 100%;
        border-radius: var(--st-border-radius-xl);
        margin: 20px 0;
        border: 1px solid var(--st-glass-border);
        display: block;
    }

    .contenedor-imagen {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        background-color: var(--st-primary);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: var(--st-border-radius-md);
        font-weight: bold;
        cursor: pointer;
        transition:
            transform 0.2s ease,
            background-color 0.2s;
    }

    button:hover {
        transform: scale(1.05);
        filter: brightness(1.1);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
