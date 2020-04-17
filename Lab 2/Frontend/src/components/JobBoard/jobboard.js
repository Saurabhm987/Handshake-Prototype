import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';
import {connect } from 'react-redux';
import {fetchDashboard, searchJobType} from '../../actions/fetchAction'
import {applyJob} from '../../actions/applyActions'
import PropTypes from 'prop-types';

class JobBoard extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      jobData: [],
      cardSelected:"",
      Job_Id:"",
      company:"",
      title:"",
      name:"",
      profile_pic:"",
      message: ""
    }

    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
    });

    this.cardSelect = this.cardSelect.bind(this);
    this.applied = this.applied.bind(this);
    this.handleFilter = this.handleFilter.bind(this)

  }

  handleFilter = (e) => {
    e.preventDefault()
    this.props.searchJobType(e.target.value, this.props.jobDetails)
  }

  cardSelect = (e) => {
    e.preventDefault();

    this.setState({
      cardSelected : e.currentTarget.dataset.div_id
    })
  }

sendData = () => {

        console.log('state information ', this.state)

        const accessString = localStorage.getItem('JWT');
        console.log(`applie job token: ${accessString}`)
        if(accessString === null){
            this.setState({
                isLogin: false
            })

            console.log("token is null!");
            this.props.push("login");
        }
        console.log('applying to this job - ', this.state)
        alert(`You have applied`)

        this.props.applyJob(this.state)

        console.log('after applied - ', this.props.error)

        if(this.props.error){
          alert(this.props.error)
        }
  }

  applied = async (e) => {
        this.setState({
          Job_Id: e.currentTarget.dataset.job_id,
          title: e.currentTarget.dataset.title,
          name: e.currentTarget.dataset.name,
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

      console.log('props error - ', this.props.error)

      if(this.props.error){
        alert(this.props.error)
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

   console.log('renderdata -jobbard - ', renderdata)

  if(renderdata !== undefined){
    if(renderdata[0] !== undefined  && renderdata.length>0){
      console.log('renderdata - ', renderdata[0])
      var initialRightBar = (
        <div className="ui items" id="rightBarScroll">
          <div className="ui fluid" id="jobItemId" style={{margin: "auto", padding: "25px", background: "white" , fontSize: "24px"}}>
            <div className="image header">
                <div className="line"><h3><b>{renderdata[0].title}</b></h3></div>
                <div className="line"><h4>{renderdata[0].name} , {renderdata[0].location}</h4></div>
                <div className="line"> {renderdata[0].job_type}</div>
            </div>
            <br/>
            <div className="paragraph">
                <div className="row" style={{border: "0.03em solid rgb(245, 242, 242)"}}>
                  <div className="col-md-10"></div>
                  <div className="row" style={{margin: "5px", width: "100%", background:"rgb(245, 242, 242)" }}>
                      <div className="col-md-9" style={{margin:"5px"}}>
                            <h4>Application closes on</h4>
                      </div>
                      <div className="col-md-3" style={{maxWidth:"23%"}}>
                            <div className="large ui green button" style={{float:"right", marginRight:"-18px"}} data-profile_pic={renderdata[0].profile_pic} data-title={renderdata[0].title}  data-job_id={renderdata[0].job_id} data-name={renderdata[0].name} onClick={this.applied} >
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
  let filters = (
    <div className="row" style={{ padding:"16px", background:"white", marginLeft: "9px", marginRight:"3px"}}>
          <button className="ui primary basic button" value="Full-Time" onClick={this.handleFilter}>Full-Time Internship</button>
          <button className="ui primary basic button" value="Part-Time" onClick={this.handleFilter}>Part-Time Internship</button>
          <button className="ui primary basic button" value="Job" onClick={this.handleFilter}>Full-Time</button>
    </div>
  )

  let lefBar = (
    <div className="ui items" id="scroll">
        { renderdata.map( (item, index) =>
          <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "5px"}}>
                <img src={`${API_ENDPOINT}/${item.profile_pic}`}  style={{width:"150px", height:"125px", margin:"8px 11px"}}/>
                <div className="content" style={{padding: "5px"}}>  
                    <div className="header" > {item.title}</div>
                        <div className="meta">
                            <span><b>{item.name}</b> ,{item.location}</span>
                        </div>
                        <div className="extra">
                        <i className="money bill alternate icon"></i>
                            $ {item.salary} /hr
                        </div>
                        <div className="extra">
                            {item.postedDate}
                        </div>
                        <div className="extra">
                            {item.job_type}
                      </div>
                </div>
          </div>
        )}
  </div>
  )

  if(this.state.isLogin === true && curSelectedJob === "" && renderdata !== {}){
          return (
            <div style={{marginRight:"10%", marginLeft: "10%"}}>
            {/* <br/>
                {searchBar} */}
            <br/>
                {filters}
                <br/>
                <div className="row">
                    <div className="col-md-4">
                          {lefBar}
                    </div>
                    <div className="col-md-8">
                          {initialRightBar}
                      </div>
                    <br/> 
                </div>
        </div>
  )
}else if( this.state.isLogin === true && curSelectedJob !== ""){
  return (
    <div style={{marginRight:"10%", marginLeft: "10%"}}>
    {/* <br/>
        {searchBar} */}
    <br/>
        {filters}
        <br/>
        <div className="row">
            <div className="col-md-4">
                  {lefBar}
            </div>
            <div className="col-md-8">
            <div className="ui items" id="rightBarScroll">
            
              <div className="ui fluid" id="jobItemId" style={{margin: "auto", padding: "25px", background: "white" , fontSize: "24px"}}>
                  <div className="image header">
                 
                    <div className="line"><h3><b>{renderdata[curSelectedJob].title}</b></h3></div>
                    <div className="line"><h4>{renderdata[curSelectedJob].name} , {renderdata[curSelectedJob].location}</h4></div>
                    <div className="line"> {renderdata[curSelectedJob].job_type}</div>
                    
                  </div>
                  <br/>
                  <div className="paragraph">
                  <div className="row" style={{border: "0.03em solid rgb(245, 242, 242)"}}>
                  <div className="col-md-10"></div>
                  <div className="row" style={{margin: "5px", width: "100%", background:"rgb(245, 242, 242)" }}>
                      <div className="col-md-9" style={{margin:"5px"}}>
                            <h4>Application closes on</h4>
                      </div>
                      {/* <div className="col-md-1"></div> */}
                      <div className="col-md-3" style={{ maxWidth:"23%"}}>
                            <div className="large ui green button" style={{float:"right", marginRight:"-18px"}} data-profile_pic={renderdata[curSelectedJob].profile_pic} data-title={renderdata[curSelectedJob].title}  data-job_id={renderdata[curSelectedJob].job_id} data-name={renderdata[curSelectedJob].name} onClick={this.applied} >
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
  applyJob : PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  searchJobType: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  jobDetails: state.Handshake_User_Info.jobDetails,
  message: state.Handshake_User_Info.message,
  error : state.Handshake_User_Info.error
})

export default connect(mapStateToProps, {fetchDashboard, applyJob, searchJobType})(JobBoard);


