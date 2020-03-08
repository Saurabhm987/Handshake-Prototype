import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import JobItem from './jobItem';
import Jobs from './jobs';

export default class JobBoard extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      jobData: [],
      isActive:"",
      cardSelected:"",
      sendProps:{}
    }

    this.cardSelect = this.cardSelect.bind(this);
    this.checkSelAnc = this.checkSelAnc.bind(this);

  }

  cardSelect = (e) => {
    e.preventDefault();

    this.setState({
      cardSelected : e.currentTarget.dataset.div_id
    })

    console.log("Selected: ", this.state.cardSelected);
  }

  checkSelAnc = (e) =>{
    e.preventDefault();

    this.setState({
      isActive:"active"
    })

  }


  applied = (e) => {
      e.preventDefault();


  }

  componentDidUpdate(){}

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

  let selJob = this.state.cardSelected;
  const renderdata = this.state.jobData;
  const sendProps = renderdata[selJob];
  console.log("sendProps: ", sendProps);


  if(this.state.isLogin === true){
          return (
            <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
            <br/>
              <div className ="row">
                <div class="ui fluid action input" style={{marginLeft: "3%", marginRight:"5%", width:"100%"}}>
                  <input type="text" placeholder="Search opportunities"/>
                  <div class="ui button">Search</div>
                </div>
              </div>
            <br/>
            <div className="row">
            <div className="col-md-4">

            <div class="ui items">

            { renderdata.map( (item, index) =>
              <div class="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "#F8F8FF", paddingTop: "10px"}}>
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
                  <div className="large ui button" style={{margin: "10px"}} onClick={this.applied} >
                    Apply 
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-8">
            <div class="ui items">
              <div>
                {/* {sendProps.job_title} */}
              </div>
              <Jobs  selJob= {selJob}/>
              {/* {displayThis(selJob, renderdata)} */}
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




  // render(){

  //   let renderData  = this.state.jobData;

  //   return(

  //     <div className="container">
  //           <div className ="row">
  //           <br/>
  //           <div class="ui fluid action input" style={{marginLeft: "3%", marginRight:"5%", width:"100%"}}>
  //           <input type="text" placeholder="Search opportunities"/>
  //             <div class="ui button">Search</div>
  //         </div>
  //         </div>
  //         <br/>

  //         <div class="row">
  //           <div class="col-md-3">
  //             <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{marginLeft: "3%", width:"100%"}}>
  //               { renderData.map( item =>
  //                   <a class="nav-link" id={`#${item.job_id}1`} data-toggle="pill" href={`#${item.job_id}`} role="tab" aria-controls="v-pills-home" aria-selected="true" style={{color: "black"}} onClick={this.checkSelAnc}><JobItem  item={item}/></a>
  //               )}
  //             </div>
  //           </div>
                                                                                                                                    
  //           <div class="col-md-9">
  //             <div class="tab-content" id="v-pills-tabContent" >
  //               {renderData.map( item =>
  //                   <div class={`tab-pane fade show ${this.state.isActive}`} id={`${item.job_id}`} role="tabpanel" aria-labelledby={`${item.job_id}1`} ><Jobs item={item} /></div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //   )
  // }
// }




  // const displayThis = ({selJob="", renderdata=""}) =>{

  //   return(
  //   <div class="ui fluid placeholder" id="jobItemId" style={{margin: "auto", padding: "15px" }}>
  //   <div class="image header">
  //     <div class="line">{renderdata[selJob].job_title}<h3></h3></div>
  //     <div class="line"></div>
  //   </div>
  //   <div class="paragraph">
  //     <div class="line"> </div>
  //     <div class="line"></div>
  //     <div class="line"> </div>
  //   </div>
  // </div>
  //   )
  // }
