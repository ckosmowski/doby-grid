/*jshint loopfunc: true*/
/*global _, $, define */

define(['dobygrid'], function (DobyGrid) {
	"use strict";

	return [function () {

		// Generate Data
		var data = [];
		for (var i = 0; i < 50; i++) {
			data.push({
				id: 'product_' + i,
				data: {
					id: 'product_' + i,
					firstname: _.sample(["Peter", "Paul", "Marie", "Michaela", "Hans", "Volker", "Manuel", "Christian", "Jan", "Simon", "Thomas", "Stefan", "Willi", "Bernhard", "Bianca", "Tim", "Ulf", "Uwe", "Udo"]),
					name: _.sample(["Müller", "Meier", "Maier", "Schulze", "Schmidt", "Bäcker", "Seiler", "Oppen", "Perona", "Schlepp", "Schnell", "Stark", "Groß", "Schneider"])
				},
				columns: {					
					0: {						
						class: "nopad"
					}
				},
				rows: {
					0: {
						id: 'details_' + i,
						collapsed: true,
						height: 450,
						columns: {							
							0: {								
								class: "nopad",
								cache: true,
								colspan: "*",
								formatter: function () {
									return '<div style="text-align:center;">Loading components...</div>';
								},
								postprocess: function (data) {
									var subdata = [];

									for (var i = 0; i < 100; i++) {
										subdata.push({
											id: 'component-' + i,
											data: {
												title: "Mappe mit dem Titel Nummer " + i,
												created: _.sample(_.range(1, 31)) + "." + _.sample(_.range(1, 12)) + "." + _.sample(_.range(2004, 2014)),
												modified: _.sample(_.range(1, 31)) + "." + _.sample(_.range(1, 12)) + "." + _.sample(_.range(2004, 2014)),
												category: _.sample(["Urlaub", "Gehalt", "Bewerbung", "Reisekosten"])
											}
										});
									}

									data.$cell.empty();
																		
									var $text = $("<div class='textc' style='line-height: 20px'></div>").appendTo(data.$cell);
									
									$text.append(data.data.parent.data.name + "<br/>" + data.data.parent.data.firstname);
									
									var $tab = $("<div class='tabc'></div>").appendTo(data.$cell);
									
									var grid = new DobyGrid({
										columns: [
											{
												id: 'id',
												name: 'Component #',
												field: 'id',
												formatter: function (row, cell, value, columnDef, data) {
													return data.id;
												},
												visible: false
											}, {
												id: 'title',
												name: 'Titel',
												field: 'title',
												width: 200
											}, {
												id: 'created',
												name: 'Erstellt am',
												field: 'created',
												width: 120
											}, {
												id: 'modified',
												name: "Geändert am",
												field: "modified",
												width: 120
											},{
												id: 'category',
												name: "",
												field: "category",
												visible: false
											}
										],
										data: subdata,
										stickyGroupRows: true,
										autoHeight: true
									}).appendTo($tab);
									
									console.log(data);									
									
									var row = data.grid.getRowFromIndex(data.rowIndex);
									
									grid.setGrouping([{
										column_id: 'category',
										collapsed: true
									}]);
									
									data.grid.setItem(row.id, {
									    height: 250,
									    data: data
									});
									
								}
							}
						}
					}
				}
			});
		}

		return {
			columns: [{
				id: "details",
				name: "",
				field: "details",
				filterable: false,
				focusable: false,
				formatter: function () {
					return '<div class="toggleDetails">+</div>';
				},
				groupable: false,
				selectable: false,
				sortable: false,
				width: 50
			}, {
				id: "id",
				name: "Product #",
				field: "id",
				formatter: function (row, cell, value, columnDef, data) {
					return data.id;
				},
				visible: false
			}, {
				id: "name",
				name: "Name",
				field: "name",
				width: 270
			}, {
				id: "firstname",
				name: "Vorname",
				field: "firstname",
				width: 290
			}],
			data: data,
			quickFilter: true,
			fullWidthRows: true,
			contextMenu: false,			
		};
	}, function (grid) {
		grid.on('click', function (event, args) {
			event.stopPropagation();

			// Toggle product details
			if ($(event.target).hasClass('toggleDetails')) {
				args.item.rows[0].collapsed = !args.item.rows[0].collapsed;
				grid.setItem(args.item.id, args.item);
			}
		});
	}];
});