import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, Form, Grid, Button } from 'semantic-ui-react';
import './header.css';

class Home extends Component {
    render() {
        return (
            <div>
          <Grid>
            <Grid.Column width={8} >
                <Grid.Row>
                  <div className="ui inverted container blurb">
                    <h2 className="about1">Collect Planes</h2>
                    <h2 className="about2">Team Up</h2>
                    <h2 className="about3">Save the World</h2>
                    <h3 className="about4">Welcome to BlockPlanes.<br></br>Strap in.</h3>
                  </div>
                </Grid.Row>
                <Grid.Row className='create-account'>
                <br></br>
                <Link to='/signup'><Button className='ui inverted button' size='massive' >Sign Up</Button></Link>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column width={8} className='left-side-Login' >
              <div className='left-picture' >
                <Image src='https://i.imgur.com/wjtMMUC.png' size='huge' rounded />
              </div>
            </Grid.Column>
          </Grid>
          <Grid>
          <Grid.Row className='secondhalf'>
          </Grid.Row>
          <Grid.Column width={6} >
          </Grid.Column>
          <Grid.Row className='secondhalfheader'>
                  <p className='secondhalftext'>Calling All Pilots</p>
                  </Grid.Row>
                  {/* <Grid.Row>
                  <div className='mid-picture2' >
                <Image src='https://i.imgur.com/VNZZjii.png' size='large' rounded />
              </div>
                </Grid.Row> */}
                <Grid.Row className='secondhalfpara2'>
                  <p className='secondhalfpara'><br></br><br></br>If you’re reading this, the world needs your help.<br></br><br></br>That’s right, the <strong>WORLD</strong>.<br></br><br></br>The terrorist organization known as <strong>EVILGROUP.NAME</strong> is mobilizing an air force to destroy life as we know it…<br></br>and, you know, <strong>IN GENERAL</strong>. <br></br><br></br>That’s why we started <strong>BLOCKPLANES</strong>. <br></br><br></br>To supply any able bodied pilot with the means to take down these monsters.<br></br><br></br>So what do you say?<br></br><br></br>We have the <strong>PLANES</strong>. Do you have the <strong>GUTS?</strong><br></br><br></br></p>
                </Grid.Row>
                <Grid.Row className='signupbuttonhome'>
                <Link to='/signup'><Button className='ui inverted button' size='massive' >Sign Up</Button></Link>
                </Grid.Row>
          </Grid>
        </div>
        );
    }
}

export default Home;