import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_VILLAGER = gql`
  mutation addVillager(villagerUser: String, villagerInput: VillagerInput!) {
    addVillager(villagerUser: $villagerUser, villagerInput: $villagerInput) {
      _id
      username
      email
      bookCount
      savedVillagers {
          villagerUser
          name
          apiId
          birthdayStr
          species
          icon
          image 
          saying
          personality
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const REMOVE_VILLAGER = gql`
  mutation removeVillager($villagerId: ID!) {
    removeVillager(villagerId: $villagerId) {
      _id
      username
      email
      savedVillagers{
          villagerUser
          name
          apiId
          birthdayStr
          species
          icon
          image
          saying
          personality
      }
    }
  }
`;

export const ADD_MOVINGVIL = gql`
  mutation addMovingVil(villagerUser: String, movingVilInput: MovingVilInput!) {
    addMovingVil(villagerUser: $villagerUser, movingVilInput: $movingVilInput) {
      _id
      villagerUser
      name
      apiId
      birthdayStr
      species
      icon
      image
      saying
      personality
      comments: {
        _id
        commentText
        createdAt
      }
  }
}
`;

export const REMOVE_MOVINGVIL = gql`
  mutation removeMovingVil($villagerId: ID!) {
    removeMovingVil(villagerId: $villagerId) {
      _id
      villagerUser
      name
      apiId
      birthdayStr
      species
      icon
      image
      saying
      personality
      comments: {
        _id
        commentText
        createdAt
      }
  }
}
`;