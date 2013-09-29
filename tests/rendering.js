// doby-grid.js
// (c) 2013 Evgueni Naverniouk, Globex Designs, Inc.
// Doby may be freely distributed under the MIT license.
// For all details and documentation:
// https://github.com/globexdesigns/doby-grid

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/

describe("Rendering", function () {

	// Default options for the grid
	var options = {
		columns: [{
			id: "id",
			name: "ID",
			field: "id"
		}, {
			id: "name",
			name: "Name",
			field: "name"
		}],
		data: [{
			data: {
				id: 1,
				name: "Some Name"
			}
		}]
	}

	// Create a new grid inside a fixture
	var grid = new DobyGrid(options)
	var fixture = setFixtures('<div id="text-container"></div>')
	grid.appendTo(fixture)


	// ==========================================================================================


	it("should append the grid to a container via appendTo()", function () {
		expect(fixture).toContain('div.doby-grid')
	})


	// ==========================================================================================


	it("should return a DobyGrid object via appendTo()", function () {
		expect(grid instanceof DobyGrid).toEqual(true)
		expect(typeof(grid)).toEqual('object')
	})


	// ==========================================================================================


	describe("Column Headers", function () {


		it("should render the expected number of column headers", function () {
			expect(grid.$el.find('.doby-grid-header-column').length).toEqual(options.columns.length)
		})


	})


	// ==========================================================================================


	describe("Grid Body", function () {


		it("should render the expected number of columns for every row", function () {
			expect(grid.$el.find('.doby-grid-row:first .doby-grid-cell').length).toEqual(options.columns.length)
		})


		// ==========================================================================================


		it("should automatically render a new row when you use add()", function () {
			var newrow = {data: {id: 2, name: "adding a new row"}}
			grid.add(newrow)
			var lastcell = grid.$el.find('.doby-grid-row:last-child .doby-grid-cell:last-child').text()
			expect(lastcell).toEqual(newrow.data.name)
		})


		// ==========================================================================================


		it("should render collapsed group headers when adding grouping", function () {
			gcolumn = options.columns[1]

			// Add some additional rows for testing
			grid.add([
				{data: {id: 3, name: "adding a new row"}},
				{data: {id: 4, name: "adding a new row"}},
				{data: {id: 5, name: "adding a new row"}},
				{data: {id: 6, name: "adding a new row"}}
			])

			// Group by column
			grid.addGrouping(gcolumn.id)

			// Figure out how many groups to expect
			groups = _.groupBy(grid.collection.items, function (i) { return i.data[gcolumn.field]})
			groups = _.keys(groups)

			// Grab the grid rows
			rows = grid.$el.find('.doby-grid-row')

			// Expect to find as many group headers as there are different values
			expect(rows.length).toEqual(groups.length)
			expect(rows).toHaveClass('doby-grid-group')

			// Clear grouping
			grid.setGrouping()
		})


		// ==========================================================================================


		it("should render an empty notice when there is no data", function () {
			// Ensure empty notice is on
			grid.setOptions({emptyNotice: true})

			// Empty the grid
			grid.reset()

			// Check to see if alert was rendered
			expect(grid.$el).toContain('.doby-grid-alert')
		})


		// ==========================================================================================


		// TODO: Fix Me
		xit("should render a special row at the end of the grid when using enableAddRow", function () {
			// Set option
			grid.setOptions({addRow: true})

			var lastcell = grid.$el.find('.doby-grid-row:last-child')
			console.log(lastcell)
			//expect(lastcell).toEqual(newrow.data.name)

			// Disable to prevent conflict with other tests
			grid.setOptions({addRow: false})
		})

	})


})