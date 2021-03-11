Hooks.on("init", () => {
	game.settings.register("incompleteadventurer", "imported", {
		scope: "world",
		config: false,
		type: Boolean,
		default: false
	});
})

Hooks.on("renderCompendium", (app, html, data) => {
	if ( data.collection.startsWith("incompleteadventurer.") && !game.settings.get("incompleteadventurer", "imported") ) {
		Dialog.confirm({
			title: "Incomplete Adventurer Importer",
			content: "<p>Welcome to the <strong>Incomplete Adventurer</strong> module. Would you like to import all content to your World?",
			yes: () => importLabors()
		});
	}
});

/**
 * Import content
 */
async function importLabors() {
	const module = game.modules.get("ten");

	for ( let p of module.packs ) {
		const pack = game.packs.get("cycle-of-cerberus."+p.name);
    await pack.importAll();
	}

	return game.settings.set("incompleteadventurer", "imported", true);
}
