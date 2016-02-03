
/**
*	Generates table of planets
*/
function genPlanetTable(time,latitude,longitude){

	var temp = {};
	temp.time = time;
	temp.latitude = latitude;
	temp.longitude = longitude;
	
	var obj = new Planet(temp);
	
	//time
	document.getElementById('date').innerHTML = obj.getDate();
	document.getElementById('timeofday').innerHTML = obj.getTime();
	document.getElementById('last').innerHTML = obj.getLAST();
	document.getElementById('last0').innerHTML = obj.getLAST0();
	document.getElementById('d2000').innerHTML = obj.getD2000();
	document.getElementById('jdnp').innerHTML = obj.getJDNP();
	document.getElementById('eot').innerHTML = obj.getEOT();
	
	//geo position
	var geo = obj.getGeo();
	document.getElementById('geolat').innerHTML = geo.latitude;
	document.getElementById('geolong').innerHTML = geo.longitude;
	
	//Sun
	var sun = obj.getSun();
	//output
	document.getElementById('sun-ra').innerHTML = sun.RA;
	document.getElementById('sun-dec').innerHTML = sun.DEC;
	document.getElementById('sun-r').innerHTML = sun.R;
	
	document.getElementById('sun-alt').innerHTML = sun.ALT;
	document.getElementById('sun-az').innerHTML = sun.AZ;
	document.getElementById('sun-ha').innerHTML = sun.HA;
	
	document.getElementById('earth-lonecl').innerHTML = sun.lonecl;
	document.getElementById('earth-latecl').innerHTML = sun.latecl;
	
	//Moon
	var moon = obj.getMoon();
	
	document.getElementById('moon-ra').innerHTML = moon.RA;
	document.getElementById('moon-dec').innerHTML = moon.DEC;
	document.getElementById('moon-dist').innerHTML = moon.R;
	document.getElementById('moon-alt').innerHTML = moon.ALT;
	document.getElementById('moon-az').innerHTML = moon.AZ;
	document.getElementById('moon-ha').innerHTML = moon.HA;
	
	//Mercury
	var mercury = obj.getMercury();
	
	document.getElementById('mercury-ra').innerHTML = mercury.RA;
	document.getElementById('mercury-dec').innerHTML = mercury.DEC;
	document.getElementById('mercury-dist').innerHTML = mercury.R;	//distance from Earth
	document.getElementById('mercury-alt').innerHTML = mercury.ALT;
	document.getElementById('mercury-az').innerHTML = mercury.AZ;
	document.getElementById('mercury-ha').innerHTML = mercury.HA;
	document.getElementById('mercury-r').innerHTML = mercury.r;	//distance from Sun
	document.getElementById('mercury-latecl').innerHTML = mercury.latecl;
	document.getElementById('mercury-lonecl').innerHTML = mercury.lonecl;
	
	var venus = obj.getVenus();
	
	document.getElementById('venus-ra').innerHTML = venus.RA;
	document.getElementById('venus-dec').innerHTML = venus.DEC;
	document.getElementById('venus-dist').innerHTML = venus.R;	//distance from Earth
	document.getElementById('venus-alt').innerHTML = venus.ALT;
	document.getElementById('venus-az').innerHTML = venus.AZ;
	document.getElementById('venus-ha').innerHTML = venus.HA;
	document.getElementById('venus-r').innerHTML = venus.r;	//distance from Sun
	document.getElementById('venus-latecl').innerHTML = venus.latecl;
	document.getElementById('venus-lonecl').innerHTML = venus.lonecl;
	
	var mars = obj.getMars();
	
	document.getElementById('mars-ra').innerHTML = mars.RA;
	document.getElementById('mars-dec').innerHTML = mars.DEC;
	document.getElementById('mars-dist').innerHTML = mars.R;	//distance from Earth
	document.getElementById('mars-alt').innerHTML = mars.ALT;
	document.getElementById('mars-az').innerHTML = mars.AZ;
	document.getElementById('mars-ha').innerHTML = mars.HA;
	document.getElementById('mars-r').innerHTML = mars.r;	//distance from Sun
	document.getElementById('mars-latecl').innerHTML = mars.latecl;
	document.getElementById('mars-lonecl').innerHTML = mars.lonecl;
	
	var jupiter = obj.getJupiter();
	
	document.getElementById('jupiter-ra').innerHTML = jupiter.RA;
	document.getElementById('jupiter-dec').innerHTML = jupiter.DEC;
	document.getElementById('jupiter-dist').innerHTML = jupiter.R;	//distance from Earth
	document.getElementById('jupiter-alt').innerHTML = jupiter.ALT;
	document.getElementById('jupiter-az').innerHTML = jupiter.AZ;
	document.getElementById('jupiter-ha').innerHTML = jupiter.HA;
	document.getElementById('jupiter-r').innerHTML = jupiter.r;	//distance from Sun
	document.getElementById('jupiter-latecl').innerHTML = jupiter.latecl;
	document.getElementById('jupiter-lonecl').innerHTML = jupiter.lonecl;
	
	var saturn = obj.getSaturn();
	
	document.getElementById('saturn-ra').innerHTML = saturn.RA;
	document.getElementById('saturn-dec').innerHTML = saturn.DEC;
	document.getElementById('saturn-dist').innerHTML = saturn.R;	//distance from Earth
	document.getElementById('saturn-alt').innerHTML = saturn.ALT;
	document.getElementById('saturn-az').innerHTML = saturn.AZ;
	document.getElementById('saturn-ha').innerHTML = saturn.HA;
	document.getElementById('saturn-r').innerHTML = saturn.r;	//distance from Sun
	document.getElementById('saturn-latecl').innerHTML = saturn.latecl;
	document.getElementById('saturn-lonecl').innerHTML = saturn.lonecl;
	
	var uranus = obj.getUranus();
	
	document.getElementById('uranus-ra').innerHTML = uranus.RA;
	document.getElementById('uranus-dec').innerHTML = uranus.DEC;
	document.getElementById('uranus-dist').innerHTML = uranus.R;	//distance from Earth
	document.getElementById('uranus-alt').innerHTML = uranus.ALT;
	document.getElementById('uranus-az').innerHTML = uranus.AZ;
	document.getElementById('uranus-ha').innerHTML = uranus.HA;
	document.getElementById('uranus-r').innerHTML = uranus.r;	//distance from Sun
	document.getElementById('uranus-latecl').innerHTML = uranus.latecl;
	document.getElementById('uranus-lonecl').innerHTML = uranus.lonecl;
	
	var neptune = obj.getNeptune();
	
	document.getElementById('neptune-ra').innerHTML = neptune.RA;
	document.getElementById('neptune-dec').innerHTML = neptune.DEC;
	document.getElementById('neptune-dist').innerHTML = neptune.R;	//distance from Earth
	document.getElementById('neptune-alt').innerHTML = neptune.ALT;
	document.getElementById('neptune-az').innerHTML = neptune.AZ;
	document.getElementById('neptune-ha').innerHTML = neptune.HA;
	document.getElementById('neptune-r').innerHTML = neptune.r;	//distance from Sun
	document.getElementById('neptune-latecl').innerHTML = neptune.latecl;
	document.getElementById('neptune-lonecl').innerHTML = neptune.lonecl;
}	

/**
*	Generates HTML skeleton for monthly view
*/
function genMonthlyBase(body,time){
	var year = time.getFullYear();
	var mNum = time.getMonth();
	
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	var html = '<h3 class="text-center" id="ephem-name">' + body + ' Ephemeris for ' + monthNames[mNum] + ' ' + year + '</h3>';
	
	html += '<table class="table table-condensed table-striped">\
					<caption> Ephemeris data for one month</caption>\
					<thead>\
						<tr>\
							<th>Date</th>\
							<th>RA</th>\
							<th>DEC</th>\
							<th>Dist.</th>';
	switch(body){
		case 'sun':
			html += '<th>EOT</th>';
		break;
		
		default:
			html += '<th>Phase</th><th>Il.frac. %</th><th>Mag.</th>';
		break;
	}
							
	html +=	'<th>Rise</th>\
							<th>Set</th>\
							<th>Transit</th>\
						</tr>\
					</thead>\
					<tbody id="monthly-placeholder">\
\
					</tbody>\
				</table>';
				
	document.getElementById('placeholder').innerHTML = html;
	
	//modify time controls
	var html = '<button class="btn btn-primary" id="btn-now">Now</button>\
	<button class="btn btn-primary" id="btn-minus-month">-1 mo</button>\
	<button class="btn btn-primary" id="btn-plus-month">+1 mo</button>\
	<button class="btn btn-primary" id="btn-minus-year">-1 yr</button>\
	<button class="btn btn-primary" id="btn-plus-year">+1 yr</button>';
	
	document.getElementById('time-button-controls').innerHTML = html;
}

/*
*	Displays monthly data for given object
*/
function genMonthly(planet){
	
	//get time and geo location
	var temp = {}
	temp.time = cookieGetTime();
	temp.latitude = getCookie('latitude');
	temp.longitude = getCookie('longitude');
	
	//return to the first of the month, set time to midnight
	temp.time.setSeconds(0);
	temp.time.setMinutes(0);
	temp.time.setHours(0);
	
	temp.time.setDate(1);
	
	//switch object
	switch(planet){
		case 'sun':
			genMonthlyBase('sun', temp.time);
			// monthlySun(temp);
		break;
		
		case 'moon':
			genMonthlyBase('moon', temp.time);
			//console.log('monthly ',temp.time);
		break;
		
		case 'mercury':
			genMonthlyBase('mercury', temp.time);	//this function needs planet name in order to display it
		break;
		
		case 'venus':
			genMonthlyBase('venus', temp.time);
		break;
		
		case 'mars':
			genMonthlyBase('mars', temp.time);
		break;
		
		case 'jupiter':
			genMonthlyBase('jupiter', temp.time);
		break;
		
		case 'saturn':
			genMonthlyBase('saturn', temp.time);
		break;
		
		case 'uranus':
			genMonthlyBase('uranus', temp.time);
		break;
		
		case 'neptune':
			genMonthlyBase('neptune', temp.time);
		break;
	}
	
	bindTimeEvents();
	
	//iterate over each day
	
	var month = temp.time.getMonth()
	var check = month; //temp assignment
	var html = ''; //init
	var day = temp.time.getDate();
	
	//ensure correct number of days in each month
	while (check == month){
		
		// var body = new Planet(temp);
		switch(planet){
			case 'sun':
				// genMonthlyBase('sun');
				html += dailySun(temp,day);
			break;
			
			case 'moon':
				html += dailyMoon(temp,day);
			break;
			
			case 'mercury':
				html += dailyPlanet('mercury',temp,day);
			break;
			
			case 'venus':
				html += dailyPlanet('venus',temp,day);
			break;
			
			case 'mars':
				html += dailyPlanet('mars',temp,day);
			break;
			
			case 'jupiter':
				html += dailyPlanet('jupiter',temp,day);
			break;
			
			case 'saturn':
				html += dailyPlanet('saturn',temp,day);
			break;
			
			case 'uranus':
				html += dailyPlanet('uranus',temp,day);
			break;
			
			case 'neptune':
				html += dailyPlanet('neptune',temp,day);
			break;
		}		
		
		
		//increment day, check month
		day++;
		temp.time.setDate(day);
		check = temp.time.getMonth();
	}
	
	document.getElementById('monthly-placeholder').innerHTML = html;
	
	// var obj = new Planet(temp);
}

/**
*	Generates daily data for Sun
*/
function dailySun(obj,day){

	var body = new Planet(obj);
	var sun = body.getSun();
	
	var r = '<tr><td>' + day + '</td><td>' + sun.RA + '</td><td>' + sun.DEC + '</td><td>' + sun.R + '</td><td>' + body.getEOT() + '</td><td>' + sun.rise + '</td><td>' + sun.set + '</td><td>' + sun.transit + '</td></tr>';
	
	return r;
}

/**
*	Daily data for Moon
*/
function dailyMoon(obj,day){
	var body = new Planet(obj);
	var moon = body.getMoon();
	
	var r = '<tr><td>' + day + '</td><td>' + moon.RA + '</td><td>' + moon.DEC + '</td><td>' + moon.R + '</td><td>' + '--' + '</td><td>' + '-' + '</td><td>' + '-' + '</td><td>' + moon.RTS.rise + '</td><td>' + moon.RTS.set + '</td><td>' + moon.RTS.transit + '</td></tr>';
	
	return r;
}

/**
*	Daily data for planets
*/
function dailyPlanet(planet,obj,day){
	//obj is time/location object
	var body = new Planet(obj);
	
	switch (planet){
		case 'mercury':
			var planet = body.getMercury();
		break;
		
		case 'venus':
			var planet = body.getVenus();
		break;
		
		case 'mars':
			var planet = body.getMars();
		break;
		
		case 'jupiter':
			var planet = body.getJupiter();
		break;
		
		case 'saturn':
			var planet = body.getSaturn();
		break;
		
		case 'uranus':
			var planet = body.getUranus();
		break;
		
		case 'neptune':
			var planet = body.getNeptune();
		break;
	}

	var r = '<tr><td>' + day + '</td><td>' + planet.RA + '</td><td>' + planet.DEC + '</td><td>' + planet.R + '</td><td>' + planet.i + '</td><td>' + planet.k + '</td><td>' + planet.mag + '</td><td>' + planet.RTS.rise + '</td><td>' + planet.RTS.set + '</td><td>' + planet.RTS.transit + '</td></tr>';
	
	return r;
}
