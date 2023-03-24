<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Todo/Modal.svelte';
	import { Todos } from '$lib/Stores/TodoStore';
	let folderId: number;
	type Todo = {
		id: number;
		folderId: number;
		name: string;
		description: string;
		completed: boolean;
	};
	let todosArr: Todo[];
	let todoName: string = '';
	let todoDesc: string = '';
	let disabled: boolean = true;
	let TodoCompleted: boolean = false;

	page.subscribe((pageData) => {
		folderId = parseInt(pageData.params.folderid);
	});
	$: {
		Todos.subscribe((todos) => {
			console.log(todos);
			return (todosArr = todos.filter((todo) => todo.folderId == folderId));
		});
	}
	let checkNameValue = (e) => {
		todoName = e.target.value;
		if (todoName.length > 3 && todoDesc.length > 5) {
			disabled = false;
		} else {
			disabled = true;
		}
	};
	let checkDescValue = (e) => {
		todoDesc = e.target.value;
		if (todoName.length > 3 && todoDesc.length > 5) {
			disabled = false;
		} else {
			disabled = true;
		}
	};
	let completed = () => {
		console.log(TodoCompleted);
		TodoCompleted;
	};
	let addTodo = (folderId: number) => {
		Todos.subscribe((todos) => {
			todos.push({
				id: todos.length + 1,
				folderId: folderId,
				name: todoName,
				description: todoDesc,
				completed: TodoCompleted
			});
			Todos.subscribe((todos) => {
				return (todosArr = todos.filter((todo) => todo.folderId == folderId));
			});
		});
	};
	let deleteTodo = (todoId: number) => {
		Todos.update((todos) => {
			return (todosArr = todos.filter((todo) => {
				return todo.id !== todoId;
			}));
		});
	};
	let showPopup: boolean = false;
	let todoId: number;
	const onShowPopup = (id: number) => {
		showPopup = true;
		todoId = id;
	};

	const onPopupClose = () => {
		showPopup = false;
	};
</script>

<div class="row">
	<div class="todos">
		<div class="col-md-6">
			<h2>Todos</h2>
			<div class="folder-form mb-3">
				<input
					type="text"
					class="form-control mb-2"
					value={todoName}
					on:input={checkNameValue}
					placeholder="Todo Title"
				/>
				<textarea
					class="form-control mb-2"
					value={todoDesc}
					on:input={checkDescValue}
					placeholder="Todo Description"
				/>
				<select class="form-select mb-4" bind:value={TodoCompleted} on:change={completed}>
					<option value={false}>Not Completed</option>
					<option value={true}>Completed</option>
				</select>
				<button class="btn btn-primary" {disabled} on:click={addTodo(folderId)}>Add</button>
			</div>
			<hr />
			<div class="list-group">
				{#if todosArr}
					{#each todosArr as todo}
						<div class="list-group-item d-flex align-items-center justify-content-between">
							<a
								href="/folder/{folderId}/todo/{todo.id}"
								class="list-group-item-action text-decoration-none"
							>
								{todo.name}
							</a>
							<div class="buttons d-flex">
								<button class="btn btn-danger me-2" on:click={() => deleteTodo(todo.id)}
									>Delete</button
								>
								<button class="btn btn-secondary" on:click={() => onShowPopup(todo.id)}>Edit</button
								>
							</div>
						</div>
					{/each}
				{/if}
				<Modal {todoId} open={showPopup} onClosed={() => onPopupClose()} />
			</div>
		</div>
	</div>
</div>
<slot />
