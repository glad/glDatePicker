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

				// Bind click event to show
				self.click(methods.show);

				// If always showing, trigger click causing it to show
				if(settings.showAlways)
				{
					setTimeout(function() { self.trigger("click"); }, 50);
				}

				// Bind click elsewhere to hide
				$(window).bind("click", function(e)
				{
					methods.hide.apply(self);
				});
			});
		},

		show: function(e)
		{
			e.stopPropagation();
			methods.update.apply($(this));
		},

		hide: function()
		{
			var settings = $(this).data("settings");

			// Hide if not showing always
			if(!settings.showAlways)
			{
				$("#"+settings.calId+":not(.active)").slideUp(200);
			}
		},

		update:function(e)
		{
			var target = $(this);
			var settings = target.data("settings");

			// Get the calendar id
			var calId = settings.calId;

			// Show Prev/Next buttons
			var showPN = settings.showPrevNext;

			// Get the starting date
			var startDate = settings.startDate;
			if(settings.startDate == -1)
			{
				startDate = new Date();
				startDate.setDate(1);
			}
			startDate.setHours(0,0,0,0);

			// Get the end date
			var endDate = ((new String(settings.endDate)).match(/^\d+$/) == null) ? settings.endDate : null

			// Get the current date to render
			var theDate = target.data("theDate");
				theDate = (theDate == -1 || typeof theDate == "undefined") ? startDate : theDate;

			// Calculate the first and last date in month being rendered.
			// Also calculate the weekday to start rendering on
			var firstDate = new Date(theDate); firstDate.setDate(1);
			var lastDate = new Date(theDate); lastDate.setMonth(theDate.getMonth()+1); lastDate.setDate(0);
			var firstDay = firstDate.getDate();
			var lastDay = lastDate.getDate();
			var weekDay = firstDate.getDay();

			// Calculate the last day in previous month
			var prevDate = new Date(firstDate);
				prevDate.setDate(0);
			var prevDateLastDay = prevDate.getDate();

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
					var p = ((prevDateLastDay - weekDay) + i + 1);
					var n = p - prevDateLastDay;
					var c = (x == 0) ? "sun" : ((x == 6) ? "sat" : "day");

					// If value is outside of bounds its likely previous and next months
					if(n >= 1 && n <= lastDay)
					{
						var today = new Date(); today.setHours(0,0,0,0);
						var date = new Date(theDate); date.setHours(0,0,0,0); date.setDate(n);
	
						// Test to see if it's today
						c = (today.getTime() == date.getTime()) ? "today":c;

						// Test to see if we allow old dates
						if(!settings.allowOld)
						{
							c = (date.getTime() < startDate.getTime()) ? "noday":c;
						}

						// Test against end date
						if(settings.endDate != -1)
						{
							if(endDate == null)
							{
								endDate = new Date();
								endDate.setDate(endDate.getDate()+settings.endDate);
							}
							endDate.setHours(0,0,0,0);

							c = (date.getTime() > endDate.getTime()) ? "noday":c;
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

			// Build the html for the control
			var titleMonthYear = monthNames[theDate.getMonth()]+" "+theDate.getFullYear();
			var html =
				"<div class='**'>"+
					"<table>"+
						"<tr>"+ /* Prev Month/Year Next*/
							((showPN) ? ("<td class='**-prevnext prev'>&#9668;</td>"):("<td></td>")) +
							"<td class='**-monyear' colspan='5'>{MY}</td>"+
							((showPN) ? ("<td class='**-prevnext next'>&#9658;</td>"):("<td></td>")) +
						"</tr>"+
						"<tr class='**-dow'>"+ /* Day of Week */
							"<td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td>"+
						"</tr>"+days+
					"</table>"+
				"<div>";

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

			// Show/hide calendar based on mouse events
			var calendar = $("#"+calId);
			var tid = 0;
			calendar
				.html(html).show()
				.mouseenter(function()
				{
					clearTimeout(tid);
				})
				.mouseleave(function()
				{
					var self = $(this);
					tid = setTimeout(function()
					{
						self.removeClass();
						methods.hide.apply(target);
					}, 500);
				});

			// Handle previous/next clicks
			$("[class*=-prevnext]", calendar).click(function(e)
			{
				e.stopPropagation();

				// Determine offset and set new date
				var offset = $(this).hasClass("prev") ? -1 : 1;
				var newDate = new Date(firstDate);
					newDate.setMonth(theDate.getMonth()+offset);

				// Save the new date and render the change
				target.data("theDate", newDate);
				methods.update.apply(target);
			});

			// Highlight day cell on hover
			$("tr.days td:not(.noday)", calendar)
				.mouseenter(function(e)
				{
					e.stopPropagation();
					var css = "gldp-"+settings.cssName+"-"+$(this).children("div").attr("class");
					$(this).removeClass(css).addClass(css+"-hover");
				})
				.mouseleave(function(e)
				{
					e.stopPropagation();
					var css = "gldp-"+settings.cssName+"-"+$(this).children("div").attr("class");
					$(this).removeClass(css+"-hover").addClass(css);
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