const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    username: String
    email: String
    password: String
    villagers: [Villager]
    villagerCount: Int
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Villager {
    _id: ID
    villagerUser: String
    name: String
    apiId: Int!
    birthdayStr: String
    species: String!
    icon: String
    image: String
    saying: String!
    personality: String!
    comments: [Comment]
  }

  input VillagerInput {
    name: String
    apiId: Int
    birthdayStr: String
    species: String!
    icon: String
    image: String
    saying: String!
    personality: String!
  }


  type MovingVil {
    _id: ID
    villagerUser: String
    name: String
    apiId: Int!
    birthdayStr: String
    species: String!
    icon: String
    image: String
    saying: String!
    personality: String!
    comments: [Comment]
  }

  input MovingVilInput {
    _id: ID
    villagerUser: String
    name: String
    apiId: Int!
    birthdayStr: String
    species: String!
    icon: String
    image: String
    saying: String!
    personality: String!
   # comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Query {
   # profiles: [Profile]!
    profile(profileId: ID!): Profile
    villagers(profileId: ID!): [Villager]
    villager(villagerId: ID!): Villager
    movingVils:[MovingVil]
    movingVil(villagerId: ID!): MovingVil

    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    addVillager(villagerInput: VillagerInput!): Villager
    addComment(villagerId: ID!, commentText: String!): Villager
    removeVillager(villagerId: ID!): Villager
    removeComment(villagerId: ID!, commentId: ID!): Villager
    addMovingVil(movingVilInput: MovingVilInput!):MovingVil
    removeMovingVil(villagerId: ID! ): MovingVil

  }
`;

module.exports = typeDefs;
