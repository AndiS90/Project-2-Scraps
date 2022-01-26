import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import 'materialize-css';
import {  Button, Card } from 'materialize-css';

import{ CommentForm } from './CommentForm';
import{ CommentList } from './CommentList';

const VillagerList = () => {

// const [villager1, setVillager1State] = useState('');
// const [villager2, setVillager2State] = useState('');
// const [villager3, setVillager3State] = useState('');
// const [villager4, setVillager4State] = useState('');
// const [villager5, setVillager5State] = useState('');
// const [villager6, setVillager6State] = useState('');
// const [villager7, setVillager7State] = useState('');
// const [villager8, setVillager8State] = useState('');
// const [villager9, setVillager9State] = useState('');

const [villagersToMoveOut, setVillagersToMoveOut] = useState('');

const { loading, data } = useQuery(QUERY_ME);

const [deleteVillager, { error }] = useMutation(DELETE_VILLAGER;


const  userData = data?.me || {};



if (!userData?.username) {
  return (
    <h4>
      You need to be logged in to view a villager list Use the navigation links above to
      sign up or log in!
    </h4>
  );
}


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteVillager = async (villagerId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data }= await deleteVillager({
        variables: { villagerId }
      });

      if (error) {
        throw new Error('something went wrong!');
      }

    // upon success, remove book's id from localStorage
      removeVillagerId(villagerId);
    } catch (err) {
      console.error(err);
    }
  }

  

    const handleMovingVillager = (villagerId) => {
      
      try {


        const data = await addMovingVil({
           variables: { villagerUser, villagerInput },
        });
  


      const movingVillagersArray = [];

      const movingOutArrayofIds = movingVillagersArray.push( villagerId )
    
      setVillagersToMoveOut(movingOutArrayofIds);
    };



  return (

    <div>
         <div className="current-villagers">
          {/* CARD TEMPLATE  */}


          <div className="flex-row justify-space-between my-4">
        
        
        {userData.villagers &&
          userData.villagers.map((villager) => (
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

                      <Select
                          id="Select-33"
                          multiple={false}
                          onChange={function noRefCheck(){}}
                          options={{
                            classes: '',
                            dropdownOptions: {
                              alignment: 'left',
                              autoTrigger: true,
                              closeOnClick: true,
                              constrainWidth: true,
                              coverTrigger: true,
                              hover: false,
                              inDuration: 150,
                              onCloseEnd: null,
                              onCloseStart: null,
                              onOpenEnd: null,
                              onOpenStart: null,
                              outDuration: 250
                            }
                          }}
                          value=""
                        >
                          <option
                            disabled
                            value=""
                          >
                            Are they comfy where they are?
                          </option>
                          <option value="1">
                            They sure are!
                          </option>
                          <option value="2" onClick={() => handleMovingVillager(villager.villagerId)}>
                           They'd like to move out.
                          </option>
                          <option value="3" onClick={() => handleDeleteVillager(villager.villagerId)}>
                            Delete this Villager!  
                          </option>
                        </Select>
                    
                 </div> 
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteVillager(villager.villagerId)}>
                   
                      </Button>
            </div>
          </Card> ))}

        </div>

      </div>


    </div>


    );
  };
  

  
export default VillagerList;