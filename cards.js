// Die exakten Namen aller 100 Karten
const cardNames = {
    1: "TikTok", 2: "Twitch", 3: "YouTube", 4: "Discord", 5: "MMA", 6: "Fußball", 7: "Tischtennis", 8: "Gaming", 9: "League of Legends", 10: "TFT",
    11: "Counter Strike 2", 12: "Valorant", 13: "Fortnite", 14: "Rocket League", 15: "Pokémon", 16: "GTA V", 17: "Minecraft", 18: "Fifa", 19: "Among Us", 20: "Death Note",
    21: "Assassination Classroom", 22: "Legende von Aang", 23: "Breaking Bad", 24: "Game of Thrones", 25: "Haus des Geldes", 26: "Big Bang Theory", 27: "Paradise PD", 28: "Rick and Morty", 29: "Prison Break", 30: "Better Call Saul",
    31: "Family Guy", 32: "Gönrgy", 33: "Fanta Exotic", 34: "Wasser", 35: "Currywurst", 36: "Burger", 37: "Pommes", 38: "Nuggets", 39: "Chips", 40: "Knoppers",
    41: "Bueno", 42: "Giotto", 43: "John Schnee", 44: "Star Wars", 45: "Marvel", 46: "Dart", 47: "Crossfire", 48: "Dark Orbit", 49: "Counter-Strike GO", 50: "Mein PC",
    51: "Jinx", 52: "Shaco", 53: "Lissandra", 54: "Fennec", 55: "Zenit St. Petersburg", 56: "Razer-Maus", 57: "Tastatur", 58: "Mikrofon", 59: "Kamera", 60: "Spiderman",
    61: "Glurak", 62: "Rayquaza", 63: "Tend", 64: "Furz", 65: "Nichts", 66: "Tend's Brille", 67: "Deagle", 68: "Poro", 69: "Team Spirit", 70: "Arshavin",
    71: "Get Donked", 72: "Gambit Gaming", 73: "Gig", 74: "Cola Zero", 75: "Gubi Fortnite", 76: "Finanzamt", 77: "GTA 6", 78: "Berlin", 79: "Omsk", 80: "AWP Dragon Lore",
    81: "Der Rote Apfel", 82: "Appa", 83: "Tilted Towers", 84: "League Classic", 85: "49ers Lichtenrade",
    86: "Tend´s Viewer", 87: "Tend´s Viewer (W)", 88: "Discord Mod", 89: "Leck Eier", 90: "Kira",
    91: "Mauzi", 92: "Normale Kartoffel", 93: "Teemo´s Hut", 94: "Mc Donald´s BBQ", 95: "Erstes Auto",
    96: "Nasenspray", 97: "Fat Tend", 98: "GigaChad Tend", 99: "Feeder Tend", 100: "Tend Man Yes!"
};

// Automatischer Karten-Pool mit Seltenheiten (Global für das Album)
window.allCards = [];

for (let id = 1; id <= 100; id++) {
    let rarity = "Common"; // 1 - 46
    
    if (id >= 47 && id <= 70) rarity = "Uncommon";
    else if (id >= 71 && id <= 85) rarity = "Rare";
    else if (id >= 86 && id <= 95) rarity = "Super Rare";
    else if (id >= 96 && id <= 100) rarity = "Ultra Rare";

    window.allCards.push({
        cardId: `${id}`,
        cardNumber: id,
        cardName: cardNames[id],
        rarity: rarity
    });
}

// Drop-Chancen für die einzelnen Slots im Booster
const slotProbabilities = {
    standard: {
        'Common': 75.0, 'Uncommon': 22.0, 'Rare': 3.0, 'Super Rare': 0.0, 'Ultra Rare': 0.0, 'Secret Rare': 0.0
    },
    slot_4: {
        'Common': 0.0,  'Uncommon': 60.0, 'Rare': 39.0, 'Super Rare': 1.0, 'Ultra Rare': 0.0, 'Secret Rare': 0.0
    },
    jackpot: {
        'Common': 0.0,  'Uncommon': 50.0, 'Rare': 43.57, 'Super Rare': 5.0, 'Ultra Rare': 1.43, 'Secret Rare': 0.0
    }
};

// Hilfsfunktion: Wählt eine zufällige Seltenheit basierend auf Prozenten
function rollRarity(probabilities) {
    let rand = Math.random() * 100;
    let cumulative = 0;
    for (let rarity in probabilities) {
        cumulative += probabilities[rarity];
        if (rand <= cumulative) {
            return rarity;
        }
    }
    return 'Common';
}

// Funktion zum Öffnen eines Boosters (5 Karten)
function openBoosterPack() {
    let pack = [];
    
    for (let i = 0; i < 5; i++) {
        let probConfig = slotProbabilities.standard;
        if (i === 3) probConfig = slotProbabilities.slot_4;
        if (i === 4) probConfig = slotProbabilities.jackpot;

        let chosenRarity = rollRarity(probConfig);

        let pool = allCards.filter(c => c.rarity === chosenRarity);
        if (pool.length === 0) {
            pool = allCards.filter(c => c.rarity === 'Common');
        }

        let randomCard = pool[Math.floor(Math.random() * pool.length)];
        pack.push(randomCard);
    }

    return pack;
}