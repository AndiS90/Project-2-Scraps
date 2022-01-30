import { gql } from '@apollo/client';

export const QUERY_MOVINGVILLAGERS = gql`
  query movingVils {
    movingVils {
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
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
      }
    }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      username
      villagers{
        _id
        name
        apiId
        birthdayStr
        species
        icon
        image
        saying
        personality
        comments{
          _id
          commentText
          commentAuthor
          createdAt
        }     
      }

    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
       _id
      username
      villagers{
        _id
        name
        apiId
        birthdayStr
        species
        icon
        image
        saying
        personality
        comments{
          _id
          commentText
          commentAuthor
          createdAt
        }     
      }

    }
  }
`;


export const QUERY_VILLAGERS = gql`
query villagers($profileId: ID!){
    villagers(profileId: $profileId){
      name
      apiId
      birthdayStr
      species
      icon
      image
      saying
      personality
      comments{
        _id
        commentText
        commentAuthor
        createdAt
      }     
    }
}
`;

export const QUERY_VILLAGER = gql`
query villager($villagerId: ID!){
  villager(villagerId: $villagerId){
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
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
   }
}
`;