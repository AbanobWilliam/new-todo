<script>
	import { Folders } from '$lib/Stores/FolderStore.ts';
	let foldersArr;
	let folderName = '';
	let disabled = true;
	Folders.subscribe((folders) => {
		foldersArr = folders;
	});
	let checkValue = (e) => {
		if (e.target.value.length > 2) {
			disabled = false;
			folderName = e.target.value;
		}
	};
	let addFolder = () => {
		console.log(folderName);
		Folders.subscribe((folders) => {
			folders.push({ id: folders.length + 1, name: folderName });
			foldersArr = folders;
			folderName = '';
		});
	};
	let delteFolder = (folderId) => {
		const deltedFolder = foldersArr.filter((object) => {
			return object.id !== folderId;
		});
		foldersArr = deltedFolder;
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
					{#each foldersArr as folder}
						<a href="/folder/{folder.id}" class="list-group-item list-group-item-action">
							{folder.name}
						</a>
						<button class="btn btn-danger" on:click={delteFolder(folder.id)}>Delete</button>
					{/each}
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
