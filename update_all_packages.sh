#!/bin/sh

cd languages

# update Austlang data pack
cd Austlang-language-data
node create-language-data-set.js
cd ..

# update Glottolog dataset
cd Glottolog-language-data
node create-language-data-set.js
cd ..

# update ethnologue dataset
cd ISO-639-3-language-data
node create-language-data-pack.js

# crossreference austlang and glottolog data packs and
node cross-reference-languages.js
cd ..

# update country data set
cd countries/ISO-639-6-country-data
node create-country-data-pack
cd ..
node countries_create_main_dataset.js
cd ..

