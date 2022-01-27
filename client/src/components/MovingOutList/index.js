import React from 'react';
import { Link } from 'react-router-dom';
import { villagersToMoveOut } from '../VillagerList';

//work in progress

const MovingOutList = ({ profiles, VillagersToMoveOut }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{}</h3>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {profile.username} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    currently has {profile.villagers ? profile.villagers.length : 0}{' '}
                    villagers
                    {profile.villagers && profile.villagers.length === 1 ? '' : 's'}
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  View their villagers and make comments.

                  {VillagersToMoveOut}

                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovingOutList;
