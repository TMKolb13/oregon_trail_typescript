(function () {
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
    /*
    * Classes
    */
    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    var Traveler = /** @class */ (function () {
        function Traveler(food, name, isHealthy) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }
        Traveler.prototype.hunt = function () {
            var success = getRandomIntInclusive(0, 1);
            if (success === 1) {
                this.food = this.food + 100;
                return this.food;
            }
            else {
                return this.food;
            }
        };
        Traveler.prototype.eat = function () {
            if (this.food >= 20) {
                this.food = this.food - 20;
                if (this.food < 20) {
                    this.isHealthy = false;
                }
                return this.isHealthy;
            }
            else {
                this.isHealthy = false;
                return this.isHealthy;
            }
        };
        return Traveler;
    }());
    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    var Wagon = /** @class */ (function () {
        function Wagon(capacity, passengerArray) {
            this.capacity = capacity;
            this.passengerArray = passengerArray;
        }
        Wagon.prototype.addPassenger = function (traveler) {
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler);
                return "added";
            }
            else {
                return "sorry";
            }
        };
        Wagon.prototype.isQuarantined = function () {
            for (var i = 0; i < this.passengerArray.length; i++) {
                if (this.passengerArray[i].isHealthy === false) {
                    return true;
                }
            }
            return false;
        };
        Wagon.prototype.getFood = function () {
            var wagonFood = 0;
            for (var i = 0; i < this.passengerArray.length; i++) {
                wagonFood += this.passengerArray[i].food;
            }
            return wagonFood;
        };
        return Wagon;
    }());
    /*
    * Play the game
    *
    * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    *
    * Create wagon with an empty passenger list and a capacity of 4.
    *
    * Make 3 of 5 the travelers eat by calling their eat methods
    *
    * Make the remaining 2 travelers hunt
    *
    * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.
    *
    * Run the isQuarantined method for the wagon
    *
    * Run the getFood method for the wagon
    *
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects
    *
    */
    var Charlie = new Traveler(getRandomIntInclusive(0, 100), "Charlie", true);
    var Alex = new Traveler(getRandomIntInclusive(0, 100), "Alex", true);
    var Sarah = new Traveler(getRandomIntInclusive(0, 100), "Sarah", true);
    var Matt = new Traveler(getRandomIntInclusive(0, 100), "Matt", true);
    var Jenna = new Traveler(getRandomIntInclusive(0, 100), "Jenna", true);
    var SuperWagon = new Wagon(4, []);
    Charlie.eat();
    Alex.eat();
    Sarah.eat();
    Matt.hunt();
    Jenna.hunt();
    var travelerArray = [Charlie, Alex, Sarah, Matt, Jenna];
    for (var i = 0; i < travelerArray.length; i++) {
        var randomChance = getRandomIntInclusive(0, 1);
        if (randomChance === 1) {
            if (SuperWagon.passengerArray.length < SuperWagon.capacity) {
                SuperWagon.addPassenger(travelerArray[i]);
            }
        }
    }
    SuperWagon.isQuarantined();
    SuperWagon.getFood();
    //console logs for every method with a return
    var exampleTraveler = new Traveler(getRandomIntInclusive(0, 100), "exampleTraveler", true);
    console.log(exampleTraveler.eat());
    console.log(exampleTraveler.hunt());
    var exampleWagon = new Wagon(4, []);
    console.log(exampleWagon.addPassenger(exampleTraveler));
    console.log(exampleWagon.getFood());
    console.log(exampleWagon.isQuarantined());
})();
