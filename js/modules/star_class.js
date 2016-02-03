/**
*	Star Class
*/

function Star(obj){
	//************************
	//	Contants
	//************************
	var JDN0 = 2451545;

	//************************
	//	Setting variables
	//************************
	this.name = obj.name || 'Name Undefined';
	this.constellation = obj.constellation || 'constellation undefined';
	
	if(obj.time && !isNaN(obj.time.getFullYear())){
		this.time = obj.time;
	}
	else{
		throw new Error('Time not passed to Star constructor');
	}

	if(!isNaN(obj.latitude)){
		this.latitude = obj.latitude;
	}
	else{
		throw new Error('Latitude not passed to Star constructor');
	}
	
	if(!isNaN(obj.longitude)){
		this.longitude = obj.longitude;
	}
	else{
		throw new Error('Longitude not passed to Star constructor');
	}

	this.RA2000 = obj.RA;
	this.DEC2000 = obj.DEC;

	//proper motion should be 0 if not specified
	this.PMRA = obj.PMRA || 0;
	this.PMDEC = obj.PMDEC || 0;
	
	this.starClass = obj.starClass;
	this.mag = obj.mag;	//magnitude
	
	Astronomy.call(this,this.time,this.latitude,this.longitude);
	
	//************************
	//	Public functions - self explanatory
	//************************
	this.getName = function getName(){
		return this.name;
	}
	this.getConstellation = function getConstellation(){
		return this.constellation;
	}
	this.getRA = function getRA(){
		return this.sexagesimalConv(this.RA, 'hour');
	}

	this.getDEC = function getDEC(){
		return this.sexagesimalConv(this.DEC, 'deg');
	}

	this.getALT = function getALT(){
		return this.sexagesimalConv(this.ALT, 'deg');
	}

	this.getAZ = function getAZ(){
		return this.sexagesimalConv(this.AZ, 'deg');
	}
	
	this.getHA = function getHA(){
		return this.sexagesimalConv(this.HA, 'hour');
	}
	
	this.getStarClass = function getStarClass(){
		return this.starClass;
	}
	
	this.getMag = function getMag(){
		return this.mag;
	}
	
	this.getLAST = function getLAST(){
		return this.sexagesimalConv(this.LAST, 'hour');
	}
	
	this.getDate = function getDate(){
		return this.formatTime(this.time,'d');
	}
	
	this.getTime = function getTime(){
		return this.formatTime(this.time,'t');
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
		return this.jdnP;
	}
	
	/**
	*	Rise/Transit/Set times
	*/
	this.getRTS = function getRTS(){
		
		if(this.RTS.R){
			this.RTS.R = this.sexagesimalConv(this.RTS.R,'h');
			//if star rose on the previous day
			if(this.RTS.yesterday){
				this.RTS.R += ' - yesterday';
			}
		}
		else{
			this.RTS.R = '--'
		}
	
		this.RTS.T = this.sexagesimalConv(this.RTS.T,'h');
		
		if(this.RTS.S){
			this.RTS.S = this.sexagesimalConv(this.RTS.S,'h');
			//if star sets after midnight
			if(this.RTS.tomorrow){
				this.RTS.S += ' - tomorrow';
			}
		}
		else{
			this.RTS.S = '--';
		}
		
		return this.RTS;
	}
	
	//------------------------
	//	Assignments
	//------------------------
	var d2r = this.d2r;
	var r2d = this.r2d;
	var normalizeValue = this.normalizeValue;
	
	//------------------------
	//	Main calculations
	//------------------------
	var cent = this.calcCent(this.time);
	
	var pm = calcProperMotion(cent, this.RA2000, this.DEC2000, this.PMRA, this.PMDEC);
	this.RAp = pm.RA;	//RA adjusted for proper motion
	this.DECp = pm.DEC;
	
	//calculate precession
	var eq = calcPrecession(cent, this.RAp, this.DECp);

	this.RA = this.normalizeValue(eq.RA, 'h');	//RA of date
	this.DEC = eq.DEC;

	this.LAST = this.calcSidereal(this.time, this.longitude);

	this.HA = this.normalizeValue(this.LAST - this.RA, 'h');	//hours

	var azimPos = this.calcAzim(this.DEC, this.latitude, this.HA); //azimuthal position

	this.ALT = azimPos.ALT;
	this.AZ = azimPos.AZ;
	
	//rise/transit/set
	this.RTS = this.calcRTS(cent,this.latitude,this.longitude,this,'star');
	
	//************************
	//	'Private' methods
	//************************

	/**
	*   Calculates proper motion
	*
	*   @param float time in centuries since J2000
	*   @param float RA Right Ascencio in hours
	*   @param float DEC Declination in degrees
	*   @param float PMRA Proper motion in RA in mas/yr
	*   @param float PMDEC Proper motion in DEC in mas/yr
	*   @return object
	*/
	function calcProperMotion(t, RA, DEC, PMRA, PMDEC){
		t *= 100; //time in years

	    var coord = {};

	    coord.RA = t * (PMRA/3.6e6)/15 + RA;
	    coord.DEC = t* (PMDEC/3.6e6) + DEC;

	    return coord;
	}

	/**
	*   Calculates precession based on formulae from Meeus p.142
	*
	*   @param float time in centuries since J2000
	*   @param float RA0 J2000 Right Ascension
	*   @param float DEC0 J2000 Declination
	*   @return object
	*/
	function calcPrecession(t, RA0, DEC0){

	    var zeta, z, theta; //original calcs are arcseconds
	    
	    zeta = (2306.2181*t + 0.30188*t*t + 0.017998*t*t*t)/3600;
	    z = (2306.2181*t + 1.09468*t*t + 0.018203*t*t*t)/3600;
	    theta = (2004.3109*t - 0.42665*t*t - 0.041833*t*t*t)/3600;
	    
	    zeta = d2r(zeta);
	    z = d2r(z);
	    theta = d2r(theta);

	    var A,B,C;
	    
	    RA0 = d2r(RA0*15);
	    DEC0 = d2r(DEC0);

	    A = Math.cos(DEC0) * Math.sin(RA0 + zeta);
	    B = Math.cos(theta) * Math.cos(DEC0) * Math.cos(RA0 + zeta) - Math.sin(theta) * Math.sin(DEC0);
	    C = Math.sin(theta) * Math.cos(DEC0) * Math.cos(RA0 + zeta) + Math.cos(theta) * Math.sin(DEC0);

	    var coord = {};
	    
	    coord.RA = normalizeValue(r2d(Math.atan2(A,B) + z)/15, 'h');
	    coord.DEC = r2d(Math.asin(C));
	    
	    return coord;
	}

}

Star.prototype = Object.create(Astronomy.prototype);