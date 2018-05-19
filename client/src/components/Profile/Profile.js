import React, { Component } from 'react';
//REACT styling
// import FaAnchor from 'react-icons/lib/fa/anchor';

class Profile extends Component {

  componentWillMount() {
    this.setState({ profile: {} });

    const { userProfile, getProfile } = this.props.auth;

    if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  
  render() {
    const { profile } = this.state;
    return (
      <div style={{backgroundColor: '#eb6864'}}>
        {/* <button type="button" style={{float: 'right', backgroundColor: '#000080'}} className="btn btn-link"><a href="/"><FaAnchor style={{fontSize: '5vw'}}/></a></button> */}
        <div className="container">
          <div className="profile-area">
            <h1>{profile.name}</h1>
            <div header="Profile">
              <img src={profile.picture} alt="profile" />
              <div>
               <span>Nickname</span>
                <h3>{profile.nickname}</h3>
              </div>
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;