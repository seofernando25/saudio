<script>
	const date = new Date();
	const hour = date.getHours();

	let greeting = '';

	if (hour >= 6 && hour < 12) {
		greeting = 'morning';
	} else if (hour >= 12 && hour < 18) {
		greeting = 'afternoon';
	} else if (hour >= 18 && hour < 24) {
		greeting = 'evening';
	} else {
		greeting = 'night';
	}
</script>

<h2>Good {greeting}</h2>
