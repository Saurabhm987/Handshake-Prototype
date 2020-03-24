import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';
import {connect } from 'react-redux';
import {fetchDashboard} from '../../actions/fetchAction'
class JobBoard extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      jobData: [],
      cardSelected:"",
      JobId:"",
      company:"",
      title:"",
      profile_pic:"",
    }

    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
    });

    this.cardSelect = this.cardSelect.bind(this);
    this.applied = this.applied.bind(this);

  }

  cardSelect = (e) => {
    e.preventDefault();

    this.setState({
      cardSelected : e.currentTarget.dataset.div_id
    })
  }

sendData = async () => {
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!");
        }

        console.log( "appliedDetails: ", this.state);

        await this.instance.post("/applyJob",{
          params:{
            id: this.state.JobId,
            company: this.state.company,
            title: this.state.title,
            profile_pic: this.state.profile_pic
          }
        }, { 
            headers: {
                Authorization: `JWT ${accessString}`
            }
        } ).then(response => {
                if(response.status === 200){
                  if(response.data === "jwt expired"){
                    localStorage.removeItem('JWT');
                    this.setState({
                      isLogin: false
                    })
                    this.props.history.push("/Login");
                  }
                   alert("Job Applied");
                   console.log("job_applied")
                }else{
                    console.log("ERROR");
                }
            })
}

  applied = async (e) => {
      
        this.setState({
          JobId: e.currentTarget.dataset.selected_job_id,
          company: e.currentTarget.dataset.company_name,
          title : e.currentTarget.dataset.job_title,
          profile_pic: e.currentTarget.dataset.profile_pic
      }, () => {
        this.sendData();
      })  
  }

  componentWillMount() {
    this.props.fetchDashboard();
  }

  componentDidUpdate(){}

    componentDidMount(){
      const accessString = localStorage.getItem('JWT');

      if(accessString === null || accessString === ""){
          this.setState({
              isLogin: false
          })
          console.log("token is null!");

          this.props.history.push("login");
      }

      console.log("jobboard token: ", accessString);

      this.instance.get("/getJobBoard/board", { 
          headers: {
              Authorization: `JWT ${accessString}`
          }
      } ).then(response => {
              if(response.status === 200){
                if(response.data === "jwt expired"){
                  localStorage.removeItem('JWT');
                  this.setState({
                    isLogin: false
                  })
                  this.props.history.push("/companyLogin");
                }
                  this.setState({
                      jobData:response.data
                  })
                  console.log("jobBoard_jobData: ", this.state.jobData);
              }else{
                  console.log("ERROR");
              }
          })
  }

render() {

  let curSelectedJob = this.state.cardSelected;
  console.log("curSelectedJob: ", curSelectedJob);
  let renderdata ={};
  renderdata = this.state.jobData;

  if(renderdata){

  let searchBar = (
    <div className ="row">
              <div class="ui fluid action input" style={{marginLeft: "1.5%", marginRight:"1.5%", width:"100%"}}>
                  <input type="text" placeholder="Search opportunities"/>
                  <div class="ui button">Search</div>
              </div>
      </div>
  )


  let filters = (
    <div className="row" style={{ padding:"16px"}}>
          <button class="ui primary basic button">Full-Time</button>
          <button class="ui primary basic button">Part-Time</button>
          <button class="ui primary basic button">Internship</button>
    </div>
  )

  let lefBar = (
    <div class="ui items" id="scroll">
        { renderdata.map( (item, index) =>
          <div class="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "20px"}}>
                <img src={item.profile_pic}  style={{width:"170px", height:"125px"}}/>
                <div class="content" style={{padding: "5px"}}>
                    <div className="header" > {item.title}</div>
                        <div class="meta">
                            <span><b>{item.company_name}</b> ,{item.location}</span>
                        </div>
                        <div class="extra">
                            $ {item.salary} /hr
                        </div>
                        <div class="extra">
                            {item.postedDate}
                        </div>
                        <div class="extra">
                            {item.jobType}
                      </div>
                </div>
          </div>
        )}
  </div>
  )


  if(this.state.isLogin === true && curSelectedJob === "" && renderdata !== {}){
          return (
            <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
            <br/>
                {searchBar}
            <br/>
                {filters}
                <br/>
                <div className="row">
                    <div className="col-md-5">
                          {lefBar}
                    </div>
                    <div className="col-md-7"style={{paddingLeft: "45px"}}>
                          <div class="ui items"  style={{background: "white"}}>
                            <div class="ui fluid placeholder" id="jobItemId" style={{margin: "auto", padding: "15px" }}>
                              <div class="image header">
                                <div class="line"><h3></h3></div>
                                <div class="line"></div>
                                <div class="line"></div>
                                <span className="line">

                                </span>

                              </div>
                              <div class="paragraph">
                                <div class="line"> </div>
                                <div class="line"></div>
                                <div class="line"></div>
                              </div>
                            </div>              
                          </div>
                      </div>
                    <br/> 
                </div>
        </div>
  )
}else if( this.state.isLogin === true && curSelectedJob !== ""){
  return (
    <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
    <br/>
        {searchBar}
    <br/>
        {filters}
        <br/>
        <div className="row">
            <div className="col-md-5">
                  {lefBar}
            </div>
            <div className="col-md-7" style={{paddingLeft: "45px"}}>
            <div class="ui items">
            
              <div class="ui fluid" id="jobItemId" style={{margin: "auto", padding: "25px", background: "white" , fontSize: "24px"}}>
                  <div class="image header">
                 
                    <div class="line"><h3><b>{renderdata[curSelectedJob].title}</b></h3></div>
                    <div class="line"><h4>{renderdata[curSelectedJob].company_name} , {renderdata[curSelectedJob].location}</h4></div>
                    <div class="line"> {renderdata[curSelectedJob].jobType}</div>
                    
                  </div>
                  <br/>
                  <div class="paragraph">
                  <div class="row" style={{border: "0.03em solid rgb(245, 242, 242)"}}>
                  <div class="col-md-10"></div>
                  <div className="row" style={{margin: "5px", width: "100%", background:"rgb(245, 242, 242)" }}>
                      <div className="col-md-8" style={{margin:"5px"}}>
                            <h4>Application closes on</h4>
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-2">
                            <div className="large ui green button" data-profile_pic={renderdata[curSelectedJob].profile_pic} data-job_title={renderdata[curSelectedJob].title}  data-selected_job_id={renderdata[curSelectedJob].jobId} data-company_name={renderdata[curSelectedJob].company_name} onClick={this.applied} >
                                  Apply 
                            </div>
                      </div>
                  </div>
                   </div>
                   </div>
                   <br/>
                  <div class="paragraph" style={{fontSize:"20px"}}>
                  <div class ="line"><b>Description</b></div>
                  <div class="line">{renderdata[curSelectedJob].description}</div>
                    <div class="line"> {renderdata[curSelectedJob].salary}</div>
                    <div class="line">{renderdata[curSelectedJob].postedDate}</div>
                  </div>
                  {/* <div className="large ui blue button" style={{margin: "10px"}} data-selected_job_id={renderdata[curSelectedJob].job_id} data-company_name={renderdata[curSelectedJob].company_name} onClick={this.applied} >
                       Apply 
                   </div> */}
                </div>   
          </div>
            </div>
            <br/> 
        </div>
</div>
)
}
  else{
  return(
    <Redirect to="/jobProfile" />
  )
}

}else{
  return(
    <div>
        <h2>No Posted Job!</h2>
    </div>
  )
}

}
}

export default connect(null, {fetchDashboard})(JobBoard);


