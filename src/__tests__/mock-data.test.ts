import { describe, it, expect } from "vitest";
import {
  getPosts,
  getCurrentUser,
  getStories,
  getUserById,
  getConversations,
  getFriendRequests,
  getMarketplaceItems,
  getAllUsers,
  getNotifications,
} from "@/lib/mock-data";

describe("mock-data", () => {
  it("should have exactly 500 users", () => {
    const users = getAllUsers();
    expect(users).toHaveLength(500);
  });

  it("should generate posts", () => {
    const posts = getPosts();
    expect(posts.length).toBeGreaterThan(0);
    const post = posts[0];
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("content");
    expect(post).toHaveProperty("user");
    expect(post).toHaveProperty("createdAt");
  });

  it("should have a current user with id u1", () => {
    const user = getCurrentUser();
    expect(user).toHaveProperty("id", "u1");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("avatar");
  });

  it("should find user by id", () => {
    const user = getUserById("u1");
    expect(user).toBeDefined();
    expect(user!.name).toBeTruthy();
    expect(getUserById("nonexistent")).toBeUndefined();
  });

  it("should have stories", () => {
    const stories = getStories();
    expect(stories.length).toBeGreaterThan(0);
  });

  it("should have conversations with messages", () => {
    const convs = getConversations();
    expect(convs.length).toBeGreaterThan(0);
    expect(convs[0]).toHaveProperty("messages");
    expect(convs[0].messages.length).toBeGreaterThan(0);
  });

  it("should have friend requests", () => {
    const requests = getFriendRequests();
    expect(requests.length).toBeLessThanOrEqual(5);
  });

  it("should have marketplace items", () => {
    const items = getMarketplaceItems();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toHaveProperty("title");
    expect(items[0]).toHaveProperty("price");
  });

  it("should have notifications", () => {
    const notifications = getNotifications();
    expect(notifications.length).toBeGreaterThan(0);
    expect(notifications[0]).toHaveProperty("type");
    expect(notifications[0]).toHaveProperty("user");
  });
});
