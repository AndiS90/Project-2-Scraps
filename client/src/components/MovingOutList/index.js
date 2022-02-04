import React from 'react';
import { Link } from 'react-router-dom';
import { villagersToMoveOut } from '../VillagerList';

import 'materialize-css';
import {  Button, Card, CardTitle, Icon, Select } from 'react-materialize';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';

import { useQuery } from '@apollo/client';

import { QUERY_MOVINGVILLAGERS } from '../../utils/queries';

//work in progress

const MovingOutList = () => {

  const { loading, data } = useQuery(QUERY_MOVINGVILLAGERS);

  const movingVils = data?.movingVils || [];

  if (!movingVils.length) {
    return <h3>No Moving Villagers Yet</h3>;
  }

  return (
    <div class ="movingList">
     {movingVils &&
          movingVils.map((villager) => (
            <div class="card movingOut ">
          <div class=" imageBox card-image waves-effect waves-block waves-light">
                  <img class="activator " src={villager.image}/>
          </div>

            <div class="vContent card-content">
                <p><span>Birthday: </span>{ villager.birthdayStr }</p>
                <p><span>Personality Type: </span>{ villager.personality }</p>
                <p><span>Saying: </span> { villager.saying }</p>
     
            </div>
       
                            
    <div class=" card-reveal">
     
       <span class=" card-title vRevealName"><h2>{villager.name}</h2><i class="material-icons right">close</i></span>
      <div class= "commentReveal"> 
      <CommentList comments = {villager.comments}> </CommentList> 
      <CommentForm villagerId = { villager._id }> </CommentForm> 
      </div>
    </div>
           </div>   ))}
           

        </div>

    
  );
};

export default MovingOutList;
