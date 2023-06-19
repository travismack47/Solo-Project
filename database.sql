
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE traders (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255)
);

CREATE TABLE quests (
  "id" SERIAL PRIMARY KEY,
  "trader_id" INT,
  "name" VARCHAR(255),
  "description" TEXT,
  FOREIGN KEY (trader_id) REFERENCES traders(id)
);

CREATE TABLE user_quests (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "quest_id" INT,
  "is_complete" BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (quest_id) REFERENCES quests(id)
);

CREATE TABLE notes (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "description" TEXT,
  "timestamp" TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES "user"(id)
);

INSERT INTO traders (name)
VALUES ('Prapor'),
       ('Therapist'),
       ('Skier'),
       ('Jaeger'), 
       ('Peacekeeper'),
       ('Mechanic'),
       ('Ragman');

INSERT INTO quests (trader_id, name, description)
VALUES ('1', 'Debut', 'Eliminate 5 scavs all over the Tarkov territory - Obtain and hand over 2 MP-133 shotguns');


select * from quests;

INSERT INTO quests (trader_id, name, description)
VALUES ('1', 'Search Mission', 'Find Prapor`s missing convoy on Woods - Locate the temporary USEC camp - Survive and extract');

INSERT INTO quests (trader_id, name, description)
VALUES ('1', 'Checking', 'Obtain the bronze pocket watch on Customs - Hand over the watch to Prapor');

INSERT INTO quests (trader_id, name, description)
VALUES ('1', 'Shootout Picnic', 'Eliminate 15 scavs on Woods');

INSERT INTO quests (trader_id, name, description)
VALUES ('1', 'Delivery from the Past', 'Obtain the secure folder in the Director`s office at the Customs terminal warehouse - Stash the package in the Factory break room - Survive and extract from Factory');

INSERT INTO quests (trader_id, name, description)
VALUES ('2', 'Shortage', 'Find 3 Salewa first aid kits in raid - Hand over 3 Salewas to Therapist');

INSERT INTO quests (trader_id, name, description)
VALUES ('2', 'Operation Aquarius - Part 1', 'Find the water hidden inside the dorms on Customs - Survive and extract');

INSERT INTO quests (trader_id, name, description)
VALUES ('2', 'Operation Aquarius - Part 2', 'Eliminate 15 scavs on Customs');

INSERT INTO quests (trader_id, name, description)
VALUES ('2', 'Sanitary Standards - Part 1', 'Find 1 gas analyzer in raid - Hand over gas analyzer to Therapist');

INSERT INTO quests (trader_id, name, description)
VALUES ('2', 'Sanitary Standards - Part 2', 'Find 2 gas analyzers in raid - Hand over gas analyzers to Therapist');

INSERT INTO quests (trader_id, name, description)
VALUES ('3', 'Supplier', 'Hand over 1 found in raid Module-3M armor to Skier - Hand over 1 found in raid TOZ-106 shotgun to Skier');

INSERT INTO quests (trader_id, name, description)
VALUES ('3', 'The Extortionist', 'Obtain the hidden valuable cargo on Customs - Hand over the valuable cargo to Skier');

INSERT INTO quests (trader_id, name, description)
VALUES ('3', 'Stirrup', 'Eliminate 3 PMCs while using pistols');

INSERT INTO quests (trader_id, name, description)
VALUES ('3', 'What`s on the Flash Drive?', 'Find 2 secure flash drives in raid - Hand over 2 secure flash drives to Skier');

INSERT INTO quests (trader_id, name, description)
VALUES ('3', 'Golden Swag', 'Find the Golden Zibbo lighter - Stash the lighter in the bunkhouse in the trailer parking lot on Customs');

INSERT INTO quests (trader_id, name, description)
VALUES ('4', 'Acquaintance', 'Find 3 Iskra rations in raid - Find 2 Emelya rye croutons in raid - Find 2 Large cans of beef stew in raid');

INSERT INTO quests (trader_id, name, description)
VALUES ('4', 'The Survivalist Path - Unprotected but Dangerous', 'Eliminate 5 scavs without wearing body armor on Woods');

INSERT INTO quests (trader_id, name, description)
VALUES ('4', 'The Survivalist Path - Thrifty', 'Stash 1 Iskra ration and 1 bottle of water in the ZB-016 bunker on Woods - Stash 1 Iskra ration and 1 bottle of water in the ZB-014 bunker on Woods');

INSERT INTO quests (trader_id, name, description)
VALUES ('4', 'The Survivalist Path - Zhivchik', 'Survive for 5 minutes while suffering from complete dehydration (excluding Factory) - Survive and extract');

INSERT INTO quests (trader_id, name, description)
VALUES ('4', 'The Survivalist Path - Wounded Beast', 'Eliminate 3 scavs while suffering from the pain effect');

INSERT INTO quests (trader_id, name, description)
VALUES ('5', 'Fishing Gear', 'Find the boat hidden next to the breakwater on Shoreline - Stash 1 sniper rifle and 1 multitool in the boat - Survive and extract');

INSERT INTO quests (trader_id, name, description)
VALUES ('5', 'Tigr Safari', 'Mark the 3 Tigr vehicles on Customs with MS2000 Markers - Survive and extract');

INSERT INTO quests (trader_id, name, description)
VALUES ('5', 'Scrap Metal', 'Mark the 3 T-90 tanks on Shoreline with MS2000 Markers - Surive and extract');

INSERT INTO quests (trader_id, name, description)
VALUES ('5', 'Eagle Eye', 'Find the UAV crash sites on Shoreline - Obtain the SAS disks from each crash site - Hand over the SAS disks to Peacekeeper');

INSERT INTO quests (trader_id, name, description)
VALUES ('5', 'Humanitarian Supplies', 'Mark the 2 UN trucks on Shoreline with MS2000 Markers - Obtain and hand in 5 MRE ration packs to Peacekeeper - Eliminate 10 scavs on Shoreline while wearing a UN uniform');

INSERT INTO quests (trader_id, name, description)
VALUES ('6', 'Introduction', 'Find Jaeger`s camp on Woods - Obtain and hand in Jaeger`s encrypted message to Mechanic');

INSERT INTO quests (trader_id, name, description)
VALUES ('6', 'Gunsmith - Part 1', 'Modify an MP-133 shotgun to comply with required specification');

INSERT INTO quests (trader_id, name, description)
VALUES ('6', 'Gunsmith - Part 2', 'Modify an AKS-74U to comply with required specification');

INSERT INTO quests (trader_id, name, description)
VALUES ('6', 'Gunsmith - Part 3', 'Modify an MP5 to comply with required specification');

INSERT INTO quests (trader_id, name, description)
VALUES ('6', 'Gunsmith - Part 4', 'Modify an SKS to comply with required specification');

INSERT INTO quests (trader_id, name, description)
VALUES ('7', 'Only Business', 'Obtain level 2 loyalty with Ragman');

INSERT INTO quests (trader_id, name, description)
VALUES ('7', 'Make ULTRA Great Again', 'Eliminate 25 scavs on Interchange');

INSERT INTO quests (trader_id, name, description)
VALUES ('7', 'Big Sale', 'Locate and check the AVOKADO, KOSTIN, DINO CLOTHES, tRend, and TOP BRAND stores on Interchange - Survive and extract');

INSERT INTO quests (trader_id, name, description)
VALUES ('7', 'A Fuel Matter', 'Mark the 2 groups of fuel tanks with MS2000 Markers on Reserve - Survive and extract');

INSERT INTO quests (trader_id, name, description)
VALUES ('7', 'Inventory Check', 'Check the 2 arsenals in the western barracks on Reserve - Check the 2 arsenals in the northern barracks on Reserve - Survive and extract');