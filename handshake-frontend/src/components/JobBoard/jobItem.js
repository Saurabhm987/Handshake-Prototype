import React, {Component} from 'react';

export default class JobItem extends Component {
    constructor(props){
        super(props);

    }

    render(){

        let item = this.props.item;

        return(
            <div>
                <div class="ui fluid" id="jobItemId" style={{background: "#F8F8FF", margin: "auto", padding: "15px" }}>
                  <div class="image header">
                    <div class="line"><h3>{item.job_title}</h3></div>
                    <div class="line">{item.company_name} {item.job_loc}</div>
                  </div>
                  <div class="paragraph">
                    <div class="line"> {item.job_type}</div>
                    <div class="line">{item.job_post_date}</div>
                    <div class="line"> {item.job_salary}</div>
                  </div>
                </div>
            </div>  
        )
    }
}
