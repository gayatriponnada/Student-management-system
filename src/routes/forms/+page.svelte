<script>
    export let form
</script>

<form method="post"> 
<p>{form?.message||""}</p>
<input type="text" name="username"placeholder="username"/>
<input type="password" name="password"placeholder="password"/>
<button type="submit">Login</button>
</form>