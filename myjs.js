var k = 1;
var svg;
var gElem;
var height = 600;
var width = 800;
var zoomFrom = 1
var zoomTo = 10
function booking(id) {
	
	if(d3.select("#"+id).style("fill") == 'blue'){
		d3.select("#"+id).style("fill","red");
		dataTable(id);
	}else{
		d3.select("#"+id).style("fill","blue");
		d3.select("#row"+id).remove();
		//$('#row' + id).remove();
	}
}

function dataTable(id) {
	d3.select("#dataTable tbody").append("tr").attr("id", "row"+id).html(" <td>Test</td><td>Test</td><td>" + id+"</tr>");
}

function main() {
	var div = d3.select("body").append("div").attr("class", "tooltip").style(
			"opacity", 0);

	const zoom = d3.zoom().scaleExtent([ zoomFrom, zoomTo ]).on("zoom", zoomed);

	svg = d3.select("#seatMap").append("svg");
	svg.attr("viewBox",[ 0, 0, width, height ]).attr("style", "border:1px solid black");

	gElem = svg.append("g");
	gElem.append('svg:image').attr("href", "background.svg").attr('x', 0).attr(
			'y', 0).attr('height', '100%').attr('width', '100%');

	function zoomed() {
		gElem.attr("transform", d3.event.transform)
		k = d3.event.transform.k;
		console.log(k);
		draw();

		let transform = d3.event.transform;
		let modifiedTransform = d3.zoomIdentity.scale(1 / transform.k)
				.translate(-transform.x, -transform.y);

		let mapMainContainer = gElem.attr('transform', transform);

		minimapRect.attr('width', mapMainContainer.node().getBBox().width);
		minimapRect.attr('height', mapMainContainer.node().getBBox().height);
		minimapRect.attr('stroke-width', 10 / modifiedTransform.k);
		minimapRect.attr('stroke-dasharray', 10 / modifiedTransform.k);
		minimapRect.attr('fill', 'gray').attr('transform', modifiedTransform);
		minimapRect.attr('style', 'opacity:0.5')
	}

	// // create seatMap
	let seatCode = 65;
	for (var i = 1; i < 6; i++) {
		let x = 15;
		let y = 15;

		for (var j = 6; j < 23; j++) {
			const circle = gElem.append("circle");
			circle.attr("cx", j * x);
			circle.attr("cy", 345 - (y * i));
			circle.attr("r", 5);
			if (j % 2 == 0) {
				circle.attr("onclick", "booking(this.id)");
				circle.style("fill", "blue");
			} else {
				circle.style("fill", "#dddddd");
			}

			circle.attr("id", String.fromCharCode(seatCode) + j);
			circle.attr("name", "seat");
			circle.on("mouseover", function() {
				div.transition().duration(200).style("opacity", .9);
				div.html(circle.attr("id")).style("left",
						(d3.event.pageX) + "px").style("top",
						(d3.event.pageY - 28) + "px");
			})
			circle.on("mouseout", function(d) {
				div.transition().duration(500).style("opacity", 0);
			});
			

		}
		seatCode += 1;
	}

	svg.call(zoom);

	d3.select("#reset").on("click", reset);
	d3.select("#zoomIn").on("click", zoomIn);
	d3.select("#zoomOut").on("click", zoomOut);

	function reset() {
		svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
		
		
	}
	function zoomIn() {
		svg.transition().call(zoom.scaleBy, 2)
	}
	function zoomOut() {
		svg.transition().call(zoom.scaleBy, 0.5)
	}

	function draw() {
		 if (k >3) {
			 state1.attr("width",0);
			 state2.attr("width",0);
			 state3.attr("width",0);
		 } else {
			 state1.attr("width","50%");
			 state2.attr("width","50%");
			 state3.attr("width","50%");
		 }
	}

	d3.select('#minimap').html(d3.select('#seatMap').html());
	let minimap = d3.select('#minimap').select('svg').attr('width', 100);

	let minimapRect = minimap.append('rect').attr('id', 'minimapRect');

	const state1 = gElem.append('svg:image').attr("href", "state1.svg").attr('x', 10).attr(
			'y', 150).attr('height', '50%').attr('width', '50%').attr("id","image");
	
	const state2 = gElem.append('svg:image').attr("href", "state2.svg").attr('x', 230).attr(
			'y', 150).attr('height', '50%').attr('width', '50%').attr("id","image");
	
	const state3 = gElem.append('svg:image').attr("href", "state3.svg").attr('x', 440).attr(
			'y', 150).attr('height', '50%').attr('width', '50%').attr("id","image");
	
////	state1.on("click", function(){
////		state1.attr("width",0);
////		svg.transition().duration(2500).call(
////			      zoom.transform,
////			      d3.zoomIdentity.translate(width / 2, height / 2).scale(10).translate(-210, -300)
////			    );
////		 
////	})
////	state2.on("click", function(){
////		state2.attr("width",0);
////		svg.transition().duration(2500).call(
////			      zoom.transform,
////			      d3.zoomIdentity.translate(width / 2, height / 2).scale(10).translate(-450, -300)
////			    );
////		 
////	})
////	state3.on("click", function(){
////		state3.attr("width",0);
////		svg.transition().duration(2500).call(
////			      zoom.transform,
////			      d3.zoomIdentity.translate(width / 2, height / 2).scale(10).translate(-650, -300)
////			    );
////		 
//	})

}

function drawFrame(context) {
	context.moveTo(0, 200);
	context.lineTo(600, 200);
	context.moveTo(0, 300);
	context.lineTo(600, 300);
	context.moveTo(0, 400);
	context.lineTo(600, 400);
	return context; // not mandatory, but will make it easier to chain

}

function drawCover(context) {
	context.rect(0, 200, 600, 200);
	return context; // not mandatory, but will make it easier to chain
}
