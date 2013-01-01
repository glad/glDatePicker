$(window).load(function()
{
	// Example #1 - Basic calendar
	$('#example1').glDatePicker(
	{
		showAlways: true
	});

	// Example #2 - Selectable dates and ranges and prevent month/year selection
	$('#example2').glDatePicker(
	{
		showAlways: true,
		allowMonthSelect: false,
		allowYearSelect: false,
		prevArrow: '',
		nextArrow: '',
		selectedDate: new Date(2013, 8, 5),
		selectableDateRange: [
			{ from: new Date(2013, 8, 1), to: new Date(2013, 8, 10) },
			{ from: new Date(2013, 8, 19), to: new Date(2013, 8, 22) },
		],
		selectableDates: [
			{ date: new Date(2013, 8, 24) },
			{ date: new Date(2013, 8, 30) }
		]
	});

	// Example #3 - Custom style, repeating special dates and callback
	$('#example3').glDatePicker(
	{
		showAlways: true,
		cssName: 'darkneon',
		selectedDate: new Date(2013, 0, 5),
		specialDates: [
			{
				date: new Date(2013, 0, 8),
				data: { message: 'Meeting every day 8 of the month' },
				repeatMonth: true
			},
			{
				date: new Date(0, 0, 1),
				data: { message: 'Happy New Year!' },
				repeatYear: true
			},
		],
		onClick: function(target, cell, date, data) {
			target.val(date.getFullYear() + ' - ' +
						date.getMonth() + ' - ' +
						date.getDate());

			if(data != null) {
				alert(data.message + '\n' + date);
			}
		}
	});

	// Example #4 - Day of week offset and restricting date selections
	$('#example4').glDatePicker(
	{
		showAlways: true,
		selectedDate: new Date(2013, 8, 5),
		dowOffset: 3,
		selectableYears: [2012, 2013, 2014],
		selectableMonths: [8, 11],
		selectableDOW: [1, 4, 6]
	});

	// Example #5 - Interactive demo
	var example5 = $('#example5').glDatePicker(
	{
		showAlways: true
	}).glDatePicker(true);

	$('#example5-showAlways').change(function() {
		var showAlways = eval($(this).val());
		example5.options.showAlways = showAlways;

		if(!showAlways) {
			example5.hide();
		}
		else {
			example5.show();
		}
	});

	$('#example5-cssName').change(function() {
		example5.options.cssName = $(this).val();
		example5.render();
	});

	$('#example5-selectableDOW').change(function() {
		example5.options.selectableDOW = eval($(this).val());
		example5.render();
	});

	$('#example5-dowOffset').change(function() {
		example5.options.dowOffset = eval($(this).val());
		example5.render();
	});

	$('#example5-dowNames').change(function() {
		example5.options.dowNames = eval($(this).val());
		example5.render();
	});

	$('#example5-monthNames').change(function() {
		example5.options.monthNames = eval($(this).val());
		example5.render();
	});
});