import React, {useEffect, useState} from "react";

type Point = {
    x: number;
    y: number;
};

interface WindowObject {
    origin: Point;
    width: number;
    height: number;
    collidePoint: (p: Point) => boolean;
}

class Rect implements WindowObject {
    constructor(
        public origin: Point,
        public width: number,
        public height: number
    ) { }

    getCenter(): Point {
        return {
            x: this.origin.x + (this.width / 2),
            y: this.origin.y + (this.height / 2)
        };
    }

    collidePoint(p: Point) {
        return (
            p.x > this.origin.x &&
            p.x < this.origin.x + this.width &&
            p.y > this.origin.y &&
            p.y < this.origin.y + this.height
        );
    }
}

abstract class DraggbleObject {
    abstract draggableArea: Rect;
    abstract prevMouse: Point | undefined;

    drag(curCoord: Point, mousePos: Point) {
        if (this.prevMouse && this.draggableArea.collidePoint(mousePos)) {
            const distX = mousePos.x - this.prevMouse.x;
            const distY = mousePos.y - this.prevMouse.y;
            this.prevMouse = mousePos;
            return {x: curCoord.x + distX, y: curCoord.y + distY};
        }
        return curCoord;
    }
}

class GameWindow extends DraggbleObject {
    prevMouse: Point | undefined = undefined;

    constructor(
        public pos: Point,
        public width: number,
        public height: number,
        public draggableArea: Rect
    ) {
        super();
    }

    update(mPos: Point) {
        // ...
        this.pos = this.drag(this.pos, mPos);
        // ...
    }
}

const Widget = () => {
    const [obj, setObj] = useState(new GameWindow(
        {x: 100, y: 100},
        200,
        100,
        new Rect({x: 0, y: 0}, 200, 20)
    ));

    const divMove = (e: MouseEvent) => {
        const div = document.getElementById("widget-1");
        div.style.top = e.clientY + 'px';
        div.style.left = e.clientX + 'px';
    };

    const mouseUp = () => {
        window.removeEventListener("mousemove", divMove, true);
    };

    const mouseDown = () => {
        window.addEventListener("mousemove", divMove, true);
    };

    // https://stackoverflow.com/a/9334106
    useEffect(() => {
        document.getElementById("widget-1").addEventListener("mousedown", mouseDown, false);
        window.addEventListener("mouseup", mouseUp, false);
        return () => {
            document.getElementById("widget-1").removeEventListener("mousedown", mouseDown, false);
            window.removeEventListener("mouseup", mouseUp, false);
        };
    }, [])

    return (
        <div
            className="widget-container"
            style={{
                position: "absolute",
                left: obj.pos.x,
                top: obj.pos.y,
                width: obj.width,
                height: obj.height,
                backgroundColor: "yellow"
            }}
            id="widget-1"
        >
            <div
                className="widget-dragable-area"
                style={{
                    position: "absolute",
                    left: obj.draggableArea.origin.x,
                    top: obj.draggableArea.origin.y,
                    backgroundColor: "red",
                    width: obj.draggableArea.width,
                    height: obj.draggableArea.height
                }}
            >

            </div>
        </div>
    );
};

export default Widget;