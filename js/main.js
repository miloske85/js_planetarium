/**
*	"Main" file
*
*	This is Javascript implementation of various astronomical formulae
*	by Jean Meeus (Astronomical Algorithms, second edition) and
*	by Paul Schlyter (http://stjarnhimlen.se/)
*
*	@author Milos Milutinovic - milos.milutinovic@live.com
*
*	Note: This project is still in early development, unit tests cover
*	very small fraction of code, over-simplified formulae by Schlyter
*	have low accuracy and calculations of Rise/Set/Transit times for the
*	Moon and physical ephemeris for inner planets are buggy
*/

"use strict"

//defaults
var time = new Date;
var latitude = 43.92;
var longitude = 22.30;


	/**
	*	Invoked once at the start to generate skeleton HTML
	*/
function genPlanetsBase(){

	document.getElementsByTagName('title')[0].innerText = 'Planets';
	document.getElementById('main-title').innerText = 'PLANETS';
		
	var html = '<div class="row"> \
				<div id="timedata" class="col-md-4 pull-right"> \
					<h2 class="text-center">Time</h2> \
					\
						<table class="table table-striped table-condensed"> \
						<caption>Time and location</caption> \
							<thead> \
								<tr> \
									<th>Property</th> \
									<th>Value</th> \
									<th>Unit</th> \
								</tr> \
							</thead> \
							<tbody> \
								<tr> \
									<td>Date</td> \
									<td id="date"></td> \
									<td></td> \
								</tr> \
								<tr> \
									<td>Time Now</td> \
									<td id="timeofday"></td> \
									<td>H</td> \
								</tr> \
								<tr> \
									<td>LAST</td> \
									<td id="last"></td> \
									<td>H</td> \
								</tr> \
								<tr> \
									<td>LAST0h</td> \
									<td id="last0"></td> \
									<td>H</td> \
								</tr> \
								<tr> \
									<td>D2000</td> \
									<td id="d2000"></td> \
									<td>days</td> \
								</tr> \
								<tr> \
									<td>JDN</td> \
									<td id="jdnp"></td> \
									<td>days</td> \
								</tr> \
								<tr> \
									<td>EOT</td> \
									<td id="eot"></td> \
									<td>minutes</td> \
								</tr> \
								<tr> \
									<td>Latitude</td> \
									<td id="geolat"></td> \
									<td></td> \
								</tr> \
								<tr> \
									<td>Longitude</td> \
									<td id="geolong"></td> \
									<td></td> \
								</tr> \
							</tbody> \
						</table> \
						 \
						<p>EOT - positive values - solar noon before civil.</p> \
						 \
						<div> \
							 \
						</div> \
					 \
				</div> \
				<div class="clearfix visible-xs"></div> \
				<div class="col-md-8"> \
				<h2 class="text-center">Planets</h2> \
				 \
					<table class="table table-condensed table-striped"> \
						<caption>Positions of the Sun, Moon and planets</caption> \
						<thead> \
							<tr> \
								<th>Property</th> \
								<th><a href="#" id="monthly-sun">Sun</a></th> \
								<th><a href="#" id="monthly-moon">Moon</a></th> \
								<th><a href="#" id="monthly-mercury">Mercury</a></th> \
								<th><a href="#" id="monthly-venus">Venus</a></th> \
								<th><a href="#" id="monthly-mars">Mars</a></th> \
								<th>Unit</th> \
							</tr> \
						</thead> \
						<tbody> \
							<tr> \
								<td>RA</td> \
								<td id="sun-ra"></td> \
								<td id="moon-ra"></td> \
								<td id="mercury-ra"></td> \
								<td id="venus-ra"></td> \
								<td id="mars-ra"></td> \
								<td>h</td> \
							</tr> \
							<tr> \
								<td>DEC</td> \
								<td id="sun-dec"></td> \
								<td id="moon-dec"></td> \
								<td id="mercury-dec"></td> \
								<td id="venus-dec"></td> \
								<td id="mars-dec"></td> \
								<td>deg.</td> \
							</tr> \
							<tr> \
								<td>Dist.</td> \
								<td id="sun-r"></td> \
								<td id="moon-dist"></td> \
								<td id="mercury-dist"></td> \
								<td id="venus-dist"></td> \
								<td id="mars-dist"></td> \
								<td>AU</td> \
							</tr> \
							<tr> \
								<td>ALT</td> \
								<td id="sun-alt"></td> \
								<td id="moon-alt"></td> \
								<td id="mercury-alt"></td> \
								<td id="venus-alt"></td> \
								<td id="mars-alt"></td> \
								<td>deg.</td> \
							</tr> \
							<tr> \
								<td>AZ</td> \
								<td id="sun-az"></td> \
								<td id="moon-az"></td> \
								<td id="mercury-az"></td> \
								<td id="venus-az"></td> \
								<td id="mars-az"></td> \
								<td>deg.</td> \
							</tr>	 \
							<tr> \
								<td>HA</td> \
								<td id="sun-ha"></td> \
								<td id="moon-ha"></td> \
								<td id="mercury-ha"></td> \
								<td id="venus-ha"></td> \
								<td id="mars-ha"></td> \
								<td>h</td> \
							</tr> \
							<tr> \
								<td>Sun-r</td> \
								<td>-</td> \
								<td></td> \
								<td id="mercury-r"></td> \
								<td id="venus-r"></td> \
								<td id="mars-r"></td> \
								<td>AU</td> \
							</tr> \
							<tr> \
								<td>Ecl.Lon.</td> \
								<td id="earth-lonecl"></td> \
								<td></td> \
								<td id="mercury-lonecl"></td> \
								<td id="venus-lonecl"></td> \
								<td id="mars-lonecl"></td> \
								<td>deg.</td> \
							</tr> \
							<tr> \
								<td>Ecl.Lat.</td> \
								<td id="earth-latecl"></td> \
								<td></td> \
								<td id="mercury-latecl"></td> \
								<td id="venus-latecl"></td> \
								<td id="mars-latecl"></td> \
								<td>deg.</td> \
							</tr>							 \
						</tbody> \
					</table> \
								 \
				 \
					<table class="table table-striped table-condensed"> \
						<caption>Outer Planets</caption> \
						<thead> \
							<tr> \
								<th>Property</th> \
								<th><a href="#" id="monthly-jupiter">Jupiter</a></th> \
								<th><a href="#" id="monthly-saturn">Saturn</a></th> \
								<th><a href="#" id="monthly-uranus">Uranus</a></th> \
								<th><a href="#" id="monthly-neptune">Neptune</a></th> \
								<th>Unit</th> \
							</tr> \
						</thead> \
						<tbody> \
							<tr> \
								<td>RA</td> \
								<td id="jupiter-ra"></td> \
								<td id="saturn-ra"></td> \
								<td id="uranus-ra"></td> \
								<td id="neptune-ra"></td> \
								<td>h</td> \
							</tr> \
							<tr> \
								<td>DEC</td> \
								<td id="jupiter-dec"></td> \
								<td id="saturn-dec"></td> \
								<td id="uranus-dec"></td> \
								<td id="neptune-dec"></td> \
								<td>deg.</td> \
							</tr> \
							<tr> \
								<td>Dist.</td> \
								<td id="jupiter-dist"></td> \
								<td id="saturn-dist"></td> \
								<td id="uranus-dist"></td> \
								<td id="neptune-dist"></td> \
								<td>AU</td> \
							</tr> \
							<tr> \
								<td>ALT</td> \
								<td id="jupiter-alt"></td> \
								<td id="saturn-alt"></td> \
								<td id="uranus-alt"></td> \
								<td id="neptune-alt"></td> \
								<td>deg.</td> \
							</tr> \
							<tr> \
								<td>AZ</td> \
								<td id="jupiter-az"></td> \
								<td id="saturn-az"></td> \
								<td id="uranus-az"></td> \
								<td id="neptune-az"></td> \
								<td>deg.</td> \
							</tr>	 \
							<tr> \
								<td>HA</td> \
								<td id="jupiter-ha"></td> \
								<td id="saturn-ha"></td> \
								<td id="uranus-ha"></td> \
								<td id="neptune-ha"></td> \
								<td>h</td> \
							</tr> \
							<tr> \
								<td>Sun-r</td> \
								<td id="jupiter-r"></td> \
								<td id="saturn-r"></td> \
								<td id="uranus-r"></td> \
								<td id="neptune-r"></td> \
								<td>AU</td> \
							</tr> \
							<tr> \
								<td>Ecl.Lon.</td> \
								<td id="jupiter-lonecl"></td> \
								<td id="saturn-lonecl"></td> \
								<td id="uranus-lonecl"></td> \
								<td id="neptune-lonecl"></td> \
								<td>deg.</td> \
							</tr> \
							<tr> \
								<td>Ecl.Lat.</td> \
								<td id="jupiter-latecl"></td> \
								<td id="saturn-latecl"></td> \
								<td id="uranus-latecl"></td> \
								<td id="neptune-latecl"></td> \
								<td>deg.</td> \
							</tr>							 \
						</tbody> \
					</table> \
			 \
				</div><!--col8--> \
 \
			</div>';
	
	document.getElementById('placeholder').innerHTML = html;
	restoreTimeControls();
	
	//monthly tables
	document.getElementById('monthly-sun').onclick = function(){
		genMonthly('sun');
	}
	
	document.getElementById('monthly-moon').onclick = function(){
		genMonthly('moon');
	}
	
	document.getElementById('monthly-mercury').onclick = function(){
		genMonthly('mercury');
	}
	
	document.getElementById('monthly-venus').onclick = function(){
		genMonthly('venus');
	}
	
	document.getElementById('monthly-mars').onclick = function(){
		genMonthly('mars');
	}
	
	document.getElementById('monthly-jupiter').onclick = function(){
		genMonthly('jupiter');
	}
	
	document.getElementById('monthly-saturn').onclick = function(){
		genMonthly('saturn');
	}
	
	document.getElementById('monthly-uranus').onclick = function(){
		genMonthly('uranus');
	}
	
	document.getElementById('monthly-neptune').onclick = function(){
		genMonthly('neptune');
	}

}

	/**
	*	Invoked once at the start to generate skeleton HTML
	*/
function genStarsBase(){
	
	document.getElementsByTagName('title')[0].innerText = 'Stars';
	document.getElementById('main-title').innerText = 'STARS';
	
	var html = '<div class="row"> \
            <div class="col-md-8"> \
                <h3 class="text-center"></h3> \
                <h3>&nbsp;</h3> \
                <div id="time-display"></div> \
                <h5>&nbsp;</h5> \
				<div id="script-output"></div> \
            </div> \
            <div class="col-md-4"> \
				<div id="star-time"></div> \
				<h3 class="text-center">List:</h3> \
				<h3>&nbsp;</h3> \
				<div id="star-list"></div> \
            </div> \
        </div>';
	
	document.getElementById('placeholder').innerHTML = html;
	restoreTimeControls();
}

	/**
	*	Restores time controls to original, after being changed for monthly views
	*/
function restoreTimeControls(){
	var html = '<button class="btn btn-primary" id="btn-now">Now</button>\
						<button class="btn btn-primary" id="btn-minus-hour">-1h</button>\
						<button class="btn btn-primary" id="btn-plus-hour">+1h</button>\
						<button class="btn btn-primary" id="btn-minus-day">-1d</button>\
						<button class="btn btn-primary" id="btn-plus-day">+1d</button>\
						<button class="btn btn-primary" id="btn-minus-month">-1 mo</button>\
						<button class="btn btn-primary" id="btn-plus-month">+1 mo</button>';
						
	document.getElementById('time-button-controls').innerHTML = html;
}

genPlanetsBase();

//switch between planets and stars
document.getElementById('btn-planets').onclick = function(){
	genPlanetsBase();
	var time = cookieGetTime();
	
	var latitude = getCookie('latitude');
	var longitude = getCookie('longitude');
	
	genPlanetTable(time,latitude,longitude);
	bindTimeEvents();
}

document.getElementById('btn-stars').onclick = function(){
	genStarsBase();	//html base
	var time = cookieGetTime();
	
	var latitude = getCookie('latitude');
	var longitude = getCookie('longitude');
	
	genStarTable(time,latitude,longitude);	//numerical data
	genStarList();	//list of stars
	processStarList();	//adds event listeners
	
	bindTimeEvents();
}

/**
*	Time controls
*/
function bindTimeEvents(){

	document.getElementById('btn-now').onclick = function btnNow(){
		var t = new Date;
		setCookie('time',t);
		trigger(t);
	}
	
	var minusHourBtn = document.getElementById('btn-minus-hour');
	if(minusHourBtn){
		minusHourBtn.onclick = function btnMinusHour(){
			var t = cookieSetTime(-3.6e6);
			trigger(t);
		}
	}
	
	var plusHourBtn = document.getElementById('btn-plus-hour');
	if(plusHourBtn){
		plusHourBtn.onclick = function btnPlusHour(){
			var t = cookieSetTime(3.6e6);
			trigger(t);
		}
	}

	var minusDayBtn = document.getElementById('btn-minus-day');
	if(minusDayBtn){
		minusDayBtn.onclick = function btnMinusDay(){
			var t = cookieSetTime(-8.64e7);
			trigger(t);
		}
	}

	var plusDayBtn = document.getElementById('btn-plus-day');
	if(plusDayBtn){
		plusDayBtn.onclick = function btnPlusDay(){
			var t = cookieSetTime(8.64e7);
			trigger(t);
		}
	}

	document.getElementById('btn-minus-month').onclick = function btnMinusMonth(){
		jumpMonth(-1);
	}

	document.getElementById('btn-plus-month').onclick = function btnPlusMonth(){
		jumpMonth(1);
	}
	
	var minusYearBtn = document.getElementById('btn-minus-year');
	if(minusYearBtn){
		minusYearBtn.onclick = function btnMinusYear(){
			jumpYear(-1);
		}
	}
	
	var plusYearBtn = document.getElementById('btn-plus-year');
	if(plusYearBtn){
		plusYearBtn.onclick = function btnPlusYear(){
			jumpYear(1);
		}
	}
	
	var timeForm = document.getElementById('time-form');

	/**
	*	Set time to new value, either use cookie time (if present) or current time
	*/
	timeForm.onsubmit = function timeJump(){
		//set time to cookie time
		var time = new Date;
		var ct = getCookie('time');
		time.setTime(ct);
		
		//jump to given time
		var year = document.getElementById('year-input').value;
		var month = document.getElementById('month-input').value;
		var date = document.getElementById('date-input').value;
		var hour = document.getElementById('hour-input').value;
		var minute = document.getElementById('minute-input').value;
		var second = document.getElementById('second-input').value;
		
		//if fields are set, set date to given value, if not it stays default (current date)
		if(year && !isNaN(year)) time.setFullYear(year);
		if(month && !isNaN(month)) time.setMonth(month);
		if(date && !isNaN(date)) time.setDate(date);
		if(hour && !isNaN(hour)) time.setHours(hour);
		if(minute && !isNaN(minute)) time.setMinutes(minute);
		if(second && !isNaN(second)) time.setSeconds(second);
		
		setCookie('time', time);
		trigger(time);	
	}

}

/**
*	Triggers calculations
*
*	Uses values from cookies if some params are not passed
*
*	@param object time JD Date object
*	@param float latitude Geo Latitude in dec. format
*	@param float longitude Geo Longitude in dec. format
*/
function trigger(time,latitude,longitude){
	
	//if some values are not given, search cookies, then use defaults
	
	if(!time || isNaN(time.getFullYear())){
		var temp = new Date;
		var ct = getCookie('time');
		if(!ct || isNaN(ct)){
			time = new Date;
		}
		else{
			time = new Date;
			time.setTime(ct);
		}
	}
	
	if(!latitude || isNaN(latitude)){
		latitude = getCookie('latitude');
		if(!latitude || isNaN(latitude)){
			latitude = window.latitude;
		}
	}
	
	if(!longitude || isNaN(longitude)){
		longitude = getCookie('longitude');
		if(!longitude || isNaN(longitude)){
			longitude = window.longitude;
		}
	}

	var title = document.getElementById('main-title').innerText.toLowerCase();

	if(title == 'planets'){
		var monthly = document.getElementById('ephem-name');
		if(monthly){
			//working with monthly table
			//get name of the planet
			var title = monthly.innerText;
			var pos = title.indexOf(' ');
			var name = title.substr(0,pos).toLowerCase();
			
			//trigger monthly table
			genMonthly(name);
		}
		else{
			//working with current time table
			genPlanetTable(time,latitude,longitude);
		}
	}
	else if(title == 'stars'){
		var details = document.getElementById('star-detail');
		
		if(details){
			//work with details table
			var name = details.innerText;
			genStarDetail(name);
		}
		else{
			//work with stars table
			genStarTable(time,latitude,longitude);
		}	
		
	}
	
	bindTimeEvents();
}

trigger();

(function resetCookie(){

	var ct = getCookie('time');
	if(!ct || isNaN(ct)){
		var time = new Date;
		setCookie('time',time);
	}
	
	// cookie latitude
	var clat = getCookie('latitude');
	if(!clat || isNaN(clat)){
		setCookie('latitude',window.latitude);
	}
	
	//cookie longitude
	var clon = getCookie('longitude');
	if(!clon || isNaN(clon)){
		setCookie('longitude',window.longitude);
	}
})();

//Geographic coordinates
var geoForm = document.getElementById('location-form');

geoForm.onsubmit = function geoJump(){
	var latitude = document.getElementById('latitude-input').value;
	var longitude = document.getElementById('longitude-input').value;
	
	if(latitude && !isNaN(latitude)){
		setCookie('latitude', latitude);
	}
	
	if(longitude && !isNaN(longitude)){
		setCookie('longitude', longitude);
	}
	
	trigger(null, latitude, longitude);
}

//=========================================================
//	Helper functions
//=========================================================

	/**
	*	Make jump in time for given number of months
	*/	
function jumpMonth(step){
	var t = cookieSetTime(0);	//get time from cookie
	var month = t.getMonth() + step;
	t.setMonth(month);
	setCookie('time',t);
	trigger(t);
}

	/**
	*	Make a jump in time for given number of years
	*/
function jumpYear(step){
	var t = cookieSetTime(0);
	var year = t.getFullYear() + step;
	t.setFullYear(year);
	setCookie('time',t);
	trigger(t);
}

/**
*	Prepends '0' to numbers lower than 10
*/
function prependZero(input){
	if(input<10){
		input = '0' + input;
	}
	
	return input;
}

/**
*	Returns Date object from cookie or current time if no cookie
*/
function cookieGetTime(){
	var time = new Date;
	var ct = getCookie('time');
	if(ct && !isNaN(ct)){
		time.setTime(ct);
	}	
	
	return time;
}

/**
*	Sets time to the cookie from given time step in ms
*
*	@param float timeStep - Number of milliseconds
*	@return Date object
*/
function cookieSetTime(timeStep){

	var t = new Date;	//initialize
	var ct = getCookie('time'); //get time value from cookie
	if(ct){
		t.setTime(ct);	//if value is in the cookie, set time to it
	}
	t.setTime(t.getTime() + timeStep);	//set time to given step
	setCookie('time',t);//set cookie to the current time
	return t;
}

//=========================================================
//	Cookie handling functions
//=========================================================

/**
*	Sets a cookie
*
*	@param string Name of cookie
*	@param mixed value
*
*	example setCookie('time',t)
*/
function setCookie(name,value){

	if(name == 'time'){
		value = value.getTime();	//store time as timestamp
	}
	else{
		value = value.toString();
	}
	var maxage = 86400;
	var cookie = name + '=' + value + '; max-age=' + maxage;
	document.cookie = cookie;

}

/**
*	Get specified value from cookie
*
*	@param string
*/
function getCookie(name){
	// var coordinateString;
	var all = document.cookie; //get all cookies in a string
	
	if(all.length != 0){ //if cookie was set
		var list = all.split('; '); //split into name=value pairs

		for (var i = 0; i < list.length; i++){
			var cookie = list[i];
			var p = cookie.indexOf('=');
			var cookieName = cookie.substring(0,p); //the name of the cookie
			var value = cookie.substring(p+1);

			if(cookieName == name){
				// value = decodeURIComponent(value);
				// coordinateString = value;
				return value;
			}

		}
		
		return false;
	}
}