import React from 'react';
import { useQuery } from '@apollo/client';

import MovingOutList from '../components/MovingOutList';

import { QUERY_MOVINGVILLAGERS } from '../utils/queries';

const Home = () => {


  return (


    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">

          <MovingOutList></MovingOutList>
          {/* {loading ? (
            <div>Loading...</div>
          ) : (


            <ProfileList
              profiles={profiles}
              title="Here's the current roster of friends..."
            />
             */}
          {/* )} */}
        </div>
      </div>
    </main>
  );
};

export default Home;
