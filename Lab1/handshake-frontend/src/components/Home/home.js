import React, { Component } from 'react';
import homeProf from '../header/homeProf.jpg'
export default class Home extends Component {
  
  render(){

    return (
            <div className="row" style={{marginLeft:"6%"}}>
                <div className="col-md-6" style={{backgroundImage: `url(${homeProf})`,backgroundSize:"600px 650px", width:"600px", height:"650px", marginLeft:"10%", flex:"0 0 30%", marginTop:"4%"}}>
                </div>
                <div className="col-md-6" style={{ padding:"50px 0 0 100px"}} >
                <div >
                     <span style={{fontSize:"90px"}}> <b>The #1 way</b></span>
                     </div>
                     <div>
                     <span style={{fontSize:"90px"}}> <b>college</b></span>
                     </div>
                     <div>
                     <span style={{fontSize:"90px"}}> <b>students</b></span>
                     </div>
                     <div>
                     <span style={{fontSize:"90px"}}> <b> find jobs</b></span>
                     </div>
                     <br/>
                        <h3>Join today to start your career.</h3>
                        <div class="ui fluid action input" style={{ padding:"4% 0 0 0", width:"50%"}}>
                                <input type="text" placeholder="Search opportunities"/>
                        <div class="ui button">Search</div>
                    </div>
                </div>
            </div> 
    )
  }
}