var React = require('react');
var Cell = require('Cell');

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fekete: { id: '16', vizszintes: -3, fuggoleges: -3, src: "https://upload.wikimedia.org/wikipedia/commons/6/68/Solid_black.png", width: 400, height: 400 },
            rows: [0, -1, -2, -3],
            columns: [0, -1, -2, -3],
            helyzet: {
                '1': [0, 0],
                '2': [0, -1],
                '3': [0, -2],
                '4': [0, -3],
                '5': [-1, 0],
                '6': [-1, -1],
                '7': [-1, -2],
                '8': [-1, -3],
                '9': [-2, 0],
                '10': [-2, -1],
                '11': [-2, -2],
                '12': [-2, -3],
                '13': [-3, 0],
                '14': [-3, -1],
                '15': [-3, -2],
                '16': [-3, -3]
            }
        };
        this.isBlack = this.isBlack.bind(this);
        this.positionCell = this.positionCell.bind(this);
        this.callBack = this.callBack.bind(this);
        this.blackify = this.blackify.bind(this);
        this.positionCellHorizontally = this.positionCellHorizontally.bind(this);
        this.positionCellVertically = this.positionCellVertically.bind(this);
    }
    callBack(cellInfo){
    if (((cellInfo.sor === this.state.fekete.vizszintes) && ((cellInfo.oszlop - 1 === this.state.fekete.fuggoleges) || (cellInfo.oszlop +
            1 === this.state.fekete.fuggoleges))) || ((cellInfo.oszlop === this.state.fekete.fuggoleges) && ((cellInfo.sor - 1 === this.state.fekete.vizszintes) || (cellInfo.sor + 1 === this.state.fekete.vizszintes)))) {
        this.setState(function(prevState) {
            console.table(cellInfo);
            console.table(prevState.fekete);
            var stringId = cellInfo.id.toString();
            var newState = JSON.parse(JSON.stringify(prevState));
            newState.helyzet[[{ stringId }][0]] = prevState.fekete.vizszintes;
            newState.helyzet[[{
                stringId
            }][1]] = prevState.fekete.fuggoleges;
            newState.fekete.vizszintes = cellInfo.sor;
            newState.fekete.fuggoleges = cellInfo.oszlop;
            console.table(newState.fekete);
            return newState;
        });
    }
    };
    positionCell(width, height, size, index, row, col) {
        let pos;
        if (this.isBlack(index)) { pos = 0; } else {
            let xPos = width / size * row + 'px';
            let yPos = height / size * col + 'px';
            pos = xPos + ' ' + yPos;
        }
        return pos;
    };
    blackify(index, img) { return (this.isBlack(index)) ? this.state.fekete : img; };

    positionCellHorizontally(index) { index = index.toString(); return (index === this.state.fekete.id) ? this.state.fekete.vizszintes : this.state.helyzet[index][0]; };

    positionCellVertically(index) {
    index = index.toString();
    return (index === this.state.fekete.id) ?
        this.state.fekete.fuggoleges : this.state.helyzet[index][1];
    };
    isBlack(a) { return a.toString() === this.state.fekete.id; };

    render() {
        var i, j;
        var startingCoords = {};
        var counter = 1;
        var index = counter;
        var img = new Image();
        var cellDimensions = 4;
        //var stil = { position: 'relative', width: '410px', height: 'auto' };
        img.src = "https://i.pinimg.com/736x/8c/bd/c8/8cbdc87ea653132a0fe6207007d915c1--pasta-cat-love.jpg";
        return ( <div className = "wrapper" >
                    <div>
                        {
                        this.state.rows.map((row) => this.state.columns.map((column) =>
                            <Cell id = { counter++ }
                            img = { this.blackify(index, img) }
                            size = { cellDimensions }
                            backgroundPos = { this.positionCell(img.width, img.height, cellDimensions, index, column, row) }
                            horizontal = { this.positionCellHorizontally(index) }
                            vertical = {
                                this.positionCellVertically(index)
                            }
                            black = { this.isBlack(index++) }
                            clickHandler = { this.callBack }
                            />
                            ))
                        }
                    </div >
                </div>)
                        }
                    };

module.exports = Table;