import axios from "axios";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

const request = async (
  url: string,
  method: string,
  body?: any
): Promise<any> => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if needed (e.g., Authorization)
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error fetching ${url}`);
  }

  return response.json();
};

export const fetchUsers = async () => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

export const fetchTodos = async () => {
  const response = await axios.get<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
};
export const fetchComments = async () => {
  const response = await axios.get<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments"
  );
  return response.data;
};

export const fetchUser = async (userId: string): Promise<User> => {
  return request(`${BASE_URL}/users/${userId}`, "GET");
};

export const fetchPhoto = async (photoId: number): Promise<Photo> => {
  return request(`${BASE_URL}/photos/${photoId}`, "GET");
};

// POST, PUT, PATCH examples:

export const createUser = async (user: User): Promise<User> => {
  return request(`${BASE_URL}/users`, "POST", user);
};

export const updateUser = async (
  userId: number,
  user: Partial<User>
): Promise<User> => {
  return request(`${BASE_URL}/users/${userId}`, "PUT", user);
};

export const partialUpdateUser = async (
  userId: number,
  user: Partial<User>
): Promise<User> => {
  return request(`${BASE_URL}/users/${userId}`, "PATCH", user);
};

// Usage examples:

// Creating a new user
const newUser: User = {
  id: 11,
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  // Add other properties if necessary
};

createUser(newUser).then((user) => console.log(user));

// Updating an existing user
const updatedUser: Partial<User> = {
  name: "Jane Doe",
};

updateUser(1, updatedUser).then((user) => console.log(user));
