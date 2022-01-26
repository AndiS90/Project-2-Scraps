import { gql } from '@apollo/client';

export const QUERY_MOVINGVILLAGERS = gql`
  query movingVils {
    movingVils {
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
    comments: {
      _id
      commentText
      commentAuthor
      createdAt
    }
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
        name
        villagerId
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
        name
        villagerId
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
