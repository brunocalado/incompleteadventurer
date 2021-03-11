Hooks.on("init", () => {
	game.settings.register("incompleteadventurer", "imported", {
		scope: "world",
		config: false,
		type: Boolean,
		default: false
	});
});

Hooks.on("renderCompendium", (app, html, data) => {
	if ( !game.settings.get("incompleteadventurer", "imported") ) {
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
  ui.notifications.warn(`Importing Incomplete Adventurer!`); // get selected token  
	const module = game.modules.get("incompleteadventurer");

	for ( let p of module.packs ) {
		let pack = game.packs.get("incompleteadventurer."+p.name);
    await pack.importAll();
	}
  
  ui.notifications.warn(`Incomplete Adventurer is imported!`); // get selected token  
	return game.settings.set("incompleteadventurer", "imported", true);
}

/*

	for ( let p of module.packs ) {
		const pack = game.packs.get("incompleteadventurer."+p.name);
    await pack.importAll();
	}
  
*/