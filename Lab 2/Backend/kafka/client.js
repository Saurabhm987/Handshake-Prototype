var rpc = new (require('./kafkarpc'))();

//make request to kafka
/*  require 
    queue_name = topic_name
    msg_payload = req.body
    callback = console.log(response)
*/
function make_request(queue_name, msg_payload, callback){
    console.log("kafka handling request....")
    console.log("making rpc calll with payload and topic")
	rpc.makeRequest(queue_name, msg_payload, function(err, response){
		if(err)
			console.error(err);
		else{
			console.log("final_response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;