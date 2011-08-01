glDatePicker
============

A simple, customizable, lightweight date picker calendar plugin for jQuery

Find the latest download, fully functional examples and instructions on how
to use and configure the plugin at: http://code.gautamlad.com/glDatePicker/

### Features

- forward and back navigation
- current date highlight
- restricting selection of dates outside of a range
- restricting selection of dates beyond N-days from start date
- restricting forward / backwards month navigation
- individual styles per date picker (in case you have multiples on one page)


Installation / Usage
--------------------

Extract the js and css folders from the archive.

Then add references to the stylesheet and javascript files in your page:

    <link href="css/default.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/glDatePicker.js"></script>


Make sure you have a textbox that you can tie the plugin to:

    <input type="text" id="date" />


Finally bind the plugin to the input textbox and set any options you want:

    $("#date").glDatePicker(
    {
        allowOld: false,
        startDate: new Date("September 5, 2011"),
        endDate: new Date("October 26, 2011"),
        onChange: function(target, newDate)
        {
            alert("You selected: " + newDate);
        }
    });


License
-------

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