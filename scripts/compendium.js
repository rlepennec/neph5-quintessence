export class Compendium {

    /**
     * @param id      The module identifier.
     * @param name    The module name.
     * @param version The module version.
     * @param pack    The name of the pack which contains all adventures.
     */
    constructor(id, name, version, pack) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.pack = pack;
        this.adventures = [];
    }

    /**
     * @param adventure The adventure to register. 
     * @returns the instance.
     */
    withAdventure(adventure) {
        this.adventures.push(adventure);
        return this;
    }

    /**
     * Initialize the module during the init phase.
     */
    initialize() {

        console.log("Initializing module " + this.name + " " + this.version);

        // The default version of the module
        game.settings.register(this.id, 'version', {
            name: "Version du module",
            scope: 'world',
            config: false,
            type: String,
            default: "0.0.0"
        });
    
        // Indicates if adventures are imported
        for (let aventure of this.adventures) {
            game.settings.register(this.id, aventure.name, {
                name: "Aventure " + aventure.name + " importée",
                scope: "world",
                config: false,
                type: Boolean,
                default: false
            });
        }

    }

    /**
     * Start the module during the ready phase.
     */
    async start() {

        console.log("Starting module " + this.name);

        // Update only game master
        if (!game.user.isGM) {
            return;
        }

        // Retrieve the imported version
        const version = game.settings.get(this.id, 'version');
        if (version !== "0.0.0" && !isNewerVersion(version, this.version)) {
            return;
        }

        // Retrieve all adventure documents
        const pack = game.packs.get(this.id + "." + this.pack);
        const collection = new CompendiumCollection(pack.metadata);
        const documents = await collection.getDocuments();

        // For all adventures
        for (let aventure of this.adventures) {

            // No process if compendium has been registered but not the adventure in settings
            if (version !== "0.0.0" && !game.settings.get(this.id, aventure.name)) {
                return;
            }

            // Retrieve the document
            const document = documents.find(i => i.id === aventure.id);

            // Update all items
            let settings = false;
            for (let item of document.items) {

                // Retrieve the world item
                const witem = game.items.get(item.id);
                if (witem == null) {
                    continue;
                }

                // Item has been imported, update it from the compendium
                await witem.update({ ['system.description']: item.system.description });

                // Register the module and the adventure if not yet
                if (version === "0.0.0") {
                    settings = true;
                }

            }

            if (settings === true) {
                this.setImported(aventure);
            }

        }

        console.log("World updated from adventure " + this.name);

    }

    /**
     * Register the specified adventure in settings.
     * @param adventure The adventure to register.
     */
    register(adventure) {

        // Retrieve the aventure to register
        const aventure = this.adventures.find(i => i.id === adventure.id);

        // Update settings
        console.log("Import aventure " + aventure.name + " of the module " + this.name);
        this.setImported(aventure);
    }

    /**
     * Set the adventure as imported in settings.
     * @param aventure The adventure to set. 
     */
    setImported(aventure) {
        game.settings.set(this.id, 'version', this.version);
        game.settings.set(this.id, aventure.name, true);
    }

}