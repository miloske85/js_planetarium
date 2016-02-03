

//==============================================================================
//	Params
//==============================================================================

//==============================================================================
//	Constants
//==============================================================================


//==============================================================================
//	Functions
//==============================================================================

/**
*	Table for displaying individual star data
*/
function genTimeTable(obj){
	var html = '<h4>&nbsp;</h4><table class="table table-stripped"><caption>Time and location</caption><thead><tr><th>Property</th><th>Value</th><th>Unit</th></tr></thead><tbody>';
	
	html += '<tr><td>Date</td><td>' + obj.date + '</td><td></td></tr>';
	html += '<tr><td>Time</td><td>' + obj.time + '</td><td>h</td></tr>';
	html += '<tr><td>LAST</td><td>' + obj.LAST + '</td><td>h</td></tr>';
	html += '<tr><td>Latitude</td><td>' + obj.latitude + '</td><td></td></tr>';
	html += '<tr><td>Longitude</td><td>' + obj.longitude + '</td><td></td></tr>';
	
	html += '</tbody></table>';
	
	document.getElementById('star-time').innerHTML = html;
}

/**
*	Main table generator for stars
*/
function genStarTable(time,latitude,longitude){

	var runOnce = 1;

	var html = '<table class="table table-stripped"><thead><tr><th>Name</th><th>Constellation</th><th>Altitude</th><th>Azimuth</th><th>Right A.</th><th>Declination</th></tr></thead><tbody>';

	var len = stars.length;
	for (var i=0;i<len;i++){
		var obj = stars[i];	//temp object
		
		if(obj.display == true){
			
			obj.time = time;
			obj.latitude = latitude;
			obj.longitude = longitude;

			var temp = new Star(obj);
			
			//display time, run this only once
			if(runOnce){

				var t = temp.getGeo();
				t.date = temp.getDate();
				t.time = temp.getTime();
				t.LAST = temp.getLAST();
				
				genTimeTable(t);
				runOnce = 0;
			}

			html += '<tr>';

			var name = temp.getName();
			html += '<td class="star" id="'+ name.toLowerCase() + '">' + name + '</td>';
			
			html += '<td>' + temp.getConstellation() + '</td>';
			html += '<td>' + temp.getALT() + '</td>';
			html += '<td>' + temp.getAZ() + '</td>';
			html += '<td>' + temp.getRA() + '</td>';
			html += '<td>' + temp.getDEC() + "</td></tr>\n";
		}
	}
	
	html += '</tbody></table>';

	document.getElementById('script-output').innerHTML = html;

}

/**
*	List of stars (buttons)
*/
function genStarList(){
	var html = '';

	var len = stars.length;
	for(var i=0;i<len;i++){
		var obj = stars[i];
		
		// html += '<a href="#" class="star-button btn btn-primary btn-xs" id="star-' + i + '">' + obj.name + '</a>' + " \n"; 
		html += '<span class="star-button"><button class="btn btn-primary btn-xs" id="star-' + i + '">' + obj.name + '</button></span>' + " \n"; 
	}

	document.getElementById('star-list').innerHTML = html;
}

//Star Controls
function processStarList(){

	var starList = document.getElementsByClassName('star-button');
	var len = starList.length;

	for (var i=0;i<len;i++){
		starList[i].onclick = function starDisplay(){
			// var starName = this.innerText;
			genStarDetail(this.innerText);
		}
	}
}

/**
*	Displays detailed view for given star
*/
function genStarDetail(starName){
	
	var len = stars.length;
	
	for(var i=0;i<len;i++){
		var obj = stars[i];

		if(obj.name == starName){
			// obj.time = new Date;
			obj.time = cookieGetTime('time');
			obj.latitude = getCookie('latitude');
			obj.longitude = getCookie('longitude');
			var star = new Star(obj);
			var RTS = star.getRTS();

			//generate output
			var html = '';
			
			html += '<h4>Name: <span id="star-detail">' + star.getName() + "</span></h4>\n";
			html += '<table class="table table-bordered table-stripped">';
			html += '<tr><td>Constellation</td><td>' + star.getConstellation() + "</td></tr>\n";
			html += '<tr><td>Altitude</td><td>' + star.getALT() + "</td></tr>\n";
			html += '<tr><td>Azimuth</td><td>' + star.getAZ() + "</td></tr>\n";
			html += '<tr><td>Hour Angle</td><td>' + star.getHA() + "</td></tr>\n";
			html += '<tr><td>Right Ascension</td><td>' + star.getRA() + "</td></tr>\n";
			html += '<tr><td>Declination</td><td>' + star.getDEC() + "</td></tr>\n";
			html += '<tr><td>Stellar Class</td><td>' + star.getStarClass() + "</td></tr>\n";
			html += '<tr><td>Magnitude</td><td>' + star.getMag() + "</td></tr>\n";
			html += '<tr><td>Rise</td><td>' + RTS.R + "</td></tr>\n";
			html += '<tr><td>Transit</td><td>' + RTS.T + "</td></tr>\n";
			html += '<tr><td>Set</td><td>' + RTS.S + "</td></tr>\n";
			
			html += '</table>';
			
			document.getElementById('script-output').innerHTML = html;
			
			//generate output for time table
			obj.LAST = star.getLAST();
			obj.date = star.getDate();
			obj.time = star.getTime();
			obj.latitude = star.getGeo().latitude;
			obj.longitude = star.getGeo().longitude;
			genTimeTable(obj);
		}		
	}
}
