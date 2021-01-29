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
            document.querySelector(".stage").getBoundingClientRect().width /
                85 -
            1;
        const stageHeight =
            document.querySelector(".stage").getBoundingClientRect().height /
                85 -
            1;

        console.log(stageWidth, stageHeight);
        this.pacman.classList.toggle("pacman--close");

        if (e.key === "ArrowRight") {
            this.pacman.style.backgroundPositionY = `-3%`;
            if (this.position[0] === stageWidth) {
                return;
            }
            const targetX = this.xpos + this.TILE_SIZE;
            const entity = this.stage.collisionDetection(targetX, this.ypos);
            console.log(entity);
            if (entity) {
                if (entity.type === "wall") {
                    return;
                }
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
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].xpos === x && this.entities[i].ypos === y) {
                return this.entities[i];
            } else return null;
        }
    }

    renderTo(el) {
        el.appendChild(this.stage);
    }

    /* addEntity(ent) {
        this.entities.push(ent); 
    }*/
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
        stage.entities.push(this.element);
        return stage;
    }

    /* renderTo(el) {
        el.appendChild(this.element);
    } */
}

const stage1 = new Stage(6, 7);
stage1.renderTo(document.body);

const pac1 = new Pacman(0, 0, 85, stage1);

const apple1 = new Entity(1, 1, "apple", stage1);

const w1 = new Entity(1, 3, "wall", stage1);

const b1 = new Entity(5, 5, "bomb", stage1);

console.log(stage1.entities);
