import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import GetJobItem from '../cards/jobItemCard';

export default class JobBoard extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      jobData: [],
      // cardSelected:""
    }

    this.cardSelect = this.cardSelect.bind(this);
  }

  cardSelect = (e) => {
    e.preventDefault();

    this.setState({
      cardSelected : e.currentTarget.dataset.div_id
    })

    console.log("Selected: ", this.state.cardSelected);
  }

    componentDidMount(){

      const accessString = localStorage.getItem('JWT');

      if(accessString === null){
          this.setState({
              isLogin: false
          })
          console.log("token is null!");
      }


      console.log("jobboard token: ", accessString);

      axios.get("http://localhost:3001/getJobBoard", { 
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

    const renderdata = this.state.jobData;

    console.log("renderData: ", renderdata);
    console.log("cardSelected_Id: ", this.state.cardSelected);

    if(this.state.isLogin === true){
    return (
      <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
      <br/>
      <div className ="row">
        <div class="ui fluid action input" style={{marginLeft: "3%", marginRight:"5%"}}>
          <input type="text" placeholder="Search opportunities"/>
          <div class="ui button">Search</div>
        </div>
      </div>
      <br/>
      <div className="row">
            <div class="ui compact menu" style={{marginLeft:"3%"}}>
              <a class="item">
                <i class="icon mail"></i> Full-Time
              </a>
            <a class="item">
              <i class="icon users"></i> Part-Time
            </a>
            <a class="item">
                <i class="icon mail"></i> Internship
              </a>
          </div>
      </div>

      <br/>

      <div className="row">
      <div className="col-md-4">

      <div class="ui items">

      { renderdata.map( (item) =>
        <div class="item" id="cardHover" data-div_id={item.job_id} onClick={this.cardSelect}>
          <div class="image">￼
            <img src="/images/wireframe/image.png"/>
          </div>
          <div class="content" style={{paddingLeft: "0%"}}>
            <a class="header">{item.job_title}</a>
            <div class="meta">
              <span>{item.company_name} {item.job_loc}</span>
            </div>
            <div class="extra">
                {item.job_salary}
            </div>
            <div class="extra">
            {item.job_post_date}
            </div>
            <div class="extra">
            {item.job_type}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  <div className="col-md-8">
      <div class="ui items">
        <GetJobItem cardSelected = {this.state.cardSelected} />
      </div>
  </div>
<br/> 
</div>
</div>
    )
  }else{
    return(
      <Redirect to="/jobProfile" />
    )
  }
  }
}