/*global _, define*/

define(['backbone', 'faker'], function (Backbone, Faker) {
	"use strict";

	return [function () {
		// Generate Data
		var collection = new Backbone.Collection();

		return {
			columns: [{
				id: "id",
				name: "ID",
				field: "id"
			}, {
				id: "name",
				name: "Name",
				field: "name",
				minWidth: 100
			}, {
				id: "city",
				name: "City",
				field: "city"
			}, {
				id: "rating",
				name: "Rating",
				field: "rating",
				aggregator: function () {
					this.total = [];
					this.exporter = function () {
						var avg = this.total.reduce(function (a, b) { return a + b; });
						return Math.round(avg / this.total.length);
					};
					this.formatter = function () {
						var avg = this.total.reduce(function (a, b) { return a + b; });
						return "Avg: <strong>" + Math.round(avg / this.total.length) + "</strong>";
					};
					this.process = function (item) {
						this.total.push(item.get('rating'));
					};
					return this;
				}
			}],
			data: collection
		};
	}, function (grid) {
		for (var i = 0; i < 1000; i++) {
			grid.options.data.add({
				id: i,
				name: Faker.name.findName(),
				city: Faker.address.city(),
				rating: _.sample([1, 2, 3, 4, 5, 6, 7, 8, 9])
			});
		}
	}];
});