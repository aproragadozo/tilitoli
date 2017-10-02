var React = require('react');
var Cell = require('Cell');

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fekete: { id: '16', vizszintes: -3, fuggoleges: -3, src: "https://i.pinimg.com/736x/25/10/1f/25101f6abb216898babcb5498197f5cb.jpg", width: 400, height: 400 },
            // alternative grid
            grid: [
                [0, 1, 2, 3],
                [0, 1, 2, 3],
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ],
            // alternative blank block
            blank: [3, 3]
        };
        this.isBlack = this.isBlack.bind(this);
        this.positionCell = this.positionCell.bind(this);
        this.callBack = this.callBack.bind(this);

        this.swapBlocks = this.swapBlocks.bind(this);

        this.blackify = this.blackify.bind(this);
        this.positionCellHorizontally = this.positionCellHorizontally.bind(this);
        this.positionCellVertically = this.positionCellVertically.bind(this);
    }
    callBack(cellInfo){
        /*  this will be interesting once the grid is refactored so that only 15 blocks are rendered at a time,
            based on their ids
        Object.keys(this.state.helyzet).forEach(function(key) {
        });
        */
        if(
            ((cellInfo.sor === this.state.blank[0]) 
            && (cellInfo.oszlop === this.state.blank[1] -1 || cellInfo.oszlop === this.state.blank[1] + 1))
            || 
            ((cellInfo.oszlop === this.state.blank[1])
            && (cellInfo.sor === this.state.blank[0] -1 || cellInfo.oszlop === this.state.blank[0] + 1))
        ) 
        {  
            this.swapBlocks(cellInfo);
        }
    };
    swapBlocks(cell){
        this.setState(function(prevState) {
            let newState = JSON.parse(JSON.stringify(prevState));
            console.log(newState.grid[cell.sor][cell.oszlop] + ", " + newState.grid[cell.oszlop][cell.sor]);
            newState.grid[cell.sor][cell.oszlop] = prevState.blank[0];
            newState.grid[cell.oszlop][cell.sor] = prevState.blank[1];
            newState.blank[0] = cell.sor;
            newState.blank[1] = cell.oszlop;
            console.log(JSON.stringify(newState, null, 4));
            return newState;
        });
    };
    positionCell(width, height, size, row, col) {
        let pos;
        row *= -1;
        col *= -1;
        if (this.isBlack(row, col)) { pos = 0; } else {
            let xPos = width / size * row + 'px';
            let yPos = height / size * col + 'px';
            pos = xPos + ' ' + yPos;
        }
        return pos;
    };
    blackify(row, col, img) { return (this.isBlack(row, col)) ? this.state.fekete : img; };

    positionCellHorizontally(index) {
        index = index.toString();
        return (index === this.state.fekete.id) ? this.state.fekete.vizszintes : this.state.helyzet[index][0];
    };

    positionCellVertically(index) {
    index = index.toString();
    return (index === this.state.fekete.id) ?
        this.state.fekete.fuggoleges : this.state.helyzet[index][1];
    };
    isBlack(a, b) { return (a === this.state.blank[0] && b === this.state.blank[1]);};

    render() {
        var i, j;
        var startingCoords = {};
        var counter = 1;
        var index = counter;
        var img = new Image();
        var cellDimensions = 4;
        //var stil = { position: 'relative', width: '410px', height: 'auto' };
        img.src = "https://i.pinimg.com/736x/8c/bd/c8/8cbdc87ea653132a0fe6207007d915c1--pasta-cat-love.jpg";
        var negyzethalo = [];
        for(var r=0; r<this.state.grid.length; r++) {
            for(var c=0; c<this.state.grid[r].length; c++) {
                var index = (r*4)+(c+1);
                negyzethalo.push(
                    <Cell
                        key = {index}
                        id={index}
                            img = { this.blackify(r, c, img) }
                            size = { cellDimensions }
                            backgroundPos = { this.positionCell(img.width, img.height, cellDimensions, r, c) }
                            horizontal = { r }
                            vertical = {c}
                            black = { this.isBlack(r, c) }
                            clickHandler = { this.callBack }
                            />
                );
            }
        }
        return ( <div className = "wrapper" >
                    <div>
                        {negyzethalo}
                    </div >
                </div>)
                        }
                    };

module.exports = Table;