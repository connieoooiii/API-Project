"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
const demoUsers = [
  {
    email: "demo@user.io",
    username: "Demo-lition",
    hashedPassword: bcrypt.hashSync("password"),
    firstName: "John",
    lastName: "Doe",
  },
  {
    email: "user1@user.io",
    username: "FakeUser1",
    hashedPassword: bcrypt.hashSync("password2"),
    firstName: "Alice",
    lastName: "Smith",
  },
  {
    email: "user2@user.io",
    username: "FakeUser2",
    hashedPassword: bcrypt.hashSync("password3"),
    firstName: "Michael",
    lastName: "Johnson",
  },
  {
    email: "user3@user.io",
    username: "FakeUser3",
    hashedPassword: bcrypt.hashSync("password3"),
    firstName: "Emily",
    lastName: "Brown",
  },

  {
    email: "user4@user.io",
    username: "FakeUser4",
    hashedPassword: bcrypt.hashSync("password4"),
    firstName: "David",
    lastName: "Wilson",
  },
  {
    email: "user5@user.io",
    username: "FakeUser5",
    hashedPassword: bcrypt.hashSync("password5"),
    firstName: "Sophia",
    lastName: "Taylor",
  },
  {
    email: "user6@user.io",
    username: "FakeUser6",
    hashedPassword: bcrypt.hashSync("password6"),
    firstName: "James",
    lastName: "Thomas",
  },
  {
    email: "user7@user.io",
    username: "FakeUser7",
    hashedPassword: bcrypt.hashSync("password7"),
    firstName: "Olivia",
    lastName: "Clark",
  },
  {
    email: "user8@user.io",
    username: "FakeUser8",
    hashedPassword: bcrypt.hashSync("password8"),
    firstName: "Benjamin",
    lastName: "Lewis",
  },
  {
    email: "user9@user.io",
    username: "FakeUser9",
    hashedPassword: bcrypt.hashSync("password9"),
    firstName: "Emma",
    lastName: "Hall",
  },
  {
    email: "user10@user.io",
    username: "FakeUser10",
    hashedPassword: bcrypt.hashSync("password10"),
    firstName: "Jacob",
    lastName: "Young",
  },
  {
    email: "user11@user.io",
    username: "FakeUser11",
    hashedPassword: bcrypt.hashSync("password11"),
    firstName: "Mia",
    lastName: "Adams",
  },
  {
    email: "user12@user.io",
    username: "FakeUser12",
    hashedPassword: bcrypt.hashSync("password12"),
    firstName: "William",
    lastName: "Walker",
  },
  {
    email: "user13@user.io",
    username: "FakeUser13",
    hashedPassword: bcrypt.hashSync("password13"),
    firstName: "Charlotte",
    lastName: "Anderson",
  },
  {
    email: "user14@user.io",
    username: "FakeUser14",
    hashedPassword: bcrypt.hashSync("password14"),
    firstName: "Daniel",
    lastName: "Hill",
  },
  {
    email: "user15@user.io",
    username: "FakeUser15",
    hashedPassword: bcrypt.hashSync("password15"),
    firstName: "Ava",
    lastName: "Martin",
  },
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, demoUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, demoUsers, {});
  },
};
