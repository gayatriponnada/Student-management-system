<script>
	

    let todos=[{text:"Todo1", done:false},{text:"Todo2", done:false}]

    function addtodo(){
       todos.push({text:`Todo${todos.length+1}`,done:false})
       todos=todos
       console.log(todos)
    }
    
</script>


<div class="todos">
    {#each todos as todo, i}
         <div class=todo>
            <input  value={todo.text} type="text"/>
            <input value={todo.done} type="checkbox"/>
            
        </div>
    {/each}
    <button on:click={addtodo}>Add</button>
</div>


<style>
    .todos{
        display: grid;
        gap:1rem;
        margin-block-start: 1rem;
        position: absolute;
       
    }
    button{
        width: 40px;
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