<script>
    import { onMount } from "svelte";
    // La funcion state define variables reactivas que actualizan
    // automaticamente la interfaz cuando cambian
    //  Inicializa la URL vacía para que el servidor no pinte nada por defecto
    let michiUrl = $state("");
    // la variable cargando se encarga de controlar el flujo
    // de la interfaz y mostrar feedback al usuario
    let cargando = $state(false);
    //  Nuevo estado para detectar cuando el cliente leyó el LocalStorage
    let montado = $state(false);

    onMount(() => {
        const guardado = localStorage.getItem("ultimoMichi");
        // Si hay algo guardado lo usamos; si no, ponemos el de respaldo
        michiUrl = guardado || "https://placecats.com/millie/300/150";
        montado = true; // Marcamos que el cliente ya está sincronizado
    });

    async function obtenerNuevoMichi() {
        cargando = true;
        // Asegura tener esta variable en tu archivo .env
        const apiKey = import.meta.env.VITE_CAT_API_KEY;

        try {
            //se realiza una peticion HTTP con fetch a la API de gatos
            const respuesta = await fetch(
                "https://api.thecatapi.com/v1/images/search",
                {
                    // incluyendo la clave de API en los encabezados para autenticación
                    headers: { "x-api-key": apiKey },
                },
            );
            // await pausa la ejecucion hasta recibir la respuesta
            // respuesta.json() convierte la respuesta en formato JSON a un objeto de JavaScript
            const datos = await respuesta.json();
            // se asigna la url de la imagen a michiUrl
            michiUrl = datos[0].url;
            localStorage.setItem("ultimoMichi", michiUrl);
        } catch (error) {
            console.error("Error al invocar la API:", error);
        } finally {
            cargando = false;
        }
    }
</script>

<main class="min-h-screen flex flex-col items-center justify-center p-4">
    <div
        class="max-w-md w-full p-8 rounded-3xl border shadow-2xl backdrop-blur-md"
        style="background: rgba(255, 255, 255, 0.11); border-color: var(--st-glass-border);"
    >
        <h1
            class="text-3xl font-bold mb-6 text-center tracking-wider"
            style="color: var(--st-accent-cyber);"
        >
            Prueba API
        </h1>

        <div
            class="relative group overflow-hidden rounded-2xl mb-8 border bg-slate-900/20 h-64"
            style="border-color: var(--st-glass-border);"
        >
            <!--  Overlay de carga: Se muestra si está cargando O si aún no se monta el cliente -->
            {#if !montado || cargando}
                <div
                    class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10"
                >
                    <span
                        class="animate-pulse font-mono text-sm"
                        style="color: var(--st-accent-cyber);"
                    >
                        {!montado ? "SINCRONIZANDO..." : "BUSCANDO MICHI..."}
                    </span>
                </div>
            {/if}

            <!-- Solo se renderiza la imagen si el cliente ya está listo -->
            {#if montado && michiUrl}
                <img
                    src={michiUrl}
                    alt="Michi del Santuario"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            {/if}
        </div>

        <button
            onclick={obtenerNuevoMichi}
            disabled={!montado || cargando}
            class="w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            style="background: transparent; border: 2px solid var(--st-accent-cyber); color: var(--st-accent-cyber); box-shadow: 0 0 15px rgba(0, 242, 255, 0.2);"
        >
            {!montado
                ? "Iniciando..."
                : cargando
                  ? "Invocando..."
                  : "Obtener Michi"}
        </button>
    </div>

    <footer
        class="mt-8 opacity-50 text-xs font-mono tracking-widest text-center"
    >
        FES ARAGÓN<br />
    </footer>
</main>
