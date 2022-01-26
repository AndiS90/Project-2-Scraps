const { AuthenticationError } = require('apollo-server-express');
const { Profile, Villager, MovingVil } = require('../models');
const MovingVil = require('../models/MovingVil');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // profiles: async () => {
    //   return Profile.find();
    // },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    villagers: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Villager.find(params).sort({ createdAt: -1 });
    },
    villager: async (parent, { villagerId }) => {
      return Villager.findOne({ _id: villagerId });
    },

    movingVils: async () => {   
      return MovingVil.find().sort({ createdAt: -1 });
    },

    movingVil: async (parent, { villagerId }) => {
      return MovingVil.findOne({ _id: villagerId });
    },



    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },


    
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    
    // Add a third argument to the resolver to access data in our `context`
    addVillager: async (parent, { villagerInput }, context) => {
      if (context.user) {
        const villager = await Villager.create({
            villagerUser: context.user.username,
            VillagerInput: villagerInput
        });

        await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { villagers: villager } }
        );

        return Villager;
      }

      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    // Make it so a logged in user can only remove a villager from their own profile
    removeVillager: async (parent, { villagerId }, context) => {
      if (context.user) {
        const villager = await Villager.findOneAndDelete({
          _id: villagerId,
          villagerUser: context.profile.username,
        });

        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { villagers: villager._id } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    addComment: async (parent, { villagerId, commentText }, context) => {
      if (context.user) {
        return Villager.findOneAndUpdate(
          { _id: villagerId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },


  removeComment: async (parent, { villagerId, commentId }, context) => {
  if (context.user) {
    return Villager.findOneAndUpdate(
      { _id: villagerId },
      {
        $pull: {
          comments: {
            _id: commentId,
            commentAuthor: context.profile.username,
          },
        },
      },
      { new: true }
    );
  }
  throw new AuthenticationError('You need to be logged in!');
},


addMovingVil: async (parent, { movingVilInput }, context) => {
  if (context.user) {
    const movingVil = await MovingVil.create({
        villagerUser: context.user.username,
        movingVilInput: villagerInput
    });

    // await Profile.findOneAndUpdate(
    //   { _id: context.user._id },
    //   { $addToSet: { villagers: villager } }
    // );
    return movingVil;
  }
},

  removeMovingVil: async (parent, { villagerId }, context) => {
    if (context.user) {
      const movingVil = await MovingVil.findOneAndDelete({
        _id: villagerId,
        villagerUser: context.profile.username,
      });

      return Profile.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { villagers: villager._id } },
        { new: true }
      );
    }
    throw new AuthenticationError('You need to be logged in!');
  },






//moveOutVillager: async (parent, { villager}




  },
};
module.exports = resolvers;
