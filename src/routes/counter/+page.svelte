<script>
	let counter = 0;
	if (counter >= 10) {
		alert('Counter is greater than 10');
		counter = 0;
	}
	function count() {
		counter += 1;
	}

	$: console.log(counter);
</script>

<button on:click={count}>Counter={counter}</button>
