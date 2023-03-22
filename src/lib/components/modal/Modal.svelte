<script>
	import { Folders } from '$lib/Stores/FolderStore';

	export let open = false;
	export let showBackdrop = true;
	export let onClosed;
	export let folderId;
	let folderName;
	folderName = '';
	let disabled = false;
	let folder;
	let checkValue = (e) => {
		if (e.target.value.length > 2) {
			disabled = false;
			folderName = e.target.value;
		} else {
			disabled = true;
		}
	};
	$: {
		Folders.subscribe((folders) => {
			const index = folders.findIndex((obj) => {
				return obj.id === folderId;
			});

			folder = folders[index];
		});
	}
	let updateFolder = (id) => {
		Folders.update((folders) => {
			const index = folders.findIndex((obj) => {
				return obj.id === id;
			});

			folders[index].name = folderName;
			modalClose();
			return folders;
		});
	};
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
					<h5 class="modal-title" id="sampleModalLabel">Update - {folder.name}</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
						on:click={modalClose}
					/>
				</div>
				<div class="modal-body">
					<input type="text" class="form-control" value={folder.name} on:input={checkValue} />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={modalClose}
						>Close</button
					>
					<button
						type="button"
						class="btn btn-primary"
						{disabled}
						on:click={() => updateFolder(folder.id)}>Update</button
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
