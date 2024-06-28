#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Game Variables;
let enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth: number = 75;
let enemyAttackDamage: number = 25;

//Player Variables;
let health: number = 100;
let attackDamage: number = 50;
let numHealthPotions: number = 3;
let healthPotionHealAmount: number = 30;
let healthPotionDropChance: number = 50; //Percentage

let running: boolean = true;

console.log(chalk.bold.italic.underline.blue("\t Welcome to the Dungeon"));

//We use do while loop when we want to run a program at least once before
//checking its conditon . and in while loop ir first checks its condition
//then it iterate .

game: do {
  console.log("-".repeat(45));
  // Generate a random integer
  let enemyHealth: number = Math.floor(Math.random() * maxEnemyHealth + 1);

  // Generate a random index within the range of the array length
  let randstring: number = Math.floor(Math.random() * enemies.length);

  // Use the random index to select a random enemy name
  let enemy: string = enemies[randstring];
  console.log("\t #   ", chalk.bold.red(enemy) + " has appeared!   #\n");

  while (enemyHealth > 0) {
    console.log(`Your Health : ${health}`);
    console.log(enemy + "'s Health is " + enemyHealth);
    console.log("\n What would you like to do?");

    const answers = await inquirer.prompt([{
       name: "action",
       type: "list",
       message: "Choose an action",
       choices: ["Attack", "Drink Health Potion", "Run"]
   }]);

    const action = answers.action;

    if (action === "Attack") {
      let damageDealt = Math.floor(Math.random() * attackDamage);
      let damageTaken = Math.floor(Math.random() * enemyAttackDamage);

      enemyHealth -= damageDealt;
      health -= damageTaken;

      console.log(`> You strike the ${enemy} for ${damageDealt} damage.`);
      console.log(`> You receive ${damageTaken} in retaliation.`);

      if (health < 1) {
       console.log("You have taken too much damage. You are too weak to go on.");
       running = false;
       break game;
      } 

    }else if(action === "Drink Health Potion"){
      if (numHealthPotions > 0){
        health +=  healthPotionHealAmount;
        numHealthPotions--;
        console.log("You drink a health potion , healing your self for " + healthPotionHealAmount
                     + "\n You now have " + health + " HP."  
                     + "\n you have " + numHealthPotions + " Health potions left . \n "
        )
        
      }else {
        console.log("You have no health potions left, get one by defeating enemy ");
        
       }
    }else if (action === "Run"){
      console.log("You have run away from " + enemy  + " !");
      const cont=await inquirer.prompt([{
        name:"continu",
        type:"list",
        message: "DO you wanna continue or exit",
        choices: ["Continue", "Exit"]
      }])
      const permission = cont.continu
      
      if (permission === "Continue"){
        continue game;

      }else if(permission === "Exit"){
        process.exit();

      }
    }

    if (enemyHealth <= 0) {
      console.log(chalk.green(`> The ${enemy} was defeated!`));
      console.log(`> You have ${health} HP left.`);
      if (Math.random() * 100 < healthPotionDropChance) {
          numHealthPotions++;
          console.log(`> The ${enemy} dropped a health potion! You now have ${numHealthPotions} health potion(s).`);
      }
  }
    
    
  }

}while (running);
