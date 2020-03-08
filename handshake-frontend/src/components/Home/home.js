import React, { Component } from 'react';
import homeProf from '../header/homeProf.jpg'
export default class Home extends Component {
  constructor(props){
    super(props);


  }
  render(){

    return (
            <div className="row">
                <div className="col-md-6" style={{backgroundImage: `url(${homeProf})`,backgroundSize:"600px 650px", width:"600px", height:"650px", marginLeft:"10%", flex:"0 0 30%", marginTop:"4%"}}>
                        
                </div>
                <div className="col-md-6">
                      
                </div>
            </div> 
    )
  }
}