import { createCanvas, CanvasRenderingContext2D } from 'canvas';

type BackgroundOptions = {
    width: number,
    height: number,
    gridDivisions: number,
    showGrid?: boolean
}

export function generateBackgroundImage({width, height, gridDivisions, showGrid = false}: BackgroundOptions) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const grid = new Grid(width, height, gridDivisions);

    // Background color
    ctx.fillStyle = "#2d1a5e";
    ctx.fillRect(0, 0, width, height);

    // Draw white circles in each grid space
    const zoneSize = width / gridDivisions;
    const circleRadius = zoneSize * 0.07; // Circle radius is 5% of the zone size
    
    for (let y = 0; y < gridDivisions; y++) {
        for (let x = 0; x < gridDivisions; x++) {
            const centerX = (x * zoneSize) + (zoneSize / 2);
            const centerY = (y * zoneSize) + (zoneSize / 2);
            
            // Draw white circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    // Draw grid if enabled
    if (showGrid) {
        grid.draw(ctx);
    }

    const buffer = canvas.toBuffer("image/png");
    return buffer;
}


class Grid {
    private spaces: Array<Array<GridSpace>>;
    private width: number
    private height: number
    private divisions: number
    private zoneWidth: number
    private zoneEdgeSize: number

    constructor(width: number, height: number, divisions: number) {
        this.width = width;
        this.height = height;
        this.divisions = divisions;
        this.zoneWidth = width / divisions;
        this.zoneEdgeSize = (width % divisions !== 0) ? ((width % divisions) / 2) : 0;
        this.initSpaces();
    }

    private initSpaces() {
        this.spaces = [];
        for (let y = 0; y < this.divisions; y++) {
            this.spaces[y] = [];
            for (let x = 0; x < this.divisions; x++) {
                this.spaces[y][x] = new GridSpace(
                    x * this.zoneWidth + this.zoneEdgeSize,
                    y * this.zoneWidth + this.zoneEdgeSize,
                    this.zoneWidth,
                    this.zoneWidth
                );
            }
        }
    }

    public getSpace(x: number, y: number): GridSpace | null {
        if (x >= 0 && x < this.divisions && y >= 0 && y < this.divisions) {
            return this.spaces[y][x];
        }
        return null;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        drawGrid(ctx, this.width, this.height, this.divisions, 0.5);
    }
}

class GridSpace {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public content: any;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.content = null;
    }
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, gridDivisions: number, lineWidth: number) {    
    ctx.strokeStyle = "#ffaed7"
    ctx.lineWidth = lineWidth

    // Grid cells are squares. Width was chosen as the base measurement.
    const zoneWidth: number = width / gridDivisions;
    const zoneWidthLeftover: number = width % gridDivisions;
    const zoneEdgeSize: number = (zoneWidthLeftover !== 0) ? (zoneWidthLeftover / 2) : 0;

    console.log("=== bg-img-gen ===")
    console.log("zoneWidth: " + zoneWidth)
    console.log("zoneWidthLeftover: " + zoneWidthLeftover)

    // Border
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.stroke()

    // Vertical Lines
    for (let i = 1; i < gridDivisions; i++) {
        const x = i * zoneWidth + zoneWidthLeftover;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke()
    }
    
    // Horizontal lines
    for (let i = 1; i < gridDivisions; i++) {
        const y = i * zoneWidth - zoneWidthLeftover;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke()
    }

    return {zoneWidth, zoneWidthLeftover}
}