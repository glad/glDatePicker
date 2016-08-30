glDatePicker-mod
============
###### v1.1.2
Adds four additional options to the glDatePicker library which all take a callback function allowing for extendable features.  Each function returns the full date of the first day in the month/year being changed to (monthFirstDate).

### onNextMonthClick(monthFirstDate)
### onPrevMonthClick(monthFirstDate)

- Callback functions which will execute when next or previous buttons are clicked.

### onMonthYearSelect(monthFirstDate)

- Callback function that executes when the user changes the month through the options.

### onOutDayClick(monthFirstDate)

- Callback function that exectues when a user clicks on a date not part of the current month.

### onCalendarRefresh(monthFirstDate)

- Callback function that combines all four of the previous features into a single option.

Example
---------------
``` html
<!DOCTYPE html>
<html>
<head>
    <title>On Month Change Example</title>
    <link href="styles/glDatePicker-mod.default.css" rel="stylesheet" type="text/css">
</head>
<body>
    <input type="text" id="example1" />
    <input type="text" id="example2" />

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="glDatePicker-mod.min.js"></script>

    <script type="text/javascript">
        $(window).load(function(){
            
            // Both of these examples will return the same results:

            $('#example1').glDatePicker({
                onNextMonthClick: onMonthChange,
                onPrevMonthClick: onMonthChange,
                onMonthYearSelect: onMonthChange
            });

            $('#example2').glDatePicker({
                onCalendarRefresh: onMonthChange
            });

            function onMonthChange(monthFirstDate){
                console.log('The first day of this month is: ' + monthFirstDate);
            }
        });
    </script>
</body>
</html>
```

Download
---------------
``` shell
bower install glDatePicker-mod
```


glDatePicker
============

An ultra-simple, customizable, light-weight date picker plug-in
for [jQuery](http://jquery.com/) at just over **7KB compressed** or 25KB uncompressed.

### Features

- Stylize current date, selected date, special dates and individual days of the week
- Set data on special dates (that is returned on callback when selected)
- Repeatable date ranges, individual dates and special dates
- Restrict selection to range of dates, individual dates, years, months and days of the week
- Restricting forward / backwards month navigation
- Automatically jump to respective month on selection (if it is the next or previous month)
- Offset days of the week (e.g. make Wednesday the first day of the week)
- Jump to specific month or year through select drop-down
- Customizable month names and days of week names
- Callbacks for when date is selected and when calendar is about to show or hide
- Individual styles per date picker on the same page
- Render directly below input control (by default) or specify a custom element to render into


Guide and Demos
---------------

To view the complete guide and interactive demos of **glDatePicker**, head on to: [http://glad.github.com/glDatePicker/](http://glad.github.com/glDatePicker/)


Quick Start
-----------

Use the following template HTML as a starting point for using glDatePicker:

``` html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <link href="styles/glDatePicker.default.css" rel="stylesheet" type="text/css">
</head>
<body>
    <input type="text" id="example" />

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="glDatePicker.min.js"></script>

    <script type="text/javascript">
        $(window).load(function()
        {
            $('#example').glDatePicker();
        });
    </script>
</body>
</html>
```


Screenshots
-----------

![screenshot-1](https://raw.github.com/glad/glDatePicker/gh-pages/assets/img/screenshot-1.png "Default")
![screenshot-2](https://raw.github.com/glad/glDatePicker/gh-pages/assets/img/screenshot-2.png "Dark Neon")
![screenshot-3](https://raw.github.com/glad/glDatePicker/gh-pages/assets/img/screenshot-3.png "Default with month selector")
![screenshot-4](https://raw.github.com/glad/glDatePicker/gh-pages/assets/img/screenshot-4.png "Flat White")
![screenshot-5](https://raw.github.com/glad/glDatePicker/gh-pages/assets/img/screenshot-5.png "Default with day of week offset and restrictions")


License
-------

Copyright (c) 2013 Gautam Lad.  All rights reserved.

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