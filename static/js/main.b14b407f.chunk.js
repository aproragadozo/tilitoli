(this.webpackJsonpslider=this.webpackJsonpslider||[]).push([[0],{18:function(e,t,n){e.exports=n(42)},23:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),s=n(16),a=n.n(s),i=(n(23),n(2)),c=n(3),u=n(5),l=n(4),p=n(17),h=n.n(p),f=(n(41),n(6)),m=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var o;return Object(i.a)(this,n),(o=t.call(this,e)).katt=function(){o.props.parentCallback(o.props.index)},o.getCoords=o.getCoords.bind(Object(f.a)(o)),o}return Object(c.a)(n,[{key:"getCoords",value:function(e,t,n){return{col:Math.floor(e/n),row:e%n}}},{key:"render",value:function(){var e=this,t=this.getCoords(this.props.index,this.props.rows,this.props.cols),n={position:"absolute",border:"1px solid white",backgroundClip:"content-box",backgroundRepeat:"no-repeat",width:this.props.img.width/4,height:this.props.img.height/4,backgroundPosition:this.props.backgroundPos,backgroundImage:"url("+this.props.img.src+")",left:this.props.img.width/4*t.row,top:this.props.img.height/4*t.col,fontSize:"8px"},o=(this.props.hole,this.props.rows,this.props.cols,this.props.index,this.props.number);return r.a.createElement("div",{ref:this.props.innerRef,style:n,onClick:function(t){return e.katt(t)}},this.props.hole===o?"":o+1)}}]),n}(r.a.Component),d=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var o;return Object(i.a)(this,n),(o=t.call(this,e)).checkSolved=function(e,t){for(var n=e.length;n--;)if(e[n]!==t[n])return!1;return!0},o.getCoords=function(e,t,n){return{col:Math.floor(e/n),row:e%n}},o.canMove=function(e){if(e<0||e>=16)return!1;var t=o.state.holePosition-e;return-1===t?e%o.props.rows!==0:1===t?o.state.holePosition%o.props.rows!==0:Math.abs(t)===o.props.rows},o.shuffle=function(){o.setState((function(e){return{solved:!1}})),o.state.shiftCounter>=50?o.setState((function(e){return{shiftCounter:0,isShuffling:!1}})):o.setState((function(e){return{isShuffling:!0}})),o.setState((function(e){return{shiftCounter:e.shiftCounter+1}}));var e=[-4,4,-1,1],t=e[Math.floor(Math.random()*e.length)],n=o.state.holePosition+t;o.swap(n)},o.getNewLayout=function(e,t,n){var o=(e=e.slice(0))[n];return e[n]=e[t],e[t]=o,e},o.swap=function(e){var t=o.state.numbers,n=o.state.holePosition;if(o.canMove(e)){var r=o.getNewLayout(t,e,n);o.setState((function(t){return{numbers:r,holePosition:e}}))}o.checkSolved(o.state.numbers,o.props.identifiers)&&o.setState((function(e){return{solved:!0}}))},o.getBackgroundPos=function(e,t){var n=o.getCoords(e,o.props.rows,o.props.cols);return n.row*=-1,n.col*=-1,t.width/4*n.row+"px"+" "+(t.height/4*n.col+"px")},o.reRenderWhenSolved=function(){o.setState((function(e){return{solved:!1}})),o.shuffle()},o.state={shiftCounter:0,isShuffling:!1,checkSolved:o.checkSolved.bind(Object(f.a)(o)),solved:!1,numbers:o.props.numbers,holePosition:o.props.numbers.indexOf(o.props.hole),image:"https://unsplash.it/400/400"},o}return Object(c.a)(n,[{key:"componentDidUpdate",value:function(){this.state.isShuffling&&this.state.shiftCounter<=50&&this.shuffle()}},{key:"componentDidMount",value:function(){this.shuffle()}},{key:"render",value:function(){var e=this,t=new Image;t.src=this.props.image,t.width=400,t.height=400;var n=new Image;if(n.src="https://i.pinimg.com/736x/25/10/1f/25101f6abb216898babcb5498197f5cb.jpg",this.state.solved){return r.a.createElement("div",{style:{position:"absolute",width:"50vw",left:"25vw"}},r.a.createElement("img",{alt:"yay",src:"https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/source.gif"}),r.a.createElement("button",{type:"button",onClick:function(t){t.preventDefault(),e.reRenderWhenSolved(t)}},"New game with same image"),r.a.createElement("button",{type:"button",onClick:function(t){t.preventDefault(),e.props.parentCallback()}},"Get new image"))}return r.a.createElement("div",{style:{width:"400px",height:"400px",position:"relative"}},this.state.numbers.map((function(o,s){return r.a.createElement(m,{rows:e.props.rows,cols:e.props.cols,img:o===e.props.hole?n:t,backgroundPos:e.getBackgroundPos(o,t),index:e.props.identifiers[s],number:o,key:e.props.identifiers[s],parentCallback:e.swap,hole:e.props.hole})})))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return t.checkSolved(t.numbers,e.identifiers)?{solved:!0}:null}}]),n}(r.a.Component),g=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("img",{src:this.props.src,className:this.props.className,onClick:function(t){return e.props.click(e.props.src)},alt:"please choose me"})}}]),n}(r.a.Component),v=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var o;return Object(i.a)(this,n),(o=t.call(this,e)).start=function(e){o.setState((function(t){return{gameOn:!0,image:e}}))},o.getSquareImagesFromFlickr=function(e){try{return h.a.get(e)}catch(t){console.error(t)}},o.setImages=function(){o.setState((function(e){return{gameOn:!1,images:[],ready:!1}})),console.log("go");for(var e=6,t=[],n="https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=".concat("160f672f62d2f429e0f06fe9eb8cb555","&group_id=").concat("17449586@N00","&extras=url_w&per_page=").concat(100,"&page=1&format=json&nojsoncallback=1");e>0;)t.push(Math.floor(100*Math.random())),e-=1;o.getSquareImagesFromFlickr(n).then((function(e){var n=t.map((function(t){return e.data.photos.photo[t].url_w}));o.setState((function(e){return{images:n,ready:!0}}))})).catch((function(e){console.log(e)}))},o.resizeImages=function(e){},o.state={image:"https://source.unsplash.com/random/400x400",images:[],ready:!1,gameOn:!1,shiftCounter:0,isShuffling:!1,solved:!1},o}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.setImages()}},{key:"render",value:function(){var e=this;return this.state.gameOn?r.a.createElement("div",{className:"wrapper"},r.a.createElement(d,{rows:4,cols:4,numbers:[0,1,2,3,4,5,6,7,8,9,10,15,12,13,14,11],hole:15,identifiers:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],image:this.state.image,parentCallback:this.setImages})):this.state.ready?r.a.createElement("div",{className:"imageOptionWrapper"},r.a.createElement("div",{className:"top"},"Dili-Toli!"),this.state.images.map((function(t,n){return r.a.createElement(g,{key:n,src:t,className:"option".concat(n),click:e.start})})),r.a.createElement("div",{className:"bottom",onClick:function(t){return e.setImages(t)}},"Get new images")):r.a.createElement("div",{className:"wrapper"},r.a.createElement("img",{className:"spinner",alt:"puzzle-shaped loading spinner"}))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.b14b407f.chunk.js.map