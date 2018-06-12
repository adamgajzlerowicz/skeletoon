const typeDefs = `
type Query {
  users: [User!]!
}

type Mutation {
    login(username: String!, password: String!): Login,
    createUser(username: String!, email: String, password: String): Login
}

type Login {
   token: String!,
   refresh: String!,
   ttl: Int!
}

type User {
  id: String!,
  username: String!,
  email: String!
}

`;

export default typeDefs;
