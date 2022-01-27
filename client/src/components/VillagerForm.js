import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { getVillagerbyId } from '../utils/API';

import { saveVillagerIds, getSavedVillagerIds } from '../utils/localStorage';

import { ADD_VILLAGER } from '../utils/mutations';

import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { getNamesPlusNullArray, searchAllVillagers } from '../utils/API';
import { Autocomplete } from 'react-materialize';
import 'materialize-css';



const VillagerForm = ({ profileId }) => {

  const [namesAndIdsArr, setNamesAndIdsArr] = useState('');

  React.useEffect(() => {

    const getNamesandIds = async() => {
    const namesandIds = await searchAllVillagers();

      setNamesAndIdsArr(namesandIds);
    }
    getNamesandIds();
  })



  const [optionsObj, setOptionsObj] = useState('');
  
  React.useEffect(() => {

    const getObj = async () => {
    const  response = await getNamesPlusNullArray();
    
      setOptionsObj(response);
    }

    getObj();

  });



console.log({ ...optionsObj } );


  const [villager, setVillager] = useState('');

  const [addVillager, { error }] = useMutation(ADD_VILLAGER);

  const [savedVillagerIds, setSavedVillagerIds] = useState(getSavedVillagerIds());


    // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveVillagerIds(savedVillagerIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { value } = event.target;


    function getIdByName(value) {

      const namesArr = namesAndIdsArr;
  
      for (let j = 0; j < namesArr.length; j++) {
  
          if (value === namesArr[j].name) {
  
              return namesArr[j].id;
          }
      }
  };

  const apiId = getIdByName(value);



    try { 
      const vilObj = await getVillagerbyId(apiId);

      const villagerInput = {
        name: vilObj.name['name-USen'],
        apiId: vilObj.id,
        birthdayStr: vilObj.birthdayStr,
        species: vilObj.species,
        icon: vilObj.icon,
        image: vilObj.image,
        saying: vilObj.saying,
        personality: vilObj.personality
      }

      const data = await addVillager({
         variables: { ...villagerInput },
      });


      setSavedVillagerIds([...savedVillagerIds, vilObj.apiId]);
      setVillager('');
    } catch (err) {
      console.error(err);
    }
  };







  return (
    <div>
      <h4>Endorse some more skills below.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Search Villagers..."
              value="Villager Name"
              className="form-input w-100"
              onChange={(event) => setVillager(event.target.value)} />

              <Autocomplete
              id="Autocomplete-41"
              options={{
                data: {...optionsObj}
              }}
              placeholder="Insert here"
              title="Input Label"
            />

           



           
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              How they been to you?
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to comment. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default VillagerForm;
