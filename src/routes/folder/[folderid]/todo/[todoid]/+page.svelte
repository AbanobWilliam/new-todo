<script lang="ts">
	import { page } from '$app/stores';
	import { Todos } from '$lib/Stores/TodoStore';
	let todoId: number;
	page.subscribe((pageId) => {
		todoId = parseInt(pageId.params.todoid);
	});

	type Todo = {
		id: number;
		folderId: number;
		name: string;
		description: string;
		completed: boolean;
	};
	let todosArr: Todo[];
	$: {
		Todos.subscribe((todos) => {
			return (todosArr = todos.filter((todo) => todo.id == todoId));
		});
	}
</script>

{#each todosArr as todo}
	<h2>{todo.name}</h2>
	<p class="my-3">{todo.description}</p>
	{#if todo.completed}
		<p class="alert alert-danger">Completed</p>
	{:else}
		<p class="alert alert-success">Not Completed</p>
	{/if}
{/each}
