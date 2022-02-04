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
  }, []);



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
    // const { value } = event.target;

    // console.log(value);

    function getIdByName(value) {

      const namesArr = namesAndApiIdsArr;
  
      for (let j = 0; j < namesArr.length; j++) {
  
          if (value === namesArr[j].name) {
  
              return namesArr[j].id;
          }
      }
  };

  const apiId = getIdByName(villagerNameInp);

  console.log(apiId);


    try { 
      const vilObj = await getVillagerbyId(apiId);

      const villagerInput = {
        name: vilObj.name['name-USen'],
        apiId: vilObj.id,
        birthdayStr: vilObj['birthday-string'],
        species: vilObj.species,
        icon: vilObj.icon_uri,
        image: vilObj.image_uri,
        saying: vilObj.saying,
        personality: vilObj.personality
      }

      console.log(villagerInput);

      const { data } = await addVillager({
         variables: {villagerInput: { ...villagerInput},
                      // villagerUser: Auth.getProfile().data.username,
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
    <div class="villagerForm">
     

      {Auth.loggedIn() ? (
        <form
          className=" villagerForm "
          onSubmit={handleFormSubmit}
        >
          <div className="">
            <textarea
              placeholder="Search Villagers..."
              name="villagerNameInp"
              value={villagerNameInp}
              className="form-input w-100"
              onChange={handleChange} ></textarea>
          
          </div>

          <div class = "buttonWrapper " className="">
            <button class="valign-wrapper" className="btn btn-info btn-block " type="submit">
             <h4> Add Villager</h4>
            </button>
          </div>
          {error && (
            <div className="  bg-danger text-white ">
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
