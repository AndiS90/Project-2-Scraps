import React, { useState, useEffect } from 'react';

import  VillagerList  from '../components/VillagerList';
import   VillagerForm  from '../components/VillagerForm';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import 'materialize-css';




import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
const Profile = () => {
  const { profileId } = useParams();



  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { _id: profileId },
    }
  );



  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

//  useEffect(() => {
  console.log();
//   console.log(profile);


//   }, []);

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.username) {
    return (
      <h4>
        You've been logged out! Please log in to view your profile!
      </h4>
    );
  }

  return (
    <div className='villager-container'>


      <VillagerForm></VillagerForm>

      <VillagerList villagers = { profile.villagers }></VillagerList>
        
      </div>  
  );
};

export default Profile;
