import React, {Component} from 'react';
import axios from 'axios';

export default class Jobs extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLogin: true,
            jobs: {}, 
            id:""
        }
        
    }
    
    componentDidUpdate(){
    }

componentDidUpdate(nextProps) {
    const id = this.props.selJob;
    if(nextProps.selJob !== id){
      this.setState({
          id: nextProps.selJob
      })
    }
}

    componentDidMount(){

        console.log("jobs_called!");
        const accessString = localStorage.getItem('JWT');
        console.log("jobItem token: ", accessString);
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!");
        }else{
            console.log("jobs - No_Token_Error!");
            let id = this.props.selJob;
            console.log("jobs_initial Id: ", id);

            if(this.props.selJob !== ""){
                this.setState({
                    id :  this.props.selJob
                })
            }else{
                this.setState({
                    id : 0
                })
            }

            console.log("jobs_fin_id: ",  this.state.id);

        }

    }

    render(){
        
        // console.log("normalPropsdisp: ", this.state.data);
        // console.log("jobListchild: ", this.state.jobList);
        // console.log("selectedJob: ", selectedId);
        // console.log("jobList: ", this.state.data);
        // console.log("disp: ", this.state.disp)
        // console.log("id: ", this.state.id);
        // console.log("objData: ", disp.job_title);

        return(
            <div>
                <div class="ui fluid placeholder" id="jobItemId" style={{margin: "auto", padding: "15px" }}>
                  <div class="image header">
                    <div class="line"><h3></h3></div>
                    <div class="line"></div>
                  </div>
                  <div class="paragraph">
                    <div class="line"> </div>
                    <div class="line"></div>
                    <div class="line"> </div>
                  </div>
                </div>
        </div>  
        )
    }
}
