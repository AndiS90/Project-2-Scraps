import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_VILLAGER, ADD_MOVINGVIL } from '../utils/mutations';
import { QUERY_ME, QUERY_MOVINGVILLAGERS, QUERY_VILLAGER } from '../utils/queries';
import { getVillagerbyId } from '../utils/API';
import Auth from '../utils/auth'; 
import M from 'materialize-css';
import ReactDOM from 'react-dom';


import 'materialize-css';
import {  Button, Card, CardTitle, Icon, Select, Col, Row } from 'react-materialize';
import '../css/stylesheet.css';
import { removeVillagerId } from '../utils/localStorage';

import CommentForm  from './CommentForm';
import CommentList  from './CommentList';

const VillagerList = ({ villagers }) => {
  
  
console.log({ villagers });


const [removeVillager, { error }] = useMutation(REMOVE_VILLAGER);


    const [vilId, setVilId] = useState('');


    const [addMovingVil, { err }] = useMutation(ADD_MOVINGVIL, {
      update(cache, { data: { addMovingVil } }) {
        try {
          const { movingVils} = cache.readQuery({ query: QUERY_MOVINGVILLAGERS });
    
          cache.writeQuery({
            query: QUERY_MOVINGVILLAGERS,
          });
        } catch (e) {
          console.error(e);
        }
      }});


  // create function that accepts the villagers's mongo _id value as param and deletes the villager from the database
  const handleDeleteVillager = async (villagerId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const  data2 = await removeVillager({
        variables: { villagerId }
      });

      if (error) {
        throw new Error('something went wrong!');
      }

    // upon success, remove book's id from localStorage
      // removeVillagerId(villagerId);
    } catch (err) {
      console.error(err);
    }
  };

 

    const handleMovingVillager = async (villagerId) => {
     

      try{    

        console.log({ villagerId});

       const  getVillagerFromId = (villagerId) => {

        for (let i = 0; i < villagers.length; i++) {

          if (villagers[i]._id === villagerId){

            return villagers[i];
          }

        }
     }

        // setVilId(villagerId);
    

      // const movingVil = data?.villager || {};
      
      // try {
      //   const vilObj = await getVillagerbyId(villagerId);

     const vilObj = getVillagerFromId(villagerId);

     console.log({ vilObj });

        const villagerInput = {
          name: vilObj.name,
          apiId: vilObj.apiId,
          birthdayStr: vilObj.birthdayStr,
          species: vilObj.species,
          icon: vilObj.icon,
          image: vilObj.image,
          saying: vilObj.saying,
          personality: vilObj.personality
        }

        const data1 = await addMovingVil({
           variables: {movingVilInput: { ...villagerInput}},
        });
  
        console.log(data1)


      // const movingVillagersArray = [];

      // const movingOutArrayofIds = movingVillagersArray.push( villagerId )
    
      // setVillagersToMoveOut(movingOutArrayofIds);
    } catch (err) {
      console.error(err);
    }
  } 



const handleSelectChange = async ( event ) => {
  event.preventDefault();
  const { name, value } = event.target;

  console.log({ name });


  if (name && value==="2"){

    await handleMovingVillager(name);

  } if ( name && value==="3"){

    await handleDeleteVillager(name);
  }else

  return;

}


  if (!villagers.length) {
    return <h3>No Villagers Yet</h3>;
  }

 


  return (

    <div>
         <div class= "row" className="currentVillagers">
         
        {villagers &&
          villagers.map((villager) => (
      
           
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src={villager.image}/>
          </div>

            <div class="card-content">
                <p>Birthday: { villager.birthdayStr }</p>
                <p>Personality Type: { villager.personality }</p>
                <p>Saying: { villager.saying }</p>
     
            </div>
                {/* <h3>Are they comfy where they are? </h3>
                      <Row>
                        <Input type="select" value={villager.apiI}>
                          <option value={villager} key={}>  They sure are!</option>
                          <option value={villager} key={} onClick={() => handleMovingVillager(villager.villagerId)}> They'd like to move out.</option>
                          <option value={} key={} onClick={() => handleDeleteVillager(villager.villagerId)}>  Delete this Villager! </option>
                        </Input>
                      </Row> */}
         <div>
         <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleSelectChange}
        >
                       <Select
                       
                          id="Select-33"
                          multiple={false}
                          onChange={handleSelectChange}
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
                          name={villager._id}
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
                          <option  value="2" >
                           They'd like to move out.
                          </option>
                          <option value="3" >
                            Delete this Villager!  
                          </option>
                        </Select>
               </form>
                    </div>
                    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{villager.name}<i class="material-icons right">close</i></span>
      <div>
      <CommentList comments = {villager.comments}> </CommentList> 
      <CommentForm villagerId = { villager._id }> </CommentForm> 
      </div>

                    </div>
           </div>   
    
          ))}

          </div>
          </div>

         
              )};


  

  
export default VillagerList;