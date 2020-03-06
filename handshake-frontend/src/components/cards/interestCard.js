import React, {Component} from 'react';

export default class InterestCard extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
                    <div className="ui cards">
                        <div className="card" style={{fontSize:"1.4em"}}>
                            <div className="content">
                                <div className="header">Personal Information</div>
                                <div className="description" style={{marginBottom: "10px"}}>
                                        <h4><b>Email Address</b></h4>
                                        {/* {this.props.infoProps.student_email} */}
                                </div>
                                <div className ="description">
                                    <h4><b>Collge Name</b></h4>
                                        {/* {this.props.infoProps.student_college_name} */}
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
}


{/* <span style={{color: "blue"}}><p className="card-text">What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</p></span> */}
