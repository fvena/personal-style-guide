import path from "node:path";

interface User {
  age: number;
  email: string;
  name: string;
}

/** Formats a user's display name with their email. */
export function formatUser(user: User): string {
  return `${user.name} <${user.email}>`;
}

/** Resolves a file path relative to the current directory. */
export function resolvePath(filePath: string): string {
  return path.resolve(process.cwd(), filePath);
}

/** Filters users by minimum age. */
export function filterByAge(users: User[], minimumAge: number): User[] {
  return users.filter((user) => user.age >= minimumAge);
}
