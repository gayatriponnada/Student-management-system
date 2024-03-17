
<script lang="ts">
	
    let todos=[{text:"Todo1", done:false},{text:"Todo2", done:false}]
    let task=""

    function addtodo(){
        let name={text:task, done: false}
        todos= [...todos, name]
        task=""
    }
    
    function addelse(){
         todos.push({text:`Todo${todos.length+1}`,done:false})
         todos=todos
         console.log(todos)
    }
    
    function btnclose(){
        todos.pop()
        todos=todos
    }
    
</script>
<h3>TODO APP</h3>
<p>Make your wishlist</p>
<div class="todos">
    {#each todos as todo, i}
         <div class=todo>
            <input  value={todo.text} type="text"/>
            <input value={todo.done} type="checkbox"/>
            <button class="btn-close"on:click={btnclose}>&times;</button>
            
        </div>
    {/each}

    <input placeholder="Type your todo" bind:value={task} type="text"/>
    <button class="type"on:click|preventDefault={addtodo}>Type</button>
    
    {#if task==""}
        <button class="addup" on:click|preventDefault={addelse}>Addup</button>

    {/if}
    
</div>


<style>

    h3{
        text-align: center;
    }
    p{
        text-align: center;
        font-size: small;
    }
    .todos{
        margin-left: 20px;
        display: grid;
        gap:1rem;
        margin-block-start: 1rem;
        position: absolute; 
    }
   
    .btn-close{
        background: transparent;
        position:relative;
        right:20% ;
        bottom: 20%;
        border: 0;
        font-size: 20px;
        cursor: pointer;
    }

    .type{
        width: 45px;
        padding: 2px; 
    }

    .addup{
        width: 55px;
        padding: 2px;  
    }

    input[type="text"]{
        padding:1rem;  
    }

    input[type="checkbox"]{
        position:relative;
        right:20%;
    }
</style>