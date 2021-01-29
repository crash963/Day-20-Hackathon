"use strict";

class Pacman {
  constructor(xpos, ypos, tileSize) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.position = this.findPosition();
    this.TILE_SIZE = tileSize;
    this.mouth = "open";
    this.pacman = this.createHTML();
    this.direction = "right";
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

  move(e) {
    const stageWidth =
      document.querySelector(".stage").getBoundingClientRect().width / 85 - 1;
    const stageHeight =
      document.querySelector(".stage").getBoundingClientRect().height / 85 - 1;
    console.log(stageWidth, stageHeight);
    this.pacman.classList.toggle("pacman--close");

    if (e.key === "ArrowRight") {
      this.pacman.style.backgroundPositionY = `-3%`;
      if (this.position[0] === stageWidth) {
        return;
      }
      this.xpos += this.TILE_SIZE;
      this.direction = "right";
      this.update();
    }
    if (e.key === "ArrowUp") {
      this.pacman.style.backgroundPositionY = `97%`;
      if (this.position[1] === 0) {
        return;
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
      this.xpos -= this.TILE_SIZE;
      this.direction = "left";
      this.update();
    }
    if (e.key === "ArrowDown") {
      this.pacman.style.backgroundPositionY = `197%`;
      if (this.position[1] === stageHeight) {
        return;
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

  renderTo(el) {
    el.appendChild(this.pacman);
  }
}

class Stage {
  constructor(width, height) {
    this.width = width * 85;
    this.height = height * 85;
    this.stage = this.createHTML();
  }

  createHTML() {
    const stage = document.createElement("div");

    stage.className = "container stage";
    stage.id = "app";
    stage.style.width = `${this.width}px`;
    stage.style.height = `${this.height}px`;

    return stage;
  }

  renderTo(el) {
    el.appendChild(this.stage);
  }
}

const stage1 = new Stage(6, 7);
stage1.renderTo(document.body);

const pac1 = new Pacman(0, 0, 85);
pac1.renderTo(document.querySelector(".container"));
console.log(pac1.position);
