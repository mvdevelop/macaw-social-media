// ============================================
// MOCK DATA - Macaw Social Media
// Simula os dados que viriam do Supabase
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

// ============================================
// USERS
// ============================================
const users: MockUser[] = [
  {
    id: "u1",
    username: "john_doe",
    name: "John",
    surname: "Doe",
    avatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
    cover: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
    description: "Software developer who enjoys working with React and TypeScript. Passionate about creating efficient and scalable web applications.",
    city: "Denver",
    school: "Edgar High School",
    work: "Apple Inc.",
    website: "https://macaw.com",
    createdAt: "2023-01-15",
  },
  {
    id: "u2",
    username: "sarah_smith",
    name: "Sarah",
    surname: "Smith",
    avatar: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
    cover: "https://images.pexels.com/photos/17584747/pexels-photo-17584747.jpeg",
    description: "Photographer and digital artist. Love capturing moments and creating art.",
    city: "New York",
    school: "NYU",
    work: "Freelance Photographer",
    website: "https://sarahsmith.com",
    createdAt: "2023-03-20",
  },
  {
    id: "u3",
    username: "mike_johnson",
    name: "Mike",
    surname: "Johnson",
    avatar: "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg",
    cover: "https://images.pexels.com/photos/17584747/pexels-photo-17584747.jpeg",
    description: "Traveler and food lover. Exploring the world one dish at a time.",
    city: "San Francisco",
    school: "UCSF",
    work: "Food Blogger",
    website: "https://miketravels.com",
    createdAt: "2023-06-10",
  },
  {
    id: "u4",
    username: "emma_wilson",
    name: "Emma",
    surname: "Wilson",
    avatar: "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
    cover: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
    description: "Fitness enthusiast and yoga instructor.",
    city: "Los Angeles",
    school: "UCLA",
    work: "Yoga Studio Owner",
    website: "https://emmawilson.com",
    createdAt: "2023-02-14",
  },
  {
    id: "u5",
    username: "alex_brown",
    name: "Alex",
    surname: "Brown",
    avatar: "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg",
    cover: "https://images.pexels.com/photos/17584747/pexels-photo-17584747.jpeg",
    description: "Musician and composer. Creating melodies that matter.",
    city: "Nashville",
    school: "Berklee",
    work: "Music Producer",
    website: "https://alexbrownmusic.com",
    createdAt: "2023-04-01",
  },
];

// ============================================
// POSTS
// ============================================
const posts: MockPost[] = [
  {
    id: 1,
    content: "Just had an amazing sunset photoshoot! The colors were absolutely breathtaking today. 🌅 Can't wait to share more photos with everyone!",
    img: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
    createdAt: "2026-06-03T10:30:00Z",
    userId: "u1",
    user: users[0],
    likes: 123,
    liked: false,
    commentCount: 99,
  },
  {
    id: 2,
    content: "Exploring the streets of Tokyo! 🇯🇵 Every corner is a new adventure. The food, the culture, the people — absolutely incredible experience!",
    img: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    createdAt: "2026-06-02T15:20:00Z",
    userId: "u2",
    user: users[1],
    likes: 234,
    liked: true,
    commentCount: 56,
  },
  {
    id: 3,
    content: "New track just dropped! 🎵 Spent the last 3 months working on this album. Link in bio!",
    img: null,
    createdAt: "2026-06-01T09:00:00Z",
    userId: "u5",
    user: users[4],
    likes: 456,
    liked: false,
    commentCount: 78,
  },
  {
    id: 4,
    content: "Morning yoga session done! 💪 Starting the day right. Who else loves morning workouts?",
    img: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    createdAt: "2026-05-30T07:15:00Z",
    userId: "u4",
    user: users[3],
    likes: 89,
    liked: true,
    commentCount: 34,
  },
  {
    id: 5,
    content: "Just finished reading 'The Great Gatsby' for the third time. Such a masterpiece! 📚 What are you reading right now?",
    img: null,
    createdAt: "2026-05-28T20:00:00Z",
    userId: "u3",
    user: users[2],
    likes: 67,
    liked: false,
    commentCount: 45,
  },
  {
    id: 6,
    content: "Weekend hiking trip was incredible! The views from the top were worth every step. 🏔️",
    img: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    createdAt: "2026-05-25T14:30:00Z",
    userId: "u1",
    user: users[0],
    likes: 198,
    liked: true,
    commentCount: 23,
  },
  {
    id: 7,
    content: "New café in town! ☕ Best latte art I've ever seen. Highly recommend!",
    img: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
    createdAt: "2026-05-22T11:45:00Z",
    userId: "u3",
    user: users[2],
    likes: 145,
    liked: false,
    commentCount: 12,
  },
  {
    id: 8,
    content: "Throwback to my Paris trip last spring. The Eiffel Tower never gets old! 🗼",
    img: "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
    createdAt: "2026-05-20T18:00:00Z",
    userId: "u2",
    user: users[1],
    likes: 312,
    liked: true,
    commentCount: 67,
  },
];

// ============================================
// COMMENTS
// ============================================
const comments: Record<number, MockComment[]> = {
  1: [
    { id: 1, content: "Absolutely stunning photo! The colors are incredible! 🔥", createdAt: "2026-06-03T11:00:00Z", userId: "u2", user: users[1], likes: 12 },
    { id: 2, content: "Where was this taken? I need to visit this place!", createdAt: "2026-06-03T11:30:00Z", userId: "u3", user: users[2], likes: 5 },
    { id: 3, content: "Great shot! What camera did you use?", createdAt: "2026-06-03T12:00:00Z", userId: "u4", user: users[3], likes: 8 },
  ],
  2: [
    { id: 4, content: "Tokyo is on my bucket list! 🇯🇵", createdAt: "2026-06-02T16:00:00Z", userId: "u1", user: users[0], likes: 15 },
    { id: 5, content: "The food there is amazing! Try the ramen at Shinjuku!", createdAt: "2026-06-02T17:00:00Z", userId: "u5", user: users[4], likes: 9 },
  ],
  4: [
    { id: 6, content: "I love morning yoga too! 🙏", createdAt: "2026-05-30T08:00:00Z", userId: "u1", user: users[0], likes: 7 },
    { id: 7, content: "What's your favorite flow?", createdAt: "2026-05-30T09:00:00Z", userId: "u5", user: users[4], likes: 3 },
  ],
};

// ============================================
// STORIES
// ============================================
const stories: MockStory[] = [
  { id: 1, img: "https://images.pexels.com/photos/35122521/pexels-photo-35122521.jpeg", userId: "u1", user: users[0], createdAt: "2026-06-03T08:00:00Z" },
  { id: 2, img: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg", userId: "u2", user: users[1], createdAt: "2026-06-03T09:00:00Z" },
  { id: 3, img: "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg", userId: "u3", user: users[2], createdAt: "2026-06-03T07:00:00Z" },
  { id: 4, img: "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg", userId: "u4", user: users[3], createdAt: "2026-06-02T22:00:00Z" },
  { id: 5, img: "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg", userId: "u5", user: users[4], createdAt: "2026-06-03T06:00:00Z" },
];

// ============================================
// FRIEND REQUESTS
// ============================================
const friendRequests: MockFriendRequest[] = [
  { id: 1, user: users[1], createdAt: "2026-06-03T10:00:00Z" },
  { id: 2, user: users[3], createdAt: "2026-06-02T15:00:00Z" },
  { id: 3, user: users[4], createdAt: "2026-06-01T09:00:00Z" },
];

// ============================================
// BIRTHDAYS
// ============================================
const birthdays: MockUser[] = [users[2], users[4]];

// ============================================
// MARKETPLACE
// ============================================
const marketplaceItems: MockMarketplaceItem[] = [
  { id: 1, title: "Vintage Camera", price: "$299", img: "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg", location: "Denver, CO", userId: "u1", user: users[0], createdAt: "2026-06-01" },
  { id: 2, title: "Gaming Laptop", price: "$1,200", img: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg", location: "New York, NY", userId: "u2", user: users[1], createdAt: "2026-05-30" },
  { id: 3, title: "Acoustic Guitar", price: "$450", img: "https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg", location: "Nashville, TN", userId: "u5", user: users[4], createdAt: "2026-05-28" },
  { id: 4, title: "Mountain Bike", price: "$850", img: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg", location: "San Francisco, CA", userId: "u3", user: users[2], createdAt: "2026-05-25" },
  { id: 5, title: "Yoga Mat Premium", price: "$79", img: "https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg", location: "Los Angeles, CA", userId: "u4", user: users[3], createdAt: "2026-05-22" },
  { id: 6, title: "Designer Watch", price: "$1,500", img: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg", location: "New York, NY", userId: "u2", user: users[1], createdAt: "2026-05-20" },
];

// ============================================
// EVENTS
// ============================================
const events: MockEvent[] = [
  { id: 1, title: "Summer Music Festival", date: "Jul 15, 2026", location: "Central Park, NY", img: "https://images.pexels.com/photos/17584747/pexels-photo-17584747.jpeg", attendees: 1250 },
  { id: 2, title: "Tech Conference 2026", date: "Aug 5, 2026", location: "Moscone Center, SF", img: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg", attendees: 3200 },
  { id: 3, title: "Art Gallery Opening", date: "Jun 20, 2026", location: "SoHo, NY", img: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg", attendees: 450 },
  { id: 4, title: "Food Truck Festival", date: "Jul 4, 2026", location: "Golden Gate Park, SF", img: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg", attendees: 5000 },
];

// ============================================
// GROUPS
// ============================================
const groups: MockGroup[] = [
  { id: 1, name: "Photography Enthusiasts", img: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg", members: 15230, category: "Arts" },
  { id: 2, name: "Tech Startups Club", img: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg", members: 8750, category: "Technology" },
  { id: 3, name: "Food Lovers United", img: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg", members: 23400, category: "Food" },
  { id: 4, name: "Fitness Journey", img: "https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg", members: 12100, category: "Health" },
  { id: 5, name: "Travel Adventures", img: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg", members: 19800, category: "Travel" },
  { id: 6, name: "Music Makers", img: "https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg", members: 9800, category: "Music" },
];

// ============================================
// HELPERS
// ============================================

export function getCurrentUser(): MockUser {
  return users[0];
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

export function getSuggestedFriends(): MockUser[] {
  return users.slice(1, 4);
}
