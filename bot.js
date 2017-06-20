// Skip to content
// This repository
// Search
// Pull requests
// Issues
// Gist
//  @hengoren
//  Sign out
//  Unwatch 1
//   Star 0
//   Fork 0 hengoren/botnew
//  Code  Issues 0  Pull requests 0  Projects 0  Wiki  Pulse  Graphs  Settings
// Tree: f0a475bec9 Find file Copy pathbotnew/bot.js
// f0a475b  on Oct 25, 2016
// @hengoren hengoren working
// 1 contributor
// RawBlameHistory     
// Executable File  246 lines (210 sloc)  11.8 KB
const http = require('http');
var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var str;
var input;
var theUrl;
var cleverResponse;

/* sets botID. You will need to change your .env file so that you have this working correctly. Or you may hardcode your botID here. */
var botID = process.env.BOT_ID;

/* A dictionary of assorted adjectives. Used for generated responses */
var adjectives = ["abandoned", "able", "absolute", "adorable", "adventerous", "academic", "acceptable", "acclaimed", "accomplished", "accurate", 
"aching", "acidic", "acrobatic", "babyish", "bad", "bare", "basic", "biodegradable", "bogus", "bubbly", "bumpy", "bruised", 
"calculating", "calm", "carefree", "charming", "cheap", "chubby", "circular", "clean", "colorful", "composed", "confused", "crusty", "creamy", 
"damaged", "dangerous", "defenseless", "delicious", "delirious", "dense", "devoted", "distant", "dizzy", "droopy", "dull", 
"eager", "easy", "edible", "elastic", "elderly", "enormous", "evil", "exotic", "fabulous", "fat", "faithful", "feisty", "filty", "flamboyant", "flaky", "flowery", "flimsy", "fluffy", "foolish", "frail", 
"frosty", "fussy", "friendly", "gargantuan", "gentle", "giddy", "glum", "gifted", "gross", "grouchy", "grubby", "hairy", "harmless", "healthy", 
"hollow", "honorable", "hot", "icky", "icy", "ill", "impeccable", "impassioned", "inborn", "infamous", "infantile", "inferior", "innocent", 
"itchy", "jaded", "jaunty", "jealous", "jolly", "jubliant", "kooky", "kosher", "lame", "lanky", "lazy", "liqued", "limp", "loud", "luminous", 
"mad", "majestic", "marvelous", "massive", "mature", "mediocre", "meek", "messy", "mild", "milky", "misty", "misguided", "monstrous", "modest", "moist", 
"musty", "naive", "natural", "nippy", "obedient", "odd", "obese", "oblong", "ordinary", "pale", "peaceful", "petty", "perky", "playful", "pleased", "profitable", "purple", 
"queasy", "quick", "ragged", "rectangular", "repulsive", "silly", "squeaky", "serious", "salty", "somber", "sizzling", 
"spherical", "sleepy", "soupy", "starry", "stiff", "slimy", "scented", "scrawny", "shy", "smooth", "sniveling", "spicy", "sympathetic", 
"ugly", "tall", "tasty", "tattoed", "tired", "triangular", "tubby", "uncomfortable", "unripe", "vibrant", "watery", "well groomed", "woozy", "wiry", "worried"]

/* A dictionary of assorted animals. Used for generated responses */
var animals = ["aardvark", "albatross", "alligator", "alpaca", "anteater", "armadillo", 
"babbon", "badger", "bald eagle", "bear", "beaver", "beluga whale", "bison", "bird", 
"blowfish", "boa constrictor", "buffalo", "bullfrog", "butterfly", "camel", "caribou", 
"chipmunk", "caterpillar", "cheetah", "chihuahua", "chimipanzee", "cockatoo", "cow", "crustacean", 
"chinchilla", "deer", "dodo", "dog", "dinosaur", "dolphin", "duck", "earthworm", "eel", "elephant", "donkey", 
"duck-billed platypus", "elk", "emu", "fox", "giraffe", "gorilla", "grasshopper", 
"groundhog", "guinea pig", "goat", "jack rabbit", "kangaroo", "koala bear", "ladybug", "lemur", "lion", 
"lizard", "manatee", "meerkat", "monkey", "orangutan", "moose", "opossum", "narhwal", 
"ostrich", "penguin", "tortoise", "puma", "nigga", "raccon", "rabbit", "salmon", "shark", "skunk", 
"sloth", "squirrel", "Stegasaurus", "toucan", "tarantula", "tiger", "turkey", "velociraptor", 
"wallaby", "weasel", "whippersnapper", "wombat", "zebra"]

/* A dictionary of assorted bakes. Used for generated responses */
var bakes = ["look at yo 'velis false' jeans",
"ol next friday pinky",
"you look like a japanese snappin billy GOAT",
"get off the computer and Lose some WEIGHT",
"I dont understand why everybody gotta HATE",
"I only fucks with lil b &kids bop.! -_____-",
"get off the computer and Lose some WEIGHT",
"where yall going, can i go too.? HELL NAWW.!!!",
"big Worm without the perm neckahh",
"only time i ever came close to fuckin is when I typed in http://pornhub.com  lookin ass ..  coco butter over deez hoes faceahh ",
"smushed toostie roll dat done been stepped on by 6 big ass niggas",
"Chris Brown before he thought about hitting Rihanna lookin .. The only time i get high is if another nigga roll the blunt",
"ol' stank breath chewing on gum blowing ass bubbles",
"ol' fubu walmart no style havin'",
"ol' southpark both feet moving at the same damn time ",
"lap dance givin hippo neck ass foot workin goose 'jing a lang jing a lang.. U GONE EAT YO CORNBREAD'",
"melted sour patch kidz and spoiled tuna fish eating azz.",
"egg Nog 50% off after. Christmas buying azz.",
"ole swole chest skinny leg havin azz",
"ole sketchers shape-upz wearin ass",
"'uh un don't throw dem cans away, I'm goin to turn dem in tomorrow' ole shoopin cart pushin ass", 
"with your boot nose ass, loose tobacco smellin ass...wrestlin mat smellin ass", 
"Butter back bacon neck ass, look like yo ass fuck car mufflers and midgets boa ", 
"look like yo ass sell dvds and socks on madison and pulaski ol super dome head ass", 
"look mommy, im a big kid now!", 
"Lookin ass gheri curl wit a hi top fade lookin ass", 
"Ole camouflage snuggie wearin ass", 
"Ole la gear light up shoes havin ass", 
"Ole bushwackin ass nikkah ", 
"Ole boosie fade wit a rat tail in da back havin azz boi ", 
"Ole yo gabba gabba yellow shirt orange pants wearin ass nikkah", 
"Ole clip my toenails in the sink ass", 
"Lego. Ole Lego my eggo waffle eatin ass", 
"Ole chat line callin ass nikkah. Meet bitches on Craigslist ass boi.", 
"Ole yellow hard hat blue jean cutoff wit sum buckwheat Tim's wearin ass nikkah!!!", 
"ole lunchable eatin ass boi. Ole I think I can I think I can little engine that could ass boi."
]

var dolanLibrary = ["fuk u", "pls"]

var funFacts = ["11% of people are left handed", "August has the highest percentage of birhts", 
"unless food is mixed with saliva you can't taste it", "the average person falls asleep in 7 minutes",
"a bear has 42 teeth", "an ostrich's eye is bigger than its brain", "lemons contain more sugar than strawberries",
"8% of people have an extra rib", "Ralph Lauren's original name was Ralph Lifshitz", "rabbits like licorice",
"the Hawaiian alphabet has 13 letters", "armadillos have 4 babies at a time and are all the same sex", 
"reindeer like bananas", "the longest recorded flight of a chicken was 13 seconds", 
"birds need gravity to swallow", "dreamt is the only word that ends in mt", "a cat has 32 muscles in each ear", 
"goldfish can see both infrared and ultraviolet light", "the samllest bones in the human body are found in the penis", 
"money is the number one thing couples argue about", "macademia nuts are toxic to dogs", 
"stewardesses is the longest word typed with only the left hand", "honey is the only natural food that never spoils", 
"about 90% of the world's population kisses", "Coca-Cola originally contained small amounts of cocaine", 
"toliets account for 35% of indoor water use", "the fortune cookie was invented in San Francisco", 
"Koalas sleep around 18 hours a day", "all insects have 6 legs", "in Eastern Africa you can buy beer brewed from bananas", 
"a giraffe can clean its ears with its 21 inch tongue", "the Grand Canyon can hold around 900 trillion footballs", 
"sponges can hold more cold water than hot", "cats have over 100 vocal chords", "fire usually moves faster uphill than downhill", 
"frogs can't swallow with their eyes open", "elephants are the only mammal that can't jump", "Paul Davidson has four children tied up in a cellar somewhere"]


/* vars created to generate random integers within the bounds of each dictionary. This will index you to a random item in the dictionary */
var randombake;
var randomadj;
var randomanimal;
var randomdolan;
var infrequent;
var randomfunfact;

var toSend;
var len;

/* The string version of the JSON */
var r;

/* Things Riley did to obtain substrings from the JSON */
// var rileyNamelong;
// var rileyName;
var userId;

/* JSON keywords that come along with messages */
// var attatchments;
// var avatar_url;
// var created_at;
// var group_id;
// var id;
var name;
var message;


/* I am still unsure if this is used */
var chunk;


/* This function determines if the bot will respond to a certain message by triggering the bot based on a certain regex expression */
function respond() {
  // chunk = this.req.chunks[0]
  var request = JSON.parse(this.req.chunks[0]), //length is one
      botRegex = /./;
      //botRegex = /^\/cool guy$/;
  if (request["sender_id"] === "382629") {
    return;
  }

  // toSend = request.text.substring(5,request.text.length)

  r = JSON.stringify(request, null, 4);
  console.log("*****/n/n/n******/n" +r +"/n******/n/n/n*****" );
  // rileyNamelong = r.substring(r.indexOf('"name":') + 9, (r.indexOf('"sender_id":') - 4))
  // rileyName = rileyNamelong.substring(0, rileyNamelong.length - 3)
  userId = r.substring(r.indexOf('user_id":') + 11, r.indexOf('user_id":') + 18)
  
  /* set variables to JSON correspondent */
  // attatchments = request.attatchments;
  name = request.name;
  message = request.text;
  // avatar_url = request.avatar_url;
  // created_at = request.created_at;
  // group_id = request.group_id;
  // id = request.id;
  // sender_id = request.sender_id;
  // sender_type = request.sender_type;
  // source_guid = request.source_guid;
  // system = request.system;
  // text = request.text;
  // user_id = request.user_id;


//***************************************
//str = process.argv[2];
  input = message.split(' ').join('+');
  console.log("name: " + name + "      message: "+ message + "    w/o spaces: " + input);
  console.log("input ======= : " + input);
  theUrl = "http://www.cleverbot.com/getreply?key=CC2szqo8wJx9YX2uLlfEgMpcN-g" + "&input=" + input;// + "&cs=" + cState;

/*
  http.get(theUrl, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    //console.log(JSON.parse(res));

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        console.log(parsedData["output"]);
        cleverResponse = parsedData["output"];
       // cState = parsedData["conversation_id"]
      } catch (e) {
        console.error(e.message);
      }
    });
  });
*/
cleverResponse = "test this bitch";

//////////******************************





  if (request["sender_id"] != '382629') {
  //if (sender_type != bot) {
    if(request.text && botRegex.test(request.text)) {
    toSend = request.text;
    this.res.writeHead(200);
    postMessage();
    this.res.end();
    } 
  } 
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}


/* This function generates a message to be posted to by the bot */
function postMessage() {
  var botResponse, options, body, botReq;

  /*** commented out by erik ****
  randombake = Math.floor(Math.random() * (bakes.length - 0 + 1)) + 0;
  randomadj = Math.floor(Math.random() * (adjectives.length - 0 + 1)) + 0;
  randomanimal = Math.floor(Math.random() * (animals.length - 0 + 1)) + 0;
  randomdolan = Math.floor(Math.random() * (dolanLibrary.length - 0 + 1)) + 0;
  randomresponse = Math.floor(Math.random() * 2);
  infrequent = Math.floor(Math.random() * 100);
  randomfunfact = Math.floor(Math.random() * (funFacts.length - 0 + 1)) + 0;
  var randostring;
  var infrequentresponse;

  if (infrequent % 3 == 0) {
    infrequentresponse = "Hey " + name + ", did you know " + funFacts[randomfunfact]
  }

  else if (infrequent % 3 == 1) {
    infrequentresponse = "Damn " + name + ", has anyone ever told you that you kinda look like a " + adjectives[randomadj] + " " + animals[randomanimal]
  }


  if (randomresponse == 0) {
    randostring = "fuk u " + name
  }
  else {
    randostring = name + " pls"
  }
*/

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
   "bot_id" : botID,
   //"text" : infrequentresponse
   "text" : cleverResponse,
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}
console.log("***response: " + respond + " ***");


exports.respond = respond;
// Contact GitHub API Training Shop Blog About
// © 2017 GitHub, Inc. Terms Privacy Security Status Help



