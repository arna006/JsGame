let startScreen = {
  html: document.getElementById("startScreen"),
};

let gameConsole = {
  html: document.getElementById("output-div"),
};

let player = {
  player1: document.getElementById("warrior"),
  player2: document.getElementById("warrior2"),
  hp: {
    html: document.getElementById("life-bar"),
    amount: 300,
  },
  tree: 0,
  metal: 0,
  strength: 10,
  sword: false,
};

let helpers = {
  html: document.getElementById("helpers"),
  strength: 10,
  amount: 2,
};

let monster = {
  html: document.getElementById("monster-div"),
  monster1: {
    html: '<img id="monster1" src="./images/cute-wolfman.png">',
    strength: 10,
    hp: 40,
    alive: true,
  },
  monster2: {
    html: '<img id="monster2" src="./images/cute-wolfman.png">',
    strength: 10,
    hp: 40,
    alive: true,
  },
  monster3: {
    html: '<img id="monster3" src="./images/cute-wolfman.png">',
    strength: 10,
    hp: 40,
    alive: true,
  },
  specialMonster: {
    html: '<img id="specialMonster" src="./images/Skeleton.png" style="display:none;">',
    strength: 20,
    hp: 60,
  },
};

let materialInfo = {
  html: document.getElementById("material-info"),
};

let buttonMenu = {
  buyBuilding1: {
    html: document.getElementById("buy-building-1-btn"),
    div: document.getElementById("building-div"),
    antall: 0,
  },
  buyBuilding2: {
    html: document.getElementById("buy-building-2-btn"),
    div: document.getElementById("building-div"),
    antall: 0,
  },
  healthPotion: {
    html: document.getElementById("buy-healt-potion"),
  },
  buySword: {
    html: document.getElementById("buy-sword-btn"),
  },
};

let forest = {
  tree1: {
    html: document.getElementById("tree-1"),
    hp: 10,
    resources: 25,
  },
  tree2: {
    html: document.getElementById("tree-2"),
    hp: 10,
    resources: 25,
  },
  tree3: {
    html: document.getElementById("tree-3"),
    hp: 10,
    resources: 25,
  },
};

let cave = {
  html: document.getElementById("metal-mine"),
  resources: 10,
};

let gameOver = {
  html: document.getElementById("gameOver"),
};

let gameWin = {
  html: document.getElementById("gameWin"),
};

let antallBygningerTot = 0;

let helpersAttack = false;

player.player1.addEventListener("mousedown", () => {
  document.getElementById("warrior-container").innerHTML +=
    '<img id="warrior-1" src="./images/warrior.png">';
  startScreen.html.style.display = "none";
  helpersAttack = true;
});

player.player2.addEventListener("mousedown", () => {
  document.getElementById("warrior-container").innerHTML +=
    '<img id="warrior-1" src="./images/warrior2.png">';
  startScreen.html.style.display = "none";
  helpersAttack = true;
});

player.hp.html.innerHTML = `${player.hp.amount}hp`;

materialInfo.html.innerHTML = `Treverk: ${player.tree} enheter. Metall: ${player.metal} enheter. Antall bygninger: ${antallBygningerTot} Styrke: ${player.strength}`;

helpers.html.innerHTML =
  '<img id="helper1" src="./images/helper.png"><img id="helper2" src="./images/helper.png">';

monster.html.innerHTML =
  monster.monster1.html +
  monster.monster2.html +
  monster.monster3.html +
  monster.specialMonster.html;

gameConsole.html.children.length;

for (let i = 0; i < gameConsole.html.children.length; i++) {
  console.log(gameConsole.html.children[i]);
}

const spawnTime = 1000;

let gameLoop = true;

let M_amount;
let counterLoop = window.setInterval(function () {
  M_amount = 0;
  for (let i in monster) {
    if (i === "html") {
      continue;
    } else {
      if (document.getElementById("" + i + "").style.display === "none") {
        continue;
      } else {
        M_amount++;
      }
      if (monster[i].hp <= 0) {
        M_amount--;
      }
    }
  }
  if (gameConsole.html.children.length >= 6) {
    while (gameConsole.html.firstChild) {
      gameConsole.html.removeChild(gameConsole.html.firstChild);
    }
  }
  // console.log(M_amount);
  if (trees === 0 && player.tree === 0) {
    console.log("COngrats! u won");
    gameWin.html.style.display = "block";
    clearInterval(counterLoop);
  }
}, 100);

window.setInterval(function () {
  if (gameLoop && helpersAttack) {
    for (let i in monster) {
      if (i === "html") {
        continue;
      } else {
        if (document.getElementById("" + i + "").style.display === "none") {
          continue;
        } else {
          if (monster[i].hp <= 0) {
            document.getElementById("" + i + "").style.display = "none";
          }
          monster[i].hp -= helpers.strength;
        }
      }
      console.log("Monster Liv: " + monster[i].hp);
    }

    if (M_amount <= 0) {
      console.log("h");
      window.setTimeout(monsterSpawn, spawnTime);
      gameLoop = false;
    } else {
      gameConsole.html.innerHTML += `<p>Hjelpere gjorde ${helpers.strength}skade på monsterne</p>`;
    }
    console.log("Antall monstre: " + M_amount);
  } else {
    gameLoop = true;
  }
}, 5000);

for (let i in monster) {
  if (i == "html") {
    continue;
  } else {
    document.getElementById("" + i + "").addEventListener("mousedown", () => {
      player.hp.amount -= monster[i].strength;
      player.hp.html.innerHTML = `${player.hp.amount}hp`;
      if (player.sword) {
        player.strength = 40;
        gameConsole.html.innerHTML += `<p>player angrep monsteret for ${player.strength}</p>`;
        monster[i].hp -= player.strength;
      } else {
        monster[i].hp -= player.strength;
        gameConsole.html.innerHTML += `<p>player angrep monsteret for ${player.strength}</p>`;
      }
      if (monster[i].hp <= 0) {
        document.getElementById("" + i + "").style.display = "none";
      }
      // debugger;
      if (player.hp.amount <= 0) {
        console.log("Game over");
        gameOver.html.style.display = "block";
      }
      console.log("monsterHP:" + monster[i].hp);
    });
  }
}

for (let i in buttonMenu) {
  buttonMenu[i].html.addEventListener("mousedown", () => {
    if (M_amount === 0) {
      if (i == "buyBuilding1") {
        if (player.metal >= 10 && player.tree >= 50) {
          player.metal = player.metal - 10;
          player.tree = player.tree - 50;
          antallBygningerTot += 1;
          buttonMenu[i].div.innerHTML +=
            '<img src="../images/building-1.png"></img>';
          materialInfo.html.innerHTML = `Treverk: ${player.tree} enheter. Metall: ${player.metal} enheter. Antall bygninger: ${antallBygningerTot} Styrke: ${player.strength}`;
          gameConsole.html.innerHTML += `<p>player kjøpte bygg1 for 50 trær og 10 metall</p>`;

          console.log(player.metal);
          console.log(player.tree);
        } else {
          gameConsole.html.innerHTML += `<p>Du har ikke nok ressurser</p>`;
        }
        console.log("Building1");
      } else if (i == "buyBuilding2") {
        if (player.metal >= 30 && player.tree >= 150) {
          player.metal = player.metal - 30;
          player.tree = player.tree - 150;
          antallBygningerTot += 1;
          buttonMenu[i].div.innerHTML +=
            '<img src="../images/building-3.png"></img>';
          materialInfo.html.innerHTML = `Treverk: ${player.tree} enheter. Metall: ${player.metal} enheter. Antall bygninger: ${antallBygningerTot} Styrke: ${player.strength}`;
          gameConsole.html.innerHTML += `<p>player kjøpte bygg2 for 150 tre og 30 metall</p>`;
          console.log(player.metal);
          console.log(player.tree);
        } else {
          console.log("Du har ikke nok ressurser");
          gameConsole.html.innerHTML += `<p>Du har ikke nok ressurser</p>`;
        }
        console.log("buyBuilding2");
      } else if (i == "healthPotion") {
        if (player.metal >= 20) {
          player.metal -= 20;
          player.hp.amount += 40;
          materialInfo.html.innerHTML = `Treverk: ${player.tree} enheter. Metall: ${player.metal} enheter. Antall bygninger: ${antallBygningerTot} Styrke: ${player.strength}`;
          player.hp.html.innerHTML = `${player.hp.amount}hp`;
          gameConsole.html.innerHTML += `<p>player kjøpte healthPotion for 20 metall</p>`;
        } else {
          gameConsole.html.innerHTML += `<p>Du har ikke nok ressurser</p>`;
          console.log(player.metal);
        }
      } else {
        console.log("Sword");
        if (player.metal >= 200) {
          player.metal = player.metal - 200;
          player.sword = true;
          player.strength = 40;
          buttonMenu[i].html.remove();
          materialInfo.html.innerHTML = `Treverk: ${player.tree} enheter. Metall: ${player.metal} enheter. Antall bygninger: ${antallBygningerTot} Styrke: ${player.strength}`;
          gameConsole.html.innerHTML += `<p>player kjøpte sverd for 200 metall</p>`;

          console.log(player.strength);
          console.log(player.sword);
          console.log(player.metal);
        } else {
          gameConsole.html.innerHTML += `<p>Du har ikke nok ressurser</p>`;
          console.log(player.sword);
        }
        console.log(buttonMenu[i].html);
      }
    } else {
      gameConsole.html.innerHTML += `<p>Du kan ikke bruke shopen under angrep!</p>`;
    }
  });
}

let trees = 3;

for (let i in forest) {
  forest[i].html.addEventListener("mousedown", () => {
    if (M_amount === 0) {
      forest[i].hp--;
      player.tree += forest[i].resources;
      materialInfo.html.innerHTML = `Treverk: ${player.tree} enheter. Metall: ${player.metal} enheter. Antall bygninger: ${antallBygningerTot} Styrke: ${player.strength}`;
      gameConsole.html.innerHTML += `<p>player fikk ${forest[i].resources} tre</p>`;
      if (forest[i].hp <= 0) {
        forest[i].html.remove();
      }
      if (M_amount > 0) {
        player.hp.amount -= monster.monster1.strength;
        player.hp.html.innerHTML = `${player.hp.amount}hp`;
        if (player.hp.amount <= 0) {
          console.log("Game over");
          gameOver.html.style.display = "block";
        }
      }
      console.log(player.tree);
    } else {
      gameConsole.html.innerHTML += `<p>Du kan ikke hogge tre under angrep!</p>`;
    }
    if (forest[i].hp === 0) {
      trees--;
      console.log("Trees: " + trees);
    }
  });
}

cave.html.addEventListener("mousedown", () => {
  if (M_amount === 0) {
    player.metal += cave.resources;
    console.log(player.metal);
    materialInfo.html.innerHTML = `Treverk: ${player.tree} enheter. Metall: ${player.metal} enheter. Antall bygninger: ${antallBygningerTot} Styrke: ${player.strength}`;
    gameConsole.html.innerHTML += `<p>player fikk ${cave.resources} Metall</p>`;
    if (M_amount > 0) {
      player.hp.amount -= monster.monster1.strength;
      player.hp.html.innerHTML = `${player.hp.amount}hp`;
      if (player.hp.amount <= 0) {
        console.log("Game over");
        gameOver.html.style.display = "block";
      }
    }
  } else {
    gameConsole.html.innerHTML += `<p>Du kan ikke mine metall under angrep!</p>`;
  }
});

function monsterSpawn() {
  console.log("Test");

  let randomMonster = Math.floor(Math.random() * (3 - 1 + 1) + 1);

  let randomSpecialMonster = Math.floor(Math.random() * (2 - 1 + 1) + 1);

  if (randomSpecialMonster == 1) {
    randomSpecialMonster = true;
  } else {
    randomSpecialMonster = false;
  }

  console.log("randomMonster: " + randomMonster);
  console.log("randomSpecialMonster: " + randomSpecialMonster);

  if (randomMonster == 1) {
    if (randomSpecialMonster) {
      monster.specialMonster.hp = 60;
      document.getElementById("specialMonster").style.display = "block";
    } else {
      monster.monster1.hp = 40;
      document.getElementById("monster1").style.display = "block";
    }
  } else if (randomMonster == 2) {
    if (randomSpecialMonster) {
      monster.specialMonster.hp = 60;
      document.getElementById("specialMonster").style.display = "block";
      monster.monster1.hp = 40;
      document.getElementById("monster1").style.display = "block";
    } else {
      monster.monster1.hp = 40;
      document.getElementById("monster1").style.display = "block";
      monster.monster2.hp = 40;
      document.getElementById("monster2").style.display = "block";
    }
  } else {
    if (randomSpecialMonster) {
      monster.specialMonster.hp = 60;
      document.getElementById("specialMonster").style.display = "block";
      monster.monster1.hp = 40;
      document.getElementById("monster1").style.display = "block";
      monster.monster2.hp = 40;
      document.getElementById("monster2").style.display = "block";
    } else {
      monster.monster1.hp = 40;
      document.getElementById("monster1").style.display = "block";
      monster.monster2.hp = 40;
      document.getElementById("monster2").style.display = "block";
      monster.monster3.hp = 40;
      document.getElementById("monster3").style.display = "block";
    }
  }
}