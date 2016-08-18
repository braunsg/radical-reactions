$(document).ready(function() {

	//////////////////////////////////////////////////////////////////////////////////////
	// DEFINE FUNCTION PROTOTYPES
	
    // https://github.com/wbkd/d3-extended
    d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
    d3.selection.prototype.moveToBack = function() {  
        return this.each(function() { 
            var firstChild = this.parentNode.firstChild; 
            if (firstChild) { 
                this.parentNode.insertBefore(this, firstChild); 
            } 
        });
    };
	
	// See http://stackoverflow.com/questions/38224875/replacing-d3-transform-in-d3-v4
	function getTranslation(transform) {
		// Create a dummy g for calculation purposes only. This will never
		// be appended to the DOM and will be discarded once this function 
		// returns.
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

		// Set the transform attribute to the provided string value.
		g.setAttributeNS(null, "transform", transform);

		// consolidate the SVGTransformList containing all transformations
		// to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
		// its SVGMatrix. 
		var matrix = g.transform.baseVal.consolidate().matrix;

		// As per definition values e and f are the ones for the translation.
		return [matrix.e, matrix.f];
	}	
	
	//////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE VISUALIZATION
	
	$.getJSON("inc/data.json",function(data) {

		var main = {};
		
		main.radical_glyphs = {"radical_00039":"\u53e3","radical_00001":"\u4e00","radical_00002":"\uff5c","radical_00004":"\u30ce","radical_00098":"\u6728","radical_00095":"\u65e5","radical_00014":"\u30cf","radical_00007":"\u4e8c","radical_00041":"\u571f","radical_00132":"\u7530","radical_00008":"\u4ea0","radical_00027":"\u5341","radical_00076":"\u827e","radical_00015":"\u5e76","radical_00139":"\u76ee","radical_00037":"\u4e5e","radical_00074":"\u6c41","radical_00050":"\u5c0f","radical_00012":"\u513f","radical_00109":"\u6770"};
		
		main.max_count = 209;

		// Define SVG dimensions
		main.margin = {top: 50, left: 50, right: 50, bottom: 50};
		main.height = $("#vis_container").innerHeight();
		main.width = $("#vis_container").innerWidth();

		main.fixed_positions = {"radical_00039": {"x": main.width-main.margin.right-50, "y": main.margin.top+50}, 
							   "radical_00001": {"x": main.margin.left+400, "y": main.margin.top+300}, 
							   "radical_00002": {"x": main.margin.left+200, "y": main.height-main.margin.bottom-200}, 
							   "radical_00004": {"x": main.width-main.margin.right-200, "y": main.height-main.margin.bottom-100},
							   "radical_00095": {"x": (main.margin.left + main.width/2)/2, "y": main.height/2},
							   "radical_00098": {"x": main.width*0.8, "y": (((main.height-main.margin.bottom)+main.height/2)/2)},
							   "radical_00014": {"x": main.width*0.5, "y": ((main.margin.top+main.height/2)/2)},
							   "radical_00007": {"x": (((main.width-main.margin.right)+main.width/2)/2), "y": main.height/2}
							   };

						
		main.rScale = d3.scalePow()
			.exponent(2)
			.domain([0,main.max_count])
			.range([10,100]);
											
		// Initialize SVG
		main.svg = d3.select("#vis_container").append("svg")
			.attr("id","main_svg")
			.attr("width",main.width)
			.attr("height",main.height)
			.style("cursor","move")
			.append("g");
			
		// Initialize some text things
		
		main.gradeLabel = main.svg.append("text")
			.attr("class","gradeLabel")
			.attr("x", main.width - main.margin.right)
			.attr("y", main.height - main.margin.bottom)
			.text("")
			.attr("opacity",0);

		main.pressPlay = main.svg.append("text")
			.attr("class","gradeLabel")
			.attr("x", main.width - main.margin.right)
			.attr("y", main.height - main.margin.bottom - 80)
			.text("Press Play Above")
			.attr("opacity",0);
		
		main.pressPlay.transition()
				.duration(1000)
				.delay(1000)
				.attr("opacity",1);
			
			
		// Define functions
		function ticked() {

			main.svg.selectAll(".network_node")
				.attr("transform", function(d,i) {
					return "translate(" + d.x + "," + d.y + ")";
			});


			main.svg.selectAll(".network_link")
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });


		}
  
		function dragstarted(d) {
			if (!d3.event.active) main.simulation.alphaTarget(0.6).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		function dragended(d) {
			if (!d3.event.active) main.simulation.alphaTarget(0.6);
			d.fx = null;
			d.fy = null;
		}

		// Define force layout main.simulation
		main.simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(function(d) { return d.id; }))
			.force("collide", d3.forceCollide().radius(function(d) { 
				if(d.type === "radicalCluster") {
					var radical_id = d.id.replace("cluster.","");
					return main.rScale(main.subclusters[radical_id]["kanji"].length);
				} else {
					return 50;
				}
			}).strength(0.1))
			.force("charge", d3.forceManyBody().strength(function(d) { 
				switch(d.type) {
					case "kanji":
						return -2;
						break;
					case "radical":
						return -4;
						break;
					case "radicalCluster":
						return -20;
						break;
					default:
						return 0;
				}
			}))
			.force("center", d3.forceCenter(main.width*0.6, main.height*0.5))
			.on("tick",ticked);	

		main.node_data = [];
		main.link_data = [];
		main.subclusters = {};
		main.indexes = {};
		main.network_node;
		main.network_link;
		main.index = 0;
		main.keys = Object.keys(data);
		main.gradeCompleted = true;
		main.proceed = true;
		
		main.run = setInterval(function() {
			if(main.gradeCompleted) {

				if(main.index > main.keys.length-1) {
					clearInterval(main.run);		
					clearInterval(main.subSimulation);
					main.simulation.stop();
					main.proceed = false;
				}
			
				main.gradeCompleted = false;			
				main.currentGrade = main.keys[main.index];

				if(main.currentGrade === "1") {
					main.initialize = true;
					// Reset scaling
					main.svg.attr("transform","translate(" + main.width/2 + "," + main.height/2 +")scale(1)translate(" + -main.width/2 + "," + -main.height/2 + ")");
				}
				

				if(main.currentGrade === "4") {
					// Scale SVG down once it starts getting more complicated
					main.svg
						.transition()
						.duration(1000)
						.attr("transform","translate(" + main.width/2 + "," + main.height/2 +")scale(0.8)translate(" + -main.width/2 + "," + -main.height/2 + ")");
				}
				
				if(main.currentGrade === "secondary") {
					clearInterval(main.run);
					clearInterval(main.subSimulation);

					main.proceed = false;
				}
				
				if(main.proceed) {
					main.gradeLabel.text("Grade " + main.currentGrade);
					main.gradeLabel.transition()
						.duration(1000)
						.attr("opacity",1)
							.transition()
							.duration(1000)
							.delay(1000)
							.attr("opacity",0);
							
					main.currentData = data[main.currentGrade];
					this_node_data = main.currentData["nodes"];
					this_link_data = main.currentData["links"];

					runSimulation();

					main.index++;
				}
			}
		}, 1000);	
	
		function runSimulation() {
	
			//////////////////////////////////////////////////////////////////////////////////
			// LOOP THROUGH SUBSIMULATIONS
			//////////////////////////////////////////////////////////////////////////////////
			main.running = false;
			main.transitions = [transition_1, transition_2, transition_3, transition_4, transition_5, transition_6, transition_7, transition_8];
		
			main.subIndex = 0;
			main.subSimulation = setInterval(function() {
				if(main.running == false && main.paused == false) {
					main.simulation.stop();
			
					main.svg.call(main.transitions[main.subIndex]);

					main.network_node.moveToFront();
					main.simulation
						.nodes(main.node_data);
			
					main.simulation.force("link")
						.links(main.link_data);

					main.simulation.velocityDecay(0.6).alphaTarget(0.6).restart();

					if(main.subIndex == main.transitions.length - 1) {
						main.gradeCompleted = true;
						clearInterval(main.subSimulation);
					}
			
					main.subIndex++;
				}			
			}, 1500);
		

			//////////////////////////////////////////////////////////////////////////////////
			// 1	DRAW RADICAL NODES
			//////////////////////////////////////////////////////////////////////////////////

			function transition_1() {
			
				main.running = true;
			
				this_node_data.forEach(function(n) {
					n.nodes.forEach(function(nn) {
						var radical_id = nn.id.split(".")[1];
						var kanji_id = nn.id.split(".")[0];
						var modified_nn = nn;
						var cluster = main.svg.selectAll(".network_node").filter(function(d) {
							return d.id === "cluster." + radical_id;
						});
						if(cluster.nodes().length > 0) {
							var translation = getTranslation(cluster.attr("transform"));
							modified_nn.x = translation[0];
							modified_nn.y = translation[1];
							modified_nn.kanji_group = kanji_id;
						} else {
							modified_nn.kanji_group = kanji_id;	
						}
						main.node_data.push(modified_nn);
					});
				});

				main.network_node = main.svg.selectAll(".network_node").data(main.node_data, function(d) { return d.id; });
		
				var nodeEnter = main.network_node.enter().append("g");
				nodeEnter.attr("class",function(d) {
					return "kg_" + d.kanji_group;
					})
					.classed("network_node",true)
					.style("cursor","pointer")
					.attr("opacity",1)
					.call(d3.drag()
					  .on("start", dragstarted)
					  .on("drag", dragged)
					  .on("end", dragended));   
						 
				nodeEnter.append("circle")
					.attr("cx",0)
					.attr("cy",0)
					.attr("r", 0)
					.attr("fill","#FFFFFF")
					.attr("stroke",function(d) {
						if(d.type === "radical") {
							return "#B20000";
						} else if(d.type === "kanji") {
							return "#333333";
						}
					})
					.attr("stroke-main.width",1);

				nodeEnter.append("text")
					.attr("class","radical_label")
					.text(function(d) { 
						var radical_id = d.id.split(".")[1];
						return main.radical_glyphs[radical_id];
					});
		
				main.network_node = nodeEnter.merge(main.network_node);
				main.network_node.exit().remove();


				main.svg.selectAll(".network_node").each(function(n,i) {		
					var this_circle = d3.select(this).select("circle");			
					this_circle.transition()
						.duration(1000)
						.delay(i*2)
						.attr("r", function(d) {
							if(d.type === "radical") {
								return 10;
							} else {
								return this_circle.attr("r");
							}
					
						});


					d3.select(this).transition()
					.duration(500)
					.delay(function() { return i*5; })
					.attr("opacity",1)
					.on("end", function() {
						d3.selectAll(".network_link").filter(function(l) {
							return l.source.id === n.id || l.target.id === n.id;
						}).attr("opacity",1);
					});
			
			
				});
			
				main.svg.selectAll(".network_node").moveToFront();
			
				main.running = false;

			}	// END TRANSITION 1


			//////////////////////////////////////////////////////////////////////////////////
			// 2	DRAW RADICAL LINKS
			//////////////////////////////////////////////////////////////////////////////////

			function transition_2() {
				main.running = true;
			
				this_node_data.forEach(function(n) {
					n.links.forEach(function(l) {
						if(l.linkType === "radical") {
							main.link_data.push({"source": l.source, "target": l.target, "linkType": l.linkType});
						}
					});
				});

				main.network_link = main.svg.selectAll(".network_link")
					.data(main.link_data);

				var linkEnter = main.network_link.enter().append("line")
					.attr("class","network_link")
					.attr("stroke","#CCCCCC")
					.attr("stroke-main.width",1)
					.attr("opacity",1);

				main.network_link = linkEnter.merge(main.network_link);
				main.network_link.exit().remove();
			
				main.running = false;

				if(main.initialize) {
					main.paused = true;
				}
			}	// END TRANSITION 2

			//////////////////////////////////////////////////////////////////////////////////
			// 3	DRAW KANJI NODES
			//////////////////////////////////////////////////////////////////////////////////

			function transition_3() {
				main.running = true;

				this_node_data.forEach(function(n) {
					// Get an initial position for new kanji node
					var kanji_id = n.id;
					var transform = getTranslation(main.svg.select(".kg_" + kanji_id).attr("transform"));
					main.node_data.push({"id": n.id, "type": "kanji", "glyph": n.glyph, "x": transform[0], "y": transform[1]});
				});

				main.network_node = main.svg.selectAll(".network_node").data(main.node_data, function(d) { return d.id; });
		
				var nodeEnter = main.network_node.enter().append("g");
				nodeEnter.attr("class","network_node")
						.style("cursor","pointer")
						.attr("opacity",0)
				.call(d3.drag()
						  .on("start", dragstarted)
						  .on("drag", dragged)
						  .on("end", dragended));   
						 
				nodeEnter.append("circle")
					.attr("cx",0)
					.attr("cy",0)
					.attr("r", function(d) {
						return 0;				
					})
					.attr("fill","#FFFFFF")
					.attr("stroke",function(d) {
						if(d.type === "radical") {
							return "#B20000";
						} else if(d.type === "kanji") {
							return "#333333";
						}
					})
					.attr("stroke-main.width",1);

					main.network_node = nodeEnter.merge(main.network_node);
					main.network_node.exit().remove();


					main.svg.selectAll(".network_node").each(function(n,i) {	
						var this_circle = d3.select(this).select("circle:not(.radicalCluster)");				
						this_circle.transition()
							.duration(1000)
							.attr("r", function(d) {
								if(d.type === "radical") {
									return 10;
								} else if(d.type === "kanji") {
									return 3;
								} else {
									return this_circle.attr("r");
								}
						
							});


						d3.select(this).transition()
							.duration(250)
							.delay(function() { return i*2; })
							.attr("opacity",1)
							.on("end", function() {
								d3.selectAll(".network_link").filter(function(l) {
									return l.source.id === n.id || l.target.id === n.id;
								}).attr("opacity",1);
						
							});
					});
				
				main.running = false;

			}	// END TRANSITION 3		

			//////////////////////////////////////////////////////////////////////////////////
			// 4	DRAW KANJI LINKS
			//////////////////////////////////////////////////////////////////////////////////

			function transition_4() {
				main.running = true;
				this_node_data.forEach(function(n) {
					n.links.forEach(function(l) {
						if(l.linkType === "kanji") {
							main.link_data.push({"source": l.source, "target": l.target, "linkType": l.linkType});
						}
					});
				});

				main.network_link = main.svg.selectAll(".network_link")
					.data(main.link_data);

				var linkEnter = main.network_link.enter().append("line")
					.attr("class","network_link")
					.attr("stroke","#CCCCCC")
					.attr("stroke-main.width",1)
					.attr("opacity",1);

				main.network_link = linkEnter.merge(main.network_link);
				main.network_link.exit().remove();
			
				main.running = false;

			}	// END TRANSITION 4

			//////////////////////////////////////////////////////////////////////////////////
			// 5	DRAW RADICAL CLUSTER NODES
			//////////////////////////////////////////////////////////////////////////////////
		
			function transition_5() {
				main.running = true;
			
				var addLinks = [];
// 				var radical_index = 0;
				main.link_data.forEach(function(l) {
					if(l.linkType === "kanji") {
						var radical_id = l.source.id.split(".")[1];
						var kanji_id = l.target;
						if(radical_id in main.fixed_positions) {
							var target = {"id": "cluster." + radical_id, "type": "radicalCluster", "fx": main.fixed_positions[radical_id]["x"], "fy": main.fixed_positions[radical_id]["y"]};
// 							radical_index++;
						} else {
							var target = {"id": "cluster." + radical_id, "type": "radicalCluster"};
					
						}
						if(!(radical_id in main.subclusters)) {
							main.subclusters[radical_id] = {target: target, "kanji": []};
							main.node_data.push(target);
						}
						addLinks.push({"source": l.target, "target": main.subclusters[radical_id]["target"], "linkType": "kanjiCluster"});
						
					}
				});

				main.network_node = main.svg.selectAll(".network_node").data(main.node_data, function(d) { return d.id; });
		
				var nodeEnter = main.network_node.enter().append("g");
				nodeEnter.attr("class","network_node")
						.classed("radicalCluster",true)
						.style("cursor","pointer")
						.attr("opacity",1)
				.call(d3.drag()
						  .on("start", dragstarted)
						  .on("drag", dragged)
						  .on("end", dragended));   
											 
				nodeEnter.append("circle")
					.attr("cx",0)
					.attr("cy",0)
					.attr("r", function(d) {
						return 0;				
					})
					.attr("fill","#FFFFFF")
					.attr("stroke",function(d) {
							return "#F6C900";
					})
					.attr("stroke-main.width",2);
				
				

				nodeEnter.append("text")
					.attr("class","radical_label")
					.text(function(d) { 
						var radical_id = d.id.split(".")[1];
						return main.radical_glyphs[radical_id];
					});



			
				main.network_node = nodeEnter.merge(main.network_node);
				main.network_node.exit().remove();

				main.svg.selectAll(".radicalCluster").on("mouseover", function(d) {
						main.svg.interrupt();
						main.paused = true;
						main.simulation.stop();
						var radical_id = d.id.replace("cluster.","");
						main.svg.selectAll(".network_link").attr("opacity",0.2);
						main.svg.selectAll(".network_node")
							.attr("opacity",0.1);

						d3.select(this).select("circle").attr("fill", "#FC6900");
						d3.select(this).select("text").attr("fill","#FFFFFF");
						d3.select(this).attr("opacity",1);
						
						main.subclusters[radical_id]["kanji"].forEach(function(k) {
							main.svg.selectAll(".network_node").filter(function(nn) {
								return nn.id === k;
							}).each(function(nn) {
								d3.select(this).transition()
									.duration(500)
									.attr("opacity",1);
									
								d3.select(this).select("circle")
									.attr("r",15);
									
								d3.select(this).append("text")
									.attr("class","radical_label")
									.classed("temp_label","true")
									.text(function(d) { return d.glyph; });
									
								main.svg.selectAll(".network_link").filter(function(ll) {
									return ll.source === nn && ll.target === d;
								}).attr("opacity",1)
								.attr("stroke-width",3);
							});
						});						
					}).on("mouseout", function(d) {
						d3.select(this).select("circle").attr("fill","#FFFFFF");
						d3.select(this).select("text").attr("fill","#000000");
						main.svg.selectAll(".network_link")
							.attr("opacity",1)
							.attr("stroke-width",1);
						main.svg.selectAll(".network_node")
							.attr("opacity",1)
							.selectAll("circle")
							.attr("r", function(d) {
								if(d.type === "kanji") {
									return 3;
								} else {
									return d3.select(this).attr("r");
								}
					
							});
							
						main.svg.selectAll(".temp_label").remove();
						main.paused = false;
						main.simulation.restart();

					});

				main.svg.selectAll(".network_node").each(function(n,i) {	
					var this_circle = d3.select(this).select("circle");				
					this_circle.transition()
						.duration(1000)
						.attr("r", function(d) {
							if(d.type === "radicalCluster") {
								return 10;
							} else {
								return this_circle.attr("r");
							}
					
						});

				});
				
				addLinks.forEach(function(al) {
					main.link_data.push({source: al.source, target: al.target, linkType: al.linkType});
				});
			
				main.running = false;
			
			}	// END TRANSITION 5	
		
			//////////////////////////////////////////////////////////////////////////////////
			// 6	DRAW RADICAL CLUSTER LINKS
			//////////////////////////////////////////////////////////////////////////////////

			function transition_6() {
				main.running = true;
				main.network_link = main.svg.selectAll(".network_link")
					.data(main.link_data);

				var linkEnter = main.network_link.enter().append("line")
					.attr("class","network_link")
					.attr("stroke","#CCCCCC")
					.attr("stroke-main.width",1)
					.attr("opacity",1);

				main.network_link = linkEnter.merge(main.network_link);
				main.network_link.exit().remove();

				main.running = false;
			
			}	// END TRANSITION 6		
		
			//////////////////////////////////////////////////////////////////////////////////
			// 7	ERASE ALL NON-CLUSTER LINKS
			//////////////////////////////////////////////////////////////////////////////////

			function transition_7() {
				main.running = true;
			
				/* This transition intentionally left blank for debugging purposes */

				main.running = false;

			}	// END TRANSITION 7			
			
			//////////////////////////////////////////////////////////////////////////////////
			// 8	DRAW LINKS BETWEEN RADICAL CLUSTERS
			//////////////////////////////////////////////////////////////////////////////////

			function transition_8() {			
				main.running = true;


				var i = main.node_data.length;
				while(i--) {
					var n = main.node_data[i];
					if(n.type === "radical") {
						main.node_data.splice(i,1);
					}
				
				}

				var i = main.link_data.length;
				while(i--) {
					var l = main.link_data[i];
					if(l.linkType !== "kanjiCluster") {
						main.link_data.splice(i,1);
					}
				
				}


				main.network_link = main.svg.selectAll(".network_link")
					.data(main.link_data, function(d) { return d.target.id; });

				main.network_link.exit().remove();

				main.network_node = main.svg.selectAll(".network_node")
					.data(main.node_data, function(d) { return d.id; });

				main.network_node.exit().remove();

				main.link_data.forEach(function(l) {
					if(l.linkType === "kanjiCluster") {
						var radical_id = l.target.id.split(".")[1];
						var kanji_id = l.source.id;
					
						if(!(radical_id in main.subclusters)) {
							main.subclusters[radical_id]["kanji"] = [kanji_id];
						} else {
							main.subclusters[radical_id]["kanji"].push(kanji_id);
						}
					}
				});

				var clusterKeys = Object.keys(main.subclusters);
				for(var i = 0; i < clusterKeys.length - 1; i++) {
					source_radical = clusterKeys[i];
					source_kanji_ids = main.subclusters[source_radical]["kanji"];
					for(var j = i+1; j < clusterKeys.length; j++) {
						var find = false;
						target_radical = clusterKeys[j];
						target_kanji_ids = main.subclusters[target_radical]["kanji"];
						source_kanji_ids.forEach(function(k) {
							if(target_kanji_ids.indexOf(k) >= 0) {
								find = true;
							}
						});
					
						if(find) {
							main.link_data.push({source: "cluster." + source_radical, target: "cluster." + target_radical, linkType: "interRadical"});
						}
					}
				}
			
				main.network_link = main.svg.selectAll(".network_link")
					.data(main.link_data, function(d) { return d.target.id; });

				var linkEnter = main.network_link.enter().append("line")
					.attr("class","network_link")
					.classed("interRadical",function(d) { 
						if(d.linkType === "interRadical") {
							return true;
						} else {
							return false;
						}
					})
					.attr("stroke","#CCCCCC")
					.attr("stroke-main.width",1);

				main.network_link = linkEnter.merge(main.network_link);
				main.network_link.exit().remove();

				main.svg.selectAll(".interRadical")
					.attr("stroke","#B20000")
					.attr("opacity",0.5);
				
				main.svg.selectAll(".radicalCluster")
					.transition()
					.duration(500)
					.attr("r", function(d) {
						return main.rScale(main.subclusters[d.id.replace("cluster.","")]["kanji"].length);
					});
			
				main.running = false;

			}	// END TRANSITION 8
						
		} // end runSimulation()
	
		// Bind mouse drag translation to SVG		
		function svg_dragstarted(d) {
			main.drag_ix = d3.event.x;
			main.drag_iy = d3.event.y;
		}

		function svg_dragged(d) {
		  main.svg.attr("transform", "translate(" + (d3.event.x-main.drag_ix) + "," + (d3.event.y-main.drag_iy) + ")");
		}

		d3.select("#main_svg").call(d3.drag()
			.on("start", svg_dragstarted)
			.on("drag", svg_dragged));
		
	
		// Bind pause/restart controls to simulation
		main.paused = false;
		$("#simulation_pause").click(function() {
			if(main.paused) {
				main.simulation.restart();
				main.paused = false;
				$(this).html("Pause");
					main.pressPlay.transition()
						.duration(500)
						.attr("opacity",0)
						.remove();
					main.initialize = false;
			} else {
				main.simulation.stop();
				main.paused = true;
				$(this).html("Play");
			}
		});

		$("#simulation_restart").click(function() {
			main.simulation.stop();
			clearInterval(main.subSimulation);
			clearInterval(main.run);
			main.svg.selectAll("*").remove();

			main.node_data = [];
			main.link_data = [];
			main.subclusters = {};
			main.indexes = {};
			main.network_node;
			main.network_link;
			main.index = 0;
			main.keys = Object.keys(data);
			main.gradeCompleted = true;
		
			main.run = setInterval(function() {
				if(main.gradeCompleted) {
					main.gradeCompleted = false;
					main.currentGrade = main.keys[main.index];
					main.currentData = data[main.currentGrade];
					this_node_data = main.currentData["nodes"];
					this_link_data = main.currentData["links"];

					runSimulation();

					if(main.index == main.keys.length - 1) {
						clearInterval(main.run);		
						main.simulation.stop();
					}
					main.index++;
				}
			}, 2000);	
			
			});

	});	// end $.getJSON

});	// end $(document).ready()