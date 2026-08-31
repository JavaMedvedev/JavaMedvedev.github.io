'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "9fae14bca9987d34db4be6c99d8c06a7",
"assets/AssetManifest.bin.json": "a06b080e6ec1d161f272724d7c792507",
"assets/AssetManifest.json": "8f015b8b96095456af93d555d7a93d03",
"assets/assets/app_background.png": "471463d10f93d617a5b779f12c94cab0",
"assets/assets/app_foreground.png": "29c7b9783d725ebeac372f8f09704218",
"assets/assets/app_icon.png": "70d9f3f7f0e659964bd86e92f8aa0801",
"assets/assets/Cards/about_850793902a.jpg": "bd192d30633b974507dd9f87f030a572",
"assets/assets/Cards/around.jpg": "bf7b9c032a2d8f64ce49b350c933884b",
"assets/assets/Cards/card_hotel.jpg": "9bccf91ef1dd0bf51efbbc9840e74fca",
"assets/assets/Cards/dining.jpg": "9e7c4d135426b1ae6dc7574e7fc618e7",
"assets/assets/Cards/eco.jpg": "83c80dff0513db85c097bde5babe2ebb",
"assets/assets/Cards/events.jpg": "a5d781853cdb7482bdb25ded4fc3c6e2",
"assets/assets/Cards/fitness.jpg": "b7b5e0cbb9f31e976bab10fcaf9aabd1",
"assets/assets/Cards/inroom.jpg": "81403cd7e325a98a6c58162f2f0075dd",
"assets/assets/Cards/reception.jpg": "93c47bee31db96859dbf2c20122e23f8",
"assets/assets/Cards/spa.jpg": "f01854afca01b2bb26d4bff704b7e3b4",
"assets/assets/Cards/Weather.jpg": "1546a356a3a46f20c2ba518e001342d5",
"assets/assets/Cards/wedding.jpg": "b696585aeb3f5afa31b1e6c73fe57a72",
"assets/assets/fonts/FrutigerBlack.ttf": "28730a4e7ee8ad295a69d5b970dfd33e",
"assets/assets/fonts/Lato-Regular.ttf": "7f690e503a254e0b8349aec0177e07aa",
"assets/assets/fonts/Merriweather-Bold.ttf": "e4a089e69d9fb17af0b6b3390850468b",
"assets/assets/fonts/Merriweather-Italic.ttf": "5c893c810474e8ef33ef49d423cf57a1",
"assets/assets/fonts/Merriweather-Regular.ttf": "f417c6ecc22331e14cdc511a148ae129",
"assets/assets/fonts/Merriweather.ttf": "4c27d0a30c5346c22f1be560631ecabb",
"assets/assets/fonts/PlayfairDisplay-Bold.ttf": "f78a8c62bdf3c9c27b4fa485b8c3d279",
"assets/assets/fonts/SourceSansPro-Regular.otf": "5e1d162e634a102d7da8db597825a764",
"assets/assets/fonts/SourceSansPro-Semibold.otf": "78667e5e4b54fea9bb8552482b39cf2e",
"assets/assets/logo.jpg": "309b2b1d54489e59cffa59b47dc1a869",
"assets/assets/media/6thfloor_3772ff6b31_Copy_340f7ecbed.jpg": "d3a020ac7adf3703131bd4a51303a3c5",
"assets/assets/media/breakfast_31b254c020_Copy_48fce55225.jpg": "466bb49ee592e155dbcdb04489fadbbc",
"assets/assets/media/cafe_5b03d200d6_Copy_9f8979947c.jpg": "fbc49de67da29a0806cf88a1846a24cb",
"assets/assets/media/card_hotel_e67ecf853d.jpg": "9bccf91ef1dd0bf51efbbc9840e74fca",
"assets/assets/media/celebrations_e7cb87f87d_7bfeb2564e.jpg": "e0ed04208e3e068c6d4422826731e4c4",
"assets/assets/media/conferences_905401cabb_85aa3a6151.jpg": "62f87c026381e68d21293d85fc283cb1",
"assets/assets/media/corporate_jpg_2361a88fa4_4e97f75073.png": "a73f998f76f688c78e987edd5482bf60",
"assets/assets/media/dessert_Menu_7fec07345f_bc14718fbb.jpg": "a201c22669fc5a10f95515744e8f4922",
"assets/assets/media/dessert_Menu_7fec07345f_f42fac6dcb.jpg": "a201c22669fc5a10f95515744e8f4922",
"assets/assets/media/dining_7b7aa9b930_a18e28c360.jpg": "9e7c4d135426b1ae6dc7574e7fc618e7",
"assets/assets/media/eco_865ca29d4b_1125df15e2.jpg": "83c80dff0513db85c097bde5babe2ebb",
"assets/assets/media/edera1_cb85e0ee5f_ad8d1c73d5.jpg": "6573a36ec6fc0009691bb45c14ee6d94",
"assets/assets/media/edera2_1df1d342e0_91a13912c8.jpg": "0306da5b0cc035ae09cfa7c9fee4eb67",
"assets/assets/media/empty_hammock_by_tree_bdf4859ec1_Copy_a1eb3a7d8a.jpg": "7692b123cf87d473c12c08575e830e44",
"assets/assets/media/events_6f740ccef0_f33b66285f.jpg": "a5d781853cdb7482bdb25ded4fc3c6e2",
"assets/assets/media/fitness_9289494491_4a78104ce0.jpg": "b7b5e0cbb9f31e976bab10fcaf9aabd1",
"assets/assets/media/freepik_the_style_is_candid_image_photography_with_natural_71063_55e1509e10_e2a6fda8f6.jpeg": "a7822ab261028a3a73be405d86680819",
"assets/assets/media/freepik_the_style_is_candid_image_photography_with_natural_71064_2ec8cc9e97_f8dc2ecd1c.jpeg": "522215860fc3aebe5b2f02123d027c50",
"assets/assets/media/freepik_the_style_is_candid_image_photography_with_natural_87183_73ab4b375e_0ea30322fb.jpeg": "9b16d1c88693a0226fce8a2bf96fa5fd",
"assets/assets/media/freepik_the_style_is_candid_image_photography_with_natural_87184_a5fac3f518_5e1f3c4364.jpeg": "f8d52b2ae67b147c0b6a122847ff369a",
"assets/assets/media/freepik_the_style_is_candid_image_photography_with_natural_87185_504b10d8bc_b8209f9b7e.jpeg": "185c8cf7b15576d375758ff203e67aa1",
"assets/assets/media/freepik_the_style_is_candid_image_photography_with_natural_87186_63e7bef068_33af083300.jpeg": "d579e1d45e90acda62489aaa97e91c80",
"assets/assets/media/gildedlilyhorizontalmenu_20f48b9f24_2d8ae5a0b4.jpg": "23191f0fc4c6dd84277dd3648314320b",
"assets/assets/media/gildedlily_Menu_c1234289ed_b8aa1579f9.jpg": "ff3eda76eb1f41457e3452d33f19c932",
"assets/assets/media/gym_6719562015_Copy_d996fabf43.jpg": "4e75931e23c080d0f7995da093082fbc",
"assets/assets/media/hotelinfo_43879e07e1_d47ceb37c2.jpg": "2ba35c18547e59c4d077702ffdc1a7a1",
"assets/assets/media/internet_4152f848f2_3706887ee6.jpg": "2cebb6e512d4dc45087eddcc78e54174",
"assets/assets/media/internet_7cbd61adb7_4179c15e61.png": "89c932149d25a69696bcce51c08dbeb6",
"assets/assets/media/large_dessert_Menu_7fec07345f_bc14718fbb.jpg": "17f28de169372a3add554bf58b334efe",
"assets/assets/media/large_dining_7b7aa9b930_a18e28c360.jpg": "161e8665a2b8fbed1ec90a373b7ee56e",
"assets/assets/media/large_eco_865ca29d4b_1125df15e2.jpg": "4129cd1c9915ef70db13a415306205c4",
"assets/assets/media/large_events_6f740ccef0_f33b66285f.jpg": "37027c1dccb90cb3abedd11a033aa909",
"assets/assets/media/large_fitness_9289494491_4a78104ce0.jpg": "5d19307de75c418dff3380bb630bc026",
"assets/assets/media/large_internet_7cbd61adb7_4179c15e61.png": "6e289ada53dd9ff1d6a64adeef870b54",
"assets/assets/media/large_local_2ff51bbcd5_0848a48b53.jpg": "44551501841723fc8ddca757a1a00fab",
"assets/assets/media/large_maincourse_Menu_ac65c58659_7f60060c3d.jpg": "22659acd11b8dab9469deb515197bb69",
"assets/assets/media/large_map_45bf9b1381_e58448ee79.png": "c83096a7c9933e2b3845734b264863a4",
"assets/assets/media/large_spa_0be55a8c71_9e2b506b7c.jpg": "8b1a9ae1540697f8f3b21ae794ffe979",
"assets/assets/media/large_starter_Menu_7ca01c479e_89916acf23.jpg": "22991c28c67b7587564a4c9a7f96a7fb",
"assets/assets/media/large_website_236d17dad6_f640e99b67.png": "5b11160663a2e6d7fdc935d46a0ce9db",
"assets/assets/media/large_wedding_ffd0874e71_3ec8a55b0b.jpg": "b80bbfe8bbe7d082f3c58964daa795fe",
"assets/assets/media/large_wine_Menu_eb7376cc74_57abfeef1f.jpg": "7f8c1db44c491297dc5727bfff8f6d57",
"assets/assets/media/lilybanner2_243491bca1_076055bc28.jpg": "90fa80058aea0b50a335ceafaa33ee07",
"assets/assets/media/local_2ff51bbcd5_0848a48b53.jpg": "bf7b9c032a2d8f64ce49b350c933884b",
"assets/assets/media/local_a9507892a0_Copy_5dea148e3e.jpg": "ba56f5573c8424079bdb01193b40de4a",
"assets/assets/media/maincourse_Menu_ac65c58659_7f60060c3d.jpg": "e363962f3cda63fb6562e93e57fa506a",
"assets/assets/media/map_45bf9b1381_e58448ee79.png": "03ad0344a752887e26576bc76849bba9",
"assets/assets/media/medium_dessert_Menu_7fec07345f_bc14718fbb.jpg": "1e4e26151e875b5a75f07c7d124fbbcc",
"assets/assets/media/medium_dining_7b7aa9b930_a18e28c360.jpg": "706fa12faedb5b638665dd7d990124ef",
"assets/assets/media/medium_eco_865ca29d4b_1125df15e2.jpg": "141de8c0b0ae11f029afcdd6bfa1aba4",
"assets/assets/media/medium_events_6f740ccef0_f33b66285f.jpg": "d9a1314c6ce7975d65937f655963c918",
"assets/assets/media/medium_fitness_9289494491_4a78104ce0.jpg": "ed91ecee61f530adf11973531fd5f85e",
"assets/assets/media/medium_internet_7cbd61adb7_4179c15e61.png": "0ea73364bd4cd6e677e263aa2369cb2c",
"assets/assets/media/medium_local_2ff51bbcd5_0848a48b53.jpg": "c9c02eb424c18f4e6aad640b79aa989b",
"assets/assets/media/medium_maincourse_Menu_ac65c58659_7f60060c3d.jpg": "5beb1a7e94fd617be5423296b2f6e6e3",
"assets/assets/media/medium_map_45bf9b1381_e58448ee79.png": "8a0a9c401408c872627c9f72f0491386",
"assets/assets/media/medium_spa_0be55a8c71_9e2b506b7c.jpg": "e6e8e37d2172992878624993714daf14",
"assets/assets/media/medium_starter_Menu_7ca01c479e_89916acf23.jpg": "29d8f6578ef0937c7fa9be33b5b01ead",
"assets/assets/media/medium_website_236d17dad6_f640e99b67.png": "14cc8509e305a09cf1934e91a1141f22",
"assets/assets/media/medium_wedding_ffd0874e71_3ec8a55b0b.jpg": "668c6270288911721771000e8578fa87",
"assets/assets/media/medium_wine_Menu_eb7376cc74_57abfeef1f.jpg": "8bc4003c3bab69a9dc39d6a5ea122168",
"assets/assets/media/modern_elegant_living_room_with_comfortable_sofa_chair_generated_by_artificial_intelligence_d65d18e75d_Copy_899c08ea52.jpg": "eb4a973c33768a68622462b27ac4dd0c",
"assets/assets/media/restaurant_hall_with_tables_decorated_with_tall_vases_with_roses_977fb77089_Copy_237af4d1c2.jpg": "9c15c95dfe108349796ff14f80923770",
"assets/assets/media/slider_Lily1_6009b6733b.jpeg": "50ffb71a631c4cbfc9118f59e497054d",
"assets/assets/media/slider_Lily2_b37220c438.jpeg": "61964dba3f970a2534798b1720ffb163",
"assets/assets/media/slider_Lily3_0bbf13b7d1.jpeg": "25b67cb6e76172704551365f0809edb9",
"assets/assets/media/small_dessert_Menu_7fec07345f_bc14718fbb.jpg": "d0b12565d5185172145eeb8df49be043",
"assets/assets/media/small_dining_7b7aa9b930_a18e28c360.jpg": "e159111d2a85d178807648f9e41b6647",
"assets/assets/media/small_eco_865ca29d4b_1125df15e2.jpg": "32f9df35edabd50a8a61a1d4728cfde3",
"assets/assets/media/small_events_6f740ccef0_f33b66285f.jpg": "3f1cb9b856ae0d71c8fbf6361c58a37c",
"assets/assets/media/small_fitness_9289494491_4a78104ce0.jpg": "ca9d3d412d49c58af27c9a918d4fe463",
"assets/assets/media/small_internet_7cbd61adb7_4179c15e61.png": "12dd9698e48076bb1bfad1aeac26eacb",
"assets/assets/media/small_local_2ff51bbcd5_0848a48b53.jpg": "26412afdd4b0a95c63b95cd55fee14b8",
"assets/assets/media/small_maincourse_Menu_ac65c58659_7f60060c3d.jpg": "420dc945d036033031bb06e5f4081b97",
"assets/assets/media/small_map_45bf9b1381_e58448ee79.png": "34fe44e6619f8357ee3f4990fa6177e2",
"assets/assets/media/small_spa_0be55a8c71_9e2b506b7c.jpg": "49993861bbd4ddde83c7a6f7313582d5",
"assets/assets/media/small_starter_Menu_7ca01c479e_89916acf23.jpg": "86046f8ddef7f0e85b3290dbb96bb999",
"assets/assets/media/small_website_236d17dad6_f640e99b67.png": "9475fb6df63cf07086e42a62e64e4f60",
"assets/assets/media/small_wedding_ffd0874e71_3ec8a55b0b.jpg": "496fa36a409b6f43d949a2cec53f1981",
"assets/assets/media/small_wine_Menu_eb7376cc74_57abfeef1f.jpg": "b127dc6e431370257fbe3cca38eb11c9",
"assets/assets/media/spa_0be55a8c71_9e2b506b7c.jpg": "f01854afca01b2bb26d4bff704b7e3b4",
"assets/assets/media/spa_concept_with_woman_relaxing_water_a4da456b94_Copy_e4c88a1a1d.jpg": "23f9beb0fd1418369203a130e35ea08e",
"assets/assets/media/starter_Menu_7ca01c479e_89916acf23.jpg": "232a059bed1588059ee63426f6df1273",
"assets/assets/media/thumbnail_6thfloor_3772ff6b31_Copy_340f7ecbed.jpg": "9c29e85fb7e7e57b7e375925e76cec3e",
"assets/assets/media/thumbnail_breakfast_31b254c020_Copy_48fce55225.jpg": "dfee369b7d2beae3fa97c29da2afab4c",
"assets/assets/media/thumbnail_cafe_5b03d200d6_Copy_9f8979947c.jpg": "9e10c74c9dd2aa6e552d1068cd25ef06",
"assets/assets/media/thumbnail_card_hotel_e67ecf853d.jpg": "8bbd510c0bff8a349f23f62641192638",
"assets/assets/media/thumbnail_celebrations_e7cb87f87d_7bfeb2564e.jpg": "dc5538e854d02567367e24becf41ea86",
"assets/assets/media/thumbnail_conferences_905401cabb_85aa3a6151.jpg": "5ba217b83ae44b70f42dc55d92383ba6",
"assets/assets/media/thumbnail_corporate_jpg_2361a88fa4_4e97f75073.png": "545352a2744191c0f41744d6cfabd957",
"assets/assets/media/thumbnail_dessert_Menu_7fec07345f_bc14718fbb.jpg": "ae1a58676987d85605679596c56dcff5",
"assets/assets/media/thumbnail_dining_7b7aa9b930_a18e28c360.jpg": "0c9c7bc2c93b849ec3d5e736a614acaa",
"assets/assets/media/thumbnail_eco_865ca29d4b_1125df15e2.jpg": "ecf47373ce1d3389771131ae38193b2a",
"assets/assets/media/thumbnail_edera1_cb85e0ee5f_ad8d1c73d5.jpg": "d9c9953e9484913dffb0ea11fdbc39d2",
"assets/assets/media/thumbnail_edera2_1df1d342e0_91a13912c8.jpg": "7536b8082c4cd6f33752df9acab6eb4a",
"assets/assets/media/thumbnail_empty_hammock_by_tree_bdf4859ec1_Copy_a1eb3a7d8a.jpg": "397d68843036ba64efb65ac818e2fe44",
"assets/assets/media/thumbnail_events_6f740ccef0_f33b66285f.jpg": "e3da382b43dbc223d41cf1f21fd3734c",
"assets/assets/media/thumbnail_fitness_9289494491_4a78104ce0.jpg": "2629d6183bf5b610dbc329a756ba6d47",
"assets/assets/media/thumbnail_freepik_the_style_is_candid_image_photography_with_natural_71063_55e1509e10_e2a6fda8f6.jpeg": "16525f7e291d82c4f276cfd99cf9eeba",
"assets/assets/media/thumbnail_freepik_the_style_is_candid_image_photography_with_natural_71064_2ec8cc9e97_f8dc2ecd1c.jpeg": "decbb7cc34c34f6da69df7240a9a4eb0",
"assets/assets/media/thumbnail_freepik_the_style_is_candid_image_photography_with_natural_87183_73ab4b375e_0ea30322fb.jpeg": "4f9f17aea0bc0fb3f1d4a591c800f03c",
"assets/assets/media/thumbnail_freepik_the_style_is_candid_image_photography_with_natural_87184_a5fac3f518_5e1f3c4364.jpeg": "f9b33998980d45d49dd4da6749ac6795",
"assets/assets/media/thumbnail_freepik_the_style_is_candid_image_photography_with_natural_87185_504b10d8bc_b8209f9b7e.jpeg": "53dcf35037b8dfdea47c54fdd0bfb4f2",
"assets/assets/media/thumbnail_freepik_the_style_is_candid_image_photography_with_natural_87186_63e7bef068_33af083300.jpeg": "cf3fdf13a9c389d46887a504d65dfd80",
"assets/assets/media/thumbnail_gildedlilyhorizontalmenu_20f48b9f24_2d8ae5a0b4.jpg": "208174598e7a677337e82b9ff884558f",
"assets/assets/media/thumbnail_gildedlily_Menu_c1234289ed_b8aa1579f9.jpg": "3159209fa043a21affc7fe314bf78347",
"assets/assets/media/thumbnail_gym_6719562015_Copy_d996fabf43.jpg": "13b45fb8384dd8b6fb771cb6cef28414",
"assets/assets/media/thumbnail_hotelinfo_43879e07e1_d47ceb37c2.jpg": "cdbd3a916dd1c891dc2e0ad882a60897",
"assets/assets/media/thumbnail_internet_4152f848f2_3706887ee6.jpg": "18df066807e8f4fb6a1b6f47d86a5f7e",
"assets/assets/media/thumbnail_internet_7cbd61adb7_4179c15e61.png": "40f1026faa109d859c972a638f48c60f",
"assets/assets/media/thumbnail_lilybanner2_243491bca1_076055bc28.jpg": "a74594619a25f262b4b5f798333bda23",
"assets/assets/media/thumbnail_local_2ff51bbcd5_0848a48b53.jpg": "1babb75599ced98e965955544b1f2dbc",
"assets/assets/media/thumbnail_local_a9507892a0_Copy_5dea148e3e.jpg": "316ad90691c853d1a4df230303a7ef29",
"assets/assets/media/thumbnail_maincourse_Menu_ac65c58659_7f60060c3d.jpg": "44bd37ba1f76ac9ccfc2f6e40cc84e02",
"assets/assets/media/thumbnail_map_45bf9b1381_e58448ee79.png": "5963faa625e217790371744e4d06fc0d",
"assets/assets/media/thumbnail_modern_elegant_living_room_with_comfortable_sofa_chair_generated_by_artificial_intelligence_d65d18e75d_Copy_899c08ea52.jpg": "4d688f51e577faec3b89c17c505074ac",
"assets/assets/media/thumbnail_restaurant_hall_with_tables_decorated_with_tall_vases_with_roses_977fb77089_Copy_237af4d1c2.jpg": "81296ba29b5b35a797f610f9af5f0a5d",
"assets/assets/media/thumbnail_slider_Lily1_6009b6733b.jpeg": "b373d495081304804992b137eef957ce",
"assets/assets/media/thumbnail_slider_Lily2_b37220c438.jpeg": "e5454337f7bb8deec093155345efac1d",
"assets/assets/media/thumbnail_slider_Lily3_0bbf13b7d1.jpeg": "35b1a033112e517288f9b715a2b02829",
"assets/assets/media/thumbnail_spa_0be55a8c71_9e2b506b7c.jpg": "c98cd69794977abefaca80fabf5dcb9e",
"assets/assets/media/thumbnail_spa_concept_with_woman_relaxing_water_a4da456b94_Copy_e4c88a1a1d.jpg": "db6aaf679d3d63f6e003be3c5133d40f",
"assets/assets/media/thumbnail_starter_Menu_7ca01c479e_89916acf23.jpg": "1e6538f77acfcac145d382c0a5a244c0",
"assets/assets/media/thumbnail_umbrella_chair_b2efc44de6_bd0801c982.jpg": "8643bbd09fd106c0be05a01cb6565244",
"assets/assets/media/thumbnail_website_236d17dad6_f640e99b67.png": "7e24b0e1195158357d7ea9e539092862",
"assets/assets/media/thumbnail_wedding_ffd0874e71_3ec8a55b0b.jpg": "9f39376de32f6c054d3d8dbb59a8debb",
"assets/assets/media/thumbnail_wedding_table_decorations_1915f6a102_Copy_057b98c806.jpg": "d2b034688d49238f4625ded15ad8b4c6",
"assets/assets/media/thumbnail_wine_Menu_eb7376cc74_57abfeef1f.jpg": "0ce94b4c482bd5ef8eff8f3d883f954a",
"assets/assets/media/thumbnail_young_woman_relaxing_jacuzzi_7b5b1cb738_Copy_2948b125e7.jpg": "8e50e99785cde5e8baaf94c038350aab",
"assets/assets/media/umbrella_chair_b2efc44de6_bd0801c982.jpg": "9ae8b9dbd1a0b041e33da86b8ab93198",
"assets/assets/media/website_236d17dad6_f640e99b67.png": "af66f457e52f59f52239d713f21a5e01",
"assets/assets/media/wedding_ffd0874e71_3ec8a55b0b.jpg": "b696585aeb3f5afa31b1e6c73fe57a72",
"assets/assets/media/wedding_table_decorations_1915f6a102_Copy_057b98c806.jpg": "19a6dad141d19d7bd3aa6e2b7d782822",
"assets/assets/media/wine_Menu_eb7376cc74_57abfeef1f.jpg": "9778533411f3138a3cc6e0d7d986f0a8",
"assets/assets/media/young_woman_relaxing_jacuzzi_7b5b1cb738_Copy_2948b125e7.jpg": "2d8e6bab2a730f69a718c4ca27b6aca4",
"assets/assets/splash1.jpg": "c1935c3b3847b78636180c5094048194",
"assets/assets/splash2.jpg": "bb8e386bdf445e60075669058b81c47a",
"assets/assets/splash3.jpg": "6d55e53ba3612aaca7525167ef650d20",
"assets/assets/splash4.jpg": "0d735748b538952e1fd6e521cd485979",
"assets/assets/strapi_snapshot/menus.json": "782680ff277c7ef17ebb858d136656a9",
"assets/assets/strapi_snapshot/page_102.json": "eb6918b1eca0384530f43af1d25ec906",
"assets/assets/strapi_snapshot/page_103.json": "98cab5b1bf2fb60ab996f4b4983baaa9",
"assets/assets/strapi_snapshot/page_104.json": "5e2c16671e5728bde65e48192d27c5af",
"assets/assets/strapi_snapshot/page_106.json": "c6cf9359d6262e8b5d85db2fa82fe4e6",
"assets/assets/strapi_snapshot/page_107.json": "811eb04b1905c617a2d8a2ed92117ed2",
"assets/assets/strapi_snapshot/page_108.json": "740b75c588127a081e4542a46b116fcc",
"assets/assets/strapi_snapshot/page_109.json": "1878e11cd7e072fd2f3d11158639c951",
"assets/assets/strapi_snapshot/page_110.json": "b79df63fab551eb6317e8e28e6e660dc",
"assets/assets/strapi_snapshot/page_contact.json": "968197f7e9e2211f0acb3525d36ea65e",
"assets/assets/strapi_snapshot/page_menu.json": "8376a7feb42728444e832ef2469d46c8",
"assets/assets/strapi_snapshot/shortcuts-panel.json": "ecf64e7a1c3e04118039a64e17231320",
"assets/assets/suji_logo_transparent_white.png": "95c91cc115ba3b2f85046eb19034cbc3",
"assets/FontManifest.json": "0b91ff72aee1feed5ac91bfba874dea6",
"assets/fonts/MaterialIcons-Regular.otf": "8fa8ef50f492a5723f7338f41b909e67",
"assets/NOTICES": "922079a6b561d249b4074dd561d8bafa",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "afa9ef4863cf62bb936bf1d1bed6da77",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "90f3944c7a744a94c022caccf005250d",
"/": "90f3944c7a744a94c022caccf005250d",
"main.dart.js": "7eb5b6b1725c427a2f261d743fd76709",
"manifest.json": "190ee91dce6fb74e06ef6e462a9a1a9f",
"version.json": "530b93af90233b33ce911dfbba7d9294"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
