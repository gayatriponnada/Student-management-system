<script>
    let count=0
    let name=""

    function handleclick(){
        count+=1
    }
</script>
<button on:click={()=>(count=count+=1)}>Counter: {count}</button>
<button on:click={handleclick}>Counter:{count}</button>
<div>
    <pre>{JSON.stringify(name,null ,2)}</pre>
</div>
