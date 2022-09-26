const data = "https://raw.githubusercontent.com/glottolog/glottolog-cldf/master/cldf/languages.csv";
//var alternativeNames = "./languages/Glottolog-language-data/alternativeNames.csv"
const alternativeNames = "./alternativeNames.json";
const languagePack = "./glottolog-language-data-pack.json";
const fetch = require("cross-fetch");
<<<<<<< HEAD
const { writeJson } = require("fs-extra");
const fs = require("fs");
const { join } = require("path");

function get_alternative_names() {
    let rawdata = fs.readFileSync(alternativeNames);
    let altNames = JSON.parse(rawdata);
    //console.log(altNames)
    return altNames;
    
}
=======
const { writeJson, readJSON } = require("fs-extra");
>>>>>>> b21f49f (merge in changes from master)

(async () => {
    let response = await fetch(data, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    response = await response.text();

<<<<<<< HEAD
    const alternativeNameDict = get_alternative_names();
    
=======
    const alternativeNameDict = await readJSON(alternativeNames);

>>>>>>> b21f49f (merge in changes from master)
    const languageData = [];

    for (let line of response.split("\n")) {
        if (line.match("ID")) continue;

        let components,
            languageCode,
            name,
            macroarea,
            latitude,
            longitude,
            glottocode,
            iso639Code,
            country,
            sameAsList,
            sameAsDict,
            geojson,
            geoLocation,
            alternateName;

        try {
            components = line.split(",");
            languageCode = components.shift();
            name = components.shift();
            macroarea = components.shift();
            console.log(macroarea)
            latitude = components.shift();
            longitude = components.shift();
            glottocode = components.shift();

            // get alternative names
            if (name in alternativeNameDict) {
<<<<<<< HEAD
                
                if (alternativeNameDict[name].join().length > 0) { // some entries have a empty string 
=======
                if (alternativeNameDict[name].join().length > 0) {
                    // some entries have a empty string
>>>>>>> b21f49f (merge in changes from master)
                    alternateName = alternativeNameDict[name];
                } else {
                    alternateName = [];
                }
            } else {
                alternateName = [];
            }

            geojson = {
                type: "Feature",
                name: name,
                geometry: {
                    type: "GeoCoordinates",
                    coordinates: [latitude, longitude],
                },
            };

            geoLocation = {
                "@id": "#" + name,
                "@type": "GeoCoordinates",
                name: `Geographical coverage for ${name}`,
                geojson: JSON.stringify(geojson),
            };

            // add iso 639 codes as links to the ethnologue source
            iso639Code = components.shift();
            sameAsList = [];

            if (iso639Code) {
                sameAsDict = {};
                sameAsDict["@id"] = "https://www.ethnologue.com/language/" + iso639Code;
                sameAsList.push(sameAsDict);
            }

            country = components.shift(); // glottolog uses the ISO 3166-1 alpha-2 codes

            if (name && languageCode) {
                languageData.push({
                    "@id": `https://glottolog.org/resource/languoid/id/${languageCode}`,
                    "@type": "Language",
                    languageCode,
                    name,
                    geojson: geoLocation,
                    source: "Glottolog",
                    containtInPlace: macroarea, // needed to compare to austlang data which is limited to Australia
                    sameAs: sameAsList,
                    alternateName,
                });
            }
        } catch (error) {
            console.log("here", error.message, components);
        }
    }

    await writeJson(languagePack, languageData, {"spaces":4});
})();
