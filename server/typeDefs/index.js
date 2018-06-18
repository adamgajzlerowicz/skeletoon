const typeDefs = `
type Query {
  users: [User!]!,
  me: User!
}

type Mutation {
    login(username: String!, password: String!): Login,
    createUser(username: String!, email: String, password: String): Login,
    refresh(token: String!): Token
}

type Token {
  token: String!
}

type Login {
   token: String!,
   refresh: String!
}

type Company {
  id: String!
  childrenLimit: Float!,
  firstHourRate: Float!,
  hourRate: Float!
}

type User {
  id: String!,
  username: String!,
  email: String!,
  company: Company
}

`;

export default typeDefs;
