import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class JobBoard extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      jobData: [],
      cardSelected:"",
      appliedJobId:"",
      appliedCompany:""
    }

    this.cardSelect = this.cardSelect.bind(this);
    this.applied = this.applied.bind(this);

  }

  cardSelect = (e) => {
    e.preventDefault();

    this.setState({
      cardSelected : e.currentTarget.dataset.div_id
    })
  }

componentDidUpdate() {}


sendData = async () => {
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!");
        }

        console.log( "appliedJobId", this.state.appliedJobId);
        console.log("company",  this.state.appliedCompany);

        await axios.post("http://localhost:3001/applyJob",{
          params:{
            id: this.state.appliedJobId,
            company: this.state.appliedCompany
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
                    // console.log("jobBoard_jobData: ", this.state.jobData);
                }else{
                    console.log("ERROR");
                }
            })
}

  applied = async (e) => {
      
        this.setState({
          appliedJobId: e.currentTarget.dataset.selected_job_id,
          appliedCompany: e.currentTarget.dataset.company_name
      }, () => {
        this.sendData();
      })  
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

  let curSelectedJob = this.state.cardSelected;
  console.log("curSelectedJob: ", curSelectedJob);
  let renderdata ={};
  renderdata = this.state.jobData;
  let isav = 0;

  let searchBar = (
    <div className ="row">
              <div class="ui fluid action input" style={{marginLeft: "1.5%", marginRight:"1.5%", width:"100%"}}>
                  <input type="text" placeholder="Search opportunities"/>
                  <div class="ui button">Search</div>
              </div>
      </div>
  )

  let lefBar = (

    <div class="ui items">
        { renderdata.map( (item, index) =>
          <div class="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", paddingTop: "10px"}}>
            <div class="image">￼
              <img src="/images/wireframe/image.png"/>
            </div>
            <div class="content" style={{paddingLeft: "0%"}}>
            <div className="header" id="cardHover"> {item.job_title}</div>
              {/* <a class="header">{item.job_title}</a> */}
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
              {/* <div className="large ui button" style={{margin: "10px"}} data-job={item.job_id} data-company_name={item.company_name} onClick={this.applied} >
                Apply 
            </div> */}
            </div>
          </div>
        )}
  </div>
  )

//  let  selectedJob = (
//           <div class="ui items">
//               <div class="ui fluid placeholder" id="jobItemId" style={{margin: "auto", padding: "15px" }}>
//                   <div class="image header">
//                     <div class="line"><h3>{renderdata[0].job_title}</h3></div>
//                     <div class="line">{renderdata[0].company_name} {renderdata[0].job_loc}</div>
//                   </div>
//                   <div class="paragraph">
//                     <div class="line"> {renderdata[0].job_salary}</div>
//                     <div class="line">{renderdata[0].job_post_date}</div>
//                     <div class="line"> {renderdata[0].job_type}</div>
//                   </div>
//                 </div>              
//           </div>
//  )

  if(this.state.isLogin === true && curSelectedJob === "" && renderdata !== {}){
          return (
            <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
            <br/>
                {searchBar}
            <br/>
                <div className="row">
                    <div className="col-md-4">
                          {lefBar}
                    </div>
                    <div className="col-md-8">
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
        <div className="row">
            <div className="col-md-4">
                  {lefBar}
            </div>
            <div className="col-md-8">
            <div class="ui items">
            
              <div class="ui fluid" id="jobItemId" style={{margin: "auto", padding: "25px", background: "white" , fontSize: "24px"}}>
                  <div class="image header">
                    <br/>
                    <div class="line"><h3>{renderdata[curSelectedJob].job_title}</h3></div>
                    <div class="line">{renderdata[curSelectedJob].company_name} {renderdata[curSelectedJob].job_loc}</div>
                  </div>
                  <div class="paragraph">
                    <div class="line"> {renderdata[curSelectedJob].job_salary}</div>
                    <div class="line">{renderdata[curSelectedJob].job_post_date}</div>
                    <div class="line"> {renderdata[curSelectedJob].job_type}</div>
                  </div>
                  <div className="large ui button" style={{margin: "10px"}} data-selected_job_id={renderdata[curSelectedJob].job_id} data-company_name={renderdata[curSelectedJob].company_name} onClick={this.applied} >
                       Apply 
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




  // const displayThis = ({curSelectedJob="", renderdata=""}) =>{

  //   return(
  //   <div class="ui fluid placeholder" id="jobItemId" style={{margin: "auto", padding: "15px" }}>
  //   <div class="image header">
  //     <div class="line">{renderdata[curSelectedJob].job_title}<h3></h3></div>
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
