import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';
import {connect } from 'react-redux';
import {fetchDashboard} from '../../actions/fetchAction'
import {applyJob} from '../../actions/applyActions'
import PropTypes from 'prop-types';

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
      message: ""
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
            this.props.push("login");
        }
        this.props.applyJob(this.state);
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

    async componentDidMount(){
      const accessString = localStorage.getItem('JWT');
      if(accessString === null || accessString === ""){
          this.setState({
              isLogin: false
          })
          console.log("token is null!");
          this.props.history.push("login");
      }
      await this.props.fetchDashboard(accessString);
      if(this.state.message !== ""){
        alert("Job Applied!");
      }
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.jobDetails){
        if(nextProps.jobDetails === "jwt expired"){
          this.props.history.push("login");
        }
        this.setState({
          jobData: nextProps.jobDetails
        })
      }
      if(nextProps.message){
        this.setState({
          message: nextProps.message
        })
        if(nextProps.message === "jwt expired"){
          alert(`Job ${nextProps.message}`)
          this.props.history.push("login");
        }
        console.log(`Job ${nextProps.message}`)
      }
  }

render() {

  let curSelectedJob = this.state.cardSelected;
  let  renderdata = this.state.jobData;
  var place = (
    <div className="line"> </div>
 )
  var placeHolderline = []
   for(let i = 0; i < 20; i++){
     placeHolderline.push(place);
   }

  if(renderdata){
    if(renderdata[0] !== undefined ){
      var initialRightBar = (
        <div className="ui items" id="rightBarScroll">
          <div className="ui fluid" id="jobItemId" style={{margin: "auto", padding: "25px", background: "white" , fontSize: "24px"}}>
            <div className="image header">
                <div className="line"><h3><b>{renderdata[0].title}</b></h3></div>
                <div className="line"><h4>{renderdata[0].company_name} , {renderdata[0].location}</h4></div>
                <div className="line"> {renderdata[0].jobType}</div>
            </div>
            <br/>
            <div className="paragraph">
                <div className="row" style={{border: "0.03em solid rgb(245, 242, 242)"}}>
                  <div className="col-md-10"></div>
                  <div className="row" style={{margin: "5px", width: "100%", background:"rgb(245, 242, 242)" }}>
                      <div className="col-md-8" style={{margin:"5px"}}>
                            <h4>Application closes on</h4>
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-2">
                            <div className="large ui green button" data-profile_pic={renderdata[0].profile_pic} data-job_title={renderdata[0].title}  data-selected_job_id={renderdata[0].jobId} data-company_name={renderdata[0].company_name} onClick={this.applied} >
                                  Apply 
                            </div>
                      </div>
                  </div>
                </div>
             </div>
             <br/>
              <div className="paragraph" style={{fontSize:"20px"}}>
                <div className ="line"><b>Description</b></div>
                <div className="line">{renderdata[0].description}</div>
                <div className="line"> {renderdata[0].salary}</div>
                <div className="line">{renderdata[0].postedDate}</div>
              </div>
          </div>   
      </div>
      )}else{
        initialRightBar =(
        <div className="ui items "  style={{background: "white"}}>
        <div className="ui fluid placeholder" id="jobItemId" style={{margin: "auto", padding: "25px" }}>
          <div className="image header">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <br/>
          <div className="paragraph">
                <div className="row" style={{border: "0.03em solid rgb(245, 242, 242)"}}>
                  <div className="col-md-10"></div>
                  <div className="row" style={{margin: "5px", width: "100%", background:"rgb(245, 242, 242)" }}>
                      <div className="col-md-8" style={{margin:"5px"}}>
                            <h4></h4>
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-2">
                            <div className="line" >
                            </div>
                      </div>
                  </div>
                </div>
             </div>
             <br/>
          <div className="paragraph">
              {placeHolderline}
          </div>
        </div>              
      </div>
        )
      }
  // let searchBar = (
  //   <div className ="row">
  //             <div className="ui fluid action input" style={{marginLeft: "1.5%", marginRight:"1.5%", width:"100%"}}>
  //                 <input type="text" placeholder="Search opportunities"/>
  //                 <div className="ui button">Search</div>
  //             </div>
  //     </div>
  // )
  let filters = (
    <div className="row" style={{ padding:"16px", background:"white", marginLeft: "9px", marginRight:"8px"}}>
          <button className="ui primary basic button">Full-Time</button>
          <button className="ui primary basic button">Part-Time</button>
          <button className="ui primary basic button">Internship</button>
    </div>
  )

  let lefBar = (
    <div className="ui items" id="scroll">
        { renderdata.map( (item, index) =>
          <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "20px"}}>
                <img src={item.profile_pic}  style={{width:"170px", height:"125px"}}/>
                <div className="content" style={{padding: "5px"}}>
                    <div className="header" > {item.title}</div>
                        <div className="meta">
                            <span><b>{item.company_name}</b> ,{item.location}</span>
                        </div>
                        <div className="extra">
                        <i className="money bill alternate icon"></i>
                            $ {item.salary} /hr
                        </div>
                        <div className="extra">
                            {item.postedDate}
                        </div>
                        <div className="extra">
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
            {/* <br/>
                {searchBar} */}
            <br/>
                {filters}
                <br/>
                <div className="row">
                    <div className="col-md-5">
                          {lefBar}
                    </div>
                    <div className="col-md-7"style={{paddingLeft: "45px"}}>
                          {initialRightBar}
                      </div>
                    <br/> 
                </div>
        </div>
  )
}else if( this.state.isLogin === true && curSelectedJob !== ""){
  return (
    <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
    {/* <br/>
        {searchBar} */}
    <br/>
    <div className="row" style={{background:"white"}}>
        {filters}
        </div>
        <br/>
        <div className="row">
            <div className="col-md-5">
                  {lefBar}
            </div>
            <div className="col-md-7" style={{paddingLeft: "45px"}}>
            <div className="ui items" id="rightBarScroll">
            
              <div className="ui fluid" id="jobItemId" style={{margin: "auto", padding: "25px", background: "white" , fontSize: "24px"}}>
                  <div className="image header">
                 
                    <div className="line"><h3><b>{renderdata[curSelectedJob].title}</b></h3></div>
                    <div className="line"><h4>{renderdata[curSelectedJob].company_name} , {renderdata[curSelectedJob].location}</h4></div>
                    <div className="line"> {renderdata[curSelectedJob].jobType}</div>
                    
                  </div>
                  <br/>
                  <div className="paragraph">
                  <div className="row" style={{border: "0.03em solid rgb(245, 242, 242)"}}>
                  <div className="col-md-10"></div>
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
                  <div className="paragraph" style={{fontSize:"20px"}}>
                  <div className ="line"><b>Description</b></div>
                  <div className="line">{renderdata[curSelectedJob].description}</div>
                    <div className="line"> {renderdata[curSelectedJob].salary}</div>
                    <div className="line">{renderdata[curSelectedJob].postedDate}</div>
                  </div>
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

}else if(renderdata){
  return(
    <div>
        <h2>No Posted Job!</h2>
    </div>
  )
}

}
}

JobBoard.propTypes = { 
  fetchDashboard: PropTypes.func.isRequired,
  jobDetails: PropTypes.array.isRequired,
  applyJob : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  jobDetails: state.Handshake_User_Info.jobDetails,
  message: state.Handshake_User_Info.message
})

export default connect(mapStateToProps, {fetchDashboard, applyJob})(JobBoard);


