"use strict";

class Pacman {
  constructor(xpos, ypos, tileSize) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.TILE_SIZE = tileSize;
    this.mouth = "open";
    this.pacman = this.createHTML();
    this.direction = "right";
    this.addListener();
    this.update();
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
    this.pacman.classList.toggle("pacman--close");

    if (e.key === "ArrowRight") {
      this.pacman.style.backgroundPositionY = `-3%`;
      this.xpos += this.TILE_SIZE;
      this.update();
    }
    if (e.key === "ArrowUp") {
      this.pacman.style.backgroundPositionY = `97%`;
      this.ypos -= this.TILE_SIZE;
      this.update();
    }
    if (e.key === "ArrowLeft") {
      this.pacman.style.backgroundPositionY = `29%`;
      this.xpos -= this.TILE_SIZE;
      this.update();
    }
    if (e.key === "ArrowDown") {
      this.pacman.style.backgroundPositionY = `197%`;
      this.ypos += this.TILE_SIZE;
      this.update();
    }
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

const stage1 = new Stage(5, 5);
stage1.renderTo(document.body);

const pac1 = new Pacman(0, 0, 85);
pac1.renderTo(document.querySelector(".container"));
