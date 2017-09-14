(function(){

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
      }

    /*
    * Interfaces
    */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt(): number;

        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;


    }

    //interface describing attributes and methods a wagon should have
    interface IWagon{
        capacity: number;
        passengerArray: Traveler[];

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }

    /*
    * Classes
    */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        constructor(food: number, name: string, isHealthy: boolean) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }

        hunt(){
            let success = getRandomIntInclusive(0, 1);
            if(success === 1){
              this.food = this.food + 100;
              return this.food;
            }else {
              return this.food;
            }
        }

        eat(){
            if(this.food >= 20){
                this.food = this.food - 20;
                if(this.food < 20){
                    this.isHealthy = false;
                }
                return this.isHealthy;
            }else{
                this.isHealthy = false;
                return this.isHealthy;
            }
        }

    }

    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {
        capacity: number;
        passengerArray: Traveler[];

        constructor(capacity: number, passengerArray: Traveler[]){
            this.capacity = capacity;
            this.passengerArray = passengerArray;
        }

        addPassenger(traveler: Traveler){
            if(this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler)
                return "added"
              }else{
                return "sorry"
              }
        }
        
        isQuarantined(){
            for(let i=0; i < this.passengerArray.length ; i++){
                if (this.passengerArray[i].isHealthy === false) {
                  return true;
                }
              }
              return false;
        }
        
        getFood(){
            let wagonFood = 0;
            for(let i=0; i < this.passengerArray.length ; i++){
              wagonFood += this.passengerArray[i].food;
            }
            return wagonFood;
        }
    }

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

    let Charlie = new Traveler(getRandomIntInclusive(0, 100), "Charlie", true);
    let Alex = new Traveler(getRandomIntInclusive(0, 100), "Alex", true);
    let Sarah = new Traveler(getRandomIntInclusive(0, 100), "Sarah", true);
    let Matt = new Traveler(getRandomIntInclusive(0, 100), "Matt", true);
    let Jenna = new Traveler(getRandomIntInclusive(0, 100), "Jenna", true);

    let SuperWagon = new Wagon(4, []);

    console.log(Charlie.eat())
    console.log(Alex.eat())
    console.log(Sarah.eat())
    console.log(Matt.hunt())
    console.log(Jenna.hunt())

    let travelerArray = [Charlie, Alex, Sarah, Matt, Jenna]

    for(let i=0; i < travelerArray.length; i++){
        let randomChance = getRandomIntInclusive(0, 1);
        if(randomChance === 1){
            if(SuperWagon.passengerArray.length < SuperWagon.capacity){
                SuperWagon.addPassenger(travelerArray[i])
            }          
        }
    }

    console.log(SuperWagon.isQuarantined())
    console.log(SuperWagon.getFood())

})();


