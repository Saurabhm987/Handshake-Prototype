import React, {Component} from 'react';

export default class InterestCard extends Component {
    
    
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


