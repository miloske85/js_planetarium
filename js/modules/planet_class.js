
function Planet(obj){
	
	if(obj.name){
		this.name = obj.name;
	}
	else{
		this.name = 'Name Undefined';
	}

	//throw errors if params undefined
	if(!isNaN(obj.time.getFullYear())){
		this.time = obj.time;
	}
	else{
		throw new Error('Time not passed to Planet constructor');
	}

	if(!isNaN(obj.latitude)){
		this.latitude = obj.latitude;
	}
	else{
		throw new Error('Latitude not passed to Planet constructor');
	}
	
	if(!isNaN(obj.longitude)){
		this.longitude = obj.longitude;
	}
	else{
		throw new Error('Longitude not passed to Planet constructor');
	}

	Astronomy.call(this,this.time,this.latitude,this.longitude);
	
	//************************
	//	Public functions
	//************************
	this.getName = function getName(){
		return this.name;
	}
	
	this.getDate = function getDate(){
		return this.formatTime(this.time,'d');
	}
	
	this.getTime = function getTime(){
		return this.formatTime(this.time,'t');
	}
	
	this.getLAST = function getLAST(){
		return this.sexagesimalConv(this.LAST, 'hour');
	}
	
	this.getLAST0 = function getLAST0(){
		return this.sexagesimalConv(this.LAST0, 'hour');
	}
	
	this.getGeo = function getGeo(){
		var obj = {};
		obj.latitude = this.sexagesimalConv(this.latitude, 'lat');
		obj.longitude = this.sexagesimalConv(this.longitude, 'lon');
		
		return obj;
	}
	
	/**
	*	Floating-point JDN
	*/
	this.getJDNP = function getJDNP(){
		return this.rounder(this.jdnP,6);
	}
	
	this.getD2000 = function getD2000(){
		return this.rounder(this.D2000,6);
	}
	
	this.getEOT = function getEOT(){
		return this.sexagesimalConv(this.EOT, 'minute');
	}
	
	this.getSun = function getSun(){
		var sun = this.sun;
		
		sun.RA = this.sexagesimalConv(sun.RA,'hour');
		sun.DEC = this.sexagesimalConv(sun.DEC,'deg');
		sun.R = this.rounder(sun.R,8);
		
		sun.ALT = this.sexagesimalConv(sun.ALT,'deg');
		sun.AZ = this.sexagesimalConv(sun.AZ,'deg');
		sun.HA = this.sexagesimalConv(sun.HA,'hour');
		
		sun.latecl = this.sexagesimalConv(sun.latecl,'deg');
		sun.lonecl = this.sexagesimalConv(sun.lonecl,'deg');
		
		//RTS
		sun.rise = this.sexagesimalConv(sun.RTS.R,'h');
		sun.transit = this.sexagesimalConv(sun.RTS.T,'h');
		sun.set = this.sexagesimalConv(sun.RTS.S,'h');
		
		return sun;
	}
	
	this.getMoon = function getMoon(){
		var moon = this.moon;
		
		moon.RA = this.sexagesimalConv(moon.RA,'hour');
		moon.DEC = this.sexagesimalConv(moon.DEC,'deg');
		moon.R = this.rounder(moon.R,2);
		
		moon.ALT = this.sexagesimalConv(moon.ALT,'deg');
		moon.AZ = this.sexagesimalConv(moon.AZ,'deg');
		moon.HA = this.sexagesimalConv(moon.HA,'hour');
		
		moon.latecl = this.sexagesimalConv(moon.lambda,'deg');
		moon.lonecl = this.sexagesimalConv(moon.beta,'deg');
		
		// moon.RTS = formatPlanetRTS(calcPlanetRTS(cent,this.latitude,this.longitude,'moon'));
		moon.RTS = {};
		moon.RTS.rise = '-';
		moon.RTS.transit = '-';
		moon.RTS.set = '-';
		
		return moon;
	}
	
	this.getMercury = function getMercury(){
		var mercury = this.mercury;
		
		mercury.RA = this.sexagesimalConv(mercury.RA,'hour');
		mercury.DEC = this.sexagesimalConv(mercury.DEC,'deg');
		mercury.R = this.rounder(mercury.R,8);
		
		mercury.ALT = this.sexagesimalConv(mercury.ALT,'deg');
		mercury.AZ = this.sexagesimalConv(mercury.AZ,'deg');
		mercury.HA = this.sexagesimalConv(mercury.HA,'hour');
		
		mercury.r = this.rounder(mercury.r,8);
		mercury.latecl = this.sexagesimalConv(mercury.latecl,'deg');
		mercury.lonecl = this.sexagesimalConv(mercury.lonecl,'deg');

		mercury.i = this.rounder(mercury.i,3);	//phase angle [deg]
		mercury.k = this.rounder(mercury.k*100,1);	//illum.frac [%]
		mercury.mag = this.rounder(mercury.mag,2);	//apparent magnitude
		
		mercury.RTS = formatPlanetRTS(calcPlanetRTS(cent,this.latitude,this.longitude,'mercury'));

		return mercury;
	}
	
	this.getVenus = function getVenus(){
		var venus = this.venus;
		
		venus.RA = this.sexagesimalConv(venus.RA,'hour');
		venus.DEC = this.sexagesimalConv(venus.DEC,'deg');
		venus.R = this.rounder(venus.R,8);
		
		venus.ALT = this.sexagesimalConv(venus.ALT,'deg');
		venus.AZ = this.sexagesimalConv(venus.AZ,'deg');
		venus.HA = this.sexagesimalConv(venus.HA,'hour');
		
		venus.r = this.rounder(venus.r,8);
		venus.latecl = this.sexagesimalConv(venus.latecl,'deg');
		venus.lonecl = this.sexagesimalConv(venus.lonecl,'deg');
		
		venus.i = this.rounder(venus.i,3);
		venus.k = this.rounder(venus.k*100,1);
		venus.mag = this.rounder(venus.mag,2);
		
		venus.RTS = formatPlanetRTS(calcPlanetRTS(cent,this.latitude,this.longitude,'venus'));
		
		return venus;
	}
	
	this.getMars = function getMars(){
		var mars = this.mars;
		
		mars.RA = this.sexagesimalConv(mars.RA,'hour');
		mars.DEC = this.sexagesimalConv(mars.DEC,'deg');
		mars.R = this.rounder(mars.R,8);
		
		mars.ALT = this.sexagesimalConv(mars.ALT,'deg');
		mars.AZ = this.sexagesimalConv(mars.AZ,'deg');
		mars.HA = this.sexagesimalConv(mars.HA,'hour');
		
		mars.r = this.rounder(mars.r,8);
		mars.latecl = this.sexagesimalConv(mars.latecl,'deg');
		mars.lonecl = this.sexagesimalConv(mars.lonecl,'deg');
		
		mars.i = this.rounder(mars.i,3);
		mars.k = this.rounder(mars.k*100,1);
		mars.mag = this.rounder(mars.mag,3);
		
		mars.RTS = formatPlanetRTS(calcPlanetRTS(cent,this.latitude,this.longitude,'mars'));
		
		return mars;
	}
	
	this.getJupiter = function getJupiter(){
		var jupiter = this.jupiter;
		
		jupiter.RA = this.sexagesimalConv(jupiter.RA,'hour');
		jupiter.DEC = this.sexagesimalConv(jupiter.DEC,'deg');
		jupiter.R = this.rounder(jupiter.R,8);
		
		jupiter.ALT = this.sexagesimalConv(jupiter.ALT,'deg');
		jupiter.AZ = this.sexagesimalConv(jupiter.AZ,'deg');
		jupiter.HA = this.sexagesimalConv(jupiter.HA,'hour');
		
		jupiter.r = this.rounder(jupiter.r,8);
		jupiter.latecl = this.sexagesimalConv(jupiter.latecl,'deg');
		jupiter.lonecl = this.sexagesimalConv(jupiter.lonecl,'deg');
		
		jupiter.i = this.rounder(jupiter.i,3);
		jupiter.k = this.rounder(jupiter.k*100,1);
		jupiter.mag = this.rounder(jupiter.mag,3);
		
		jupiter.RTS = formatPlanetRTS(calcPlanetRTS(cent,this.latitude,this.longitude,'jupiter'));
		
		return jupiter;
	}
	
	this.getSaturn = function getSaturn(){
		var saturn = this.saturn;
		
		saturn.RA = this.sexagesimalConv(saturn.RA,'hour');
		saturn.DEC = this.sexagesimalConv(saturn.DEC,'deg');
		saturn.R = this.rounder(saturn.R,8);
		
		saturn.ALT = this.sexagesimalConv(saturn.ALT,'deg');
		saturn.AZ = this.sexagesimalConv(saturn.AZ,'deg');
		saturn.HA = this.sexagesimalConv(saturn.HA,'hour');
		
		saturn.r = this.rounder(saturn.r,8);
		saturn.latecl = this.sexagesimalConv(saturn.latecl,'deg');
		saturn.lonecl = this.sexagesimalConv(saturn.lonecl,'deg');
		
		saturn.i = this.rounder(saturn.i,3);
		saturn.k = this.rounder(saturn.k*100,1);
		saturn.mag = this.rounder(saturn.mag,3);
		
		saturn.RTS = formatPlanetRTS(calcPlanetRTS(cent,this.latitude,this.longitude,'saturn'));
		
		return saturn;
	}
	
	this.getUranus = function getUranus(){
		var uranus = this.uranus;
		
		uranus.RA = this.sexagesimalConv(uranus.RA,'hour');
		uranus.DEC = this.sexagesimalConv(uranus.DEC,'deg');
		uranus.R = this.rounder(uranus.R,8);
		
		uranus.ALT = this.sexagesimalConv(uranus.ALT,'deg');
		uranus.AZ = this.sexagesimalConv(uranus.AZ,'deg');
		uranus.HA = this.sexagesimalConv(uranus.HA,'hour');
		
		uranus.r = this.rounder(uranus.r,8);
		uranus.latecl = this.sexagesimalConv(uranus.latecl,'deg');
		uranus.lonecl = this.sexagesimalConv(uranus.lonecl,'deg');
		
		uranus.i = this.rounder(uranus.i,3);
		uranus.k = this.rounder(uranus.k*100,1);
		uranus.mag = this.rounder(uranus.mag,3);
		
		uranus.RTS = formatPlanetRTS(calcPlanetRTS(cent,this.latitude,this.longitude,'uranus'));
		
		return uranus;
	}
	
	this.getNeptune = function getNeptune(){
		var neptune = this.neptune;
		
		neptune.RA = this.sexagesimalConv(neptune.RA,'hour');
		neptune.DEC = this.sexagesimalConv(neptune.DEC,'deg');
		neptune.R = this.rounder(neptune.R,8);
		
		neptune.ALT = this.sexagesimalConv(neptune.ALT,'deg');
		neptune.AZ = this.sexagesimalConv(neptune.AZ,'deg');
		neptune.HA = this.sexagesimalConv(neptune.HA,'hour');
		
		neptune.r = this.rounder(neptune.r,8);
		neptune.latecl = this.sexagesimalConv(neptune.latecl,'deg');
		neptune.lonecl = this.sexagesimalConv(neptune.lonecl,'deg');
		
		neptune.i = this.rounder(neptune.i,3);
		neptune.k = this.rounder(neptune.k*100,1);
		neptune.mag = this.rounder(neptune.mag,3);
		
		neptune.RTS = formatPlanetRTS(calcPlanetRTS(cent,this.latitude,this.longitude,'neptune'));
		
		return neptune;
	}
	
	//------------------------
	//	Assignments
	//------------------------
	var d2r = this.d2r;
	var r2d = this.r2d;
	var normalizeValue = this.normalizeValue;
	var calcObliquity = this.calcObliquity;
	var calcAzim = this.calcAzim;
	var getUTMidnight = this.getUTMidnight;
	var calcRTS = this.calcRTS;
	var sexagesimalConv = this.sexagesimalConv;
	
	//------------------------
	//	Main calculations
	//------------------------

	var cent = this.calcCent(this.time);

	var LAST = this.calcSidereal(this.time,this.longitude);

	var sun = calcSolar(cent,this.latitude,this.longitude);
	this.sun = sun;
	this.sun.RTS = calcSolarRTS(cent,this.latitude,this.longitude);

	this.LAST = LAST;
	this.LAST0 = this.calcSiderealMnight(this.time,this.longitude);
	this.jdnP = this.calcJDNPrec(this.time);
	var D2000 = this.calcD2000(this.time);
	this.D2000 = D2000;
	this.EOT = eqOfTime(this.sun,cent);
	
	this.moon = MoonCalc(cent,this.latitude,this.longitude);
	this.mercury = MercuryCalc(cent,this.latitude,this.longitude);
	this.venus = VenusCalc(cent,this.latitude,this.longitude);
	this.mars = MarsCalc(cent,this.latitude,this.longitude);
	this.jupiter = JupiterCalc(cent,this.latitude,this.longitude);
	this.saturn = SaturnCalc(cent,this.latitude,this.longitude);
	this.uranus = UranusCalc(cent,this.latitude,this.longitude);
	this.neptune = NeptuneCalc(cent,this.latitude,this.longitude);
	
	//************************
	//	'Private' methods
	//************************
	
	/**
	*	Calculates Equation of Time
	*
	*	@param object sun Calculated sun object
	*	@param float cent Time in centuries since J2000
	*	@return float EOT in hours
	*/
	function eqOfTime(sun,t){

		var L0 = sun.L0;
		var e = sun.e;
		var M = sun.M;
		var alpha = sun.RA;
		var ecl = calcObliquity(t);
		
		var y = Math.pow(Math.tan(d2r(ecl/2)), 2);

		//convert to radians
		L0 = d2r(L0);
		M = d2r(M);
		
		var E = y * Math.sin(2*L0) - 2*e*Math.sin(M) + 4*e*y*Math.sin(M)*Math.cos(2*L0) - 0.5*y*y*Math.sin(4*L0) - 1.25*e*e*Math.sin(2*M);
		E = r2d(E);

		return E/15;
	}
	
	/**
	*	Calculates Rise/Transit/Set times
	*/
	function calcSolarRTS(T, latitude, longitude){
		var obj = {};

		//preliminary
		var r = calcRTS(T,latitude,longitude,sun,'sun');

		//iter for sunrise
		var R0,R1;
		
		do {
			R0 = r.R;
			sun = calcSolar(r.tr,latitude,longitude);
			r = calcRTS(r.tr,latitude,longitude,sun,'sun');
			R1 = r.R;
		} while(Math.abs(R1 - R0) > 2e-4);
		
		obj.R = R1;
		
		//iter for transit
		var R0,R1;
		do {
			R0 = r.T;
			sun = calcSolar(r.tt,latitude,longitude);
			r = calcRTS(r.tt,latitude,longitude,sun,'sun');
			R1 = r.T;
		} while(Math.abs(R1 - R0) > 2e-4);
		
		obj.T = R1;
		
		//iter for sunset
		var R0,R1;
		do {
			R0 = r.S;
			sun = calcSolar(r.ts,latitude,longitude);
			r = calcRTS(r.ts,latitude,longitude,sun,'sun');
			R1 = r.S;
		} while(Math.abs(R1 - R0) > 2e-4);
		
		obj.S = R1;
		
		return obj;
	}
	
	/**
	*	Calculates Rise/Transit/Set times for planets and the mooon
	*
	*	@param float Time in centuries
	*	@param float latitude
	*	@param float longitude
	*	@param string Planet name/'moon' in lowercase
	*	@return RTS object
	*/
	function calcPlanetRTS(T,latitude,longitude,planet_id){
		var obj = {};
		
		function calc(T,latitude,longitude,planet_id){
			switch(planet_id){
				case 'moon':
					var planet = MoonCalc(T,latitude,longitude);
					// console.log('mooninng ', T);
					console.log('cent in calcPlanetRTS ',T);
				break;
				case 'mercury':
					var planet = MercuryCalc(T,latitude,longitude);
					// console.log('mooninng');
				break;
				case 'venus':
					var planet = VenusCalc(T,latitude,longitude);
				break;
				case 'mars':
					var planet = MarsCalc(T,latitude,longitude);
				break;
				case 'jupiter':
					var planet = JupiterCalc(T,latitude,longitude);
				break;
				case 'saturn':
					var planet = SaturnCalc(T,latitude,longitude);
				break;
				case 'uranus':
					var planet = UranusCalc(T,latitude,longitude);
				break;
				case 'neptune':
					var planet = NeptuneCalc(T,latitude,longitude);
				break;
			}
			return planet;
		}
		
		if(planet_id == 'moon'){
			var type='moon';
		}
		else{
			var type='planet';
		}
		
		//preliminary
		var planet = calc(T,latitude,longitude,planet_id);
		var r = calcRTS(T,latitude,longitude,planet,type);
		
		//iterations for rise
		var R0,R1;
		
		do{
			R0 = r.tr;
			var planet = calc(R0,latitude,longitude,planet_id);
			r = calcRTS(R0,latitude,longitude,planet,type);
			R1 = r.tr;
		} while(Math.abs(R1 - R0) > 5e-9);
		
		obj.R = r.R;
		
		//iterations for transit
		var R0,R1;
		
		do{
			R0 = r.tt;
			var planet = calc(R0,latitude,longitude,planet_id);
			r = calcRTS(R0,latitude,longitude,planet,type);
			R1 = r.tt;
		} while (Math.abs(R1 - R0) > 5e-9);
		
		obj.T = r.T;
		
		//iterations for set
		var R0,R1;
		
		do{
			R0 = r.ts;
			var planet = calc(R0,latitude,longitude,planet_id);
			r = calcRTS(R0,latitude,longitude,planet,type);
			R1 = r.ts;
		} while(Math.abs(R1 - R0) > 5e-9);
		
		obj.S = r.S;
		
		return obj;
	}
	
	/**
	*	Produces pretty format for RTS data and deals with cases when rise or set are not on the same day
	*
	*	@param object RTS object
	*	@return RTS object
	*/
	function formatPlanetRTS(rts){
		var obj = {};
		
		if(rts.R){
			obj.rise = sexagesimalConv(rts.R,'h');
			
			if(rts.yesterday){
				obj.rise += ' --yday';
			}
		}
		else{
			obj.rise = '--';
		}
		
		obj.transit = sexagesimalConv(rts.T,'h');
		
		if(rts.S){
			obj.set = sexagesimalConv(rts.S,'h');
			
			if(rts.tomorrow){
				obj.set += ' --tmr';
			}
		}
		else{
			obj.set = '--';
		}
		
		return obj;
	}
	/**
	*	Calculates apparent coordinates (RA, DEC) of the Sun
	*	Meeus, Chapter 25, p.171
	*
	*	@param number T - Time in centuries since J2000
	*	@param number latitude - Latitude in degrees
	*	@param number longitude - Longitude in degrees
	*/
	function calcSolar(T, latitude, longitude){
		
		var L0, M, Mr, e, C, Lt, ni, niR, R, Omega, lambda, epsilon, RA, DEC;
		
		//L0 = normalizeValue('deg',280.4664567 + 360007.698279 * T + 0.03032028 * T * T + (T*T*T)/49931 - Math.pow(T,4)/15300 - Math.pow(T,5)/2e6);		//geocentric mean longitude
		L0 = normalizeValue(280.46646 + 36000.76983 * T + 0.0003032 * T * T, 'deg');

		M = normalizeValue(357.52911 + 35999.05029 * T - 0.0001537 * T * T, 'deg');		//mean anomaly
		e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T; //eccentricity of the Earth's orbit
		Mr = d2r(M); //radians
		
		//M = normalizeValue('deg',M);
		
		C = (1.914602 - 0.004817*T - 0.000014*T*T)*Math.sin(Mr);
		C += (0.019993 - 0.000101*T)*Math.sin(2*Mr);
		C += 0.000289 * Math.sin(3*Mr);								//Sun's equation of center
		
		Lt = normalizeValue(L0 + C, 'deg');	//true longitude - mean equinox of date
		ni = M + C; //true anomaly
		niR = d2r(ni);	//TA in radians
			
		R = (1.000001018 * (1 - e*e))/(1 + e*Math.cos(niR));		//radius vector (distance) in AU, Meeus 25.5, p. 172
		
		Omega = 125.04 - 1934.136 * T;
		lambda = Lt - 0.00569 - 0.00478 * Math.sin(d2r(Omega));		//apparent longitude - true equinox of date, error at 5th decimal
		
		//obliquity
		epsilon = calcObliquity(T);		//radians!
		epsilon += 0.00256 * Math.cos(d2r(Omega));
		epsilon = d2r(epsilon);
		
		RA = Math.atan2(Math.cos(epsilon)*Math.sin(d2r(lambda)), Math.cos(d2r(lambda)));
		RA = normalizeValue(r2d(RA)/15, 'h');

		DEC = Math.asin(Math.sin(epsilon) * Math.sin(d2r(lambda)));
		DEC = r2d(DEC);
		
		var sun = {};
		sun.RA = RA;
		sun.DEC = DEC;
		sun.LA = lambda;
		sun.R = R;
		
		//true anomaly
		
		ni = normalizeValue(ni, 'deg');
		Lt = normalizeValue(Lt, 'deg');
		//convert to Earth's TA
		
		sun.v = ni;
		sun.Lt = Lt; //true longitude
		
		sun.L0 = L0; //mean longitude, needed for EOT
		sun.e = e;
		sun.M = M;
		
		//ecliptic coordinates
		sun.latecl = 0;
		sun.lonecl = RA * 15;
		sun.lonecl += 180; //converts this to earth's longitude!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		sun.lonecl = normalizeValue(sun.lonecl, 'deg');
		sun.lonecl = sun.lonecl;

		sun.HA = LAST - sun.RA;
		if(sun.HA < 0){
			sun.HA += 24;
		}
	
		var pos = calcAzim(sun.DEC,latitude,sun.HA);

		sun.ALT = pos.ALT;
		sun.AZ = pos.AZ;
		// sun.HA = pos.HA;
		
		//values needed for the perturbations of the Moon
		sun.Ms = M; //mean anomally
		sun.Ls = L0; //mean longitude
		// var d2000 = calcD2000(time);
		// var w = 282.9404 + 4.70935E-5 * d2000;
		// sun.w = w; // argument of perihelion
		
		sun.Name = 'Sun';
		return sun;
	}

	/**
		Calculates planetary data, formulae by Schlyter - http://www.stjarnhimlen.se/comp/ppcomp.html
	
		@param planet object
		@param Date object
	*/
	function calcPlanet(obj, t, latitude, longitude){
		
		var d = D2000;
		var ecl = calcObliquity(t);

		var N = obj.N;	//longitude of the ascending node
		var i = obj.i;	//inclination to the ecliptic
		var w = obj.w;	//argument of perihelion
		var a = obj.a;	//semi-major axis (distance from the sun)
		var e = obj.e;	//eccentricity (0==circle, 0-1==ellipse, 1==parabola)
		var M = obj.M;	//mean anomaly (0 at perihelion, increases uniformly with time)

		//calculations
		var E = M + e * Math.sin(d2r(M)) * (1 + e*Math.cos(d2r(M)));

		//iterations		
		var E1 = E - (E - e * Math.sin(d2r(E)) - M) / (1 - e*Math.cos(d2r(E)));
		
		while ((Math.abs(E) - Math.abs(E1))>0.001){
			E = E1;
			E1 = E - (E - e * Math.sin(d2r(E)) - M) / (1 - e*Math.cos(d2r(E)));
		}
	
		var xv = a*(Math.cos(d2r(E)) - e);
		var yv = a*(Math.sqrt(1-e*e) * Math.sin(d2r(E)));
		
		var v = r2d(Math.atan2(yv,xv));		//true anomaly
		var r = Math.sqrt(xv*xv + yv*yv);	//distance from the sun
		
		//heliocentric X,Y,Z
		var xh = r * (Math.cos(d2r(N)) * Math.cos(d2r(v+w)) - Math.sin(d2r(N)) * Math.sin(d2r(v+w)) * Math.cos(d2r(i)));
		var yh = r * (Math.sin(d2r(N)) * Math.cos(d2r(v+w)) + Math.cos(d2r(N)) * Math.sin(d2r(v+w) * Math.cos(d2r(i))));
		var zh = r * (Math.sin(d2r(v+w)) * Math.sin(d2r(i)));
		
		var lonecl = r2d(Math.atan2(yh, xh));									//used for perturbations
		var latecl = r2d(Math.atan2(zh, Math.sqrt(xh*xh + yh*yh)));
		
		var xs = sun.R * Math.cos(d2r(sun.LA));
		var ys = sun.R * Math.sin(d2r(sun.LA));
		
		//geocentric? X,Y,Z
		var xg = xh + xs;
		var yg = yh + ys;
		var zg = zh;
		
		//equatorial		
		var xe = xg;
		var ye = yg * Math.cos(d2r(ecl)) - zg * Math.sin(d2r(ecl));
		var ze = yg * Math.sin(d2r(ecl)) + zg * Math.cos(d2r(ecl));
		
		var RA = r2d(Math.atan2(ye, xe));
		var DEC = r2d(Math.atan2(ze, Math.sqrt(xe*xe + ye*ye)));

		RA = normalizeValue(RA/15, 'h');
	
		var rg = Math.sqrt(xg*xg + yg*yg + zg*zg);	//distance from the Earth in AU

		v = normalizeValue(v, 'deg');		//true anomaly
		
		lonecl = normalizeValue(lonecl, 'd');

		//create and return object
		var planet = {};
		planet.RA = RA;
		planet.DEC = DEC;
		planet.R = rg;	//distance from earth
		
		planet.HA = LAST - planet.RA;
		
		planet.HA = normalizeValue(planet.HA,'h');
		
		var pos = calcAzim(planet.DEC, latitude, planet.HA);
		
		planet.ALT = pos.ALT;
		planet.AZ = pos.AZ;
		
		planet.r = r;	//distance from the sun
		planet.v = v; //true anomaly
		
		planet.lonecl = lonecl; //ecliptic longitude
		planet.latecl = latecl;
		
		//perturbations
		planet.M = M; //mean anomaly
		planet.N = N; //longitude of the ascending node
		planet.w = w; //argument of perihelion
		var L = M + N + w;
		planet.L = L; //mean longitude
		
		//phase angle in degrees
		planet.i = r2d(Math.acos((Math.pow(r,2) + Math.pow(rg,2) - Math.pow(sun.R,2)) / (2*r*rg))); //Meeus 41.1, p.291
	
		//illuminated fraction
		planet.k = (Math.pow((r + rg),2) - sun.R) / (4*r*rg);	//Meeus 41.2, p.291

		return planet;

	}

	/**
		Perturbations - not even used in moonCalc
	*/
	function calcPert(obj, t){
		var lonecl = obj.lonecl;
		var latecl = obj.latecl;
		var r = obj.r; //heliocentric distance, geocentric for the moon
		
		// var sun = calcSolar(time, latitude, longitude);

		var rs = sun.R;
		var lonsun = sun.lonecl;
		
		var ecl = calcObliquity(t);
		
		//heliocentric rectangular, for Moon this is geocentric
		var xh = r * Math.cos(d2r(lonecl)) * Math.cos(r2d(latecl));
		var yh = r * Math.sin(d2r(lonecl)) * Math.cos(r2d(latecl));
		var zh = r * Math.sin(d2r(latecl));

		if(obj.Name != 'Moon'){
			//position of the sun
			var xs = rs * Math.cos(d2r(lonsun));
			var ys = rs * Math.sin(d2r(lonsun));
			
			//converting to geocentric ecliptic position
			var xg = xh + xs;
			var yg = yh + ys;
			var zg = zh;
			
			//equatorial rectangular
			var xe = xg;
			var ye = yg * Math.cos(ecl) - zg * Math.sin(ecl);
			var ze = yg * Math.sin(ecl) + zg * Math.cos(ecl);
		}
		else{
			var xe = xh;
			var ye = yh;
			var ze = zh;
			//console.log('moon');
		}
		var RA = r2d(Math.atan2(ye, xe));
		RA = normalizeValue(RA, 'h')/15;
		var DEC = r2d(Math.atan2(ze, Math.sqrt(xe*xe + ye*ye)));
		
		var R = Math.sqrt(xe*xe + ye*ye + ze*ze);
		
		var planet = new Object();
		
		planet.RA = RA;
		planet.DEC = DEC;
		planet.R = R;
		
		return planet;
	}

	/**
	*	Calculates Moon data, according to Meeus, ch. 47, p. 345
	*/
	function MoonCalc(t, latitude, longitude){
	//console.log('mooncalc cent ',t);
		var Moon = {};
		
		//Moon's mean longitude
		var Lp = 218.3164477 + 481267.88123421 * t - 0.0015786*t*t + Math.pow(t,3)/538841 - Math.pow(t,4)/65194000; //Meeus 47.1
		//mean elongation of the Moon
		var D = 297.8501921 + 445267.1114034*t - 0.0018819*t*t + Math.pow(t,3)/545868 - Math.pow(t,4)/113065000; //47.2
		//Sun's mean anomaly
		var M = 357.5291092 + 35999.0502909*t - 0.0001536*t*t + Math.pow(t,3)/24490000; //47.3
		//Moon's mean anomaly
		var Mp = 134.9633964 + 477198.8675055*t + 0.0087414*t*t + Math.pow(t,3)/69699 - Math.pow(t,4)/14712000; //47.4
		//Moon's argument of latitude (mean distance of the Moon from its ascending node)
		var F = 93.2720950 + 483202.0175233*t - 0.0036539*t*t - Math.pow(t,3)/3526000 + Math.pow(t,4)/863310000; //47.5
		
		var A1 = 119.75 + 131.849*t;
		var A2 = 53.09 + 479264.29*t;
		var A3 = 313.45 + 481266.484*t;
		
		//these are all in degrees, should be normalized
		Lp = normalizeValue(Lp,'d');
		D = normalizeValue(D,'d');
		M = normalizeValue(M,'d');
		Mp = normalizeValue(Mp,'d');
		F = normalizeValue(F,'d');
		A1 = normalizeValue(A1,'d');
		A2 = normalizeValue(A2,'d');
		A3 = normalizeValue(A3,'d');
		
		//Eccentricity of Earth orbit around the Sun
		var E = 1 - 0.002516*t - 0.0000074*t*t;	//47.6
		
		//THE FUN PART
		
		//geocentric longitude in degrees * 1e6
		var sigmaL = 6288774*sin(Mp);
		sigmaL += 1274027*sin(2*D - Mp);
		sigmaL += 658314*sin(2*D);
		sigmaL += 213618*sin(2*Mp);
		sigmaL += -185116*E*sin(M);
		sigmaL += -114332*sin(2*F);
		sigmaL += 58793*sin(2*D - 2*Mp);
		sigmaL += 57066*E*sin(2*D - M - Mp);
		sigmaL += 53322*sin(2*D + Mp);
		sigmaL += 45758*E*sin(2*D - M);
		sigmaL += -40923*E*sin(M - Mp);
		sigmaL += -34720*sin(D);
		sigmaL += -30383*E*sin(M + Mp);
		sigmaL += 15372*sin(2*D - 2*F);
		sigmaL += -12528*sin(Mp + 2*F);
		sigmaL += 10980*sin(Mp - 2*F);
		sigmaL += 10675*sin(4*D - Mp);
		sigmaL += 10034*sin(3*Mp);
		sigmaL += 8548*sin(4*D - 2*Mp);
		sigmaL += -7888*E*sin(2*D + M - Mp);
		sigmaL += -6766*E*sin(2*D + M);
		sigmaL += -5163*sin(D - Mp);
		sigmaL += 4987*E*sin(D + M);
		
		//geocentric distance in meters
		var sigmaR = -20905355*cos(Mp);
		sigmaR += -3699111*cos(2*D - Mp);
		sigmaR += -2955968*cos(2*D);
		sigmaR += -569925*cos(2*Mp);
		sigmaR += 48888*E*cos(M);
		sigmaR += -3149*cos(2*F);
		sigmaR += 246158*cos(2*D - 2*Mp);
		sigmaR += -152138*E*cos(2*D - M - Mp);
		sigmaR += -170733*cos(2*D + Mp);
		sigmaR += -204586*E*cos(2*D - M);
		sigmaR += -129620*E*cos(M - Mp);
		sigmaR += 108743*cos(D);
		sigmaR += 104755*E*cos(M + Mp);
		sigmaR += 10321*cos(2*D - 2*F);
		//missing - doesn't exist in the tables
		sigmaR += 79661*cos(Mp - 2*F);
		sigmaR += -34782*cos(4*D - Mp);
		sigmaR += -23210*cos(3*Mp);
		sigmaR += -21636*cos(4*D - 2*Mp);
		sigmaR += 24208*E*cos(2*D + M - Mp);
		sigmaR += 30824*E*cos(2*D + M);
		sigmaR += -8379*cos(D - Mp);
		
		//geocentric latitude in degrees * 1e6
		var sigmaB = 5128122*sin(F);
		sigmaB += 280602*sin(Mp + F);
		sigmaB += 277693*sin(Mp - F);
		sigmaB += 173237*sin(2*D - F);
		sigmaB += 55413*sin(2*D - Mp + F);
		sigmaB += 46271*sin(2*D - Mp - F);
		sigmaB += 32573*sin(2*D + F);
		sigmaB += 17198*sin(2*Mp + F);
		sigmaB += 9266*sin(2*D + Mp - F);
		sigmaB += 8822*sin(2*Mp - F);
		sigmaB += 8216*E*sin(2*D - M - F);
		sigmaB += 4324*sin(2*D - Mp - F);
		sigmaB += 4200*sin(2*D + Mp + F);
		sigmaB += -3359*E*sin(2*D + M - F);
		
		//additions
		sigmaL += 3958*sin(A1);	//action of Venus
		sigmaL += 1962*sin(Lp - F); //flattening of Earth
		sigmaL += 318*sin(A2); //action of Jupiter
		
		sigmaB += -2235*sin(Lp);
		sigmaB += 382*sin(A1 - F);
		sigmaB += 175*sin(A1 - F);
		sigmaB += 175*sin(A1 + F);
		sigmaB += 127*sin(Lp - Mp);
		sigmaB += -115*sin(Lp + Mp);
		
		//coordinates of the moon
		Moon.lambda = Lp + sigmaL/1e6;	//deg
		Moon.beta = sigmaB/1e6;	//deg
		Moon.R = 385000.56 + sigmaR/1000; //km
	
		//apparent longitude - adding nutation
		
		//equatorial
		var eq = lbrToEq(Moon,t);
		Moon.RA = normalizeValue(eq.RA/15,'h');
		Moon.DEC = eq.DEC;

		//azimuthal
		Moon.HA = normalizeValue(LAST - Moon.RA, 'h');
		var az = calcAzim(Moon.DEC,latitude,Moon.HA);
		Moon.ALT = az.ALT;
		Moon.AZ = az.AZ;
		
		//parallax
		var pi = r2d(Math.asin(6378.14/Moon.R));

		return Moon;
	}

	function MercuryCalc(T, latitude, longitude){

		//Meeus p. 220
		var L = normalizeValue(252.250906 + 149474.0722491*T + 0.0003035*T*T + 0.000000018*T*T*T, 'd');		//mean longitude
		var a = 0.38709831;	//semimajor axis
		var e = 0.20563175 + 0.000020407*T - 0.0000000283*T*T - 0.00000000018*T*T*T;	//eccentricity of the orbit (0-circle, 1-parabola)
		var i = 7.004986 + 0.0018215*T - 0.0000181*T*T + 0.000000056*T*T*T;		//inclination to the ecliptic
		var Omega = 48.330893 + 1.1861883*T + 0.00017542*T*T + 0.000000215*T*T*T;		//longitude of the ascending node
		var pi = 77.456119 + 1.5564776*T + 0.00029544*T*T + 0.000000009*T*T*T;		//longitude of the perihelion
		
		var M = L - pi;		//Mean anomaly
		var w = pi - Omega;	//argument of the perihelion

		var Mercury = {};
		Mercury.Name = 'Mercury';
		Mercury.N = Omega;
		Mercury.i = i;
		Mercury.w = w;
		Mercury.a = a;
		Mercury.e = e;
		Mercury.M = M;

		var merCalc = calcPlanet(Mercury, T, latitude, longitude);

		Mercury.RA = merCalc.RA;
		Mercury.DEC = merCalc.DEC;
		Mercury.R = merCalc.R;
		Mercury.ALT = merCalc.ALT;
		Mercury.AZ = merCalc.AZ;
		Mercury.HA = merCalc.HA;
		Mercury.r = merCalc.r;
		Mercury.v = merCalc.v;
		Mercury.lonecl = merCalc.lonecl;
		Mercury.latecl = merCalc.latecl;
		Mercury.i = merCalc.i;	//phase angle
		Mercury.k = merCalc.k;	//illuminated fraction
		
		//magnitude
		// Mercury.mag = 1.16 + 5*Math.log10(Mercury.r*Mercury.R) + 0.02838*(Mercury.i - 50) + 0.0001023*(Math.pow((Mercury.i - 50),2));
		Mercury.mag = -0.42 + 5*Math.log10(Mercury.r*Mercury.R) + 0.038*Mercury.i - 2.73e-4*Math.pow(Mercury.i,2) + 2e-6*Math.pow(Mercury.i,3);	//Meeus p. 294
			
		return Mercury;
	}

	function VenusCalc(T, latitude, longitude){
		var L = normalizeValue(181.979801 + 58519.2130302*T + 0.00031014*T*T + 0.000000015*T*T*T, 'd');
		var a = 0.723329820;
		var e = 0.00677192 - 0.000047765*T + 0.0000000981*T*T + 4.6e-10*T*T*T;
		var i = 3.394662 + 0.0010037*T - 8.8e-7*T*T - 7.0e-9*T*T*T;
		var Omega = 76.67992 + 0.9011206*T + 4.0618e-4*T*T - 9.3e-8*T*T*T;
		var pi = 131.563703+1.4022288*T - 0.00107618*T*T - 5.678e-6*T*T*T;
		
		var M = L - pi;
		var w = pi - Omega;
		
		var Venus = {};
		Venus.Name = 'Venus';
		Venus.N = Omega;
		Venus.i = i;
		Venus.w = w;
		Venus.a = a;
		Venus.e = e;
		Venus.M = M;

		var venCalc = calcPlanet(Venus, T, latitude, longitude);

		Venus.RA = venCalc.RA;
		Venus.DEC = venCalc.DEC;
		Venus.R = venCalc.R;
		Venus.ALT = venCalc.ALT;
		Venus.AZ = venCalc.AZ;
		Venus.HA = venCalc.HA;
		Venus.r = venCalc.r;
		Venus.v = venCalc.v;
		Venus.lonecl = venCalc.lonecl;
		Venus.latecl = venCalc.latecl;
		Venus.i = venCalc.i;
		Venus.k = venCalc.k;
		
		Venus.mag = -4 + 5*Math.log10(Venus.r*Venus.R) + 0.01322*Venus.i + 4.247e-7 * Math.pow(Venus.i,3);
		// Venus.mag = -4.4 + 5*Math.log10(Venus.r*Venus.R) + 0.0009*Venus.i + 0.000239*Math.pow(Venus.i,2) - 6.5e-7*Math.pow(Venus.i,3);	//this newer method is less accurate - Meeus p. 294

		return Venus;
	}

	function MarsCalc(T, latitude, longitude){

		var d = D2000;

		var N =  49.5574 + 2.11081E-5 * d;
		var i = 1.8497 - 1.78E-8 * d;
		var  w = 286.5016 + 2.92961E-5 * d;
		var a = 1.523688;
		var e = 0.093405 + 2.516E-9 * d;
		var M =  18.6021 + 0.5240207766 * d;

		var Mars = {};
		Mars.Name = 'Mars';
		Mars.N = N;
		Mars.i = i;
		Mars.w = w;
		Mars.a = a;
		Mars.e = e;
		Mars.M = M;

		var marCalc = calcPlanet(Mars, T, latitude, longitude);

		Mars.RA = marCalc.RA;
		Mars.DEC = marCalc.DEC;
		Mars.R = marCalc.R;
		Mars.ALT = marCalc.ALT;
		Mars.AZ = marCalc.AZ;
		Mars.HA = marCalc.HA;
		Mars.r = marCalc.r;
		Mars.v = marCalc.v;
		Mars.lonecl = marCalc.lonecl;
		Mars.latecl = marCalc.latecl;
		Mars.i = marCalc.i;
		Mars.k = marCalc.k;
		
		Mars.mag = -1.3 + 5*Math.log10(Mars.r*Mars.R) + 0.01486*Mars.i;
		// Mars.mag = -1.52 + 5*Math.log10(Mars.r*Mars.R) + 0.016*Mars.i;	//newer method less accurate, Meeus p.294

		return Mars;
	}

	function JupiterCalc(T, latitude, longitude){

		var d = D2000;

		var N = 100.4542 + 2.76854E-5 * d;
		var i = 1.3030 - 1.557E-7 * d;
		var w = 273.8777 + 1.64505E-5 * d;
		var a = 5.20256;
		var e = 0.048498 + 4.469E-9 * d;
		var M =  19.8950 + 0.0830853001 * d;

		var Jupiter = {};
		Jupiter.Name = 'Jupiter';
		Jupiter.N = N;
		Jupiter.i = i;
		Jupiter.w = w;
		Jupiter.a = a;
		Jupiter.e = e;
		Jupiter.M = M;

		var jupCalc = calcPlanet(Jupiter, T, latitude, longitude);

		Jupiter.RA = jupCalc.RA;
		Jupiter.DEC = jupCalc.DEC;
		Jupiter.R = jupCalc.R;
		Jupiter.ALT = jupCalc.ALT;
		Jupiter.AZ = jupCalc.AZ;
		Jupiter.HA = jupCalc.HA;
		Jupiter.r = jupCalc.r;
		Jupiter.v = jupCalc.v;
		Jupiter.lonecl = jupCalc.lonecl;
		Jupiter.latecl = jupCalc.latecl;
		Jupiter.i = jupCalc.i;
		Jupiter.k = jupCalc.k;
	
		Jupiter.mag = -8.93 + 5*Math.log10(Jupiter.r*Jupiter.R);

		return Jupiter;
	}

	function SaturnCalc(T, latitude, longitude){
		var d = D2000;

		var N = 113.6634 + 2.38980E-5 * d;
		var i = 2.4886 - 1.081E-7 * d;
		var w = 339.3939 + 2.97661E-5 * d;
		var a = 9.55475;
		var e = 0.055546 - 9.499E-9 * d;
		var M = 316.9670 + 0.0334442282 * d;

		var Saturn = {};
		Saturn.Name = 'Saturn';
		Saturn.N = N;
		Saturn.i = i;
		Saturn.w = w;
		Saturn.a = a;
		Saturn.e = e;
		Saturn.M = M;

		var satCalc = calcPlanet(Saturn, T, latitude, longitude);

		Saturn.RA = satCalc.RA;
		Saturn.DEC = satCalc.DEC;
		Saturn.R = satCalc.R;
		Saturn.ALT = satCalc.ALT;
		Saturn.AZ = satCalc.AZ;
		Saturn.HA = satCalc.HA;
		Saturn.r = satCalc.r;
		Saturn.v = satCalc.v;
		Saturn.lonecl = satCalc.lonecl;
		Saturn.latecl = satCalc.latecl;
		Saturn.i = satCalc.i;
		Saturn.k = satCalc.k;
		
		Saturn.mag = 999; //depends on ring orientation, Meeus p.293

		return Saturn;
	}

	function UranusCalc(T, latitude, longitude){
		var d = D2000;

		var N =  74.0005 + 1.3978E-5 * d;
		var i = 0.7733 + 1.9E-8 * d;
		var w =  96.6612 + 3.0565E-5 * d;
		var a = 19.18171 - 1.55E-8 * d;  //(AU)
		var e = 0.047318 + 7.45E-9 * d;
		var M = 142.5905 + 0.011725806 * d;

		var Uranus = {};
		Uranus.Name = 'Uranus';
		Uranus.N = N;
		Uranus.i = i;
		Uranus.w = w;
		Uranus.a = a;
		Uranus.e = e;
		Uranus.M = M;

		var uraCalc = calcPlanet(Uranus, T, latitude, longitude);

		Uranus.RA = uraCalc.RA;
		Uranus.DEC = uraCalc.DEC;
		Uranus.R = uraCalc.R;
		Uranus.ALT = uraCalc.ALT;
		Uranus.AZ = uraCalc.AZ;
		Uranus.HA = uraCalc.HA;
		Uranus.r = uraCalc.r;
		Uranus.v = uraCalc.v;
		Uranus.lonecl = uraCalc.lonecl;
		Uranus.latecl = uraCalc.latecl;
		Uranus.i = uraCalc.i;
		Uranus.k = uraCalc.k;
		
		Uranus.mag = -6.85 + 5*Math.log10(Uranus.r*Uranus.R);

		return Uranus;
	}

	function NeptuneCalc(T, latitude, longitude){
		var d = D2000;

		var N = 131.7806 + 3.0173E-5 * d;
		var i = 1.7700 - 2.55E-7 * d;
		var w = 272.8461 - 6.027E-6 * d;
		var a = 30.05826 + 3.313E-8 * d;  //(AU)
		var e = 0.008606 + 2.15E-9 * d;
		var M = 260.2471 + 0.005995147 * d;

		var Neptune = {};
		Neptune.Name = 'Neptune';
		Neptune.N = N;
		Neptune.i = i;
		Neptune.w = w;
		Neptune.a = a;
		Neptune.e = e;
		Neptune.M = M;

		var nepCalc = calcPlanet(Neptune, T, latitude, longitude);

		Neptune.RA = nepCalc.RA;
		Neptune.DEC = nepCalc.DEC;
		Neptune.R = nepCalc.R;
		Neptune.ALT = nepCalc.ALT;
		Neptune.AZ = nepCalc.AZ;
		Neptune.HA = nepCalc.HA;
		Neptune.r = nepCalc.r;
		Neptune.v = nepCalc.v;
		Neptune.lonecl = nepCalc.lonecl;
		Neptune.latecl = nepCalc.latecl;
		Neptune.i = nepCalc.i;
		Neptune.k = nepCalc.k;
		
		Neptune.mag = -7.05 + 5*Math.log10(Neptune.r*Neptune.R);
	
		return Neptune;
	}
	
	/**
	*	Converts values from polar ecliptic (LBR) coordinate system to equatorial
	*/
	function lbrToEq(obj,t){
		var epsilon = calcObliquity(t);
		
		var a = sin(obj.lambda)*cos(epsilon) - tan(obj.beta)*sin(epsilon);
		var b = cos(obj.lambda)

		obj.RA = r2d(Math.atan2(a,b));
		
		var sinDEC = sin(obj.beta)*cos(epsilon) + cos(obj.beta)*sin(epsilon)*sin(obj.lambda);
		obj.DEC = r2d(Math.asin(sinDEC));
		
		return obj;
	}
	
	//convenience functions
	function sin(deg){
		return Math.sin(d2r(deg));
	}
	
	function cos(deg){
		return Math.cos(d2r(deg));
	}
	
	function tan(deg){
		return Math.tan(d2r(deg));
	}
	
}

Planet.prototype = Object.create(Astronomy.prototype);
