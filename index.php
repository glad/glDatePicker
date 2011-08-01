<?php header('Cache-Control: no-cache, must-revalidate'); header('Content-type: text/html; charset=utf-8'); ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta name="description" content="glDatePicker - A simple, customizable, lightweight date picker calendar plugin for jQuery" />
	<meta name="keywords" content="datepicker, date picker, calendar, date control, jQuery" />
	<meta name="author" content="Gautam Lad" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>glDatePicker</title>

	<link href="site/css/default.css" rel="stylesheet" type="text/css" />
	<link href="site/css/syntaxhighlighter.css" rel="stylesheet" type="text/css" />

	<link href="css/default.css" rel="stylesheet" type="text/css" />
	<link href="css/android.css" rel="stylesheet" type="text/css" />
</head>

<body>
	<div id="#" class="site">
		<div class="container">

			<!-- BEGIN header -->
			<div class="header">
				<div class="title">glDatePicker</div>
				<div class="menu">
					<ul>
						<li><a href="#download">download</a></li>
						<li><a href="#usage">usage</a></li>
						<li><a href="#examples">examples</a></li>
						<li><a href="#about">about</a></li>
					</ul>
				</div>
			</div>
			<!-- END header -->

			<!-- BEGIN about -->
			<div class="content">
				<div id="about" class="title">about</div>
				<p>
					<b>glDatePicker</b> is a simple, customizable, lightweight date picker calendar plugin for <a href="http://jquery.com" target="_blank">jQuery</a> weighing in just over <span class="special">3.5KB compressed</span> (8KB uncompressed).
					<br/>
					<img src="site/img/screenshot.png" width="575" height="300" alt="Example styles" />
					<br/>
					It includes the following features:
				</p>
				<ul>
					<li>forward and back navigation</li>
					<li>current date highlight</li>
					<li>restricting selection of dates outside of a range</li>
					<li>restricting selection of dates beyond N-days from start date</li>
					<li>restricting forward / backwards month navigation</li>
					<li>individual styles per date picker (in case you have multiples on one page)</li>
				</ul>
			</div>
			<!-- END about -->

			<!-- BEGIN examples -->
			<div class="content">
				<div id="examples" class="title">examples</div>
				<p>
					Click on the text boxes to see examples of the control with the settings shown.
					<br/><br/>
				</p>

				<!-- BEGIN Example #1 -->
				<p>
					<b><span class="example">Example #1</span>: Basic usage</b>
				</p>
				<input type="text" id="date1" class="gldp" />
				<br/><br/>
				<pre class="brush:js">
					// Basic date picker with default settings
					$("#date1").glDatePicker();</pre>
				<br/><br/>
				<!-- END Example #1 -->

				<!-- BEGIN Example #2 -->
				<p>
					<b><span class="example">Example #2</span>: Use a custom styled date picker (only for this control)</b>
				</p>
				<input type="text" id="date2" class="gldp" />
				<br/><br/>
				<pre class="brush:js">
					// Use a custom theme named android
					$("#date2").glDatePicker(
					{
						cssName: "android"
					});</pre>
				<br/><br/>
				<!-- END Example #2 -->

				<!-- BEGIN Example #3 -->
				<p>
					<b><span class="example">Example #3</span>: Restricting selection to a specific date</b>
				</p>
				<input type="text" id="date3" class="gldp" />
				<br/><br/>
				<pre class="brush:js">
					// Set the last selectable date to September 5, 2011
					$("#date3").glDatePicker(
					{
						endDate: new Date("September 5, 2011")
					});</pre>
				<br/><br/>
				<!-- END Example #3 -->

				<!-- BEGIN Example #3 -->
				<p>
					<b><span class="example">Example #4</span>: Restricting selection of dates N-days from start date</b>
				</p>
				<input type="text" id="date4" class="gldp" />
				<br/><br/>
				<pre class="brush:js">
					// Set last selectable date to start date + 5-days and prevent old date selection
					$("#date4").glDatePicker(
					{
						endDate: 5,
						startDate: new Date("September 5, 2011"),
						allowOld: false
					});</pre>
				<br/><br/>
				<!-- END Example #4 -->

				<!-- BEGIN Example #5 -->
				<p>
					<b><span class="example">Example #5</span>: Hide prev/next arrows and prevent old dates selections</b>
				</p>
				<input type="text" id="date5" class="gldp" />
				<br/><br/>
				<pre class="brush:js">
					// Hide prev/next buttons and prevent selection of dates older than today
					$("#date5").glDatePicker(
					{
						showPrevNext: false,
						allowOld: false,
						startDate: new Date()
					});</pre>
				<br/><br/>
				<!-- END Example #5 -->

				<!-- BEGIN Example #6 -->
				<p>
					<b><span class="example">Example #6</span>: Using a custom callback to show date in a different format</b>
				</p>
				<input type="text" id="date6" class="gldp" />
				<br/><br/>
				<pre class="brush:js">
					$("#date6").glDatePicker(
					{
						onChange: function(target, newDate)
						{
							target.val
							(
								newDate.getFullYear() + "-" +
								newDate.getMonth() + "-" +
								newDate.getDate()
							);
						}
					});</pre>
				<!-- END Example #6 -->
			</div>
			<!-- END examples -->

			<!-- BEGIN usage -->
			<div class="content">
				<div id="usage" class="title">usage</div>
				<p>
					Below are all the available settings that can be adjusted and public methods that can be called.
					The values shown are the default setting values.
					<br/><br/>
				</p>

				<pre class="brush:js">
					/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
					 * Settings
					 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

					$("#date").glDatePicker(
					{
						// Name of the stylesheet to use.
						// For example, if your css name is called doublerainbow
						// then all all your css elements will need to be
						// prefixed with .gldp-doublerainbow in your stylesheet.
						// Use the /css/default.css as a starting point.
						cssName: "default",

						// Set starting date.
						// NOTE: Consider setting allowOld to false to make the startDate the
						// first date that can be selected.
						// Possible values:
						// -1 : Use beginning of current month
						// Date() : A javascript date, for example new Date("September 5, 2011")
						startDate: -1,

						// Set last selectable date if set to a positive number or an actual date.
						// Possible values:
						// -1 : No end date
						// +ve : A positive number indicating # of days from today
						// Date() : A javascript date, for example: new Date("September 5, 2012")
						endDate: -1

						// Show previous and next arrows.  Arrows will be automatically shown or
						// hidden if set to true.  Set to false to force it never show.
						// Possible values: true | false
						showPrevNext: true,

						// Allow selection of dates older than startDate if set to true.
						// Possible values: true | false
						allowOld: true,

						// Show the calendar at all times if set to true.
						// NOTE: Consider using position: "inherit" if you set this to true.
						// Possible values: true | false
						showAlways: false,

						// Set how calendar will appear positioned on the page.
						// Note: If you are using showAlways: true, then consider
						// setting the position to inherit
						// Possible values: static | absolute | fixed | relative | inherit
						position: "absolute",

						// A callback function to call when a date has been selected.
						// Possible values: a function with two arguments: target, newDate
						// For example:
						// $("#date").glDatePicker(
						// {
						//     onChange: function(target, newDate)
						//     {
						//         target.val
						//         (
						//             newDate.getFullYear() + "-" +
						//             newDate.getMonth() + "-" +
						//             newDate.getDate()
						//         );
						//     }
						// });
						onChange: null
					});


					/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
					 * Public methods
					 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

					// Set a new start date
					$("#date").glDatePicker("setStartDate", new Date("September 5, 2011"));

					// Set a new end date
					$("#date").glDatePicker("setEndDate", new Date("September 5, 2011"));</pre>
			</div>
			<!-- END usage -->

			<!-- BEGIN download -->
			<div class="content">
				<div id="download" class="title">download</div>
				<ul>
					<li><a href="site/download/glDatePicker-v1.0.zip">glDatePicker-v1.0.zip</a> - Released Aug 1, 2011</li>
				</ul>
			</div>
			<!-- END download -->

			<!-- BEGIN download -->
			<div class="content">
				<div id="clone" class="title">clone from github</div>
				Clone the latest source directly from the <a href="https://github.com/glad/glDatePicker/">github</a> repository.
				<br/><br/>
				<pre class="brush:bash">
					$ git clone https://github.com/glad/glDatePicker.git</pre>
			</div>
			<!-- END download -->

			<!-- BEGIN footer -->
			<div class="footer">
				<span class="copyright">Copyright &#169; 2011 <a href="http://gautamlad.com/">Gautam Lad</a>.  All rights reserved</span>
				<span class="contact"><a href="mailto:email@gautamlad.com">contact</a></span>
			</div>
			<!-- BEGIN footer -->
		</div>
	</div>

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
	<script src="http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js" type="text/javascript"></script>
	<script src="http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJScript.js" type="text/javascript"></script>
	<script src="http://alexgorbatchev.com/pub/sh/current/scripts/shBrushBash.js" type="text/javascript"></script>

	<script type="text/javascript" src="js/glDatePicker.js"></script>
	<script type="text/javascript">
		$(document).ready(function()
		{
			SyntaxHighlighter.defaults["brush"] = "js";
			SyntaxHighlighter.defaults["ruler"] = false;
			SyntaxHighlighter.defaults["toolbar"] = false;
			SyntaxHighlighter.defaults["gutter"] = false;
			SyntaxHighlighter.all();

			// Basic date picker with default settings
			$("#date1").glDatePicker();

			// Use a custom theme named android
			$("#date2").glDatePicker(
			{
				cssName: "android"
			});

			// Set the last selectable date to September 5, 2011
			$("#date3").glDatePicker(
			{
				endDate: new Date("September 5, 2011")
			});

			// Set last selectable date to start date + 5-days and prevent old date selection
			$("#date4").glDatePicker(
			{
				endDate: 5,
				startDate: new Date("September 5, 2011"),
				allowOld: false
			});

			// Hide prev/next buttons and prevent selection of dates older than today
			$("#date5").glDatePicker(
			{
				showPrevNext: false,
				allowOld: false,
				startDate: new Date()
			});

			// Use a custom callback to show date in a diffent format
			$("#date6").glDatePicker(
			{
				onChange: function(target, newDate)
				{
					target.val
					(
						newDate.getFullYear() + "-" +
						newDate.getMonth() + "-" +
						newDate.getDate()
					);
				}
			});
		});
	</script>

	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-7701484-3']);
		_gaq.push(['_setDomainName', '.gautamlad.com']);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
</body>
</html>