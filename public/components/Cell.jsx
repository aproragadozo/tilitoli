var React = require('react');

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sor: this.props.horizontal,
            oszlop: this.props.vertical,
            black: this.props.black }
        this.swapper = this.swapper.bind(this);
    }

    swapper(r, c) {
        var cellInfo = {};
        cellInfo.sor = r;
        cellInfo.oszlop = c;
        this.props.clickHandler(cellInfo);
        //this.setState({ sor: r, oszlop: c });
    }
    render() {
        var style = {
            position: 'absolute',
            border: "1px solid white",
            backgroundClip: "content-box",
            backgroundRepeat: "no-repeat",
            width: this.props.img.width / this.props.size,
            height: this.props.img.height / this.props.size,
            backgroundPosition: this.props.backgroundPos,
            backgroundImage: "url(" + this.props.img.src + ")",
            left: this.props.img.width / this.props.size * Math.abs(this.state.sor),
            top: this.props.img.height / this.props.size * Math.abs(this.state.oszlop)
        };
        return ( <div 
            style = { style }
            onClick = {
                () =>
                this.swapper(this.state.sor, this.state.oszlop)
            }
            />
        )
    }
};

module.exports = Cell;