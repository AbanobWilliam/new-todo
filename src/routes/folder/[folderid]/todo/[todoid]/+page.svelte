<script lang="ts">
	import { page } from '$app/stores';

	$: console.log($page.params.todoid);
</script>
