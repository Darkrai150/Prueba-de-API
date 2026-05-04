<script>
    let michiUrl = $state("https://placecats.com/millie/300/150");
    let cargando = $state(false);

    async function obtenerNuevoMichi() {
        cargando = true;

        // Llamamos a la variable de entorno definida en .env
        const apiKey = import.meta.env.VITE_CAT_API_KEY;

        try {
            const respuesta = await fetch(
                "https://api.thecatapi.com/v1/images/search",
                {
                    // Aquí es donde la llave hace su trabajo
                    headers: {
                        "x-api-key": apiKey,
                    },
                },
            );
            const datos = await respuesta.json();
            michiUrl = datos[0].url;
        } catch (error) {
            console.error("Error al obtener un nuevo michi:", error);
        } finally {
            cargando = false;
        }
    }
</script>

<main>
    <div class="glass-card">
        <h1>Prueba de API</h1>

        <div class="contenedor-imagen">
            {#if cargando}
                <p>Buscando un gatito para ti...</p>
            {:else}
                <img src={michiUrl} alt="Un gato del santuario" />
            {/if}
        </div>

        {#if cargando}
            Cargando...
        {:else}
            Si no te gusto da click aqui! ->
        {/if}

        <button onclick={obtenerNuevoMichi} disabled={cargando}>
            {cargando ? "Cargando..." : "Quiero otro gato"}
        </button>
    </div>
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
