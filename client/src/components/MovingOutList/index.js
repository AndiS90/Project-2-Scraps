import React from 'react';
import { Link } from 'react-router-dom';
import { villagersToMoveOut } from '../VillagerList';

import 'materialize-css';
import {  Button, Card, CardTitle, Icon, Select } from 'materialize-css';
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
    <div>
     {movingVils &&
          movingVils.map((villager) => (
          <Card className='card-div'
          closeIcon={<Icon>close</Icon>}
          header={<CardTitle image={ villager.icon} reveal waves="light"/>}
          reveal={ <div> <CommentList> </CommentList>
           <CommentForm> </CommentForm> </div>}
          revealIcon={<Icon>more_vert</Icon>}
          title={ villager.name }  >
            <div class="card">
                 <div class="card-content">
                      <p> { villager.birthdayStr }</p>
                      <p> { villager.personality }</p>
                      <p> { villager.saying }</p>

                    
                 </div> 
               
            </div>
          </Card> ))}

        </div>

    
  );
};

export default MovingOutList;
