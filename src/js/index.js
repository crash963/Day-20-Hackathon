"use strict";

class Pacman {
  constructor(xpos, ypos, tileSize, stage) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.position = this.findPosition();
    this.TILE_SIZE = tileSize;
    this.mouth = "open";
    this.pacman = this.createHTML();
    this.direction = "right";
    this.stage = this.addToStage(stage);
    this.score = 0;
    this.isDead = false;
    this.addListener();
    this.update();
  }

  findPosition() {
    const positionXY = [this.xpos / 85, this.ypos / 85];
    return positionXY;
  }

  createHTML() {
    const pacman = document.createElement("div");
    pacman.className = "entity entity--pac pacboy-active-light";

    return pacman;
  }

  addListener() {
    document.addEventListener("keyup", (e) => {
      this.move(e);
    });
  }

  deathChance() {
    const random = Math.floor(Math.random() * 100) + 1;
    if (random > 50) {
      return true;
    } else {
      return false;
    }
  }

  bomb(entity) {
    entity.unmount();
    if (!this.deathChance()) {
      return;
    }
    this.pacman.classList.remove("pacboy-active-light");
    this.pacman.classList.remove("entity--pac");
    this.pacman.classList.add("entity--tomb");
    this.isDead = true;
  }

  move(e) {
    if (this.isDead) return;
    const stageWidth =
      document.querySelector(".stage").getBoundingClientRect().width / 85 - 1;
    const stageHeight =
      document.querySelector(".stage").getBoundingClientRect().height / 85 - 1;

    this.pacman.classList.toggle("pacman--close");

    console.log(this.score);

    if (e.key === "ArrowRight") {
      this.pacman.style.backgroundPositionY = `-3%`;
      if (this.position[0] === stageWidth) {
        return;
      }
      const targetX = this.xpos + this.TILE_SIZE;
      const entity = this.stage.collisionDetection(targetX, this.ypos);
      if (entity) {
        console.log(entity);
        if (entity.type === "wall") {
          return false;
        } else if (entity.type === "apple") {
          entity.unmount();
          this.score++;
        } else if (entity.type === "bomb") {
          this.bomb(entity);
        }
      }

      console.log("test");
      this.xpos += this.TILE_SIZE;
      this.direction = "right";
      this.update();
    }
    if (e.key === "ArrowUp") {
      this.pacman.style.backgroundPositionY = `97%`;
      if (this.position[1] === 0) {
        return;
      }

      const targetY = this.ypos - this.TILE_SIZE;
      const entity = this.stage.collisionDetection(this.xpos, targetY);
      if (entity) {
        console.log(entity);
        if (entity.type === "wall") {
          return false;
        } else if (entity.type === "apple") {
          entity.unmount();
          this.score++;
        } else if (entity.type === "bomb") {
          this.bomb(entity);
        }
      }

      this.ypos -= this.TILE_SIZE;
      this.direction = "up";
      this.update();
    }
    if (e.key === "ArrowLeft") {
      this.pacman.style.backgroundPositionY = `29%`;
      if (this.position[0] === 0) {
        return;
      }
      const targetX = this.xpos - this.TILE_SIZE;
      const entity = this.stage.collisionDetection(targetX, this.ypos);
      if (entity) {
        console.log(entity);
        if (entity.type === "wall") {
          return false;
        } else if (entity.type === "apple") {
          entity.unmount();
          this.score++;
        } else if (entity.type === "bomb") {
          this.bomb(entity);
        }
      }

      this.xpos -= this.TILE_SIZE;
      this.direction = "left";
      this.update();
    }
    if (e.key === "ArrowDown") {
      this.pacman.style.backgroundPositionY = `197%`;
      if (this.position[1] === stageHeight) {
        return;
      }
      const targetY = this.ypos + this.TILE_SIZE;
      const entity = this.stage.collisionDetection(this.xpos, targetY);
      if (entity) {
        console.log(entity);
        if (entity.type === "wall") {
          return false;
        } else if (entity.type === "apple") {
          entity.unmount();
          this.score++;
        } else if (entity.type === "bomb") {
          this.bomb(entity);
        }
      }

      this.ypos += this.TILE_SIZE;
      this.direction = "down";
      this.update();
    }
    this.position = this.findPosition();
  }

  update() {
    this.pacman.style.left = `${this.xpos}px`;
    this.pacman.style.top = `${this.ypos}px`;
  }

  addToStage(stage) {
    console.log(stage);
    stage.stage.appendChild(this.pacman);
    return stage;
  }

  /*   renderTo(el) {
        el.appendChild(this.pacman);
    } */
}

class Stage {
  constructor(width, height) {
    this.width = width * 85;
    this.height = height * 85;
    this.stage = this.createHTML();
    this.entities = [];
  }

  getEntities() {
    return this.entities;
  }

  /* createArray() {
        this.entities = Array.from(document.querySelectorAll(".entity"));
        console.log(this.entities);
    } */

  createHTML() {
    const stage = document.createElement("div");

    stage.className = "container stage";
    stage.id = "app";
    stage.style.width = `${this.width}px`;
    stage.style.height = `${this.height}px`;

    return stage;
  }

  collisionDetection(x, y) {
    for (let i = 0; i < this.getEntities().length; i++) {
      if (
        this.getEntities()[i].xpos * 85 === x &&
        this.getEntities()[i].ypos * 85 === y
      ) {
        return this.getEntities()[i];
      }
    }
    return null;
  }

  renderTo(el) {
    el.appendChild(this.stage);
  }

  removeEntity(entity) {
    this.entities = this.getEntities().filter((arrayEntity) => {
      if (
        arrayEntity.xpos === entity.xpos &&
        arrayEntity.ypos === entity.ypos
      ) {
        return false;
      } else return true;
    });
    console.log(this.getEntities());
  }
}

class Entity {
  constructor(xpos, ypos, type, stage) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.type = type;
    this.element = this.createHtml();
    this.stage = this.addToStage(stage);
  }

  createHtml() {
    const div = document.createElement("div");
    div.className = `entity entity--${this.type}`;
    div.style.left = `${this.xpos * 85}px`;
    div.style.top = `${this.ypos * 85}px`;
    return div;
  }

  addToStage(stage) {
    console.log(stage);
    stage.stage.appendChild(this.element);
    stage.entities.push(this);
    return stage;
  }

  unmount() {
    console.log(this.stage);
    this.stage.stage.removeChild(this.element);
    this.stage.removeEntity(this);
  }
  /* renderTo(el) {
        el.appendChild(this.element);
    } */
}

const stage1 = new Stage(11, 7);
stage1.renderTo(document.body);

const pac1 = new Pacman(0, 0, 85, stage1);

fetch("http://bootcamp.podlomar.org/api/pacman?width=11&height=6")
  .then((resp) => resp.json())
  .then((entities) => {
    console.log(entities);
    createWalls(entities.walls);
    createBombs(entities.bombs);
    createApples(entities.apples);
  });

const entitiesArr = [];
function createWalls(entities) {
  for (let entity of entities) {
    const newEntity = new Entity(entity.x, entity.y, "wall", stage1);
    entitiesArr.push(newEntity);
  }
}

function createBombs(entities) {
  for (let entity of entities) {
    const newEntity = new Entity(entity.x, entity.y, "bomb", stage1);
    entitiesArr.push(newEntity);
  }
}

function createApples(entities) {
  for (let entity of entities) {
    const newEntity = new Entity(entity.x, entity.y, "apple", stage1);
    entitiesArr.push(newEntity);
  }
}
