export default { 
    "1": ["b", "False. You cannot transact using SPARQL"],
    "2": "a",
    "3": "SELECT ?person ?handle WHERE { ?person fd:person/handle ?handle.}",
    "4": "SELECT ?person ?handle WHERE { ?person fd:person/handle ?handle. ?person fd:person/favNums 1223.}",
    "5": ["d", "b", "a"],
    "6": "SELECT ?person ?fullName ?favArtists  WHERE { ?person fd:person/fullName ?fullName.  OPTIONAL{?person fd:person/favArtists ?favArtists.}}",
    "7": "If a person's favorite numbers were the same in block 3 as they are now, it returns both the persons' subject ids and favorite numbers.",
    "8": ["c", "?artworkLabel", "The query is finding jdoe's favorite artists, and looking up their artworks in Wikidata"],
    "9": ["(-.-)Zzz...", "No challenge here!"],
    "10": ["(-.-)Zzz...", "No challenge here!"]
}

                    