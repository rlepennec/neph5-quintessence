import { Adventure } from "./adventure.js";
import { Compendium } from "./compendium.js";

/*
const SYSTEM_ID = "neph5e";
const MODULE_ID = "neph5e-quintessence";
const MODULE_NAME = "Nephilim Quintessence";
const MODULE_VERSION = "1.0.0";
const ALCHIMIE = {
    name: "alchimie",
    id: "u5V7I99Xxa0ryMHo" };
const ARCANES = {
    name: "arcanes",
    id: "3ZbPrqNI930Iqb02" };
const EQUIPEMENT = {
    name: "equipement",
    id: "jimFckIZEtGKfoec" };
const INCARNATIONS = {
    name: "incarnations",
    id: "BrGvBmpWVka8qpFl" };
const KABBALE = {
    name: "kabbale",
    id: "gR6Gs1IG0PEvcn2b" };
const MAGIE = {
    name: "magie",
    id: "vFHs67tAjpcQzI5G" };
const METAMORPHOSES = {
    name: "metamorphoses",
    id: "QgXoJzmeyEdChvd3" };
const QUETES = {
    name: "quetes",
    id: "vo2RL2ArGETZUV5p" };
const SAVOIR = {
    name: "savoirs",
    id: "0gLf7uB5d4WyOEut" };
const VERSION = "version";
const AVENTURES = [ALCHIMIE, ARCANES, EQUIPEMENT, INCARNATIONS, KABBALE, MAGIE, METAMORPHOSES, QUETES, SAVOIR];
*/

const MODULE = new Compendium("neph5e-quintessence", "Nephilim Quintessence", "1.0.0", "quintessence")
    .withAdventure(new Adventure("u5V7I99Xxa0ryMHo", "alchimie"))
    .withAdventure(new Adventure("3ZbPrqNI930Iqb02", "arcanes"))
    .withAdventure(new Adventure("jimFckIZEtGKfoec", "equipement"))
    .withAdventure(new Adventure("BrGvBmpWVka8qpFl", "incarnations"))
    .withAdventure(new Adventure("gR6Gs1IG0PEvcn2b", "kabbale"))
    .withAdventure(new Adventure("vFHs67tAjpcQzI5G", "magie"))
    .withAdventure(new Adventure("QgXoJzmeyEdChvd3", "metamorphoses"))
    .withAdventure(new Adventure("vo2RL2ArGETZUV5p", "quetes"))
    .withAdventure(new Adventure("0gLf7uB5d4WyOEut", "savoirs"));


Hooks.on("init", () => {
    MODULE.initialize();
})
/*
    console.log("Initializing module " + MODULE_NAME + " " + MODULE_VERSION);

    game.settings.register(MODULE_ID, VERSION, {
        name: "Version du module",
        scope: 'world',
        config: false,
        type: String,
        default: "0"
    });

    for (let aventure of AVENTURES) {
        game.settings.register(MODULE_ID, aventure.name, {
            name: "Aventure " + aventure.name + " importée",
            scope: "world",
            config: false,
            type: Boolean,
            default: false
        });
    }
*/


Hooks.on("ready", async () => {
    await MODULE.start();
});
    
    /*
    // Update only game master
    if (!game.user.isGM) {
        return;
    }

    // Update only new module version
    const importedVersion = game.settings.get(MODULE_ID, VERSION);
    if (!isNewerVersion(importedVersion, MODULE_VERSION)) {
        return;
    }

    // Retrieves compendium data
    const pack = game.packs.get('neph5e-quintessence.quintessence');
    const metadata = pack.metadata;
    const collection = new CompendiumCollection(metadata);
    const documents = await collection.getDocuments();

    // For all adventures
    for (let aventure of AVENTURES) {

        // Update only imported adventures
        if (!game.settings.get(MODULE_ID, aventure.name)) {
            continue;
        }

        console.log("Updating world from adventure " + aventure.name);

        // Retrieve the document
        const document = documents.find(i => i.id === aventure.id);

        // Update all items
        for (let item of document.items) {

            // Retrieve the world item
            const witem = game.items.get(item.id);
            if (witem == null) {
                continue;
            }

            // Update the world item from the compendium
            await witem.update({ ['system.description']: item.system.description });
        }

        console.log("World updated from adventure " + aventure.name);

    }
    */


Hooks.on("importAdventure", (adventure, created, updated) => {
    MODULE.register(adventure);
});
    /*
    const aventure = AVENTURES.find(i => i.id === adventure.id);
    console.log("Import aventure " + aventure.name + " of the module " + MODULE_ID);
    game.settings.set(MODULE_ID, VERSION, MODULE_VERSION);
    game.settings.set(MODULE_ID, aventure.name, true);
    */
