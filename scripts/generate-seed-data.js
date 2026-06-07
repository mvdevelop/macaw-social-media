// scripts/generate-seed-data.js
// Gera dados mockados realistas usando imagens externas (zero storage)
// Uso: node scripts/generate-seed-data.js > supabase/seed-data.sql
// Depois cole o SQL no Supabase SQL Editor

const firstNames = [
  "James","Mary","John","Patricia","Robert","Jennifer","Michael","Linda","David","Barbara",
  "William","Elizabeth","Richard","Susan","Joseph","Jessica","Thomas","Sarah","Christopher","Karen",
  "Charles","Lisa","Daniel","Nancy","Matthew","Betty","Anthony","Margaret","Mark","Sandra",
  "Donald","Ashley","Steven","Kimberly","Paul","Emily","Andrew","Donna","Joshua","Michelle",
  "Kenneth","Carol","Kevin","Amanda","Brian","Dorothy","George","Melissa","Timothy","Deborah",
  "Ronald","Stephanie","Edward","Rebecca","Jason","Sharon","Jeffrey","Laura","Ryan","Cynthia",
  "Jacob","Kathleen","Gary","Amy","Nicholas","Angela","Eric","Shirley","Jonathan","Anna",
  "Stephen","Brenda","Larry","Pamela","Justin","Emma","Scott","Nicole","Brandon","Helen",
  "Frank","Samantha","Raymond","Katherine","Gregory","Christine","Joshua","Debra","Jerry","Rachel",
  "Dennis","Carolyn","Walter","Janet","Patrick","Catherine","Harold","Maria","Douglas","Heather",
];
const lastNames = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores",
  "Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts",
  "Gomez","Phillips","Evans","Turner","Diaz","Parker","Cruz","Edwards","Collins","Reyes",
  "Stewart","Morris","Morales","Murphy","Cook","Rogers","Gutierrez","Ortiz","Morgan","Cooper",
  "Peterson","Bailey","Reed","Kelly","Howard","Ramos","Kim","Cox","Ward","Richardson",
  "Watson","Brooks","Chavez","Wood","James","Bennett","Gray","Mendoza","Ruiz","Hughes",
  "Price","Alvarez","Castillo","Sanders","Patel","Myers","Long","Ross","Foster","Jimenez",
];
const cities = [
  "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","Austin",
  "San Jose","Jacksonville","Fort Worth","Columbus","Charlotte","Indianapolis","San Francisco","Seattle","Denver","Nashville",
  "Miami","Portland","Oklahoma City","Las Vegas","Louisville","Baltimore","Milwaukee","Albuquerque","Tucson","Fresno",
  "Mesa","Sacramento","Atlanta","Kansas City","Colorado Springs","Omaha","Raleigh","Long Beach","Virginia Beach","Miami Beach",
  "Oakland","Minneapolis","Tampa","Tulsa","Arlington","New Orleans","Cleveland","Bakersfield","Honolulu","Anaheim",
];
const schools = [
  "MIT","Stanford","Harvard","UC Berkeley","UCLA","Columbia","Yale","Princeton","Cornell","NYU",
  "University of Chicago","Duke","Northwestern","USC","University of Michigan","UC San Diego","Carnegie Mellon","University of Texas","Georgia Tech","University of Washington",
  "University of Florida","University of Illinois","Purdue","UMass","Ohio State","Penn State","Texas A&M","Arizona State","UC Davis","UC Irvine",
  "University of Miami","Boston University","University of Oregon","University of Arizona","UC Santa Barbara","Michigan State","University of Colorado","University of Georgia","Florida State","Clemson",
  "Indiana University","University of Utah","Rutgers","University of Kansas","Oregon State","SUNY Buffalo","University of New Mexico","Virginia Tech","Tulane","RPI",
];
const works = [
  "Google","Apple","Meta","Microsoft","Amazon","Netflix","Spotify","Twitter","LinkedIn","Uber",
  "Airbnb","Dropbox","Stripe","Shopify","Reddit","Pinterest","Snap","TikTok","Nvidia","Salesforce",
  "Oracle","IBM","Intel","Cisco","Adobe","PayPal","Square","Tesla","SpaceX","Zoom",
  "Slack","GitHub","Twilio","Atlassian","Canva","Figma","Notion","Vercel","Supabase","Vercel",
];
const descriptions = [
  "Building the future, one commit at a time. ☕",
  "Full-stack developer by day, gamer by night. 🎮",
  "Turning coffee into code since 2018. 💻",
  "Designing elegant solutions to complex problems. ✨",
  "Life is short, make every line count. ⚡",
  "Exploring the intersection of tech and art. 🎨",
  "On a mission to make the web better. 🌐",
  "Code is poetry in motion. 📝",
  "Building products that make a difference. 🚀",
  "Learning something new every day. 📚",
  "Software engineer with a passion for UX. 🎯",
  "Creating digital experiences that matter. 💡",
  "Tech enthusiast and lifelong learner. 🔬",
  "Simplifying complexity through code. 🧩",
  "Engineer by trade, artist at heart. 🖌️",
  "Data-driven decision maker. 📊",
  "Open source contributor and community builder. 🤝",
  "Making the world a better place through technology. 🌍",
  "Code. Sleep. Repeat. 🔄",
  "Passionate about performant web apps. ⚡",
];
const postContents = [
  "Just launched a new feature! After weeks of hard work, it's finally live. The team did an amazing job. Check it out and let me know what you think! 🚀",
  "Beautiful sunset from the office rooftop today. Sometimes you just need to pause and appreciate the view. 🌅",
  "Hot take: TypeScript is the best thing that happened to JavaScript. Fight me. 🔥",
  "Spent the weekend hiking in the mountains. No reception, no emails, just pure nature. Highly recommend! 🏔️",
  "Just finished reading 'Atomic Habits' by James Clear. Game changer for productivity! 📚",
  "New blog post is up! I wrote about my journey from junior to senior developer and the lessons I learned along the way. Link in bio! ✍️",
  "Coffee and code. Name a better duo. I'll wait. ☕💻",
  "Finally optimized our database queries. From 5 seconds to 50 milliseconds. Sometimes the simple fixes make the biggest difference. ⚡",
  "Throwback to my first hackathon. We built a social media app in 48 hours. Look at us now! 🏆",
  "Great team meeting today. Love working with people who challenge me to be better. 🤝",
  "Just discovered a new framework and I'm obsessed. This is why I love this industry - there's always something new to learn! 🔥",
  "Weekend vibes. Grilling some burgers and enjoying the weather. Life is good. 🍔☀️",
  "Proud moment: my PR just got merged into a major open source project! 🎉",
  "Does anyone else refactor code at 2 AM just because you can't sleep thinking about a better solution? 😅",
  "New desk setup is complete! Dual monitors, mechanical keyboard, and way too many plants. 🌿",
  "Just gave a talk at a local meetup about microservices architecture. The Q&A session was incredible! 🎤",
  "Happy Monday! Starting the week with a fresh perspective and a todo list that's actually realistic. 📋",
  "Migration from REST to GraphQL went smoother than expected. 6 hours of work, zero downtime. 💪",
  "Nothing beats the feeling of deploying on a Friday and watching those green checkmarks roll in. ✅",
  "Attended an amazing conference today. So inspired by all the innovative projects people are building. 🌟",
  "The new MacBook Pro is incredible. The battery life alone is worth the upgrade. 💻",
  "Finally understanding Rust's borrow checker. It only took me 3 months. 😤",
  "Shoutout to my mentor who taught me that clean code is not about perfection, it's about empathy for the next developer. 🙏",
  "Late night coding session with lofi beats in the background. This is my happy place. 🎧",
  "Just automated a task that used to take me 2 hours every day. That's 40 hours a month back. 🤯",
  "Contemplating life choices while debugging a production issue at 11 PM. Send help. 😂",
  "Our team just won the internal hackathon! 48 hours of intense coding, minimal sleep, maximum fun. 🏅",
  "Built a CLI tool today that saves 5 minutes per developer per day. Small wins add up! 🛠️",
  "Imposter syndrome is real, but remember: you got hired for a reason. You belong here. 💪",
  "Just wrapped up a massive refactor. The codebase feels 10 years younger. Clean architecture is worth the investment. 🏗️",
  "Trying out a new productivity technique: 25 minutes of focused work, 5 minute breaks. So far so good! ⏱️",
  "The best code is the code you don't write. Delete more, ship faster. 🗑️",
  "Nothing like the feeling of solving a bug that's been haunting you for days. Victory dance! 💃",
  "Working from a coffee shop today. Sometimes a change of scenery is all you need. ☕",
  "Just learned about WebSockets and I feel like I've been missing out my whole career. 🕸️",
  "5 years ago I wrote my first line of code. Today I lead a team of 10 engineers. Time flies! 🚀",
  "Pro tip: always write tests BEFORE you refactor. Future you will be grateful. 🧪",
  "The developer community is amazing. Asked a question on Stack Overflow and got 5 helpful answers in 10 minutes. ❤️",
  "Deployed to production on a Friday and nothing broke. Is this real life? 😱",
  "Taking a well-deserved vacation after shipping the biggest project of my career. See you in a week! ✈️",
];
const techTags = [
  ["TypeScript","React","Node.js"],
  ["Python","FastAPI","PostgreSQL"],
  ["Rust","WebAssembly","JavaScript"],
  ["Go","Docker","Kubernetes"],
  ["React","Next.js","Tailwind"],
  ["Vue.js","Nuxt","TypeScript"],
  ["Swift","iOS","Xcode"],
  ["Kotlin","Android","Firebase"],
  ["C#",".NET","Azure"],
  ["Java","Spring","AWS"],
  ["TypeScript","GraphQL","Prisma"],
  ["React","React Native","Expo"],
  ["Svelte","SvelteKit","Vite"],
  ["Solid.js","TypeScript","Vite"],
  ["Next.js","Supabase","Tailwind"],
  ["Python","Django","PostgreSQL"],
  ["PHP","Laravel","MySQL"],
  ["Ruby","Rails","Heroku"],
  ["Elixir","Phoenix","PostgreSQL"],
  ["Flutter","Dart","Firebase"],
];
const commentTexts = [
  "This is amazing! Great work! 🔥",
  "Love this! Keep it up! 🚀",
  "So inspiring! Thanks for sharing! 🙌",
  "Incredible work. You're killing it! 💪",
  "That's awesome! Can you share how you did it? 🤔",
  "Beautiful! What tools did you use? 🎨",
  "Congrats! Well deserved! 🎉",
  "This is exactly what I needed to see today! 💯",
  "Great perspective. Thanks for sharing your insights! 👏",
  "Wow, just wow. 😮",
  "I tried something similar last week. Your approach is much cleaner! 📝",
  "This is gold! Saving this for later! ⭐",
  "Love the clean design! 🎯",
  "You're an inspiration to the community! 🌟",
  "Can't wait to see more of your work! 👀",
];

// ============================================
// GERAÇÃO
// ============================================

const users = [];
const posts = [];
const comments = [];
const likes = [];
const followers = [];

// Gerar UUIDs determinísticos para consistência
function uuid(n) {
  const hex = n.toString(16).padStart(12, "0");
  return `00000000-0000-4000-a000-${hex}`;
}

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function rand(seed, min, max) {
  return min + (seed % (max - min + 1));
}

function pic(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function avatar(n) {
  return `https://i.pravatar.cc/200?u=user${n}@macaw.com`;
}

// Gerar 100 usuários
for (let i = 0; i < 100; i++) {
  const first = firstNames[i];
  const last = lastNames[i % lastNames.length];
  const username = `${first.toLowerCase()}_${last.toLowerCase()}`;
  const city = cities[i % cities.length];
  const school = schools[i % schools.length];
  const work = works[i % works.length];
  const desc = descriptions[i % descriptions.length];

  users.push({
    id: uuid(i + 1),
    username,
    name: first,
    surname: last,
    avatar: avatar(i + 1),
    cover: pic(`cover-${i + 1}`, 1200, 400),
    description: desc,
    city,
    school,
    work,
    website: `${username}.dev`,
    created_at: new Date(Date.now() - rand(i, 30, 720) * 86400000).toISOString(),
  });

  // 2-4 posts por usuário
  const postCount = 2 + (i % 3);
  for (let p = 0; p < postCount; p++) {
    const postId = posts.length + 1;
    const content = postContents[(i + p * 7) % postContents.length];
    const hasImage = (i + p) % 3 !== 0; // 66% têm imagem
    const tags = techTags[(i + p) % techTags.length];

    posts.push({
      id: postId,
      content: `${content}\n\n#${tags[0]} #${tags[1]} #${tags[2]}`,
      img: hasImage ? pic(`post-${i + 1}-${p}`, 600, 400) : null,
      user_id: uuid(i + 1),
      created_at: new Date(Date.now() - rand(postId, 1, 60) * 3600000).toISOString(),
    });
  }
}

// Comentários (em posts aleatórios)
for (let i = 0; i < 200; i++) {
  const postId = 1 + (i % posts.length);
  const userId = 1 + ((i * 7) % 100);
  const commentText = commentTexts[i % commentTexts.length];

  comments.push({
    id: i + 1,
    content: commentText,
    user_id: uuid(userId),
    post_id: postId,
    created_at: new Date(Date.now() - rand(i, 0, 48) * 3600000).toISOString(),
  });
}

// Likes (em posts aleatórios)
let likeId = 0;
const likeSet = new Set();
for (let i = 0; i < 400; i++) {
  const postId = 1 + (i % posts.length);
  const userId = 1 + ((i * 13) % 100);
  const key = `${userId}-${postId}`;
  if (likeSet.has(key)) continue;
  likeSet.add(key);
  likeId++;

  likes.push({
    id: likeId,
    user_id: uuid(userId),
    post_id: postId,
    created_at: new Date(Date.now() - rand(i, 0, 72) * 3600000).toISOString(),
  });
}

// Followers (cada usuário segue ~10-30 outros)
let followerId = 0;
const followSet = new Set();
for (let i = 0; i < 100; i++) {
  const followCount = 5 + (i % 20);
  for (let f = 0; f < followCount; f++) {
    const targetId = 1 + ((i * 7 + f * 13) % 100);
    if (targetId === i + 1) continue;
    const key = `${i + 1}-${targetId}`;
    if (followSet.has(key)) continue;
    followSet.add(key);
    followerId++;

    followers.push({
      id: followerId,
      follower_id: uuid(i + 1),
      following_id: uuid(targetId),
      created_at: new Date(Date.now() - rand(followerId, 1, 365) * 86400000).toISOString(),
    });
  }
}

// ============================================
// OUTPUT SQL
// ============================================

function sqlStr(s) {
  if (s === null || s === undefined) return "NULL";
  return `'${s.replace(/'/g, "''")}'`;
}

function sqlDate(d) {
  return sqlStr(d);
}

console.log(`-- ============================================`);
console.log(`-- MACAW SOCIAL MEDIA - SEED DATA`);
console.log(`-- Gerado em ${new Date().toISOString()}`);
console.log(`-- ${users.length} usuários, ${posts.length} posts, ${comments.length} comentários`);
console.log(`-- ${likes.length} likes, ${followers.length} seguidores`);
console.log(`-- ============================================\n`);

console.log(`-- Limpa dados existentes (ordem inversa das FKs)`);
console.log(`DELETE FROM public.likes;`);
console.log(`DELETE FROM public.comments;`);
console.log(`DELETE FROM public.shares;`);
console.log(`DELETE FROM public.followers;`);
console.log(`DELETE FROM public.follow_requests;`);
console.log(`DELETE FROM public.notifications;`);
console.log(`DELETE FROM public.stories;`);
console.log(`DELETE FROM public.posts;`);
console.log(`DELETE FROM public.users;\n`);

// Users em lotes de 25
console.log(`-- ========== USUÁRIOS ==========`);
for (let batch = 0; batch < users.length; batch += 25) {
  const batch_users = users.slice(batch, batch + 25);
  console.log(`INSERT INTO public.users (id, username, name, surname, avatar, cover, description, city, school, work, website, created_at) VALUES`);
  const rows = batch_users.map((u, idx) => {
    const isLast = idx === batch_users.length - 1;
    return `  (${sqlStr(u.id)}, ${sqlStr(u.username)}, ${sqlStr(u.name)}, ${sqlStr(u.surname)}, ${sqlStr(u.avatar)}, ${sqlStr(u.cover)}, ${sqlStr(u.description)}, ${sqlStr(u.city)}, ${sqlStr(u.school)}, ${sqlStr(u.work)}, ${sqlStr(u.website)}, ${sqlDate(u.created_at)})${isLast ? ";" : ","}`;
  });
  console.log(rows.join("\n"));
  console.log("");
}

// Posts em lotes de 25
console.log(`-- ========== POSTS ==========`);
for (let batch = 0; batch < posts.length; batch += 25) {
  const batch_posts = posts.slice(batch, batch + 25);
  console.log(`INSERT INTO public.posts (id, content, img, created_at, user_id) VALUES`);
  const rows = batch_posts.map((p, idx) => {
    const isLast = idx === batch_posts.length - 1;
    return `  (${p.id}, ${sqlStr(p.content)}, ${sqlStr(p.img)}, ${sqlDate(p.created_at)}, ${sqlStr(p.user_id)})${isLast ? ";" : ","}`;
  });
  console.log(rows.join("\n"));
  console.log("");
}

// Comentários em lotes de 50
console.log(`-- ========== COMENTÁRIOS ==========`);
for (let batch = 0; batch < comments.length; batch += 50) {
  const batch_comments = comments.slice(batch, batch + 50);
  console.log(`INSERT INTO public.comments (id, content, created_at, user_id, post_id) VALUES`);
  const rows = batch_comments.map((c, idx) => {
    const isLast = idx === batch_comments.length - 1;
    return `  (${c.id}, ${sqlStr(c.content)}, ${sqlDate(c.created_at)}, ${sqlStr(c.user_id)}, ${c.post_id})${isLast ? ";" : ","}`;
  });
  console.log(rows.join("\n"));
  console.log("");
}

// Likes em lotes de 50
console.log(`-- ========== LIKES ==========`);
for (let batch = 0; batch < likes.length; batch += 50) {
  const batch_likes = likes.slice(batch, batch + 50);
  console.log(`INSERT INTO public.likes (id, created_at, user_id, post_id) VALUES`);
  const rows = batch_likes.map((l, idx) => {
    const isLast = idx === batch_likes.length - 1;
    return `  (${l.id}, ${sqlDate(l.created_at)}, ${sqlStr(l.user_id)}, ${l.post_id})${isLast ? ";" : ","}`;
  });
  console.log(rows.join("\n"));
  console.log("");
}

// Followers em lotes de 50
console.log(`-- ========== SEGUIDORES ==========`);
for (let batch = 0; batch < followers.length; batch += 50) {
  const batch_followers = followers.slice(batch, batch + 50);
  console.log(`INSERT INTO public.followers (id, created_at, follower_id, following_id) VALUES`);
  const rows = batch_followers.map((f, idx) => {
    const isLast = idx === batch_followers.length - 1;
    return `  (${f.id}, ${sqlDate(f.created_at)}, ${sqlStr(f.follower_id)}, ${sqlStr(f.following_id)})${isLast ? ";" : ","}`;
  });
  console.log(rows.join("\n"));
  console.log("");
}

console.log(`-- ============================================`);
console.log(`-- RESUMO`);
console.log(`-- ${users.length} usuários inseridos`);
console.log(`-- ${posts.length} posts inseridos`);
console.log(`-- ${comments.length} comentários inseridos`);
console.log(`-- ${likes.length} likes inseridos`);
console.log(`-- ${followers.length} seguidores inseridos`);
console.log(`-- ============================================\n`);
console.log(`-- ✅ Seed concluído!`);

// Estatísticas
const totalRows = users.length + posts.length + comments.length + likes.length + followers.length;
const sqlSizeKB = Math.round(totalRows * 0.3); // estimativa
console.log(`-- 📊 ~${sqlSizeKB}KB de dados (apenas texto + URLs externas, zero storage usado)`);
