<script>
	import { Folders } from '$lib/Stores/FolderStore.ts';
	import Modal from '$lib/components/modal/Modal.svelte';
	let foldersArr = [];
	let folderName = '';
	let disabled = true;
	Folders.subscribe((folders) => {
		foldersArr = folders;
	});
	let checkValue = (e) => {
		if (e.target.value.length > 2) {
			disabled = false;
			folderName = e.target.value;
		} else {
			disabled = true;
		}
	};
	let addFolder = () => {
		Folders.subscribe((folders) => {
			folders.push({ id: folders.length + 1, name: folderName });
			foldersArr = folders;
			folderName = '';
		});
	};
	let delteFolder = (folderId) => {
		Folders.update((folders) => {
			return folders.filter((folder) => folder.id !== folderId);
		});
	};

	let showPopup = false;
	let folderId;
	const onShowPopup = (id) => {
		showPopup = true;
		folderId = id;
	};

	const onPopupClose = () => {
		showPopup = false;
	};
</script>

<div class="container">
	<div class="row">
		<div class="col-md-4">
			<div class="folders">
				<h2>Folders</h2>
				<div class="folder-form mb-3">
					<div class="input-group">
						<input type="text" class="form-control" value={folderName} on:input={checkValue} />
						<button class="btn btn-primary" {disabled} on:click={addFolder}>Add</button>
					</div>
				</div>
				<div class="list-group">
					{#if foldersArr}
						{#each foldersArr as folder}
							<div class="list-group-item d-flex align-items-center justify-content-between">
								<a href="/folder/{folder.id}" class="list-group-item-action text-decoration-none">
									{folder.name}
								</a>
								<div class="buttons d-flex">
									<button class="btn btn-danger me-2" on:click={() => delteFolder(folder.id)}
										>Delete</button
									>
									<button class="btn btn-secondary" on:click={() => onShowPopup(folder.id)}
										>Edit</button
									>
								</div>
							</div>
						{/each}
					{/if}
					<Modal {folderId} open={showPopup} onClosed={() => onPopupClose()} />
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="todos">
				<slot />
			</div>
		</div>
	</div>
</div>
