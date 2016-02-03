/**
*	Crude unit testing library
*/


	/*
	*	Displays status of several asserts to browser
	*/
function displayStatus(status,comment){
	var domElem = document.getElementById('test-placeholder');
	
	
	if(status.indexOf(false) == -1){
		// var p = document.createElement('<p class="ut-success">' + comment + ' <span>PASSED</span></p>');
		var p = document.createElement("p");
		var a = document.createAttribute('class');
		a.value = 'ut-success';
		p.setAttributeNode(a);
		var cont = document.createTextNode(comment + ' PASSED');
		
		p.appendChild(cont);
		domElem.appendChild(p);
	}
	else{
		var p = document.createElement("p");
		var a = document.createAttribute('class');
		a.value = 'ut-failure';
		p.setAttributeNode(a);
		var cont = document.createTextNode(comment + ' FAILED');
		
		p.appendChild(cont);
		domElem.appendChild(p);
	}
}

function assertEquals(expected,actual,comment){
	if(expected == actual){
		// return 'pass';
		return true;
	}
	else{
		console.log('Unit test failure: ' + comment + ', got: ' + actual + ', expected: ' + expected);
		return false;
	}
}

function TestAstronomy(){
	this.time = new Date;
	this.latitude = 43.92;
	this.longitude = 22.30;
	
	Astronomy.call(this,this.time,this.latitude,this.longitude);
	
	//Tests
	
	(function testNormalizeValue(){
		var status = [];
		
		var test = Astronomy.prototype.normalizeValue(365,'d');
		status.push(assertEquals(5,test,'normalizeValue - degree'));
		
		test = Astronomy.prototype.normalizeValue(-1,'h');
		status.push(assertEquals(23,test));
		
		test = Astronomy.prototype.normalizeValue(-1.2,1);
		status.push(assertEquals(0.8,test));
		
		displayStatus(status,'normalizeValue');
	})();
	
	(function testRounder(){
		var status = [];
		
		var test = Astronomy.prototype.rounder(124.21564,1);
		status.push(assertEquals(124.2,test));
		
		var test = Astronomy.prototype.rounder(124.200,1);
		status.push(assertEquals(124.2,test));
		
		var test = Astronomy.prototype.rounder(124.0,1);
		status.push(assertEquals(124.0,test,'rounder'));
	
		var test = Astronomy.prototype.rounder(124.7839128,6);
		status.push(assertEquals(124.783913,test))
		
		displayStatus(status,'rounder');
	})();
	
	(function testGetCentFromDecimal(){
		var status = [];
		var t = new Date;
		var cent = Astronomy.prototype.calcCent(t);
		
		var test = Astronomy.prototype.getCentFromDecimal(cent,15.75,0);
		
		t.setHours(15);
		t.setMinutes(45);
		t.setSeconds(0);
		var expected = Astronomy.prototype.calcCent(t);
		status.push(assertEquals(expected,test,'getCentFromDecimal'));
		
		var test = Astronomy.prototype.getCentFromDecimal(cent,15.75,1);
		var day = t.getDate();
		t.setDate(day+1);
		expected = Astronomy.prototype.calcCent(t);
		status.push(assertEquals(expected,test,'getCent day+1'));
		
		t.setFullYear(2016);
		t.setMonth(0);
		t.setDate(1);
		t.setHours(13);
		t.setMinutes(0);
		t.setSeconds(0);
	
		cent = Astronomy.prototype.calcCent(t);
		
		var test = Astronomy.prototype.getCentFromDecimal(cent,13.0,0);
		var expected = cent;
		status.push(assertEquals(expected,test,'getCentFromDecimal'));
		
		displayStatus(status,'getCentFromDecimal');
	})();
	
	(function testCalcJDN(){
		var status = [];
		var time = new Date;
		
		time.setFullYear(2016);
		time.setMonth(0);
		time.setDate(1);
		
		time.setHours(1);
		time.setMinutes(0);
		time.setSeconds(0);
		
		var test = Astronomy.prototype.calcJDN(time);
		var expected = 2457389;
		status.push(assertEquals(expected,test,'JDN calc'));
		
		displayStatus(status, 'calcJDN test');
	})();
}

TestAstronomy.prototype = Object.create(Astronomy.prototype);

TestAstronomy();

//planets

function TestPlanet(){
	
	var obj = {};
	obj.time = new Date;
	obj.latitude = 43.92;
	obj.longitude = 22.30;
	obj.name = 'Unit_test';

	var planet = new Planet(obj);
	// console.log(obj);
	// Planet.call(obj);
	
	//Tests
	function testMoonCalc(obj){
		obj.time.setMonth(0);
		obj.time.setDate(1);
		obj.time.setMinutes(0);
		obj.time.setSeconds(0);
		// var moon = [];
	// console.log(obj);	
	
		obj.time.setHours(0);
		planet = new Planet(obj);
		var ut = planet.getMoon();
		console.log(obj.time);
		console.log(ut);
		console.log('-----');
		
		obj.time.setHours(6);
		planet = new Planet(obj);
		ut = planet.getMoon();
		console.log(planet);
		console.log(obj.time);
		console.log(ut);
		console.log('-----');

		obj.time.setHours(12);
		planet = new Planet(obj);
		ut = planet.getMoon();
		console.log(obj.time);
		console.log(ut);
		console.log('-----');

		obj.time.setHours(15);
		planet = new Planet(obj);
		ut = planet.getMoon();
		console.log(obj.time);
		console.log(ut);
		console.log('-----');

		obj.time.setHours(21);
		planet = new Planet(obj);
		ut = planet.getMoon();
		console.log(obj.time);
		console.log(ut);
		console.log('-----');
		
		//Meeus test values, p.351, matches RA and DEC within 2" for RA and 4" for DEC - OK
		//obj.time.setFullYear(1992);
		//obj.time.setMonth(3);
		//obj.time.setDate(12);
		//obj.time.setHours(2);
		//planet = new Planet(obj);
		//ut = planet.getMoon();
		//console.log(obj.time);
		//console.log(ut);
		
		
	}
	
	//testMoonCalc(obj);
}

// TestPlanet.prototype = Object.create(Planet.prototype);

TestPlanet();
