'use strict';

// Setup
let Question = require('.models/answer.js');
let mongoose = require('mongoose');


// Connecting to Mongo DB
mongoose.connect('mongodb://localhost/cardsAgainstGiphyApp', (error) => {
	if (error) {
		console.log('Cannot connect to db. Error: ', err);
	} else {
		console.log('Connected to database.');
	}
});

// List of search terms (objects in an array)
let answerObject = [

// Actions
{id: #, text: 'breaking up'},
{id: #, text: 'cooking'},
{id: #, text: 'crying'},
{id: #, text: 'dancing'},
{id: #, text: 'dreaming'},
{id: #, text: 'drinking'},
{id: #, text: 'eating'},
{id: #, text: 'fainting'},
{id: #, text: 'falling'},
{id: #, text: 'fighting'},
{id: #, text: 'finger guns'},
{id: #, text: 'flirting'},
{id: #, text: 'laughing'},
{id: #, text: 'pout'},
{id: #, text: 'running'},
{id: #, text: 'singing'},
{id: #, text: 'slapping'},
{id: #, text: 'sleeping'},
{id: #, text: 'smiling'},
{id: #, text: 'smoking'},
{id: #, text: 'sneezing'},
{id: #, text: 'spinning'},
{id: #, text: 'swimming'},
{id: #, text: 'tossing drink'},
{id: #, text: 'waiting'},
{id: #, text: 'middle finger'},

// Adjectives
{id: #, text: 'black and white'},
{id: #, text: 'bright'},
{id: #, text: 'cold'},
{id: #, text: 'creepy'},
{id: #, text: 'cute'},
{id: #, text: 'dark'},
{id: #, text: 'funny'},
{id: #, text: 'hd'},
{id: #, text: 'hot'},
{id: #, text: 'pretty'},
{id: #, text: 'scary'},
{id: #, text: 'sexy'},
{id: #, text: 'slow motion'},
{id: #, text: 'trippy'},
{id: #, text: 'vintage'},
{id: #, text: 'weird'},

// Animals
{id: #, text: 'badger'},
{id: #, text: 'bat'},
{id: #, text: 'bear'},
{id: #, text: 'bird'},
{id: #, text: 'bulldog'},
{id: #, text: 'butterfly'},
{id: #, text: 'camel'},
{id: #, text: 'cat'},
{id: #, text: 'caterpillar'},
{id: #, text: 'chicken'},
{id: #, text: 'chihuahua'},
{id: #, text: 'corgi'},
{id: #, text: 'cow'},
{id: #, text: 'crab'},
{id: #, text: 'deer'},
{id: #, text: 'dog'},
{id: #, text: 'dragon'},
{id: #, text: 'duck'},
{id: #, text: 'eagle'},
{id: #, text: 'echidna'},
{id: #, text: 'elephant'},
{id: #, text: 'ferret'},
{id: #, text: 'fish'},
{id: #, text: 'fox'},
{id: #, text: 'frog'},
{id: #, text: 'giraffe'},
{id: #, text: 'goat'},
{id: #, text: 'grumpy cat'},
{id: #, text: 'hamster'},
{id: #, text: 'hedgehog'},
{id: #, text: 'hippo'},
{id: #, text: 'horse'},
{id: #, text: 'insect'},
{id: #, text: 'jellyfish'},
{id: #, text: 'kangaroo'},
{id: #, text: 'koala'},
{id: #, text: 'lion'},
{id: #, text: 'lizard'},
{id: #, text: 'lobster'},
{id: #, text: 'maru'},
{id: #, text: 'monkey'},
{id: #, text: 'mouse'},
{id: #, text: 'octopus'},
{id: #, text: 'otter'},
{id: #, text: 'owl'},
{id: #, text: 'panda'},
{id: #, text: 'penguin'},
{id: #, text: 'pig'},
{id: #, text: 'polar bear'},
{id: #, text: 'poodle'},
{id: #, text: 'porcupine'},
{id: #, text: 'praying mantis'},
{id: #, text: 'pug'},
{id: #, text: 'rabbit'},
{id: #, text: 'raccoon'},
{id: #, text: 'red panda'},
{id: #, text: 'shark'},
{id: #, text: 'sheep'},
{id: #, text: 'skunk'},
{id: #, text: 'sloth'},
{id: #, text: 'snake'},
{id: #, text: 'spider'},
{id: #, text: 'squirrel'},
{id: #, text: 'starfish'},
{id: #, text: 'tiger'},
{id: #, text: 'turtle'},
{id: #, text: 'unicorn'},
{id: #, text: 'whale'},
{id: #, text: 'wolf'},

// Anime
{id: #, text: 'berserk'},
{id: #, text: 'black lagoon'},
{id: #, text: 'bleach'},
{id: #, text: 'cardcaptor sakura'},
{id: #, text: 'code geass'},
{id: #, text: 'cowboy bebop'},
{id: #, text: 'death note'},
{id: #, text: 'evangelion'},
{id: #, text: 'flcl'},
{id: #, text: 'fullmetal alchemist'},
{id: #, text: 'gundam'},
{id: #, text: 'hamtaro'},
{id: #, text: 'hayao miyazaki'},
{id: #, text: 'hetalia'},
{id: #, text: 'hinata hyuga'},
{id: #, text: 'inuyasha'},
{id: #, text: 'kakashi hatake'},
{id: #, text: 'kawaii'},
{id: #, text: 'kiba'},
{id: #, text: 'manga'},
{id: #, text: 'my neighbor totoro'},
{id: #, text: 'naruto'},
{id: #, text: 'ninja scroll'},
{id: #, text: 'one piece'},
{id: #, text: 'pokemon'},
{id: #, text: 'princess mononoke'},
{id: #, text: 'rock lee'},
{id: #, text: 'sailor moon'},
{id: #, text: 'sakura'},
{id: #, text: 'samurai champloo'},
{id: #, text: 'spaceship battleship yamato'},
{id: #, text: 'spirited away'},
{id: #, text: 'trigun'},

// Art and Design (lame stuff mostly)
{id: #, text: '3d'},
{id: #, text: 'animation'},
{id: #, text: 'architecture'},
{id: #, text: 'art'},
{id: #, text: 'black and white'},
{id: #, text: 'cinemagraph'},
{id: #, text: 'collage'},
{id: #, text: 'design'},
{id: #, text: 'geometry'},
{id: #, text: 'glitch'},
{id: #, text: 'illustration'},
{id: #, text: 'loop'},
{id: #, text: 'mash up'},
{id: #, text: 'morph'},
{id: #, text: 'photography'},
{id: #, text: 'pixel'},
{id: #, text: 'psychedelic'},
{id: #, text: 'sculpture'},
{id: #, text: 'timelapse'},
{id: #, text: 'transparent'},
{id: #, text: 'typography'},

// Cartoons and Comics
{id: #, text: '101 dalmatians'},
{id: #, text: 'adult swim'},
{id: #, text: 'adventure time'},
{id: #, text: 'aeon flux'},
{id: #, text: 'aladdin'},
{id: #, text: 'alice in wonderland'},
{id: #, text: 'alvin and the chipmunks'},
{id: #, text: 'animaniacs'},
{id: #, text: 'aqua teen hunger force'},
{id: #, text: 'archer'},
{id: #, text: 'archie comics'},
{id: #, text: 'arthur'},
{id: #, text: 'bambi'},
{id: #, text: 'batman'},
{id: #, text: 'beauty and the beast'},
{id: #, text: 'beavis and butthead'},
{id: #, text: 'betty boop'},
{id: #, text: 'bobs burgers'},
{id: #, text: 'calvin and hobbes'},
{id: #, text: 'captain planet'},
{id: #, text: 'cars'},
{id: #, text: 'cartoon network'},
{id: #, text: 'cyanide and happiness'},
{id: #, text: 'daffy duck'},
{id: #, text: 'daria'},
{id: #, text: 'dexters laboratory'},
{id: #, text: 'disney'},
{id: #, text: 'doug'},
{id: #, text: 'dreamworks'},
{id: #, text: 'family guy'},
{id: #, text: 'fantasia'},
{id: #, text: 'fat albert'},
{id: #, text: 'finding nemo'},
{id: #, text: 'fosters home for imaginary friends'},
{id: #, text: 'futurama'},
{id: #, text: 'garfield'},
{id: #, text: 'george of the jungle'},
{id: #, text: 'gi joe'},
{id: #, text: 'gravity falls'},
{id: #, text: 'grinch who stole christmas'},
{id: #, text: 'gumby'},
{id: #, text: 'harvey birdman'},
{id: #, text: 'hey arnold'},
{id: #, text: 'home movies'},
{id: #, text: 'homestuck'},
{id: #, text: 'hotel transylvania'},
{id: #, text: 'jem and the holograms'},
{id: #, text: 'johnny bravo'},
{id: #, text: 'josie and the pussycats'},
{id: #, text: 'king of the hill'},
{id: #, text: 'looney tunes'},
{id: #, text: 'magical game time'},
{id: #, text: 'metalocaypse'},
{id: #, text: 'mickey mouse'},
{id: #, text: 'minnie mouse'},
{id: #, text: 'mr magoo'},
{id: #, text: 'mulan'},
{id: #, text: 'muppet babies'},
{id: #, text: 'my little pony'},
{id: #, text: 'peanuts'},
{id: #, text: 'peter pan'},
{id: #, text: 'phinas and ferb'},
{id: #, text: 'pink panther'},
{id: #, text: 'pinocchio'},
{id: #, text: 'pocahontas'},
{id: #, text: 'popeye'},
{id: #, text: 'porky pig'},
{id: #, text: 'regular show'},
{id: #, text: 'ren and stimpy'},
{id: #, text: 'rockos modern life'},
{id: #, text: 'rocky and bullwinkle'},
{id: #, text: 'rugrats'},
{id: #, text: 'samurai jack'},
{id: #, text: 'schoolhouse rock'},
{id: #, text: 'scooby doo'},
{id: #, text: 'sealab 2021'},
{id: #, text: 'sleeping beauty'},
{id: #, text: 'snow white'},
{id: #, text: 'south park'},
{id: #, text: 'space ghost'},
{id: #, text: 'speed racer'},
{id: #, text: 'spongebob squarepants'},
{id: #, text: 'tailspin'},
{id: #, text: 'tangled'},
{id: #, text: 'teen titans'},
{id: #, text: 'teenage mutant ninja turtles'},
{id: #, text: 'the boondocks'},
{id: #, text: 'the critic'},
{id: #, text: 'the flintstones'},
{id: #, text: 'the incredibles'},
{id: #, text: 'the jetsons'},
{id: #, text: 'the lion king'},
{id: #, text: 'the little mermaid'},
{id: #, text: 'the oatmeal'},
{id: #, text: 'the powerpuff girls'},
{id: #, text: 'the simpsons'},
{id: #, text: 'the venture bros'},
{id: #, text: 'tom and jerry'},
{id: #, text: 'top cat'},
{id: #, text: 'toy story'},
{id: #, text: 'tweety bird'},
{id: #, text: 'underdog'},
{id: #, text: 'voltron'},
{id: #, text: 'wall e'},
{id: #, text: 'wile e coyote'},
{id: #, text: 'winnie the pooh'},
{id: #, text: 'yogi bear'},

// Celebrities
{id: #, text: 'adam baldwin'},
{id: #, text: 'adam brody'},
{id: #, text: 'adam devine'},
{id: #, text: 'adam sandler'},
{id: #, text: 'adam scott'},
{id: #, text: 'adrien brody'},
{id: #, text: 'al pacino'},
{id: #, text: 'alec baldwin'},
{id: #, text: 'alexa chung'},
{id: #, text: 'alia shawkat'},
{id: #, text: 'alison brie'},
{id: #, text: 'amanda bynes'},
{id: #, text: 'amy poehler'},
{id: #, text: 'andrew garfield'},
{id: #, text: 'angelina jolie'},
{id: #, text: 'anna kendrick'},
{id: #, text: 'anne hathaway'},
{id: #, text: 'arnold schwarzenegger'},
{id: #, text: 'ashley benson'},
{id: #, text: 'aubrey plaza'},
{id: #, text: 'aziz ansari'},
{id: #, text: 'ben stiller'},
{id: #, text: 'bill cosby'},
{id: #, text: 'brad pitt'},
{id: #, text: 'bradley cooper'},
{id: #, text: 'bruce lee'},
{id: #, text: 'bruce willis'},
{id: #, text: 'bryan cranston'},
{id: #, text: 'carey mulligan'},
{id: #, text: 'charlie sheen'},
{id: #, text: 'chris hemsworth'},
{id: #, text: 'chris pratt'},
{id: #, text: 'chris rock'},
{id: #, text: 'christian bale'},
{id: #, text: 'chuck norris'},
{id: #, text: 'cillian murphy'},
{id: #, text: 'clint eastwood'},
{id: #, text: 'conan obrien'},
{id: #, text: 'connie britton'},
{id: #, text: 'daniel day lewis'},
{id: #, text: 'danny mcbride'},
{id: #, text: 'dave chappelle'},
{id: #, text: 'dave franco'},
{id: #, text: 'david cross'},
{id: #, text: 'david duchovny'},
{id: #, text: 'denzel washington'},
{id: #, text: 'dolph lundgren'},
{id: #, text: 'don cheadle'},
{id: #, text: 'donald glover'},
{id: #, text: 'ed helms'},
{id: #, text: 'eddie izzard'},
{id: #, text: 'eddie murphy'},
{id: #, text: 'elijah wood'},
{id: #, text: 'elizabeth banks'},
{id: #, text: 'ellen page'},
{id: #, text: 'emily blunt'},
{id: #, text: 'emma roberts'},
{id: #, text: 'emma stone'},
{id: #, text: 'emma watson'},
{id: #, text: 'eva green'},
{id: #, text: 'gary oldman'},
{id: #, text: 'george carlin'},
{id: #, text: 'harrison ford'},
{id: #, text: 'hayden panettiere'},
{id: #, text: 'heath ledger'},
{id: #, text: 'heather graham'},
{id: #, text: 'ian somerhalder'},
{id: #, text: 'jack mcbrayer'},
{id: #, text: 'jackie chan'},
{id: #, text: 'jake gyllenhaal'},
{id: #, text: 'james franco'},
{id: #, text: 'jason bateman'},
{id: #, text: 'jason schwartzman'},
{id: #, text: 'javier bardem'},
{id: #, text: 'jay baruchel'},
{id: #, text: 'jean claude van damme'},
{id: #, text: 'jeffrey tambor'},
{id: #, text: 'jennifer lawrence'},
{id: #, text: 'jeremy renner'},
{id: #, text: 'jessica walter'},
{id: #, text: 'jet li'},
{id: #, text: 'jim carrey'},
{id: #, text: 'jim gaffigan'},
{id: #, text: 'john cusack'},
{id: #, text: 'john hodgman'},
{id: #, text: 'john travolta'},
{id: #, text: 'johnny depp'},
{id: #, text: 'jon hamm'},
{id: #, text: 'jon stewart'},
{id: #, text: 'jonah hill'},
{id: #, text: 'joseph gordon levitt'},
{id: #, text: 'jude law'},
{id: #, text: 'julianne moore'},
{id: #, text: 'karen gillan'},
{id: #, text: 'kate upton'},
{id: #, text: 'keira knightley'},
{id: #, text: 'ken jeong'},
{id: #, text: 'kristen wiig'},
{id: #, text: 'kyle chandler'},
{id: #, text: 'larry david'},
{id: #, text: 'leonardo dicaprio'},
{id: #, text: 'liam neeson'},
{id: #, text: 'louis ck'},
{id: #, text: 'macaulay culkin'},
{id: #, text: 'mark ruffalo'},
{id: #, text: 'matt lucas'},
{id: #, text: 'matt smith'},
{id: #, text: 'matthew goode'},
{id: #, text: 'matthew perry'},
{id: #, text: 'maya rudolph'},
{id: #, text: 'megan fox'},
{id: #, text: 'melissa mccarthy'},
{id: #, text: 'mia wasikowska'},
{id: #, text: 'michael caine'},
{id: #, text: 'michael cera'},
{id: #, text: 'michael fassbender'},
{id: #, text: 'michael ian black'},
{id: #, text: 'mickey rourke'},
{id: #, text: 'mike tyson'},
{id: #, text: 'mila kunis'},
{id: #, text: 'mindy kaling'},
{id: #, text: 'minka kelly'},
{id: #, text: 'mischa barton'},
{id: #, text: 'morgan freeman'},
{id: #, text: 'mr. t'},
{id: #, text: 'natalie portman'},
{id: #, text: 'nick offerman'},
{id: #, text: 'nicolas cage'},
{id: #, text: 'olivia munn'},
{id: #, text: 'olivia wilde'},
{id: #, text: 'orlando bloom'},
{id: #, text: 'patton oswalt'},
{id: #, text: 'paul dano'},
{id: #, text: 'paul rudd'},
{id: #, text: 'paul scheer'},
{id: #, text: 'peter gallagher'},
{id: #, text: 'portia de rossi'},
{id: #, text: 'rachel bilson'},
{id: #, text: 'rachel leigh cook'},
{id: #, text: 'rachel mccadams'},
{id: #, text: 'rachel weisz'},
{id: #, text: 'rebel wilson'},
{id: #, text: 'richard pryor'},
{id: #, text: 'ricky gervais'},
{id: #, text: 'rob huebel'},
{id: #, text: 'rob lowe'},
{id: #, text: 'robert de niro'},
{id: #, text: 'robert downey jr'},
{id: #, text: 'robert redford'},
{id: #, text: 'rooney mara'},
{id: #, text: 'ru paul'},
{id: #, text: 'ryan gosling'},
{id: #, text: 'sam rockwell'},
{id: #, text: 'samuel l jackson'},
{id: #, text: 'scarlett johansson'},
{id: #, text: 'sean connery'},
{id: #, text: 'seth green'},
{id: #, text: 'seth rogen'},
{id: #, text: 'stephen colbert'},
{id: #, text: 'steve carell'},
{id: #, text: 'sylvester stallone'},
{id: #, text: 'taylor kitsch'},
{id: #, text: 'tina fey'},
{id: #, text: 'tobey maguire'},
{id: #, text: 'tom cruise'},
{id: #, text: 'tom hanks'},
{id: #, text: 'tom hardy'},
{id: #, text: 'tom hiddleston'},
{id: #, text: 'tony hale'},
{id: #, text: 'topher grace'},
{id: #, text: 'tracy morgan'},
{id: #, text: 'vanessa hudgens'},
{id: #, text: 'weird al yankovic'},
{id: #, text: 'will arnett'},
{id: #, text: 'will ferrell'},
{id: #, text: 'will forte'},
{id: #, text: 'will smith'},
{id: #, text: 'willem dafoe'},
{id: #, text: 'yvonne strahovski'},
{id: #, text: 'zach galifianakis'},
{id: #, text: 'zachary levi'},
{id: #, text: 'zachary quinto'},
{id: #, text: 'zooey deschanel'},

// Decades
{id: #, text: '20s'},
{id: #, text: '30s'},
{id: #, text: '40s'},
{id: #, text: '50s'},
{id: #, text: '60s'},
{id: #, text: '70s'},
{id: #, text: '80s'},
{id: #, text: '90s'},
{id: #, text: 'vintage'},

// Election 2016
{id: #, text: 'ben carson'},
{id: #, text: 'bernie sanders'},
{id: #, text: 'carly fiorina'},
{id: #, text: 'chris christie'},
{id: #, text: 'donald trump'},
{id: #, text: 'hillary clinton'},
{id: #, text: 'jeb bush'},
{id: #, text: 'joe biden'},
{id: #, text: 'marco rubio'},
{id: #, text: 'america'},
{id: #, text: 'democrat'},
{id: #, text: 'economy'},
{id: #, text: 'gop'},
{id: #, text: 'jim webb'},
{id: #, text: 'lawrence lessig'},
{id: #, text: 'politics'},
{id: #, text: 'president'},
{id: #, text: 'rand paul'},
{id: #, text: 'usa'},

// Emotions
{id: #, text: 'angry'},
{id: #, text: 'bored'},
{id: #, text: 'disappointed'},
{id: #, text: 'drunk'},
{id: #, text: 'embarassed'},
{id: #, text: 'excited'},
{id: #, text: 'frustrated'},
{id: #, text: 'happy'},
{id: #, text: 'hungry'},
{id: #, text: 'inspired'},
{id: #, text: 'lonely'},
{id: #, text: 'love'},
{id: #, text: 'nervous'},
{id: #, text: 'pain'},
{id: #, text: 'reaction'},
{id: #, text: 'relaxed'},
{id: #, text: 'sad'},
{id: #, text: 'sassy'},
{id: #, text: 'scared'},
{id: #, text: 'shocked'},
{id: #, text: 'sick'},
{id: #, text: 'stressed'},
{id: #, text: 'surprised'},
{id: #, text: 'suspicious'},
{id: #, text: 'tired'},
{id: #, text: 'unimpressed'},
{id: #, text: 'awkward'},
{id: #, text: 'confused'},
{id: #, text: 'mind blown'},

// Fasion and beauty (lame; not funny; not doing this one)

// Food and Drink
{id: #, text: 'alcohol'},
{id: #, text: 'apple'},
{id: #, text: 'bacon'},
{id: #, text: 'banana'},
{id: #, text: 'beer'},
{id: #, text: 'bread'},
{id: #, text: 'broccoli'},
{id: #, text: 'brownies'},
{id: #, text: 'burrito'},
{id: #, text: 'cake'},
{id: #, text: 'cheese'},
{id: #, text: 'cheeseburger'},
{id: #, text: 'coffee'},
{id: #, text: 'cookie'},
{id: #, text: 'doughnut'},
{id: #, text: 'egg roll'},
{id: #, text: 'french fries'},
{id: #, text: 'french toast'},
{id: #, text: 'ham'},
{id: #, text: 'hot dog'},
{id: #, text: 'ice cream'},
{id: #, text: 'orange fruit'},
{id: #, text: 'pancakes'},
{id: #, text: 'pasta'},
{id: #, text: 'pickle'},
{id: #, text: 'pie'},
{id: #, text: 'pizza'},
{id: #, text: 'salad'},
{id: #, text: 'sandwich'},
{id: #, text: 'soda'},
{id: #, text: 'steak'},
{id: #, text: 'sushi'},
{id: #, text: 'taco'},
{id: #, text: 'tea'},
{id: #, text: 'vodka'},
{id: #, text: 'whiskey'},
{id: #, text: 'breakfast'},
{id: #, text: 'doughnut'},

// Gaming
{id: #, text: '8bit'},
{id: #, text: 'animal crossing'},
{id: #, text: 'atari'},
{id: #, text: 'bioshock'},
{id: #, text: 'call of duty'},
{id: #, text: 'dead space'},
{id: #, text: 'donkey kong'},
{id: #, text: 'duck hunt'},
{id: #, text: 'earthbound'},
{id: #, text: 'final fantasy'},
{id: #, text: 'galaga'},
{id: #, text: 'game boy'},
{id: #, text: 'gears of war'},
{id: #, text: 'grand theft auto'},
{id: #, text: 'half life'},
{id: #, text: 'kirby'},
{id: #, text: 'mario kart'},
{id: #, text: 'max payne'},
{id: #, text: 'metal gear solid'},
{id: #, text: 'metroid'},
{id: #, text: 'mods'},
{id: #, text: 'mortal kombat'},
{id: #, text: 'n64'},
{id: #, text: 'nes'},
{id: #, text: 'nintendo'},
{id: #, text: 'pacman'},
{id: #, text: 'portal'},
{id: #, text: 'prince of persia'},
{id: #, text: 'sega'},
{id: #, text: 'skyrim'},
{id: #, text: 'sonic the hedgehog'},
{id: #, text: 'sprites'},
{id: #, text: 'starcraft'},
{id: #, text: 'starfox'},
{id: #, text: 'street fighter'},
{id: #, text: 'streets of rage'},
{id: #, text: 'super mario'},
{id: #, text: 'super nintendo'},
{id: #, text: 'super smash bros'},
{id: #, text: 'tetris'},
{id: #, text: 'the last of us'},
{id: #, text: 'the legend of zelda'},
{id: #, text: 'the sims'},
{id: #, text: 'tomb raider'},
{id: #, text: 'video game physics'},
{id: #, text: 'wolfenstein 3d'},
{id: #, text: 'world of warcraft'},
{id: #, text: 'bioshock infinite'},

// Holidays
{id: #, text: 'april fools day'},
{id: #, text: 'birthday'},
{id: #, text: 'christmas'},
{id: #, text: 'cinco de mayo'},
{id: #, text: 'easter'},
{id: #, text: 'fathers day'},
{id: #, text: 'fourth of july'},
{id: #, text: 'graduation'},
{id: #, text: 'halloween'},
{id: #, text: 'hanukkah'},
{id: #, text: 'kwanzaa'},
{id: #, text: 'mardi gras'},
{id: #, text: 'memorial day'},
{id: #, text: 'mothers day'},
{id: #, text: 'new years'},
{id: #, text: 'oktoberfest'},
{id: #, text: 'st patricks day'},
{id: #, text: 'thanksgiving'},
{id: #, text: 'valentines day'},
{id: #, text: 'wedding'},

// Interests
{id: #, text: 'alien'},
{id: #, text: 'autumn'},
{id: #, text: 'baby'},
{id: #, text: 'ballet'},
{id: #, text: 'boobs'},
{id: #, text: 'boy'},
{id: #, text: 'butt'},
{id: #, text: 'clown'},
{id: #, text: 'ghost'},
{id: #, text: 'girl'},
{id: #, text: 'internet'},
{id: #, text: 'iphone'},
{id: #, text: 'lgbt'},
{id: #, text: 'new york city'},
{id: #, text: 'party'},
{id: #, text: 'robot'},
{id: #, text: 'roller coaster'},
{id: #, text: 'spring'},
{id: #, text: 'summer'},
{id: #, text: 'theme park'},
{id: #, text: 'tumblr'},
{id: #, text: 'vacation'},
{id: #, text: 'vampire'},
{id: #, text: 'winter'},
{id: #, text: 'work'},
{id: #, text: 'zombie'},

// Memes
{id: #, text: 'bitch im fabulous'},
{id: #, text: 'come at me bro'},
{id: #, text: 'dat ass'},
{id: #, text: 'fail'},
{id: #, text: 'fangirling'},
{id: #, text: 'feels'},
{id: #, text: 'forever alone'},
{id: #, text: 'let me love you'},
{id: #, text: 'like a boss'},
{id: #, text: 'look at all the fucks i give'},
{id: #, text: 'nyan cat'},
{id: #, text: 'rickroll'},
{id: #, text: 'spinning lana'},
{id: #, text: 'steal yo girl'},
{id: #, text: 'sturgeon face'},
{id: #, text: 'surprised patrick'},
{id: #, text: 'swag'},
{id: #, text: 'troll'},
{id: #, text: 'win'},
{id: #, text: 'deal with it'},
{id: #, text: 'party hard'},

// Movies
{id: #, text: '21 jump street'},
{id: #, text: '28 days later'},
{id: #, text: '500 days of summer'},
{id: #, text: 'ace ventura'},
{id: #, text: 'addams family'},
{id: #, text: 'alfred hitchcock'},
{id: #, text: 'amelie'},
{id: #, text: 'american psycho'},
{id: #, text: 'anchorman'},
{id: #, text: 'annie hall'},
{id: #, text: 'apocalypse now'},
{id: #, text: 'battle royale'},
{id: #, text: 'beetlejuice'},
{id: #, text: 'big fish'},
{id: #, text: 'black swan'},
{id: #, text: 'bladerunner'},
{id: #, text: 'blue velvet'},
{id: #, text: 'boondock saints'},
{id: #, text: 'braveheart'},
{id: #, text: 'breakfast at tiffanys'},
{id: #, text: 'breathless'},
{id: #, text: 'bridesmaids'},
{id: #, text: 'casablanca'},
{id: #, text: 'casino'},
{id: #, text: 'chinatown'},
{id: #, text: 'citizen kane'},
{id: #, text: 'clueless'},
{id: #, text: 'cry baby'},
{id: #, text: 'david lynch'},
{id: #, text: 'deliverance'},
{id: #, text: 'dirty harry'},
{id: #, text: 'django unchained'},
{id: #, text: 'doctor strangelove'},
{id: #, text: 'dodgeball'},
{id: #, text: 'donnie darko'},
{id: #, text: 'easy rider'},
{id: #, text: 'edward scissorhands'},
{id: #, text: 'elf'},
{id: #, text: 'encino man'},
{id: #, text: 'eraserhead'},
{id: #, text: 'escape from new york'},
{id: #, text: 'eternal sunshine of the spotless mind'},
{id: #, text: 'evil dead'},
{id: #, text: 'fellini'},
{id: #, text: 'fight club'},
{id: #, text: 'fire walk with me'},
{id: #, text: 'forrest gump'},
{id: #, text: 'ghostbusters'},
{id: #, text: 'gladiator'},
{id: #, text: 'gone with the wind'},
{id: #, text: 'goodfellas'},
{id: #, text: 'harry potter'},
{id: #, text: 'heathers'},
{id: #, text: 'high school musical'},
{id: #, text: 'hocus pocus'},
{id: #, text: 'horror'},
{id: #, text: 'inception'},
{id: #, text: 'indiana jones'},
{id: #, text: 'iron man'},
{id: #, text: 'kill bill'},
{id: #, text: 'kung fu'},
{id: #, text: 'labyrinth'},
{id: #, text: 'life of brian'},
{id: #, text: 'looper'},
{id: #, text: 'lost boys'},
{id: #, text: 'marie antoinette'},
{id: #, text: 'martin scorsese'},
{id: #, text: 'melancholia'},
{id: #, text: 'mulholland drive'},
{id: #, text: 'night of the living dead'},
{id: #, text: 'pirates of the carribean'},
{id: #, text: 'pretty in pink'},
{id: #, text: 'pulp fiction'},
{id: #, text: 'quentin tarantino'},
{id: #, text: 'rad'},
{id: #, text: 'rambo'},
{id: #, text: 'real genius'},
{id: #, text: 'reservoir dogs'},
{id: #, text: 'risky business'},
{id: #, text: 'rocky'},
{id: #, text: 'romeo and juliet'},
{id: #, text: 'rosemarys baby'},
{id: #, text: 'say anything'},
{id: #, text: 'scarface'},
{id: #, text: 'shaun of the dead'},
{id: #, text: 'shawshank redemption'},
{id: #, text: 'sin city'},
{id: #, text: 'sixteen candles'},
{id: #, text: 'some like it hot'},
{id: #, text: 'spring breakers'},
{id: #, text: 'stanley kubrick'},
{id: #, text: 'star wars'},
{id: #, text: 'stephen king'},
{id: #, text: 'submarine'},
{id: #, text: 'taxi driver'},
{id: #, text: 'terminator'},
{id: #, text: 'texas chainsaw massacre'},
{id: #, text: 'the big lebowski'},
{id: #, text: 'the bling ring'},
{id: #, text: 'the blues brothers'},
{id: #, text: 'the breakfast club'},
{id: #, text: 'the dark crystal'},
{id: #, text: 'the dark knight'},
{id: #, text: 'the diving bell and the butterfly'},
{id: #, text: 'the fifth element'},
{id: #, text: 'the godfather'},
{id: #, text: 'the goonies'},
{id: #, text: 'the hangover'},
{id: #, text: 'the lord of the rings'},
{id: #, text: 'the maltese falcon'},
{id: #, text: 'the matrix'},
{id: #, text: 'the muppets'},
{id: #, text: 'the princess bride'},
{id: #, text: 'the science of sleep'},
{id: #, text: 'the shawshank redemption'},
{id: #, text: 'the shining'},
{id: #, text: 'the virgin suicides'},
{id: #, text: 'tim burton'},
{id: #, text: 'top gun'},
{id: #, text: 'transformers'},
{id: #, text: 'tron'},
{id: #, text: 'twilight'},
{id: #, text: 'warriors'},
{id: #, text: 'watchmen'},
{id: #, text: 'waynes world'},
{id: #, text: 'weird science'},
{id: #, text: 'wes anderson'},
{id: #, text: 'wet hot american summer'},
{id: #, text: 'willy wonka and the chocolate factory'},
{id: #, text: 'zombieland'},
{id: #, text: 'zoolander'},

// Music
{id: #, text: '50 cent'},
{id: #, text: 'action bronson'},
{id: #, text: 'adam lambert'},
{id: #, text: 'adam levine'},
{id: #, text: 'adele'},
{id: #, text: 'alicia keys'},
{id: #, text: 'anamanaguchi'},
{id: #, text: 'asap rocky'},
{id: #, text: 'avril lavigne'},
{id: #, text: 'backstreet boys'},
{id: #, text: 'beastie boys'},
{id: #, text: 'beyonce'},
{id: #, text: 'big bang'},
{id: #, text: 'big sean'},
{id: #, text: 'black eyed peas'},
{id: #, text: 'bob dylan'},
{id: #, text: 'bob marley'},
{id: #, text: 'britney spears'},
{id: #, text: 'bruno mars'},
{id: #, text: 'carrie underwood'},
{id: #, text: 'cassie'},
{id: #, text: 'childish gambino'},
{id: #, text: 'chris brown'},
{id: #, text: 'christina aguilera'},
{id: #, text: 'cody simpson'},
{id: #, text: 'coldplay'},
{id: #, text: 'daft punk'},
{id: #, text: 'danny brown'},
{id: #, text: 'david bowie'},
{id: #, text: 'david guetta'},
{id: #, text: 'demi lovato'},
{id: #, text: 'destinys child'},
{id: #, text: 'drake'},
{id: #, text: 'elvis presley'},
{id: #, text: 'eminem'},
{id: #, text: 'enrique iglesias'},
{id: #, text: 'frank ocean'},
{id: #, text: 'g dragon'},
{id: #, text: 'harry styles'},
{id: #, text: 'janet jackson'},
{id: #, text: 'jay z'},
{id: #, text: 'jennifer lopez'},
{id: #, text: 'john mayer'},
{id: #, text: 'johnny cash'},
{id: #, text: 'justin bieber'},
{id: #, text: 'justin timberlake'},
{id: #, text: 'kanye west'},
{id: #, text: 'katy perry'},
{id: #, text: 'kelly rowland'},
{id: #, text: 'kendrick lamar'},
{id: #, text: 'kesha'},
{id: #, text: 'kpop'},
{id: #, text: 'kreayshawn'},
{id: #, text: 'lady gaga'},
{id: #, text: 'lana del rey'},
{id: #, text: 'liam payne'},
{id: #, text: 'lil wayne'},
{id: #, text: 'linkin park'},
{id: #, text: 'louis tomlinson'},
{id: #, text: 'mac miller'},
{id: #, text: 'madonna'},
{id: #, text: 'mariah carey'},
{id: #, text: 'mc hammer'},
{id: #, text: 'michael jackson'},
{id: #, text: 'miley cyrus'},
{id: #, text: 'morrissey'},
{id: #, text: 'my chemical romance'},
{id: #, text: 'niall horan'},
{id: #, text: 'nicki minaj'},
{id: #, text: 'nirvana'},
{id: #, text: 'odd future'},
{id: #, text: 'one direction'},
{id: #, text: 'outkast'},
{id: #, text: 'paramore'},
{id: #, text: 'pierce the veil'},
{id: #, text: 'r kelly'},
{id: #, text: 'rihanna'},
{id: #, text: 'selena gomez'},
{id: #, text: 'shakira'},
{id: #, text: 'skrillex'},
{id: #, text: 'snoop dogg'},
{id: #, text: 'solange'},
{id: #, text: 'taylor swift'},
{id: #, text: 'tegan and sara'},
{id: #, text: 'the beatles'},
{id: #, text: 'the flaming lips'},
{id: #, text: 'the lonely island'},
{id: #, text: 'the rolling stones'},
{id: #, text: 'the strokes'},
{id: #, text: 'the white stripes'},
{id: #, text: 'ti'},
{id: #, text: 'tlc'},
{id: #, text: 'tyler the creator'},
{id: #, text: 'usher'},
{id: #, text: 'vampire weekend'},
{id: #, text: 'wavves'},
{id: #, text: 'whitney houston'},
{id: #, text: 'wiz khalifa'},
{id: #, text: 'zayn malik'},

// Nature (might be lame)
{id: #, text: 'beach'},
{id: #, text: 'cave'},
{id: #, text: 'clouds'},
{id: #, text: 'comet'},
{id: #, text: 'constellations'},
{id: #, text: 'coral'},
{id: #, text: 'crystals'},
{id: #, text: 'desert'},
{id: #, text: 'fire'},
{id: #, text: 'forest'},
{id: #, text: 'geyser'},
{id: #, text: 'glacier'},
{id: #, text: 'hurricane'},
{id: #, text: 'ice'},
{id: #, text: 'lake'},
{id: #, text: 'landscape'},
{id: #, text: 'lava'},
{id: #, text: 'mist'},
{id: #, text: 'moon'},
{id: #, text: 'mountains'},
{id: #, text: 'mushrooms'},
{id: #, text: 'night'},
{id: #, text: 'northern lights'},
{id: #, text: 'ocean'},
{id: #, text: 'plants'},
{id: #, text: 'prairie'},
{id: #, text: 'rainbow'},
{id: #, text: 'reef'},
{id: #, text: 'river'},
{id: #, text: 'sand'},
{id: #, text: 'smoke'},
{id: #, text: 'snow'},
{id: #, text: 'stars'},
{id: #, text: 'sun'},
{id: #, text: 'sunrise'},
{id: #, text: 'sunset'},
{id: #, text: 'tornado'},
{id: #, text: 'trees'},
{id: #, text: 'tsunami'},
{id: #, text: 'waterfall'},
{id: #, text: 'waves'},
{id: #, text: 'weather'},
{id: #, text: 'wind'},

// News And Politics
{id: #, text: 'anthony weiner'},
{id: #, text: 'barack obama'},
{id: #, text: 'bill clinton'},
{id: #, text: 'conclave'},
{id: #, text: 'congress'},
{id: #, text: 'conservative'},
{id: #, text: 'democrat'},
{id: #, text: 'donald trump'},
{id: #, text: 'economy'},
{id: #, text: 'election 2012'},
{id: #, text: 'hillary clinton'},
{id: #, text: 'iran'},
{id: #, text: 'irs'},
{id: #, text: 'joe biden'},
{id: #, text: 'john boehner'},
{id: #, text: 'john mccain'},
{id: #, text: 'marco rubio'},
{id: #, text: 'mitch mcconnell'},
{id: #, text: 'mitt romney'},
{id: #, text: 'nancy pelosi'},
{id: #, text: 'north korea'},
{id: #, text: 'nsa'},
{id: #, text: 'obamacare'},
{id: #, text: 'pope'},
{id: #, text: 'president'},
{id: #, text: 'protest'},
{id: #, text: 'republican'},
{id: #, text: 'ron paul'},
{id: #, text: 'sarah palin'},
{id: #, text: 'senate'},
{id: #, text: 'supreme court'},
{id: #, text: 'surveillance'},
{id: #, text: 'syria'},
{id: #, text: 'tea party'},
{id: #, text: 'white house'},

// Reactions
{id: #, text: 'agree'},
{id: #, text: 'applause'},
{id: #, text: 'awesome'},
{id: #, text: 'awww'},
{id: #, text: 'burn'},
{id: #, text: 'cool story bro'},
{id: #, text: 'deal with it'},
{id: #, text: 'do not want'},
{id: #, text: 'eww'},
{id: #, text: 'eye roll'},
{id: #, text: 'facepalm'},
{id: #, text: 'finger guns'},
{id: #, text: 'fist bump'},
{id: #, text: 'flirt'},
{id: #, text: 'fml'},
{id: #, text: 'frown'},
{id: #, text: 'good luck'},
{id: #, text: 'goodbye'},
{id: #, text: 'gtfo'},
{id: #, text: 'hair flip'},
{id: #, text: 'happy dance'},
{id: #, text: 'hearts'},
{id: #, text: 'hello'},
{id: #, text: 'help'},
{id: #, text: 'high five'},
{id: #, text: 'hug'},
{id: #, text: 'idgaf'},
{id: #, text: 'idk'},
{id: #, text: 'kiss'},
{id: #, text: 'lol'},
{id: #, text: 'meh'},
{id: #, text: 'mic drop'},
{id: #, text: 'middle finger'},
{id: #, text: 'no'},
{id: #, text: 'oh no you didnt'},
{id: #, text: 'oh snap'},
{id: #, text: 'ok'},
{id: #, text: 'omg'},
{id: #, text: 'oops'},
{id: #, text: 'please'},
{id: #, text: 'popcorn'},
{id: #, text: 'seriously'},
{id: #, text: 'shrug'},
{id: #, text: 'shut up'},
{id: #, text: 'sigh'},
{id: #, text: 'slow clap'},
{id: #, text: 'smh'},
{id: #, text: 'smile'},
{id: #, text: 'sorry'},
{id: #, text: 'squee'},
{id: #, text: 'suck it'},
{id: #, text: 'table flip'},
{id: #, text: 'thank you'},
{id: #, text: 'thumbs down'},
{id: #, text: 'thumbs up'},
{id: #, text: 'ugh'},
{id: #, text: 'want'},
{id: #, text: 'what'},
{id: #, text: 'whatever'},
{id: #, text: 'win'},
{id: #, text: 'wink'},
{id: #, text: 'wow'},
{id: #, text: 'wtf'},
{id: #, text: 'yawn'},
{id: #, text: 'yes'},
{id: #, text: 'yolo'},
{id: #, text: 'you got this'},

// Science
{id: #, text: 'asteroids'},
{id: #, text: 'astronomy'},
{id: #, text: 'atoms'},
{id: #, text: 'bill nye'},
{id: #, text: 'biology'},
{id: #, text: 'bubbles'},
{id: #, text: 'chemistry'},
{id: #, text: 'computers'},
{id: #, text: 'diy'},
{id: #, text: 'engineering'},
{id: #, text: 'global warming'},
{id: #, text: 'laser'},
{id: #, text: 'magnets'},
{id: #, text: 'mathematics'},
{id: #, text: 'medicine'},
{id: #, text: 'meteor'},
{id: #, text: 'molecules'},
{id: #, text: 'nebula'},
{id: #, text: 'nuclear'},
{id: #, text: 'physics'},
{id: #, text: 'planets'},
{id: #, text: 'robot'},
{id: #, text: 'space'},
{id: #, text: 'stars'},
{id: #, text: 'technology'},
{id: #, text: 'nasa'},

// Sports
{id: #, text: 'archery'},
{id: #, text: 'base jumping'},
{id: #, text: 'baseball'},
{id: #, text: 'basketball'},
{id: #, text: 'bowling'},
{id: #, text: 'boxing'},
{id: #, text: 'diving'},
{id: #, text: 'football'},
{id: #, text: 'formula one'},
{id: #, text: 'golf'},
{id: #, text: 'gymnastics'},
{id: #, text: 'hockey'},
{id: #, text: 'horse racing'},
{id: #, text: 'lacrosse'},
{id: #, text: 'martial arts'},
{id: #, text: 'mma'},
{id: #, text: 'nascar'},
{id: #, text: 'parkour'},
{id: #, text: 'rock climbing'},
{id: #, text: 'roller skating'},
{id: #, text: 'rowing'},
{id: #, text: 'rugby'},
{id: #, text: 'skateboarding'},
{id: #, text: 'skiing'},
{id: #, text: 'skydiving'},
{id: #, text: 'snowboarding'},
{id: #, text: 'soccer'},
{id: #, text: 'softball'},
{id: #, text: 'surfing'},
{id: #, text: 'swimming'},
{id: #, text: 'tennis'},
{id: #, text: 'volleyball'},
{id: #, text: 'wrestling'},
{id: #, text: 'nfl'},


// Transportation (possibly super lame)
{id: #, text: 'airplane'},
{id: #, text: 'audi'},
{id: #, text: 'bicycle'},
{id: #, text: 'bmw'},
{id: #, text: 'boat'},
{id: #, text: 'bus'},
{id: #, text: 'car'},
{id: #, text: 'chevrolet'},
{id: #, text: 'ferrari'},
{id: #, text: 'helicopter'},
{id: #, text: 'honda'},
{id: #, text: 'hovercraft'},
{id: #, text: 'motorcycle'},
{id: #, text: 'nissan'},
{id: #, text: 'porsche'},
{id: #, text: 'rocket'},
{id: #, text: 'sailboat'},
{id: #, text: 'spaceship'},
{id: #, text: 'submarine'},
{id: #, text: 'tank'},
{id: #, text: 'tesla'},
{id: #, text: 'toyota'},
{id: #, text: 'train'},
{id: #, text: 'truck'},
{id: #, text: 'van'},
{id: #, text: 'volkswagen'},
{id: #, text: 'yacht'},

// Tv
{id: #, text: 'rick and morty'},
{id: #, text: '30 rock'},
{id: #, text: 'alfred hitchcock presents'},
{id: #, text: 'american idol'},
{id: #, text: 'are you afraid of the dark?'},
{id: #, text: 'arrested development'},
{id: #, text: 'battlestar galactica'},
{id: #, text: 'baywatch'},
{id: #, text: 'boardwalk empire'},
{id: #, text: 'bones'},
{id: #, text: 'bored to death'},
{id: #, text: 'boy meets world'},
{id: #, text: 'breaking bad'},
{id: #, text: 'californication'},
{id: #, text: 'castle'},
{id: #, text: 'cbs'},
{id: #, text: 'charles in charge'},
{id: #, text: 'cheers'},
{id: #, text: 'chuck'},
{id: #, text: 'clarissa explains it all'},
{id: #, text: 'comedy central'},
{id: #, text: 'criminal minds'},
{id: #, text: 'csi'},
{id: #, text: 'csi miami'},
{id: #, text: 'curb your enthusiasm'},
{id: #, text: 'damages'},
{id: #, text: 'degrassi'},
{id: #, text: 'desperate housewives'},
{id: #, text: 'dexter'},
{id: #, text: 'doctor who'},
{id: #, text: 'downton abbey'},
{id: #, text: 'eastbound and down'},
{id: #, text: 'elementary'},
{id: #, text: 'entourage'},
{id: #, text: 'even stevens'},
{id: #, text: 'family ties'},
{id: #, text: 'flavor of love'},
{id: #, text: 'freaks and geeks'},
{id: #, text: 'friday night lights'},
{id: #, text: 'fringe'},
{id: #, text: 'full house'},
{id: #, text: 'fx'},
{id: #, text: 'game of thrones'},
{id: #, text: 'glee'},
{id: #, text: 'gossip girl'},
{id: #, text: 'greys anatomy'},
{id: #, text: 'happy days'},
{id: #, text: 'hawaii five o'},
{id: #, text: 'hbo'},
{id: #, text: 'hells kitchen'},
{id: #, text: 'heroes'},
{id: #, text: 'house'},
{id: #, text: 'human giant'},
{id: #, text: 'human target'},
{id: #, text: 'hung'},
{id: #, text: 'i love lucy'},
{id: #, text: 'in treatment'},
{id: #, text: 'its always sunny in philadelphia'},
{id: #, text: 'jag'},
{id: #, text: 'key and peele'},
{id: #, text: 'kitchen nightmares'},
{id: #, text: 'knight rider'},
{id: #, text: 'lie to me'},
{id: #, text: 'lost'},
{id: #, text: 'macgyver'},
{id: #, text: 'mad men'},
{id: #, text: 'magnum pi'},
{id: #, text: 'married with children'},
{id: #, text: 'mash'},
{id: #, text: 'miami vice'},
{id: #, text: 'mildred pierce'},
{id: #, text: 'misfits'},
{id: #, text: 'modern family'},
{id: #, text: 'monk'},
{id: #, text: 'mr ed'},
{id: #, text: 'muppets'},
{id: #, text: 'nbc'},
{id: #, text: 'ncis'},
{id: #, text: 'new girl'},
{id: #, text: 'nickelodeon'},
{id: #, text: 'nikita'},
{id: #, text: 'one tree hill'},
{id: #, text: 'parks and recreation'},
{id: #, text: 'party down'},
{id: #, text: 'pete and pete'},
{id: #, text: 'portlandia'},
{id: #, text: 'pretty little liars'},
{id: #, text: 'prison break'},
{id: #, text: 'private practice'},
{id: #, text: 'quantum leap'},
{id: #, text: 'raising hope'},
{id: #, text: 'reno 911'},
{id: #, text: 'ron swanson'},
{id: #, text: 'salute your shorts'},
{id: #, text: 'saved by the bell'},
{id: #, text: 'scrubs'},
{id: #, text: 'seinfeld'},
{id: #, text: 'sesame street'},
{id: #, text: 'sherlock'},
{id: #, text: 'showtime'},
{id: #, text: 'six feet under'},
{id: #, text: 'smallville'},
{id: #, text: 'sons of anarchy'},
{id: #, text: 'star trek'},
{id: #, text: 'starsky and hutch'},
{id: #, text: 'supernatural'},
{id: #, text: 'tales from the crypt'},
{id: #, text: 'the a team'},
{id: #, text: 'the biggest loser'},
{id: #, text: 'the cosby show'},
{id: #, text: 'the good wife'},
{id: #, text: 'the killing'},
{id: #, text: 'the mentalist'},
{id: #, text: 'the muppet show'},
{id: #, text: 'the oc'},
{id: #, text: 'the office'},
{id: #, text: 'the outs'},
{id: #, text: 'the ricky gervais show'},
{id: #, text: 'the sopranos'},
{id: #, text: 'the state'},
{id: #, text: 'the walking dead'},
{id: #, text: 'the west wing'},
{id: #, text: 'the wire'},
{id: #, text: 'third rock from the sun'},
{id: #, text: 'threes company'},
{id: #, text: 'tmc'},
{id: #, text: 'top chef'},
{id: #, text: 'top gear'},
{id: #, text: 'treme'},
{id: #, text: 'true blood'},
{id: #, text: 'twenty four'},
{id: #, text: 'twin peaks'},
{id: #, text: 'undeclared'},
{id: #, text: 'veronica mars'},
{id: #, text: 'webster'},
{id: #, text: 'weeds'},
{id: #, text: 'workaholics'},
]


// Loop for seeding answerObject
for (let i = 0; i < answerObject.length; i++) {
	let searchTerm = new Answer({
		id: i+1,
		text: answerObject[i].text
	});
	searchTerm.save((error) => {
		if (error) {
			console.log(error);
		};
	});
};











//
