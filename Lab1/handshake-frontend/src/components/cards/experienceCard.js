import React, {Component} from 'react';

export default class ExperienceCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            description : ""
        }
    }

    descriptionHandler = (e) => {
        this.setState({
            description: " Amy is a violinist with 2 years experience in the wedding industry. She enjoys the outdoors and currently resides in upstate New York."
        })
    }
    
    render(){

        return(
        
                <div class="ui cards">
                    <div class="card"  style={{width:"55%", fontSize: "1.5em"}}>
                        <div class="content">
                            <div class="header">Work and Volunteer Experience</div>
                            <div class="description">
                                <h2>Oracle Inc.</h2>
                            </div>
                            <div class="description">
                                Software Engineer Intern
                            </div>
                            <div class="description" style={{marginTop:"5px"}}>
                                <h4>Aug 2018 - Aug 2020</h4>
                            </div>
                            <div class="description" style={{marginTop:"7px"}}>
                                <h4>
                                    Developed wireless graphical data acquisition model using nRF module.
                                    Designed wireless air mouse for gaming console on KL25Z platform. 
                                </h4>
                            </div>
                        </div>
                        <div class="ui bottom attached large button">
                            <i class="add icon"></i>
                                Add Experience
                        </div>
                    </div>
                </div>
        );
    }
}