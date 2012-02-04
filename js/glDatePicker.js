/*
	glDatePicker - A simple, customizable, lightweight date picker calendar plugin for jQuery

	Downloads, examples, and instructions available at:
	http://code.gautamlad.com/glDatePicker/

	Complete project source available at:
	https://github.com/glad/glDatePicker/

	Copyright (c) 2011 Gautam Lad.  All rights reserved.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	Changelog:
		Version 1.3 - Sat Feb 4 2012
			- Fixed missing div and closing properly on IE7/8

		Version 1.2 - Sat Aug 19 2011
			- Fixed the issue where the end date for a given month was actually that of the previous month's

		Version 1.1 - Sat Aug 6 2011
			- Last date shown incorrectly after selecting it
			- Introduces selectedDate option for visually indicating selected date
			- Selected date can also be set
			- Homepage updated with selectedDate example (in #4)
			- Syntaxhighlighter files referenced locally
			- Updated styles with selectedDate class

		Version 1.0 - Mon Aug 1 2011
			- Initial release
*/
(function($)
{
	var defaults =
	{
		calId: 0,
		cssName: "default",
		startDate: -1,
		endDate: -1,
		selectedDate: -1,
		showPrevNext: true,
		allowOld: true,
		showAlways: false,
		position: "absolute"
	};

	var methods =
	{
		init: function(options)
		{
			return this.each(function()
			{
				var self = $(this);
				var settings = $.extend({}, defaults);

				// Save the settings and id
				settings.calId = self[0].id+"-gldp";
				if(options) { settings = $.extend(settings, options); }
				self.data("settings", settings);

				// Bind click and focus event to show
				self
					.click(methods.show)
					.focus(methods.show);

				// If always showing, trigger click causing it to show
				if(settings.showAlways)
				{
					setTimeout(function() { self.trigger("focus"); }, 50);
				}

				// Bind click elsewhere to hide
				$(document).bind("click", function(e)
				{
					methods.hide.apply(self);
				});
			});
		},

		// Show the calendar
		show: function(e)
		{
			e.stopPropagation();

			// Instead of catching blur we'll find anything that's made visible
			methods.hide.apply($("._gldp").not($(this)));

			methods.update.apply($(this));
		},

		// Hide the calendar
		hide: function()
		{
			if($(this).length)
			{
				var s = $(this).data("settings");

				// Hide if not showing always
				if(!s.showAlways)
				{
					// Hide the calendar and remove class from target
					$("#"+s.calId).slideUp(200);
					$(this).removeClass("_gldp");
				}
			}
		},

		// Set a new start date
		setStartDate: function(e)
		{
			$(this).data("settings").startDate = e;
		},

		// Set a new end date
		setEndDate: function(e)
		{
			$(this).data("settings").endDate = e;
		},

		// Set a new selected date
		setSelectedDate: function(e)
		{
			$(this).data("settings").selectedDate = e;
		},

		// Render the calendar
		update:function()
		{
			var target = $(this);
			var settings = target.data("settings");

			// Get the calendar id
			var calId = settings.calId;

			// Get the starting date
			var startDate = settings.startDate;
			if(settings.startDate == -1)
			{
				startDate = new Date();
				startDate.setDate(1);
			}
			startDate.setHours(0,0,0,0);
			var startTime = startDate.getTime();

			// Get the end date
			var endDate = new Date(0);
			if(settings.endDate != -1)
			{
				endDate = new Date(settings.endDate);
				if((/^\d+$/).test(settings.endDate))
				{
					endDate = new Date(startDate);
					endDate.setDate(endDate.getDate()+settings.endDate);
				}
			}
			endDate.setHours(0,0,0,0);
			var endTime = endDate.getTime();

			// Get the selected date
			var selectedDate = new Date(0);
			if(settings.selectedDate != -1)
			{
				selectedDate = new Date(settings.selectedDate);
				if((/^\d+$/).test(settings.selectedDate))
				{
					selectedDate = new Date(startDate);
					selectedDate.setDate(selectedDate.getDate()+settings.selectedDate);
				}
			}
			selectedDate.setHours(0,0,0,0);
			var selectedTime = selectedDate.getTime();

			// Get the current date to render
			var theDate = target.data("theDate");
				theDate = (theDate == -1 || typeof theDate == "undefined") ? startDate : theDate;

			// Calculate the first and last date in month being rendered.
			// Also calculate the weekday to start rendering on
			var firstDate = new Date(theDate); firstDate.setDate(1);
			var firstTime = firstDate.getTime();
			var lastDate = new Date(firstDate); lastDate.setMonth(lastDate.getMonth()+1); lastDate.setDate(0);
			var lastTime = lastDate.getTime();
			var lastDay = lastDate.getDate();

			// Calculate the last day in previous month
			var prevDateLastDay = new Date(firstDate);
				prevDateLastDay.setDate(0);
				prevDateLastDay = prevDateLastDay.getDate();

			// The month names to show in toolbar
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			// Save current date
			target.data("theDate", theDate);

			// Render the cells as <TD>
			var days = "";
			for(var y = 0, i = 0; y < 6; y++)
			{
				var row = "";

				for(var x = 0; x < 7; x++, i++)
				{
					var p = ((prevDateLastDay - firstDate.getDay()) + i + 1);
					var n = p - prevDateLastDay;
					var c = (x == 0) ? "sun" : ((x == 6) ? "sat" : "day");

					// If value is outside of bounds its likely previous and next months
					if(n >= 1 && n <= lastDay)
					{
						var today = new Date(); today.setHours(0,0,0,0);
						var date = new Date(theDate); date.setHours(0,0,0,0); date.setDate(n);
						var dateTime = date.getTime();

						// Test to see if it's today
						c = (today.getTime() == dateTime) ? "today":c;

						// Test to see if we allow old dates
						if(!settings.allowOld)
						{
							c = (dateTime < startTime) ? "noday":c;
						}

						// Test against end date
						if(settings.endDate != -1)
						{
							c = (dateTime > endTime) ? "noday":c;
						}

						// Test against selected date
						if(settings.selectedDate != -1)
						{
							c = (dateTime == selectedTime) ? "selected":c;
						}
					}
					else
					{
						c = "noday"; // Prev/Next month dates are non-selectable by default
						n = (n <= 0) ? p : ((p - lastDay) - prevDateLastDay);
					}

					// Create the cell
					row += "<td class='gldp-days "+c+" **-"+c+"'><div class='"+c+"'>"+n+"</div></td>";
				}

				// Create the row
				days += "<tr class='days'>"+row+"</tr>";
			}

			// Determine whether to show Previous arrow
			var showP = ((startTime < firstTime) || settings.allowOld);
			var showN = ((lastTime < endTime) || (endTime < startTime));

			// Force override to showPrevNext on false
			if(!settings.showPrevNext) { showP = showN = false; }

			// Build the html for the control
			var titleMonthYear = monthNames[theDate.getMonth()]+" "+theDate.getFullYear();
			var html =
				"<div class='**'>"+
					"<table>"+
						"<tr>"+ /* Prev Month/Year Next*/
							("<td class='**-prevnext prev'>"+(showP ? "◄":"")+"</td>")+
							"<td class='**-monyear' colspan='5'>{MY}</td>"+
							("<td class='**-prevnext next'>"+(showN ? "►":"")+"</td>")+
						"</tr>"+
						"<tr class='**-dow'>"+ /* Day of Week */
							"<td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td>"+
						"</tr>"+days+
					"</table>"+
				"</div>";

			// Replace css, month-year title
			html = (html.replace(/\*{2}/gi, "gldp-"+settings.cssName)).replace(/\{MY\}/gi, titleMonthYear);

			// If calendar doesn't exist, make one
			if($("#"+calId).length == 0)
			{
				target.after
				(
					$("<div id='"+calId+"'></div>")
					.css(
					{
						"position":settings.position,
						"z-index":settings.zIndex,
						"left":(target.offset().left),
						"top":target.offset().top+target.outerHeight(true)
					})
				);
			}

			// Show calendar
			var calendar = $("#"+calId);
			calendar.html(html).slideDown(200);

			// Add a class to make it easier to find when hiding
			target.addClass("_gldp");

			// Handle previous/next clicks
			$("[class*=-prevnext]", calendar).click(function(e)
			{
				e.stopPropagation();

				if($(this).html() != "")
				{
					// Determine offset and set new date
					var offset = $(this).hasClass("prev") ? -1 : 1;
					var newDate = new Date(firstDate);
						newDate.setMonth(theDate.getMonth()+offset);

					// Save the new date and render the change
					target.data("theDate", newDate);
					methods.update.apply(target);
				}
			});

			// Highlight day cell on hover
			$("tr.days td:not(.noday, .selected)", calendar)
				.mouseenter(function(e)
				{
					var css = "gldp-"+settings.cssName+"-"+$(this).children("div").attr("class");
					$(this).removeClass(css).addClass(css+"-hover");
				})
				.mouseleave(function(e)
				{
					if(!$(this).hasClass("selected"))
					{
						var css = "gldp-"+settings.cssName+"-"+$(this).children("div").attr("class");
						$(this).removeClass(css+"-hover").addClass(css);
					}
				})
				.click(function(e)
				{
					e.stopPropagation();
					var day = $(this).children("div").html();
					var settings = target.data("settings");
					var newDate = new Date(theDate); newDate.setDate(day);

					// Save the new date and update the target control
					target.data("theDate", newDate);
					target.val((newDate.getMonth()+1)+"/"+newDate.getDate()+"/"+newDate.getFullYear());

					// Run callback to user-defined date change method
					if(settings.onChange != null && typeof settings.onChange != "undefined")
					{
						settings.onChange(target, newDate);
					}

					// Save selected
					settings.selectedDate = newDate;

					// Hide calendar
					methods.hide.apply(target);
				});
		}
	};

	// Plugin entry
	$.fn.glDatePicker = function(method)
	{
		if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
		else if(typeof method === "object" || !method) { return methods.init.apply(this, arguments); }
		else { $.error("Method "+ method + " does not exist on jQuery.glDatePicker"); }
	};
})(jQuery);