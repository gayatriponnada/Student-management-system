<script lang="ts">
    export let data
    const title= data.title
    const products= data.products
</script>

<h1>{title}</h1>
<div class="pro">
    {#each products as product}
        <h1>{product.title}-${product.price}</h1>
        <p>{product.description}</p>
    {/each}
</div>