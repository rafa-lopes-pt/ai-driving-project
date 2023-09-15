import { TRAFFIC_MODES } from "./Simulation";
import { SavedDataType } from "../components/SimulationPane";
const OPTIMAL_DATA = {
    [TRAFFIC_MODES.LOW]: {
        neuralNetwork: {
            levels: [
                {
                    inputs: [0, 0, 0, 0, 0.4518508417710517],
                    outputs: [0, 0, 0, 0, 0, 1],
                    biases: [
                        0.10226014953045803, 0.8010342208565626,
                        -0.13184171150490842, 0.23183727615114025,
                        0.8146245789893893, -0.43617365051069323,
                    ],
                    weights: [
                        [
                            0.12032607024644526, 0.4061131995548328,
                            -0.9872264943573188, -0.7915764730889798,
                            -0.8354752486900463, -0.29107829336293545,
                        ],
                        [
                            0.4543134966142024, 0.2919344854469865,
                            0.7462701946358896, -0.5150863060848452,
                            -0.16014775381939983, -0.963492530830871,
                        ],
                        [
                            0.9697423758323045, 0.2518391116073533,
                            0.6936446206534961, 0.02927844514454181,
                            -0.4775905104452207, 0.07747467730070134,
                        ],
                        [
                            0.9890837675641644, -0.8058108386810017,
                            -0.7549144116324531, -0.20205469799327203,
                            0.5661881157674076, -0.569194809997033,
                        ],
                        [
                            0.10212167771338532, -0.2278234666709369,
                            -0.5420641145562297, -0.546500834696809,
                            -0.6082690633741883, -0.7764795810002239,
                        ],
                    ],
                },
                {
                    inputs: [0, 0, 0, 0, 0, 1],
                    outputs: [1, 1, 1, 0],
                    biases: [
                        0.07237012054068837, -0.7273556722936578,
                        0.5733119953595067, 0.7682726341644022,
                    ],
                    weights: [
                        [
                            -0.4956615880965598, 0.7199212483353199,
                            -0.4498692964201909, 0.4588108157533426,
                        ],
                        [
                            0.9721609342174449, -0.6410116462069511,
                            0.3859035045327872, -0.5239073846646118,
                        ],
                        [
                            -0.06774070525031006, -0.7193312746414784,
                            0.0859562964567131, -0.05046795472196863,
                        ],
                        [
                            -0.4484756122929916, 0.45120625323459107,
                            0.036838400017397355, -0.0676451430896754,
                        ],
                        [
                            -0.02143108284675277, -0.31083838799753893,
                            -0.31226561472320014, -0.4554910185392176,
                        ],
                        [
                            0.7621017281865925, -0.19267431452602457,
                            0.6647067300791434, 0.5581425113285112,
                        ],
                    ],
                },
            ],
        },
        inputs: {
            carCount: 100,
            mutationRatio: 0.15,
            rayCount: 5,
            rayLength: 150,
            raySpread: 2,
            trafficMode: "LOW",
        },
    } as SavedDataType,
    [TRAFFIC_MODES.MEDIUM]: {
        neuralNetwork: {
            levels: [
                {
                    inputs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    outputs: [1, 0, 0, 1, 1, 1],
                    biases: [
                        -0.1714063989786381, 0.2756624019483158,
                        0.19757668364282013, -0.6544879211077581,
                        -0.33947288256642605, -0.47553067555432355,
                    ],
                    weights: [
                        [
                            0.6313673758986093, 0.014138270841814765,
                            0.5425394039829, -0.6213641414621368,
                            -0.22811937361187296, -0.7116699425859433,
                        ],
                        [
                            -0.3801194565728254, 0.013316192344607097,
                            0.5913624275560814, -0.5921452102765816,
                            -0.05755158620565337, 0.3877146326619143,
                        ],
                        [
                            0.08069730504335079, 0.3340674204748125,
                            0.7683173445802619, -0.23238651069881783,
                            -0.05181138428916174, -0.12938598553687752,
                        ],
                        [
                            0.38595002555331315, 0.1773815886687566,
                            -0.054170888885900464, -0.6313245352233431,
                            -0.4244313288862277, -0.0074788211573689894,
                        ],
                        [
                            -0.401803721192105, 0.315696286044234,
                            0.0046937187951423265, -0.2600553147122484,
                            -0.2261521800696142, 0.12197664123817854,
                        ],
                        [
                            -0.0886356661281564, -0.1620455929014468,
                            0.4444997753054542, -0.018785848491010074,
                            -0.24694158847708852, 0.45438535108970035,
                        ],
                        [
                            0.44082737253097326, 0.37498145118485765,
                            -0.43330428644918384, 0.6043817321681323,
                            -0.536626891609434, -0.3434388904661826,
                        ],
                        [
                            0.48612812790504645, -0.2189314148409324,
                            0.4499537375385149, 0.6022851122699915,
                            -0.18604148750699312, 0.17281811663104607,
                        ],
                        [
                            -0.4655086067385874, 0.41374353764548866,
                            -0.22490370028909062, 0.2310482061335471,
                            -0.1602998701145072, 0.448830690150799,
                        ],
                        [
                            0.5001159352249158, 0.5035615801864487,
                            -0.1764886065547422, 0.4201177638961251,
                            -0.1772734660599182, 0.7238274228107267,
                        ],
                    ],
                },
                {
                    inputs: [1, 0, 0, 1, 1, 1],
                    outputs: [1, 0, 0, 0],
                    biases: [
                        -0.09935136925205879, -0.2687281626851469,
                        0.6582264843524823, 0.4003560175660369,
                    ],
                    weights: [
                        [
                            -0.056289982011473214, -0.5219607977671766,
                            -0.35400989879623646, -0.592099649149697,
                        ],
                        [
                            -0.3159482893545109, 0.27261081791300684,
                            -0.5570267581225266, -0.035220478182913184,
                        ],
                        [
                            -0.04072444359237873, 0.47844173409141844,
                            0.40465586807737397, 0.12053052980615064,
                        ],
                        [
                            0.19374344529805895, -0.13211476600234387,
                            0.6521757091418037, -0.5618700992352093,
                        ],
                        [
                            -0.07821815468812213, -0.7683698141359022,
                            0.8141626822035735, -0.5783943777466042,
                        ],
                        [
                            0.6259535664180942, 0.2846910567012872,
                            -0.6262716621498677, -0.33113442067474846,
                        ],
                    ],
                },
            ],
        },
        inputs: {
            carCount: 100,
            mutationRatio: 0.15,
            rayCount: 10,
            rayLength: 150,
            raySpread: 2,
            trafficMode: "MEDIUM",
        },
    } as SavedDataType,
    [TRAFFIC_MODES.HEAVY]: {
        neuralNetwork: {
            levels: [
                {
                    inputs: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0.17328317913021718, 0.29202434693792534,
                        0.3777232125878821, 0.44197239375614994,
                        0.49147107646635846,
                    ],
                    outputs: [1, 1, 0, 1, 0, 0],
                    biases: [
                        -0.4000678209836428, 0.022237864749079322,
                        0.29871959216654165, -0.4255963110396359,
                        0.38981163266151386, -0.018913786348582012,
                    ],
                    weights: [
                        [
                            -0.40218113957372326, -0.09951105449659556,
                            -0.1635627008282608, -0.1284765870455175,
                            0.6685245714490756, 0.40148255023212703,
                        ],
                        [
                            -0.18897753698796055, -0.5699493398637978,
                            -0.06576234224766596, -0.22602293181571478,
                            -0.3620814804507142, -0.20069984795358134,
                        ],
                        [
                            -0.2839589048033558, -0.21019516135230995,
                            0.5039260455179688, -0.5285454946671689,
                            -0.24280941766722214, -0.4911446335251703,
                        ],
                        [
                            0.11800421517011131, -0.6879054067340731,
                            -0.44832292013306363, 0.3252439968407088,
                            -0.2655350456684657, -0.2842779168425793,
                        ],
                        [
                            0.39599170112216353, 0.07562320070438595,
                            -0.005262877184309303, -0.11758651615561469,
                            0.5297209314154282, 0.3822856580208149,
                        ],
                        [
                            0.09200507161308544, 0.34574009273791306,
                            -0.30199493563234975, 0.20941316775220584,
                            0.08429499659719572, 0.6180253110034867,
                        ],
                        [
                            -0.059558943159113045, 0.06638251779520908,
                            0.2009262224090813, -0.224132949271106,
                            0.14980300657004075, 0.34087198052878837,
                        ],
                        [
                            -0.3926229480014172, -0.03846103338843937,
                            -0.2603107777957293, -0.10738226137515484,
                            0.3549196945586046, 0.22246274156637671,
                        ],
                        [
                            0.12079161789196408, 0.4560590607539652,
                            0.4626118006789891, 0.0006745875936211704,
                            -0.1857204484382822, -0.16441362377405147,
                        ],
                        [
                            -0.24117487210025204, -0.011183238735342743,
                            0.18477838852872683, -0.1198479846939353,
                            0.41144510017569424, 0.40639661630862295,
                        ],
                        [
                            -0.4445891464034546, -0.40228486861550744,
                            -0.11825838207580233, 0.4585876320786392,
                            0.5666574563386817, -0.48064902633775614,
                        ],
                        [
                            0.3833491057218428, 0.4851348914707136,
                            -0.1872640168083131, -0.24759098260494183,
                            0.07401566074585972, -0.16126809150368218,
                        ],
                        [
                            0.10580569969128509, -0.08692668326229372,
                            0.37752111423403867, 0.4210231933369981,
                            -0.02071565288674647, 0.4573118947818106,
                        ],
                        [
                            -0.040700397428813845, 0.5967816414628377,
                            -0.1694560008764934, -0.012274253555957931,
                            0.2982344572528331, 0.3179405074606797,
                        ],
                        [
                            -0.40315420665592555, 0.42628445926151726,
                            0.12162630479317302, -0.09239781642692486,
                            0.2563549662241874, -0.2597170880273052,
                        ],
                        [
                            -0.28416780975169326, 0.33449265256948,
                            -0.6134263772148808, 0.10538171249203604,
                            -0.23105236772184548, 0.788269092075138,
                        ],
                        [
                            0.021145884601452752, 0.4559079103083482,
                            -0.05899409298110918, -0.27267755566114804,
                            -0.5038541899786945, 0.7129035319068288,
                        ],
                        [
                            0.1701562958570926, 0.03931445606944084,
                            0.050837069055823414, 0.24014877413518565,
                            0.6585547288750723, -0.11246919529797184,
                        ],
                        [
                            0.2980160237152907, -0.38153976819986657,
                            -0.16658278424113335, -0.4898977041858843,
                            0.4296917719181198, -0.5652876612066747,
                        ],
                        [
                            -0.3677858198204944, 0.1726742008774132,
                            0.4798190068161739, 0.05179004623719768,
                            -0.38894320413541283, -0.20232180180058573,
                        ],
                    ],
                },
                {
                    inputs: [1, 1, 0, 1, 0, 0],
                    outputs: [1, 1, 1, 0],
                    biases: [
                        0.19184374052755498, -0.2606427814307405,
                        -0.2963105823463214, 0.5043629820800652,
                    ],
                    weights: [
                        [
                            0.2637670857205312, -0.26047029970761165,
                            0.178849720850958, 0.27963017779965615,
                        ],
                        [
                            -0.33725737685728874, 0.21641224718552507,
                            -0.199946629749928, -0.1384401923771413,
                        ],
                        [
                            0.3109416733309019, 0.4551033927081652,
                            0.6302627843982642, 0.1667894571587733,
                        ],
                        [
                            0.5182762240977252, 0.10189680377807257,
                            -0.24519143997005782, -0.3500847442302247,
                        ],
                        [
                            0.0694446835813601, -0.15420572994788073,
                            0.18941504349494864, -0.1261472894718337,
                        ],
                        [
                            0.01500102332368139, -0.2749415026538828,
                            -0.15310460813405286, 0.0384748280863714,
                        ],
                    ],
                },
            ],
        },
        inputs: {
            carCount: 200,
            mutationRatio: 0.15,
            rayCount: 20,
            rayLength: 160,
            raySpread: 2.15,
            trafficMode: "HEAVY",
        },
    } as SavedDataType,
};

export default OPTIMAL_DATA;
