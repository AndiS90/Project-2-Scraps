import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { getVillagerbyId } from '../utils/API';

import { saveVillagerIds, getSavedVillagerIds } from '../utils/localStorage';

import { ADD_VILLAGER } from '../utils/mutations';
import { QUERY_VILLAGERS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import { getNamesPlusNullArray, searchAllVillagers } from '../utils/API';
import { Autocomplete } from 'react-materialize';
import 'materialize-css';


const VillagerForm = () => {

  const [namesAndApiIdsArr, setNamesAndApiIdsArr] = useState('');

  React.useEffect(() => {

    const getNamesandApiIds = async() => {
    const namesandApiIds = await searchAllVillagers();

      setNamesAndApiIdsArr(namesandApiIds);
    }
    getNamesandApiIds();
  })


//optionsObj contains necessary formatting for autofill feature not currently working
  const [optionsObj, setOptionsObj] = useState('');
  
  React.useEffect(() => {

    const getObj = async () => {
    const  response = await getNamesPlusNullArray();
    
      setOptionsObj(response);
    }

    getObj();

  });


  const [villagerNameInp, setVillagerNameInp] = useState('');

 

  const [savedVillagerIds, setSavedVillagerIds] = useState(getSavedVillagerIds());


    // set up useEffect hook to save `savedVillagerIds` ( technically apiIds) list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveVillagerIds(savedVillagerIds);
  });

 const [addVillager, { error }] = useMutation(ADD_VILLAGER, {
  update(cache, { data: { addVillager } }) {
    try {
      const { villagers } = cache.readQuery({ query: QUERY_VILLAGERS });

      cache.writeQuery({
        query: QUERY_VILLAGERS,
        data: { villagers: [addVillager, ...villagers] },
      });
    } catch (e) {
      console.error(e);
    }

    // update me object's cache
    const { me } = cache.readQuery({ query: QUERY_ME });
    cache.writeQuery({
      query: QUERY_ME,
      data: { me: { ...me, villagers: [...me.villagers, addVillager] } },
    });
  },
});






  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { value } = event.target;


    function getIdByName(value) {

      const namesArr = namesAndApiIdsArr;
  
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

      const { data } = await addVillager({
         variables: { ...villagerInput, villagerUser: Auth.getProfile().data.username,
         },
      });


      setSavedVillagerIds([...savedVillagerIds, villagerInput.apiId]);
      setVillagerNameInp('');
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'villagerNameInp') {
      setVillagerNameInp(value);
    }
  };





  return (
    <div>
     

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <textarea
              placeholder="Search Villagers..."
              value={villagerNameInp}
              className="form-input w-100"
              onChange={handleChange} ></textarea>

                    
           
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Add Villager
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
