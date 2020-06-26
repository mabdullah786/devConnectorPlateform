import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { getListOfRepos } from '../../store/actions/profile';

const ProfileGithub = ({ username, getListOfRepos, repos }) => {
  useEffect(() => {
    getListOfRepos(username);
  }, [getListOfRepos, username]);
  return (
    <Fragment>
      {repos.length > 0 ? (
        <Fragment>
          {repos.map((repo) => (
            <div className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                    {repo.name}
                  </a>
                </h4>
                <p> {repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className='badge badge-primary'>Stars: {repo.stargazers_count}</li>
                  <li className='badge badge-dark'>Watchers: {repo.watchers_count}</li>
                  <li className='badge badge-light'>Forks: {repo.forks_count}</li>
                </ul>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <p> No Git Hub Repos Found</p>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getListOfRepos })(ProfileGithub);
