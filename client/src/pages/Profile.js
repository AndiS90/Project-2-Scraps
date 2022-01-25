import React, { useState } from 'react';


import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getNamesPlusNullArray } from '../utils/API';
import { Autocomplete } from 'react-materialize';
import 'materialize-css';
import { Card } from "../components/Card/card"


// import SkillsList from '../components/SkillsList';
// import SkillForm from '../components/SkillForm';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
const Profile = () => {
  const { profileId } = useParams();

  const [optionsObj, setOptionsObj] = useState('');
  
  React.useEffect(() => {

    const getObj = async () => {
    const  response = await getNamesPlusNullArray();
    
      setOptionsObj(response);
    }

    getObj();

  });



console.log({ ...optionsObj } );






  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You've been logged out! Please log in to view your profile!
      </h4>
    );
  }

  return (
    <div className='villager-container'>
      <h2 className="card-header">
        Your Current villagers
      </h2>
    
      <div className="current-villagers">
          {/* CARD TEMPLATE  */}
          <div className='card-div'>
            <div class="card">
                 <div class="card-content">
                     <p class="title"> Villager Name </p>
                      <p class="subtitle"> Currently in your Island </p>
              </div>
            </div>
          </div>

          <div className='card-div'>
            <div class="card">
                 <div class="card-content">
                     <p class="title"> Villager Name </p>
                      <p class="subtitle"> Currently in your Island </p>
              </div>
            </div>
          </div>

          <div className='card-div'>
            <div class="card">
                 <div class="card-content">
                     <p class="title"> Villager Name </p>
                      <p class="subtitle"> Currently in your Island </p>
              </div>
            </div>
          </div>

          <div className='card-div'>
            <div class="card">
                 <div class="card-content">
                     <p class="title"> Villager Name </p>
                      <p class="subtitle"> Currently in your Island </p>
              </div>
            </div>
          </div>

          <div className='card-div'>
            <div class="card">
                 <div class="card-content">
                     <p class="title"> Villager Name </p>
                      <p class="subtitle"> Currently in your Island </p>
              </div>
            </div>
          </div>


    
      </div>  









      <Autocomplete
  id="Autocomplete-41"
  options={{
    data: {...optionsObj}
  }}
  placeholder="Insert here"
  title="Input Label"
/>



      {/* {profile.skills?.length > 0 && (
        <SkillsList
          skills={profile.skills}
          isLoggedInUser={!profileId && true}
        />
      )}

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <SkillForm profileId={profile._id} />
      </div> */}
    </div>
  );
};

export default Profile;
