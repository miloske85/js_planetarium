/**
*	Astronomy (parent) class
*/

function Astronomy(time,latitude,longitude){
	
	//************************
	//	Contants
	//************************
	var JDN0 = 2451545;	//calcD2000, calcCent and calcSidereal use hard-coded constant
	
	//************************
	//	Setting variables
	//************************

	//throw errors if params undefined
	if(!isNaN(time.getFullYear())){
		this.time = time;
	}
	else{
		throw new Error('Time not passed to Astronomy');
	}

	if(!isNaN(latitude)){
		this.latitude = latitude;
	}
	else{
		throw new Error('Latitude not passed to Astronomy');
	}
	
	if(!isNaN(longitude)){
		this.longitude = longitude;
	}
	else{
		throw new Error('Longitude not passed to Astronomy');
	}
	
	
}


	/**
	*	Calculates Rise/Transit/Set times
	*/
Astronomy.prototype.calcRTS = function calcRTS(t,latitude,longitude,body,type){

	var r = {};	//object that will hold times of these events
	var sid = {}; //sidereal times of events
	
	if(type == 'planet' || type == 'star'){
		var h0 = -0.5667;	//because of atmo. ref.
	}
	else if (type == 'sun' || type == 'moon'){
		var h0 = -0.8333;	//rise/set is when upper limb touches the horizon
	}
	else{
		throw new Error('wrong type for calcRTS');
	}
	
	//doing everything for stars now, fixed RA/DEC
	sid.T = body.RA;	//LAST at transit
	
	//turn transit time from sidereal to local time
	var time = Astronomy.prototype.getTimeFromCent(t);	//local time
	var midnightSid = Astronomy.prototype.calcSiderealMnight(time,longitude);	//sidereal time at local midnight

	r.T = Astronomy.prototype.normalizeValue((sid.T - midnightSid), 'h');
	//check if star is circumpolar or unseeable
	if(body.DEC > (90 - latitude)){
		//star is circumpolar
		return r;
	}
	if(body.DEC < (0 - latitude)){
		//star is unseeable
		return false;
	}
	
	//hour angle, testing values before calculating, they may be out of bounds
	var a = Math.sin(Astronomy.prototype.d2r(h0)) - Math.sin(Astronomy.prototype.d2r(latitude))*Math.sin(Astronomy.prototype.d2r(body.DEC));
	var b = Math.cos(Astronomy.prototype.d2r(latitude))*Math.cos(Astronomy.prototype.d2r(body.DEC));
	if(Math.abs(a/b) < 1){
		var HA0 = Astronomy.prototype.r2d(Math.acos(a / b)) / 15;
	}
	else{
		return r;
	}

	sid.R = Astronomy.prototype.normalizeValue(sid.T - HA0,'h');	//sidereal time of rise
	sid.S = Astronomy.prototype.normalizeValue(sid.T + HA0,'h');

	//converting to local times
	r.R = (sid.R - midnightSid);
	r.S = (sid.S - midnightSid);
	
	//if local times are out of bounds set them to false - if an object doesn't rise or set during the current day
	var ycorr = 0, tcorr = 0;
	if(r.R < 0){
		r.yesterday = true;
		ycorr = -1;
	}
	if(r.S > 24 || r.R + 2*HA0 > 24){
		r.tomorrow = true;
		tcorr = 1;
	}
	
	r.R = Astronomy.prototype.normalizeValue(r.R,'h');
	r.S = Astronomy.prototype.normalizeValue(r.S,'h');
	
	//patch in time in centuries
	r.tr = Astronomy.prototype.getCentFromDecimal(t, r.R, ycorr);
	r.tt = Astronomy.prototype.getCentFromDecimal(t, r.T);
	r.ts = Astronomy.prototype.getCentFromDecimal(t, r.S, tcorr);

	return r;
}

//++++++++++++++++++++
//	Time functions
//++++++++++++++++++++

	/**
	*	Calculates Julian Day as a whole number at the noon of the current day
	*
	*	@param JS date object
	*	@return number JDN	
	*/
Astronomy.prototype.calcJDN = function calcJDN(time){

	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	
	var a,m,y,jdn;

	a = Math.floor((14-month)/12);
	m = month + 12*a - 3;
	y = year + 4800 - a;

	jdn = day + Math.floor((153*m+2)/5) + 365*y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045;

	return jdn;
}

	/**
	*	Calculate precise (fractional) JDN
	*
	*	@param JS date object
	*	@return void
	*/
Astronomy.prototype.calcJDNPrec = function calcJDNPrec (time){
	var jdn = this.calcJDN(time); //jdn at noon (UT) of current day
	var jd0 = jdn-0.5; //JDN of midnight (UT)

	var hours = time.getHours();		
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	
	var hoursDecimal = hours + minutes/60 + seconds/3600;
	var tzoff = time.getTimezoneOffset(); //tz offset in negative minutes
	
	var UT = hoursDecimal + tzoff/60; //universal time

	return jd0 + UT/24;
}

	/**
	*	Calculates centuries since J2000 with 1s precision, automatically adjusts for DST, thanks to the calcJDNPrec()	
	*
	*	@param date object
	*	@return float	
	*/
Astronomy.prototype.calcCent = function calcCent(time){
	var jdnP = this.calcJDNPrec(time);

	var T = (jdnP - 2451545)/36525;

	return T;
}

	/**
		@param JS date object
		This function needs to be rewritten from ground up and variables need to be clearly labeled and the code needs to be commented.
		It took half an hour of debugging and some nasty corrections to get it to work accurately.
		
		DO NOT COPY/PASTE INTO OTHER CODE!!
	*/
Astronomy.prototype.calcSidereal = function calcSidereal (time, longitude){

	//convert time
	var hours,minutes,seconds,hoursNow;
	
	//throw errors here
	if(!time || isNaN(time.getFullYear())){
		throw new Error ('time not passed to calcSidereal()');
	}
	if(!longitude && longitude != 0){
		throw new Error ('longitude not passed to calcSidereal()');
	}

	hours = time.getHours();		
	minutes = time.getMinutes();
	seconds = time.getSeconds();

	var tzoff = time.getTimezoneOffset(); //time zone in minutes, negative for east
		
	hoursNow = hours + minutes/60 + seconds/3600;		//time in decimal
	
	//calculate GMST
	var jdn = this.calcJDN(time);
	var GMST, D0, H, T;
	var JD0, D02000, D2000, GAST, LMST, LAST;

	//main calculation
	D0 = jdn - this.JDN0;	//days since 2000-1-1
	JD0 = jdn - 0.5;		//JD at last midnight UT
	H = hoursNow + tzoff/60;		//UT time
	var JDnow = JD0 +  H/24;	//JD now
	// D02000 = JD0 - this.JDN0;	//midnight
	// D2000 = JDnow - this.JDN0;	//moment
	D02000 = JD0 - 2451545;	//midnight
	D2000 = JDnow - 2451545;	//moment

	T = D2000/36525;	//correction for centuries


	
	GMST = 6.697374558 + 0.06570982441908 * D02000 + 1.00273790935 * H + 0.000026 * T * T;

	GMST = this.normalizeValue(GMST, 'h');
	
	//calculate Nutation in RA
	var omega, L, psi, epsilon, D, eqeq;

	epsilon = 23.4393 - 0.0000004 * D2000; //obliquity
	L = 280.47 + 0.98565 * D2000;          //Mean longitude of the Sun
	omega = 125.04 - 0.052954 * D2000;     //Longitude of the ascending node of the Moon

	psi = -0.000319 * Math.sin(this.d2r(omega)) - 0.000024 * Math.sin(this.d2r(2*L));

	eqeq = psi * Math.cos(this.d2r(epsilon));

	GAST = GMST + eqeq;

	//LMST = GMST + longitude/15 + (TZ-1);
	LMST = GMST + longitude/15 + (tzoff/60)+1; //why the hell +1 and why (-1*tzoff/60) doesn't work
	LMST = this.normalizeValue(LMST, 'h');
	
	LAST = LMST + eqeq;

	return LAST;
}

	/**
	*	Calculates sidereal time at local midnight
	*
	*	@param JS Date Object, unmodified
	*/
Astronomy.prototype.calcSiderealMnight = function calcSiderealMnight (time, longitude){
	var midnight = new Date;
	
	midnight.setHours(0);
	midnight.setMinutes(0);
	midnight.setSeconds(0);
	
	midnight.setFullYear(time.getFullYear());
	midnight.setMonth(time.getMonth());
	midnight.setDate(time.getDate());

	var mSid = this.calcSidereal(midnight, longitude);
	return mSid;
}

	/**
	*	Calculates sidereal time at Greenwich at 0h UT
	*
	*	@param float t - Time in centuries since J2000
	*/
Astronomy.prototype.calcSiderealMnightG = function calcSiderealMnightG(t){
	var midnight = this.getUTMidnight(t);
	
	var mSid = this.calcSidereal(midnight, 0);
	return mSid;
	
	
}

	/**
	*	Converts time in centuries J2000 to Javascript date object
	*/
Astronomy.prototype.getTimeFromCent = function getTimeFromCent(t){
	var time = new Date;
	
	//convert T to UNIX timestamp
	var ts = ((t * 36525 + 2451545) - 2440587.5) * 86400;
	ts = Math.round(ts)*1000;

	time.setTime(ts);
	return time;
}

	/**
	*	Calculates time in centuries since J2000 from given time in decimal hours. Uses current date
	*
	*	@param float Time in centuries since J2000
	*	@param float Time in hours
	*	@return float Time in centuries
	*/
Astronomy.prototype.getCentFromDecimal = function getCentFromDecimal(t,hrs,correction){
	
	var time = Astronomy.prototype.getTimeFromCent(t);

	//convert decimal to sexagesimal
	var s = Astronomy.prototype.sexagesimalConv(hrs,'h');
	var t = s.split(':');
	
	time.setHours(  t[0]);
	time.setMinutes(t[1]);
	time.setSeconds(t[2]);
	
	//fix days
	var day = time.getDate();
	if(correction){
		time.setDate(day+correction);
	}

	return Astronomy.prototype.calcCent(time);
}

	/*
	*	Returns time set to midnight UT, for current day (previous midnight), or for current,previous and next day
	*/
Astronomy.prototype.getUTMidnight = function getUTMidnight(t,type){
	var midnight = new Date;	//init
	
	//convert T to UNIX timestamp
	var ts = ((t * 36525 + 2451545) - 2440587.5) * 86400;

	midnight.setTime(ts);
	
	//set to midnight
	midnight.setUTCHours(0);
	midnight.setUTCMinutes(0);	//needed for India,Iran...
	midnight.setUTCSeconds(0);
	
	if(!type){
		return midnight;
	}
	else{
		var obj = {};
		obj.today = Astronomy.prototype.calcCent(midnight);
		
		midnight.setDate(midnight.getDate() - 1);
		obj.yesterday = Astronomy.prototype.calcCent(midnight);
		
		midnight.setDate(midnight.getDate() + 2);
		obj.tomorrow = Astronomy.prototype.calcCent(midnight);
		
		return obj;
	}
}

	/**
		*	Obliquity of the Ecliptic - Earth's tilt
		*
		*	@param float time in centuries since J2000
		*	@return float
	*/
Astronomy.prototype.calcObliquity = function calcObliquity(T){
	var epsilon = 84381.448 - 46.815 * T - 0.00059 * T*T + 0.001813 * T*T*T; //in arc seconds, 10" error over 4000 years, 1" over 2000.
	epsilon /= 3600;

	return epsilon;
}

	/**
		Days since J2000
	*/
Astronomy.prototype.calcD2000 = function calcD2000(time){
	var jdn = this.calcJDN(time);
		jdn++;	//simple hack to avoid writing formula (3.1) from Schlyter
	var d2000 = jdn - 2451545;
	var tzoff = time.getTimezoneOffset();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var seconds = time.getSeconds();
	
	var UT = (hour + minute/60 + seconds/3600) + tzoff/60;
	
	d2000 += UT/24;
	
	return d2000;
}

	/**
	*   Calculates azimuthal position of a given object
	*
	*	@param float Declination [deg]
	*	@param float Latitude [deg]
	*	@param float Hour Angle [hours]
	*	@return object
	*/
Astronomy.prototype.calcAzim = function calcAzim(decl,latt,HA){
	    var pos = {};
	    
	    pos.ALT = Math.asin(Math.sin(Astronomy.prototype.d2r(decl))*Math.sin(Astronomy.prototype.d2r(latt)) + Math.cos(Astronomy.prototype.d2r(decl))*Math.cos(Astronomy.prototype.d2r(latt))*Math.cos(Astronomy.prototype.d2r(HA*15)));
	    pos.ALT = Astronomy.prototype.r2d(pos.ALT);

	    var a = Math.acos((Math.sin(Astronomy.prototype.d2r(decl)) - Math.sin(Astronomy.prototype.d2r(pos.ALT))*Math.sin(Astronomy.prototype.d2r(latt))) / (Math.cos(Astronomy.prototype.d2r(pos.ALT))*Math.cos(Astronomy.prototype.d2r(latt))));
	    a = Astronomy.prototype.r2d(a);

	    if(Math.sin(Astronomy.prototype.d2r(HA*15)) < 0){
	        pos.AZ = a;
	    }
	    else{
	        pos.AZ = 360 - a;
	    }
	    
	    return pos;
	}

//++++++++++++++++++++
//  Utility functions
//++++++++++++++++++++

	/**
	*	Returns formatted time string from given Date object
	*/
Astronomy.prototype.formatTime = function formatTime(t,type){
	var year = t.getFullYear();
	var month = t.getMonth() + 1;
	var date = t.getDate();

	var hour = t.getHours();
	var minute = t.getMinutes();
	var second = t.getSeconds();
	
	function zeroPad(num){
		if(num < 10){
			num = '0' + num;
		}
		return num;
	}
	
	var dt = ['d','date'];
	var tm = ['t','time'];
	
	if(dt.indexOf(type) != -1){
		//get date string
		month = zeroPad(month);
		date = zeroPad(date);
		
		return year + '-' + month + '-' + date;
	}
	else if(tm.indexOf(type) != -1){
		//get time format
		minute = zeroPad(minute);
		second = zeroPad(second);
		
		return hour + ':' + minute + ':' + second;
	}
	else{
		throw new Error('wrong type parameter for formatTime');
	}
}

	/**
	*	Normalizes values in given range, always positive
	*
	*	@param string type - Type of conversion - hour/degree, see code for valid strings
	*	@param number value - Value to be normalized
	*	@return number - Normalized value
	*	@throws RangeError if invalid Type specified
	*/
Astronomy.prototype.normalizeValue = function normalizeValue (value,type){

	var deg = ['d','deg','degree','degrees'];
	var hour = ['h','hr','hrs','hour','hours'];
	var one = ['o','one',1];
	var r = 0;
	
	if(deg.indexOf(type) != -1){
		r = 360;
	}
	else if(hour.indexOf(type) != -1){
		r = 24;
	}
	else if(one.indexOf(type) != -1){
		r = 1;
	}
	else{
		throw new RangeError('Illegal input for normalization of values');
	}
	
	while(value < 0){
		value += r;
	}
	
	while(value >= r){
		value -= r;
	}

	return value;
}

Astronomy.prototype.d2r = function d2r (deg){
	var deg,rad;
	rad = deg*Math.PI/180;
	return rad;
}

Astronomy.prototype.r2d = function r2d (rad){
	var deg = rad*180/Math.PI;
	return deg;
}

	/**
		Rounder with floating point output
	
		@param Number to be rounded
		@param Number of decimal places
	*/
Astronomy.prototype.rounder = function rounder(input, n){
	
	var multiplier = Math.pow(10,n);
	var output = Math.round(input*multiplier)/multiplier;
	
	//add zero to the end if string is shorter
	output = output.toString();
	var point = output.indexOf('.');
	var fraction = output.slice(point);
	if (fraction.length < (n+1) && point != -1) {
		output += '0';
	}
	
	
	return output;
}

	/**
	*	Converts decimal to sexagesimal values
	*
	*	@param float decimal value
	*	@param string type of conversion 'hour', 'deg', 'minute'
	*	@return string
	*/
Astronomy.prototype.sexagesimalConv = function sexagesimalConv(input, type){

	var range = 1;
	if (input < 0) {
		range = -1;
	}
	input = Math.abs(input);
	var whole = Math.floor(input);
	var rem = (input - whole) * 60;
	
	var min = Math.floor(rem);
	var remMin = (rem - min)*60;
	
	var sec = Math.round(remMin);
	
	//take care of seconds indicator showing 60
	
	if (sec == 60){
		sec = 0;
		min++;
		
		if(min==60){
			min = 0;
			whole++;
		}
	}
	
	if(min<10) min = '0' + min;
	if(sec<10) sec = '0' + sec;
	
	var hourAr = ['h','hour','hours'];
	var degAr = ['d','deg','degs','degree','degrees'];
	var minAr = ['m','min','mins','minute','minutes'];
	var latAr = ['lat','latitude'];		//latitude
	var lonAr = ['lon','long','longitude'];	//longitude
	
	if(hourAr.indexOf(type) > -1){
		var output = whole + ':' + min + ':' + sec;
	}
	else if(degAr.indexOf(type) > -1){
		var output = whole + '&#176;' + min + "'" + sec + '"';
	}
	else if(minAr.indexOf(type) > -1){
		var output = min + '<sup>m</sup>' + sec + '<sup>s</sup>';
	}
	else if(latAr.indexOf(type) > -1){
		var output = whole + '&#176;' + min + "'" + sec + '"';
		
		if(range == -1){
			output += ' S';
		}
		else{
			output += ' N';
		}
	}
	else if(lonAr.indexOf(type) > -1){
		var output = whole + '&#176;' + min + "'" + sec + '"';
		
		if(range == -1){
			output += ' W';
		}
		else{
			output += ' E';
		}
	}
	else{
		throw new Error('Wrong type specified for sexagesimalConv');
	}
	if (range == -1 && latAr.indexOf(type) == -1 && lonAr.indexOf(type) == -1) {
		output = '-' + output;
	}
	return output;
}
	
