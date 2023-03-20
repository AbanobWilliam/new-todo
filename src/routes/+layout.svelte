<script>
	import { Folders } from '$lib/Stores/FolderStore.ts';
	let foldersArr;
	Folders.subscribe((folders) => {
		foldersArr = folders;
	});
</script>

<div class="container">
	<div class="row">
		<div class="col-md-4">
			<div class="folders">
				<h2>Folders</h2>
				<div class="folder-form mb-3">
					<div class="input-group">
						<input type="text" class="form-control" />
						<button class="btn btn-primary">Add</button>
					</div>
				</div>
				<div class="list-group">
					{#each foldersArr as folder}
						<a href="/folder/{folder.id}" class="list-group-item list-group-item-action">
							{folder.name}
						</a>
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
