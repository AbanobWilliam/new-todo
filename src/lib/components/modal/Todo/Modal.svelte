<script lang="ts">
	import { page } from '$app/stores';
	import { Todos } from '$lib/Stores/TodoStore';
	export let open = false;
	export let showBackdrop = true;
	export let onClosed;
	export let todoId: number;
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
	let todo: Todo;
	$: {
		Todos.subscribe((todos) => {
			const index = todos.findIndex((obj) => {
				return obj.id === todoId;
			});

			return (todo = todos[index]);
		});
	}
	let checkNameValue = (e) => {
		if (todoName == '') {
			todoName = todo.name;
		}
		if (todoDesc == '') {
			todoDesc = todo.description;
		}
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
		TodoCompleted = todo.completed;
	};
	let folderId: number;
	let updateTodo = (id: number) => {
		if (todoName == '') {
			todoName = todo.name;
		}
		if (todoDesc == '') {
			todoDesc = todo.description;
		}
		Todos.update((todos) => {
			const index = todos.findIndex((obj) => {
				return obj.id === id;
			});
			todos[index].name = todoName;
			todos[index].description = todoDesc;
			todos[index].completed = TodoCompleted;
			modalClose();
			return todosArr;
		});
		todoName = '';
		todoDesc = '';
		TodoCompleted = false;
	};

	page.subscribe((pageData) => {
		folderId = parseInt(pageData.params.folderid);
	});
	Todos.subscribe((todos) => {
		console.log(todos);
		return (todosArr = todos.filter((todo) => todo.folderId == folderId));
	});
	const modalClose = () => {
		open = false;
		if (onClosed) {
			onClosed();
		}
	};
</script>

{#if open}
	<div
		class="modal"
		id="sampleModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="sampleModalLabel"
		aria-hidden={false}
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="sampleModalLabel">Update - {todo.name}</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
						on:click={modalClose}
					/>
				</div>
				<div class="modal-body">
					<input
						type="text"
						class="form-control mb-2"
						value={todo.name}
						on:input={checkNameValue}
						placeholder="Todo Title"
					/>
					<textarea
						class="form-control mb-2"
						value={todo.description}
						on:input={checkDescValue}
						placeholder="Todo Description"
					/>
					<select class="form-select mb-4" bind:value={todo.completed} on:change={completed}>
						<option value={false}>Not Completed</option>
						<option value={true}>Completed</option>
					</select>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={modalClose}
						>Close</button
					>
					<button
						type="button"
						class="btn btn-primary"
						{disabled}
						on:click={() => updateTodo(todo.id)}>Update</button
					>
				</div>
			</div>
		</div>
	</div>
	{#if showBackdrop}
		<div class="modal-backdrop show" />
	{/if}
{/if}

<style>
	.modal {
		display: block;
	}
	.modal-backdrop {
		opacity: 0.1;
	}
</style>
