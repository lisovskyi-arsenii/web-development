import { additionalUsers, randomUserMock } from "./FE4U-Lab2-mock.js";
import { getFormattedUsers } from "./task1.js";
import { validateUser } from "./task2.js";
import { filterUsers } from "./task3.js";
import { sortUsers } from "./task4.js";
import { findUser } from "./task5.js";
import { getPercentage } from "./task6.js";

const brief = (list) =>
  list.map(({ full_name, gender, country, age, favorite, b_date }) => ({
    full_name,
    gender,
    country,
    age,
    favorite,
    b_date,
  }));

// task 1
const users = getFormattedUsers(randomUserMock, additionalUsers);

console.log(`\n[task 1] formatted users: ${users.length}`);
console.log(users[0]);

// task 2
const valid = [];
const invalid = [];

for (const user of users) {
  try {
    validateUser(user);
    valid.push(user);
  } catch (error) {
    invalid.push({ name: user.full_name, reason: error.message });
  }
}

console.log(`\n[task 2] valid: ${valid.length}, invalid: ${invalid.length}`);
console.table(invalid);

// task 3
const germanFemales = filterUsers(users, {
  country: "Germany",
  gender: "Female",
});
const favorites = filterUsers(users, { favorite: true });
const notFavorites = filterUsers(users, { favorite: false });
const allUsers = filterUsers(users);

console.log("\n[task 3] Germany + Female:", germanFemales.length);
console.table(brief(germanFemales));
console.log("favorite true:", favorites.length);
console.log("favorite false:", notFavorites.length);
console.log("no filters:", allUsers.length);

// task 4
console.log("\n[task 4] age asc");
console.table(brief(sortUsers(users, "age").slice(0, 5)));
console.log("age desc");
console.table(brief(sortUsers(users, "age", "desc").slice(0, 5)));
console.log("full_name asc");
console.table(brief(sortUsers(users, "full_name").slice(0, 5)));
console.log("b_date asc");
console.table(brief(sortUsers(users, "b_date").slice(0, 5)));
console.log("country desc");
console.table(brief(sortUsers(users, "country", "desc").slice(0, 5)));

for (const [field, order] of [
  ["email", "asc"],
  ["age", "up"],
]) {
  try {
    sortUsers(users, field, order);
  } catch (error) {
    console.log("error:", error.message);
  }
}

// task 5
console.log("\n[task 5]");
console.log("age 24:", findUser(users, "age", 24)?.full_name);
console.log(
  "full_name:",
  findUser(users, "full_name", "Norbert Weishaupt")?.full_name,
);
console.log(
  "note:",
  findUser(users, "note", "old lady with a cats")?.full_name,
);
console.log("not found:", findUser(users, "age", 999));

try {
  findUser(users, "email", "x");
} catch (error) {
  console.log("error:", error.message);
}

// task 6
console.log("\n[task 6]");
console.log(
  "age > 30:",
  getPercentage(users, (user) => user.age > 30),
  "%",
);
console.log(
  "country Germany:",
  getPercentage(users, (user) => user.country === "Germany"),
  "%",
);
console.log(
  "favorite:",
  getPercentage(users, (user) => user.favorite),
  "%",
);
console.log(
  "empty array:",
  getPercentage([], () => true),
  "%",
);
