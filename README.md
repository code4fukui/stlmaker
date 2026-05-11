# stlmaker

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple web-based tool for generating customizable 3D box models in STL format.

## Live Demo

**[https://code4fukui.github.io/stlmaker/](https://code4fukui.github.io/stlmaker/)**

The interface provides input fields to specify a box's width, height, and depth in centimeters. Clicking the download button generates and saves the corresponding `box.stl` file.

## Features

-   **In-Browser Generation**: Creates STL files directly in your web browser, no server-side processing needed.
-   **Customizable Dimensions**: Easily set the width, height, and depth for the box model.
-   **Instant Download**: Generate and download your `box.stl` file with a single click.

## How to Use

1.  Open the [demo page](https://code4fukui.github.io/stlmaker/).
2.  Enter the desired dimensions in the `width`, `height`, and `depth` fields. The default unit is centimeters (cm).
3.  Click the **ダウンロード** (Download) button.
4.  The `box.stl` file will be saved to your computer.

*Note: The input values in centimeters are converted to meters for the final STL file (e.g., an input of `15` cm becomes `0.15` units in the model).*

## Dependencies

This tool is built as a single HTML file and relies on the following JavaScript libraries:

-   [STL.js](https://github.com/code4fukui/STL/): Used for generating the binary STL data for the 3D model.
-   [downloadFile.js](https://js.sabae.cc/downloadFile.js): A utility to trigger the file download from the browser.

## See Also

-   **STL File Format**: [Wikipedia Article](https://en.wikipedia.org/wiki/STL_(file_format))
-   **Related Project**: [box usdzmaker](https://code4fukui.github.io/usdzmaker)

## License

MIT License.