import { Adventure } from "./adventure.js";
import { Compendium } from "./compendium.js";

const MODULE = new Compendium("neph5e-quintessence", "Nephilim Quintessence", "1.1.0", "quintessence")
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
});

Hooks.on("ready", async () => {
    await MODULE.start();
});

Hooks.on("importAdventure", (adventure, created, updated) => {
    MODULE.register(adventure);
});