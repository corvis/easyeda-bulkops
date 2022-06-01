# EasyEDA BulkOps

EasyEDA BulkOps is a plugin for EasyEDA which allows to perform bulk operations on the objects. 

At the moment the only supported operation is bulk update of the component properties.

## When do I need this?

Consider the following scenario. You have a big schematic and at some point you realize you have to either:

* ... replace a group of resistors with another value
* ... because of silicone shortage you have to replace transistors with equivalent from another manufacturer
* ... any other reason causing to part replacement which want affect board layout (in other words part footprint/pads layout remains the same)

## How to use it?

1. Add the new part on canvas. It will be a of source of data for update operation. Do not connect with any other componet, just place it someware - we will remove it soon.
1. Select this new part and click Bulk Ops / Copy Params from the main menu. The informational dialog explaining consiquencies of the operation will appear.
1. Select parts which needs to be updated.

      **IMPORTANT**: Do not select parts incompatible in terms of footprint/pads layout!
      
1. Click Bulk Ops / Paste Params to update properties.
1. Ensure the result is satisfing and remove the original part we added at step 1.

See the explainer below:

![EasyEDA BulkOps Explainer Video](https://raw.githubusercontent.com/corvis/easyeda-bulkops/master/docs/demo.gif)

## Installation

1. Download the recent release of the extension from [Releases](https://github.com/corvis/easyeda-bulkops/releases/latest) page. The asset is called like `release-X.Y.Z.zip`.

      **IMPORTANT**: Pick the compiled version from Release page. Do not use just plain sources from this repository as it wont work.
      
1. Unpack archive 
1. Open EasyEDA, navigate to Advanced / Extension / Extension Setting
1. Pick Load Extension from the dialog
1. Click Select files and **select ALL files** from unpacked extension
1. Click Load Extension

## Credits

This extension was created by Dmitry Berezovsky

## Disclaimer

This module is licensed under MIT. This means you are free to use it in commercial projects.

The MIT license clearly explains that there is no warranty for this free software. 
Please see the included LICENSE file for details.
