var React = require('react');

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sor: this.props.horizontal,
            oszlop: this.props.vertical,
            black: this.props.black }
        this.swapper = this.swapper.bind(this);
    }

    swapper(id, r, c) {
        var cellInfo = {};
        cellInfo.id = id;
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
            left: this.props.img.width / this.props.size * Math.abs(this.props.horizontal),
            top: this.props.img.height / this.props.size * Math.abs(this.props.vertical)
        };
        return ( <div id={this.props.id}
            style = { style }
            onClick = {
                () =>
                this.swapper(this.props.id, this.props.horizontal, this.props.vertical)
            }
            />
        )
    }
};

module.exports = Cell;