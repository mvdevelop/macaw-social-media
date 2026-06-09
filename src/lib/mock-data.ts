// ============================================
// MOCK DATA - Macaw Social Media
// Gera 500+ usuários + posts + interações
// Imagens via Pexels (web), sem upload ao DB
// ============================================

// ============================================
// SEEDED PRNG (mulberry32)
// ============================================
function createRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const RNG = createRng(42);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(RNG() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(RNG() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

function randInt(min: number, max: number): number {
  return Math.floor(RNG() * (max - min + 1)) + min;
}

function randDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + RNG() * (end.getTime() - start.getTime()));
  return d.toISOString();
}

function randDateStr(start: Date, end: Date): string {
  const d = new Date(start.getTime() + RNG() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

// ============================================
// NAME POOLS
// ============================================
const FIRST_NAMES_M = [
  "James","Robert","Michael","David","Daniel","Matthew","Andrew","Christopher","Joseph","William",
  "Ryan","Nicholas","Jacob","Tyler","Brandon","Justin","Kevin","Thomas","Brian","Jason",
  "Lucas","Liam","Noah","Oliver","Elijah","Ethan","Mason","Logan","Alexander","Henry",
  "Sebastian","Jack","Owen","Aiden","Samuel","Luke","Dylan","Nathan","Caleb","Gabriel",
  "Benjamin","Isaac","Julian","Anthony","Adrian","Cameron","Diego","Hunter","Juan","Cole",
  "Pedro","Luca","Mateo","Santiago","Joaquin","Thiago","Rafael","Enzo","Nicolas","Gael",
  "Léo","Arthur","Heitor","Davi","Bernardo","Miguel","Vicente","Caio","Bruno","Felipe",
  "Gustavo","Rafael","Vitor","Igor","Renato","Marcos","Paulo","Sergio","André","Ricardo",
  "Eduardo","Alex","Marco","Antonio","Carlos","Jorge","Luis","Fernando","Roberto","Mario",
];
const FIRST_NAMES_F = [
  "Mary","Patricia","Jennifer","Linda","Elizabeth","Barbara","Susan","Jessica","Sarah","Karen",
  "Emma","Olivia","Ava","Sophia","Isabella","Mia","Charlotte","Amelia","Harper","Evelyn",
  "Abigail","Emily","Ella","Avery","Sofia","Camila","Aria","Scarlett","Victoria","Madison",
  "Luna","Grace","Chloe","Penelope","Layla","Riley","Zoey","Nora","Lily","Eleanor",
  "Valentina","Isabella","Samantha","Gabriella","Alice","Julia","Laura","Helena","Beatriz","Manuela",
  "Sofia","Isadora","Mariana","Clara","Larissa","Letícia","Amanda","Vanessa","Patricia","Carla",
  "Ana","Fernanda","Bruna","Camila","Daniela","Eduarda","Gabriela","Jessica","Luciana","Marina",
  "Rafaela","Renata","Sabrina","Tatiane","Vivian","Adriana","Bianca","Cristina","Debora","Elaine",
  "Fabiana","Giovana","Heloisa","Irene","Juliana","Karina","Lorena","Monica","Nathalia","Priscila",
];
const LAST_NAMES = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores",
  "Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts",
  "Silva","Santos","Oliveira","Souza","Lima","Pereira","Costa","Ferreira","Almeida","Barbosa",
  "Ribeiro","Carvalho","Araújo","Cavalcanti","Dias","Moreira","Melo","Rocha","Vieira","Martins",
  "Mendes","Nunes","Soares","Ramos","Correia","Neves","Teixeira","Fernandes","Castro","Azevedo",
  "Cardoso","Cunha","Duarte","Esteves","Fonseca","Godoi","Guimarães","Henriques","Leite","Lopes",
];
const CITIES = [
  "New York, NY","Los Angeles, CA","Chicago, IL","Houston, TX","Phoenix, AZ","Philadelphia, PA",
  "San Antonio, TX","San Diego, CA","Dallas, TX","San Jose, CA","Austin, TX","Jacksonville, FL",
  "Fort Worth, TX","Columbus, OH","Charlotte, NC","Indianapolis, IN","San Francisco, CA",
  "Seattle, WA","Denver, CO","Nashville, TN","Portland, OR","Miami, FL","Atlanta, GA",
  "Boston, MA","Detroit, MI","Minneapolis, MN","Salt Lake City, UT","Orlando, FL",
  "Raleigh, NC","Kansas City, MO","Cincinnati, OH","Cleveland, OH","Tampa, FL",
  "São Paulo, SP","Rio de Janeiro, RJ","Belo Horizonte, MG","Salvador, BA","Fortaleza, CE",
  "Brasília, DF","Curitiba, PR","Recife, PE","Porto Alegre, RS","Manaus, AM",
  "Lisbon, Portugal","Porto, Portugal","London, UK","Manchester, UK","Berlin, Germany",
  "Munich, Germany","Paris, France","Madrid, Spain","Barcelona, Spain","Rome, Italy",
  "Tokyo, Japan","Seoul, South Korea","Sydney, Australia","Melbourne, Australia",
  "Toronto, Canada","Vancouver, Canada","Mexico City, Mexico","Bogotá, Colombia",
  "Buenos Aires, Argentina","Santiago, Chile","Lima, Peru","Quito, Ecuador",
];
const SCHOOLS = [
  "University of California","NYU","Stanford University","MIT","Harvard University",
  "University of Michigan","UCLA","University of Texas","Columbia University",
  "University of Florida","University of Chicago","USC","Princeton University",
  "University of Washington","Duke University","Northwestern University",
  "USP","UNICAMP","UFRJ","UFMG","PUC-SP","FGV",
  "University of Oxford","University of Cambridge","Imperial College London",
  "University of Tokyo","Seoul National University","University of Sydney",
  "University of Toronto","Sorbonne University","University of Barcelona",
  "University of São Paulo","Federal University of Rio de Janeiro",
  "Lincoln High School","Washington High School","Jefferson High School",
  "Central High School","West High School","East High School","North High School",
  "Colegio São Bento","Colegio Bandeirantes","Colegio Santa Maria",
  "St. Mary's Academy","St. Joseph's School","St. Paul's School",
];
const COMPANIES = [
  "Google","Apple","Microsoft","Amazon","Meta","Netflix","Uber","Airbnb","Spotify","Twitter",
  "Tesla","SpaceX","Adobe","Salesforce","Oracle","IBM","Intel","Cisco","Dell","HP",
  "Nubank","Stone","PagSeguro","iFood","QuintoAndar","Loft","VTEX","Mercado Livre",
  "Freelance Designer","Self-Employed","Startup Founder","Digital Creator",
  "Local Business Owner","Restaurant Owner","Photography Studio","Consulting Agency",
  "Hospital das Clínicas","Sírio-Libanês Hospital","Albert Einstein Hospital",
  "Mackenzie University","UNESP","University of Brasília",
];
const BIOS = [
  "Software developer passionate about creating elegant solutions to complex problems.",
  "Photographer & digital artist. Capturing moments that matter.",
  "Travel enthusiast exploring the world one city at a time.",
  "Fitness coach & yoga instructor helping people live their best lives.",
  "Musician, composer, and producer. Music is life.",
  "Food lover and amateur chef. Always trying new recipes.",
  "Writer & poet. Words are my superpower.",
  "Digital marketer helping brands grow their online presence.",
  "Architect by profession, artist by heart.",
  "Data scientist exploring the intersection of AI and human creativity.",
  "Fashion enthusiast & style consultant.",
  "Entrepreneur building the next big thing.",
  "Teacher inspiring young minds every day.",
  "Doctor dedicated to making healthcare accessible to all.",
  "Environmental activist fighting for a greener planet.",
  "Video game developer and esports enthusiast.",
  "Film buff and aspiring director.",
  "Animal lover and volunteer at local shelters.",
  "Yoga practitioner finding balance in a chaotic world.",
  "Coffee addict and bookworm. Perfect combo.",
  "Running marathons and chasing dreams.",
  "Painter and visual artist. The canvas is my world.",
  "Crypto enthusiast and blockchain developer.",
  "Psychology student understanding the human mind.",
  "Marine biologist passionate about ocean conservation.",
  "History buff and museum curator.",
  "Astronomy lover. Looking up at the stars.",
  "Chef de cuisine creating gastronomic experiences.",
  "Fashion designer with a sustainable approach.",
  "Volunteer teacher. Education changes lives.",
];
const WEBSITES = [
  ".com",".dev",".io",".co",".blog",".portfolio",".me",".design",".photo",".travel",
];
const USERNAME_PREFIXES = [
  "the","real","official","mr","ms","its","just","hey","im","_",
];

// ============================================
// PEXELS IMAGE POOLS (verified working photo IDs)
// ============================================
const AVATAR_POOL = [
  "12198960","35496265","35525012","35590309","35554037","35634366","35443625","35655771",
  "35360579","35350413","35565461","34374535","18465582","27585749","18289481",
  "35729138","35701815","35680942","35639714","35586994","35577172","35563658",
  "35548297","35528023","35515960","35500894","35487966","35474906","35459874",
  "35438821","35421139","35409963","35396873","35382479","35369567","35357186",
  "35342149","35329736","35317558","35305062","35291387","35278481","35266321",
  "35253964","2379004","35228723","220453","697509","428328","2381069",
  "415829","35157343","91227","3785079","1681010","1130626","1933873",
  "874158","1874585","146531","1239291","1065084","1840608","1656684",
  "428333","3785429","35144974","1874585","146531","1239291","1065084",
  "1840608","1656684","34994106","3785429","34971057","34959733","91227",
  "2381069","428328","220453","697509","415829","3785079","1681010",
  "1130626","1933873","874158","34912292","34900875","34888162","34875644",
  "34863638","2379004","34840173","415829","34791787","34780380","91227",
  "3785079","34757172","1681010","1130626","1933873","874158","1874585",
  "146531","1239291","1065084","1840608","1656684","428333","3785429",
];
const COVER_POOL = [
  "2504709","17584747","35350413","35565461","34374535","35655771","18465582",
  "27585749","18289481","35360579","35729138","35701815","35680942","35639714",
  "35586994","35577172","35563658","35548297","35528023","35515960","35500894",
  "35487966","35474906","35459874","35438821","35421139","35409963","35396873",
  "35382479","35369567","35357186","35342149","35329736","35317558","35305062",
  "35291387","35278481","35266321","35253964","2379004","35228723","220453",
  "697509","428328","2381069","35157343","91227","3785079","1681010",
  "1130626","1933873","874158","1874585","146531","1239291","1065084",
  "1840608","1656684","428333","3785429","34971057","34959733","415829",
];

function pexelUrl(id: string): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
}
function pexelAvatar(): string {
  return pexelUrl(pick(AVATAR_POOL));
}
function pexelCover(): string {
  return pexelUrl(pick(COVER_POOL));
}

// ============================================
// DATA GENERATION
// ============================================
export interface MockUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  avatar: string;
  cover: string;
  description: string;
  city: string;
  school: string;
  work: string;
  website: string;
  createdAt: string;
}

export interface MockPost {
  id: number;
  content: string;
  img: string | null;
  createdAt: string;
  userId: string;
  user: MockUser;
  likes: number;
  liked: boolean;
  commentCount: number;
}

export interface MockComment {
  id: number;
  content: string;
  createdAt: string;
  userId: string;
  user: MockUser;
  likes: number;
}

export interface MockStory {
  id: number;
  img: string;
  userId: string;
  user: MockUser;
  createdAt: string;
}

export interface MockFriendRequest {
  id: number;
  user: MockUser;
  createdAt: string;
}

export interface MockMarketplaceItem {
  id: number;
  title: string;
  price: string;
  img: string;
  location: string;
  userId: string;
  user: MockUser;
  createdAt: string;
}

export interface MockEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  img: string;
  attendees: number;
}

export interface MockGroup {
  id: number;
  name: string;
  img: string;
  members: number;
  category: string;
}

export interface MockNotification {
  id: number;
  type: "like" | "comment" | "follow" | "friend_request" | "share" | "message";
  user: MockUser;
  postId?: number;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface MockMessage {
  id: number;
  senderId: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface MockConversation {
  id: number;
  user: MockUser;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  online: boolean;
  messages: MockMessage[];
}

// ============================================
// POST CONTENT POOL
// ============================================
const POST_TEXTS = [
  "Just had an amazing sunset photoshoot! The colors were absolutely breathtaking today. 🌅 Can't wait to share more photos with everyone!",
  "Exploring the streets of Tokyo! 🇯🇵 Every corner is a new adventure. The food, the culture, the people — absolutely incredible experience!",
  "New track just dropped! 🎵 Spent the last 3 months working on this album. Link in bio!",
  "Morning yoga session done! 💪 Starting the day right. Who else loves morning workouts?",
  "Just finished reading an incredible book. Such a masterpiece! 📚 What are you reading right now?",
  "Weekend hiking trip was incredible! The views from the top were worth every step. 🏔️",
  "New café in town! ☕ Best latte art I've ever seen. Highly recommend!",
  "Throwback to my Paris trip last spring. The Eiffel Tower never gets old! 🗼",
  "Today was productive! Got so much done. How was your day?",
  "Grateful for the little things. ☀️",
  "Fresh start, fresh mindset. New week, new goals! 🚀",
  "Trying out a new recipe today. Cooking is therapy. 🍳",
  "Beach day! Nothing beats the sound of the waves. 🌊",
  "Sunset chasers 🌅 This view never gets old.",
  "Coffee and coding. Name a better duo. ☕💻",
  "Work hard, dream big. Never give up on your goals. ✨",
  "Family time is the best time. ❤️",
  "Weekend vibes only! 🎉",
  "Nature is the ultimate artist. 🍃",
  "Late night thoughts: Life is beautiful. 🌙",
  "New project alert! Building something exciting. Stay tuned! 🔥",
  "Throwback Thursday! Remember when we did this? 😂",
  "Motivation Monday: You are capable of amazing things! 💪",
  "Self-care Sunday. Taking time to recharge. 🧘",
  "Friday feeling! The weekend is here! 🎊",
  "Pet lovers, unite! My fur baby is the cutest. 🐾",
  "Just ran my first 10k! New personal record! 🏃",
  "Art gallery opening was amazing. So much talent! 🎨",
  "Live music night! This band is incredible. 🎸",
  "Rainy days are the best for reading and hot chocolate. ☕📖",
];

const COMMENT_TEXTS = [
  "Absolutely stunning! 🔥",
  "This is incredible! 😍",
  "Love this so much! ❤️",
  "Great work! Keep it up! 👏",
  "Amazing shot! What camera did you use?",
  "Where was this taken? I need to visit!",
  "This made my day! 😊",
  "You're so talented! ✨",
  "Can't believe I missed this! 😱",
  "Wow, just wow! 🤩",
  "So beautiful! 💫",
  "This is goals right here! 🎯",
  "I need to try this! 🔥",
  "Incredible work as always! 🌟",
  "Count me in! 🙌",
  "This looks amazing! 📸",
  "Perfection! 👌",
  "Love the energy here! ⚡",
  "So proud of you! 🎉",
  "This gave me chills! 🥶",
  "Absolutely beautiful! 😍",
  "You never disappoint! 💯",
  "Living your best life! 🙏",
  "This is art! 🎨",
  "Iconic! 👑",
  "The vibes are immaculate! ✨",
  "Need this in my life! 💜",
  "This is everything! ❤️",
  "Legendary! ⭐",
  "Pure magic! 🪄",
];

// ============================================
// GENERATE USERS
// ============================================
const USER_COUNT = 2000;

function generateUsername(name: string, surname: string): string {
  const prefix = RNG() > 0.5 ? pick(USERNAME_PREFIXES) + "_" : "";
  const suffix = RNG() > 0.7 ? `_${randInt(1, 999)}` : "";
  return (prefix + name.toLowerCase() + "_" + surname.toLowerCase() + suffix).replace(/[^a-z0-9_]/g, "");
}

const generatedUsers: MockUser[] = [];
const allFirstNames = [...FIRST_NAMES_M, ...FIRST_NAMES_F];

for (let i = 0; i < USER_COUNT; i++) {
  const name = pick(allFirstNames);
  const surname = pick(LAST_NAMES);
  generatedUsers.push({
    id: `u${i + 1}`,
    username: generateUsername(name, surname),
    name,
    surname,
    avatar: pexelAvatar(),
    cover: pexelCover(),
    description: pick(BIOS),
    city: pick(CITIES),
    school: pick(SCHOOLS),
    work: pick(COMPANIES),
    website: `https://${name.toLowerCase()}${pick(WEBSITES)}`,
    createdAt: randDateStr(new Date("2022-01-01"), new Date("2025-12-31")),
  });
}

const users = generatedUsers;

// ============================================
// Image pool for posts (landscape/nature)
// ============================================
const POST_IMG_POOL = [
  "35360579","35350413","35565461","34374535","35655771","18465582",
  "35729138","35701815","35680942","35639714","35586994","35577172",
  "35563658","35548297","35528023","35515960","35500894","35487966",
  "35474906","35459874","35438821","35421139","35409963","35396873",
  "35382479","35369567","35357186","35342149","35329736","35317558",
  "35305062","35291387","35278481","35266321","35253964","35241895",
  "35228723","35216378","35204037","35192852","35180583","35169063",
  "35157343","35144974","35126636","35114204","35102341","35090740",
  "35078829","35067414","35055479","35042831","35030704","35018940",
  "35007035","34994106","34982942","34971057","34959733","34947430",
  "34935582","34923707","34912292","34900875","34888162","34875644",
  "34863638","34852157","34840173","34828140","34816170","34804041",
  "34791787","34780380","34768842","34757172","34745402","34733854",
  "34722286","34710569","34698826","34687236","34675622","34663847",
  "34652037","34640393","34628701","34617039","34605380","34593774",
  "34582218","34570614","34559065","34547396","34535786","34524191",
  "34512587","34500961","34489372","34477758","34466192","34454602",
  "34442976","34431373","34419730","34408128","34396469","34384883",
  "34373221","34361660","34350003","34338372","34326737","34315117",
  "34303492","34291859","34280237","34268627","34257021","34245454",
];

function postImage(): string | null {
  return RNG() > 0.4 ? pexelUrl(pick(POST_IMG_POOL)) : null;
}

// ============================================
// Short video pool (Pexels free stock videos)
// ============================================
const VIDEO_POOL = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
];

const VIDEO_TEXTS = [
  "Check out this amazing timelapse! 🎥",
  "Morning vibes captured on video 🌅",
  "Quick tour of my favorite spot! 🏙️",
  "Watch till the end! You won't believe what happens 😱",
  "Nature at its finest 🍃🎥",
  "Behind the scenes of today's shoot 🎬",
  "City life never sleeps 🌃✨",
  "A moment of peace and tranquility 🧘",
  "Speeding things up a bit ⏩🔥",
  "Perfect loop, don't @ me 🔄😎",
];

// ============================================
// GENERATE POSTS (~1500 posts with images + ~200 video posts)
// ============================================
const POST_COUNT = 17000;
const generatedPosts: MockPost[] = [];

for (let i = 0; i < POST_COUNT; i++) {
  const user = users[i % users.length];
  const createdAt = randDate(new Date("2025-06-01"), new Date("2026-06-08"));

  // 10% of posts are videos
  const isVideo = RNG() < 0.1;
  const img = isVideo ? pick(VIDEO_POOL) : postImage();

  generatedPosts.push({
    id: i + 1,
    content: isVideo ? pick(VIDEO_TEXTS) : pick(POST_TEXTS),
    img,
    createdAt,
    userId: user.id,
    user,
    likes: randInt(5, 999),
    liked: RNG() > 0.7,
    commentCount: randInt(0, 150),
  });
}

// Sort by date descending
generatedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const posts = generatedPosts;

// ============================================
// GENERATE COMMENTS (~3000 comments)
// ============================================
const generatedComments: Record<number, MockComment[]> = {};
let commentId = 1;

for (const post of posts.slice(0, 6000)) { // comment on first 6000 posts
  const count = randInt(0, 8);
  const commenters = pickN(users, Math.min(count + 2, users.length));
  const arr: MockComment[] = [];
  for (const commenter of commenters) {
    arr.push({
      id: commentId++,
      content: pick(COMMENT_TEXTS),
      createdAt: randDate(new Date(post.createdAt), new Date("2026-06-08")),
      userId: commenter.id,
      user: commenter,
      likes: randInt(0, 50),
    });
  }
  generatedComments[post.id] = arr;
}

const comments = generatedComments;

// ============================================
// GENERATE STORIES (5+ per user = 2500+ stories)
// ============================================
const STORIES_PER_USER = 8; // realista — stories expiram em 24h
const generatedStories: MockStory[] = [];
let storyId = 1;

for (let i = 0; i < users.length; i++) {
  const user = users[i];
  const count = i === 0 ? 8 : STORIES_PER_USER; // user u1 (current user) tem 8 stories
  for (let j = 0; j < count; j++) {
    generatedStories.push({
      id: storyId++,
      img: pick(POST_IMG_POOL) ? pexelUrl(pick(POST_IMG_POOL)) : user.avatar,
      userId: user.id,
      user,
      createdAt: randDate(new Date("2026-06-01"), new Date("2026-06-08")),
    });
  }
}
generatedStories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const storiesMap = new Map<string, MockStory[]>();
for (const story of generatedStories) {
  if (!storiesMap.has(story.userId)) {
    storiesMap.set(story.userId, []);
  }
  storiesMap.get(story.userId)!.push(story);
}

const stories = generatedStories;

// ============================================
// GENERATE FRIEND REQUESTS (~20)
// ============================================
const generatedFriendRequests: MockFriendRequest[] = [];
for (let i = 0; i < 20; i++) {
  const user = pick(users.slice(1, 101)); // avoid current user (u1)
  if (!generatedFriendRequests.find(r => r.user.id === user.id)) {
    generatedFriendRequests.push({
      id: i + 1,
      user,
      createdAt: randDate(new Date("2026-05-01"), new Date("2026-06-08")),
    });
  }
}

const friendRequests = generatedFriendRequests.slice(0, 5); // show only 5

// ============================================
// BIRTHDAYS
// ============================================
const birthdays: MockUser[] = pickN(users, 12);

// ============================================
// GENERATE MARKETPLACE ITEMS (~30)
// ============================================
const MARKETPLACE_TITLES = [
  "Vintage Camera","Gaming Laptop","Acoustic Guitar","Mountain Bike","Yoga Mat Premium",
  "Designer Watch","Leather Jacket","Smart TV 55","Electric Scooter","Coffee Machine",
  "Vintage Vinyl Collection","MacBook Pro M3","iPhone 15 Pro","PS5 Console",
  "Drone with 4K Camera","Wireless Headphones","Mechanical Keyboard","Gaming Chair",
  "Trekking Backpack","Tent 4 Seasons","Electric Guitar Fender","DJ Controller",
  "Sony Mirrorless Camera","Tablet Pro 12.9","Smart Watch Ultra","Road Bike",
  "Record Player Vintage","Polaroid Camera","Board Game Collection","Artwork Original",
  "Designer Handbag","Sunglasses (Ray-Ban)","Running Shoes (New)","Dumbbells Set 20kg",
  "Skateboard Custom","Surfboard 6'2\"","Winter Jacket North Face","Camping Stove",
];
const MARKETPLACE_PRICES = [
  "$49","$79","$99","$149","$199","$249","$299","$349","$399","$449",
  "$499","$549","$599","$699","$799","$899","$999","$1,099","$1,299","$1,499",
  "$1,699","$1,999","$2,499","$2,999","$3,499","$4,999",
];

const generatedMarketplace: MockMarketplaceItem[] = [];
for (let i = 0; i < 30; i++) {
  const user = pick(users);
  generatedMarketplace.push({
    id: i + 1,
    title: pick(MARKETPLACE_TITLES),
    price: pick(MARKETPLACE_PRICES),
    img: pexelUrl(pick(POST_IMG_POOL)),
    location: user.city,
    userId: user.id,
    user,
    createdAt: randDateStr(new Date("2026-01-01"), new Date("2026-06-01")),
  });
}

const marketplaceItems = generatedMarketplace;

// ============================================
// GENERATE EVENTS (~16)
// ============================================
const EVENT_NAMES = [
  "Summer Music Festival","Tech Conference 2026","Art Gallery Opening","Food Truck Festival",
  "Startup Pitch Night","Yoga in the Park","Photography Workshop","Wine Tasting Evening",
  "Beach Cleanup Day","Marathon 2026","Book Fair","Film Festival",
  "Fashion Week","Gaming Tournament","Charity Gala","Farmers Market Weekend",
  "Coding Bootcamp Meetup","Dance Workshop","Comedy Night","Jazz Concert",
  "Marine Biology Expo","Astronomy Night","Cooking Class","Design Thinking Workshop",
  "Science Fair","Robotics Competition","Gardening Workshop","Pet Adoption Day",
  "Virtual Reality Expo","Sustainable Living Fair",
];
const EVENT_LOCATIONS = [
  "Central Park, NY","Moscone Center, SF","SoHo, NY","Golden Gate Park, SF",
  "Madison Square Garden, NY","Staples Center, LA","Wrigley Field, Chicago",
  "Convention Center, Austin","Pier 17, NY","Union Square, SF",
  "Ibirapuera Park, SP","Maracanã, RJ","Mineirão, BH","Arena Fonte Nova, BA",
  "Parque das Nações, Lisbon","Hyde Park, London","Tiergarten, Berlin",
  "Shinjuku Park, Tokyo","Royal Botanic Gardens, Sydney","Stanley Park, Vancouver",
];

const generatedEvents: MockEvent[] = [];
for (let i = 0; i < 18; i++) {
  const month = randInt(6, 12);
  const day = randInt(1, 28);
  generatedEvents.push({
    id: i + 1,
    title: pick(EVENT_NAMES),
    date: `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month - 1]} ${day}, 2026`,
    location: pick(EVENT_LOCATIONS),
    img: pexelUrl(pick(COVER_POOL)),
    attendees: randInt(100, 15000),
  });
}

const events = generatedEvents;

// ============================================
// GENERATE GROUPS (~18)
// ============================================
const GROUP_NAMES = [
  "Photography Enthusiasts","Tech Startups Club","Food Lovers United","Fitness Journey",
  "Travel Adventures","Music Makers","Book Worms Club","Film Critics Circle",
  "Art & Design Studio","Gaming Community","Yoga & Meditation","Wine Connoisseurs",
  "Pet Lovers","Hiking Explorers","Dance Crew","Coding Ninjas",
  "Fashion Forward","Gardening Club","Volunteer Heroes","Science Minds",
  "Coffee Addicts Anonymous","Writers Guild","Cooking Masters","Vintage Collectors",
  "Digital Nomads","Street Photography","Vegan Recipes","Trail Running",
  "Indie Game Dev","Urban Sketching","Minimalist Lifestyle","Board Game Night",
  "Drone Pilots","K-Pop Fans","Motorcycle Riders","Astronomy Club",
  "Sushi Lovers","Retro Computing","Beekeeping 101","Pottery & Ceramics",
  "Cryptocurrency Traders","Horseback Riding","Scuba Diving Club","Parkour Athletes",
  "Esports Team","Origami Artists","Bird Watching","Home Brewing",
  "Rock Climbing","Magic The Gathering","Calligraphy Studio","Cycling Club",
  "Sustainable Fashion","Woodworking Workshop","Jazz Appreciation","Martial Arts",
  "Surfing Community","Chess Masters","Knitting Circle","Astrology Fans",
  "Formula 1 Fans","Tattoo Artists","Comic Book Collectors","Sim Racing",
  "Sailing Club","Lockpicking Sport","Lego Builders","Hackerspace",
  "Mountain Biking","Stand-Up Comedy","Wine Making","Metal Detecting",
  "Bushcraft & Survival","Ham Radio Operators","3D Printing Hub","Robotics Club",
  "Urban Gardening","Rowing Club","Cricket Fans","Basketball Analytics",
  "Scale Modeling","Sewing & Tailoring","Whiskey Tasting","Freestyle Rap",
  "Classic Car Restorers","Mushroom Foraging","Ghost Hunting","Knife Making",
  "Animation Fans","Extreme Ironing","CrossFit Community","Kite Flying Club",
  "Paragliding Club","Slackline Community","Ethical Hacking","Seed Swapping",
  "Indie Music Producers","Battle Rap League","Skateboard Builders","Antiques Roadshow Fans",
  "VHS Collectors","Tiny House Movement","Van Life","Permaculture Design",
  "Jewelry Making","Leathercraft","Soap Making","Urban Exploration",
  "Pixel Art","Chiptune Music","Roblox Devs","Minecraft Architects",
  "Speedrunning","Retro Gaming","VR Enthusiasts","Tabletop RPG",
  "Warhammer 40k","Model Railroads","Fermentation Station","Hot Sauce Makers",
  "Bonsai Artists","Ikebana","Tea Ceremony","Meditation Circle",
  "Piano Lovers","Beatboxing","Acapella Group","Songwriters Circle",
  "Podcasters United","YouTube Creators","Twitch Streamers","Content Strategy",
  "AI Art Club","No Code Devs","Blockchain Gaming","NFT Collectors",
  "Plant Parenthood","Zero Waste","Eco Activism","Solar Punk",
  "History Reenactors","Medieval Faires","Cosplay Crafters","LARP Adventures",
  "Dungeons & Dragons","Cyberpunk Fans","Star Wars Legends","Star Trek Club",
  "Marvel Universe","DC Fans","Anime Lovers","Manga Readers",
  "K-Drama Addicts","Bollywood Fans","Independent Cinema","Documentary Lovers",
  "True Crime Podcast","Conspiracy Theories","Mystery Books","Horror Movie Club",
];
const GROUP_CATEGORIES = [
  "Arts","Technology","Food","Health","Travel","Music","Books","Film",
  "Design","Gaming","Wellness","Lifestyle","Pets","Outdoors","Sports",
  "Education","Fashion","Nature","Community","Science",
  "Cars","Photography","Dance","Business","History","Languages",
  "Crafts","Fitness","Anime","Comedy",
];

const generatedGroups: MockGroup[] = [];
for (let i = 0; i < 180; i++) {
  generatedGroups.push({
    id: i + 1,
    name: pick(GROUP_NAMES),
    img: pexelUrl(pick(COVER_POOL)),
    members: randInt(500, 50000),
    category: pick(GROUP_CATEGORIES),
  });
}

const groups = generatedGroups;

// ============================================
// NOTIFICATIONS (~30)
// ============================================
const generatedNotifications: MockNotification[] = [];
for (let i = 0; i < 30; i++) {
  const friend = pick(users.slice(1, 30));
  const type = pick<MockNotification["type"]>(["like","comment","follow","friend_request","share","message"]);
  const postId = type === "like" || type === "comment" || type === "share" ? pick(posts).id : undefined;

  let content = "";
  if (type === "like") content = "curtiu seu post";
  else if (type === "comment") content = `comentou no seu post: "${pick(COMMENT_TEXTS).slice(0, 30)}"`;
  else if (type === "share") content = "compartilhou seu post";
  else if (type === "message") content = "enviou uma mensagem";
  else if (type === "follow") content = "começou a seguir você";
  else content = "enviou uma solicitação de amizade";

  generatedNotifications.push({
    id: i + 1,
    type,
    user: friend,
    postId,
    content,
    createdAt: randDate(new Date("2026-05-01"), new Date("2026-06-08")),
    read: RNG() > 0.6,
  });
}
generatedNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const notifications = generatedNotifications;

// ============================================
// CHAT / CONVERSATIONS (~20)
// ============================================
const CHAT_TEXTS = [
  "Oi! Tudo bem?","Tudo ótimo e você?","Vamos marcar algo esse fim de semana!",
  "Adorei as fotos!","Que legal!","Bora tocar esse fds?",
  "Vou sim, confirmado!","Show!","Até mais tarde!",
  "E aí, conseguiu ver?","Ficou top!","Podemos nos encontrar amanhã?",
  "Claro! Que horas?","Oi, sumida!","Saudades!",
  "Vamos almoçar juntos?","Boa ideia!","Te aviso quando chegar",
  "Tudo certo por aqui","Obrigado pela ajuda!","De nada! 😊",
  "Feliz aniversário! 🎂","Muito obrigado!","Que foto linda!",
  "Vou compartilhar","Incrível!","Parabéns! 👏",
  "Bom dia! 🌅","Boa noite! 🌙","Até logo!",
];

const generatedConversations: MockConversation[] = [];
for (let i = 0; i < 20; i++) {
  const friend = pick(users.slice(1, 50));
  const msgCount = randInt(2, 8);
  const msgs: MockMessage[] = [];
  let lastDate = new Date("2026-05-20");
  for (let j = 0; j < msgCount; j++) {
    const msgDate = randDate(lastDate, new Date("2026-06-08"));
    lastDate = new Date(msgDate);
    msgs.push({
      id: msgs.length + 1,
      senderId: j % 2 === 0 ? friend.id : "u1",
      text: pick(CHAT_TEXTS),
      createdAt: msgDate,
      read: RNG() > 0.3 || j < msgCount - 1,
    });
  }
  const lastMsg = msgs[msgs.length - 1];
  generatedConversations.push({
    id: i + 1,
    user: friend,
    lastMessage: lastMsg.text,
    lastMessageAt: lastMsg.createdAt,
    unread: msgs.filter(m => m.senderId !== "u1" && !m.read).length,
    online: RNG() > 0.5,
    messages: msgs,
  });
}
generatedConversations.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());

const conversations = generatedConversations;

// ============================================
// HELPERS (same interface as before)
// ============================================

export function getCurrentUser(): MockUser {
  return users[0]; // u1 = "James Smith"
}

export function getUserById(id: string): MockUser | undefined {
  return users.find((u) => u.id === id);
}

export function getAllUsers(): MockUser[] {
  return users;
}

export function getPosts(): MockPost[] {
  return posts;
}

export function getPostById(id: number): MockPost | undefined {
  return posts.find((p) => p.id === id);
}

export function getPostsByUserId(userId: string): MockPost[] {
  return posts.filter((p) => p.userId === userId);
}

export function getCommentsByPostId(postId: number): MockComment[] {
  return comments[postId] || [];
}

export function getStories(): MockStory[] {
  return stories;
}

export function getStoriesByUserId(userId: string): MockStory[] {
  return generatedStories.filter((s) => s.userId === userId);
}

export function getGroupedStories(): Map<string, MockStory[]> {
  return storiesMap;
}

export function getFriendRequests(): MockFriendRequest[] {
  return friendRequests;
}

export function getBirthdays(): MockUser[] {
  return birthdays;
}

export function getMarketplaceItems(): MockMarketplaceItem[] {
  return marketplaceItems;
}

export function getMarketplaceItemById(id: number): MockMarketplaceItem | undefined {
  return marketplaceItems.find((item) => item.id === id);
}

export function getEvents(): MockEvent[] {
  return events;
}

export function getGroups(): MockGroup[] {
  return groups;
}

export function getGroupCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const g of groups) {
    map.set(g.category, (map.get(g.category) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getNotifications(): MockNotification[] {
  return notifications;
}

export function getUnreadNotificationCount(): number {
  return notifications.filter((n) => !n.read).length;
}

export function getConversations(): MockConversation[] {
  return conversations;
}

export function getConversationById(id: number): MockConversation | undefined {
  return conversations.find((c) => c.id === id);
}

export function getTotalUnreadMessages(): number {
  return conversations.reduce((acc, c) => acc + c.unread, 0);
}
