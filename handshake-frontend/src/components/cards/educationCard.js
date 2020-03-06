import React, {Component} from 'react';

export default class EducationCard extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
                    <div className="ui cards">
                        <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                            <div className="content">
                                <div className="header">Education</div>
                                <div className="description">
                                        <h2>San Jose State University</h2>
                                </div>
                                <div className ="description">
                                        Masters, Computer Engineering
                                </div>
                                <div className="description">
                                        <h4>Aug 2018 - Aug 2020</h4>
                                </div>
                                <div className="description">
                                       <h4> GPA: 3.32 </h4>
                                </div>
                            </div>
                            <div class="ui bottom attached large button">
                                <i class="add icon"></i>
                                    Add Education
                            </div>
                        </div>
                    </div>
        );
    }
}


{/* <span style={{color: "blue"}}><p className="card-text">What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</p></span> */}
