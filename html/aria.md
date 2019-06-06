# Index
[Awesome a11y](https://github.com/brunopulis/awesome-a11y)


# Links
0. [MDN ARIA](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Web_applications_and_ARIA_FAQ)
1. [Diff between NVDA and JAWS](https://stackoverflow.com/questions/45941017/what-are-differences-between-nvda-and-jaws-screen-readers)
2. [Screen Readers and CSS](https://webaim.org/blog/screen-readers-and-css/)
3. [Screen Readers Reliability - HTML,CSS,ARIA](https://www.powermapper.com/tests/screen-readers/)
4. [More efficient JAWS compatibility testing](https://www.paciellogroup.com/products/jaws-inspect/)
5. [NVDA Official](https://www.nvaccess.org/about-nvda/)
6. [Accessible SVGs](https://css-tricks.com/accessible-svgs/)
    1. img svg: add alt infos, role is for old safari and iOS.
    ```html
        <img role="img" src="cat.svg" alt="Pixels, my super cute cat" >
    ```
    2. inline svg: 
        1. Inside the `<svg>`, add a `<title>` and `<desc>`
        2. Add the appropriate ID’s to the `<title>` and `<desc>`
        3. On the `<svg>` tag, add `aria-labelledby="uniqueTitleID uniqueDescID"`
        4. On the `<svg>` tag, add `role="img"`
    ```html
        <svg version="1" id="cat" viewBox="0 0 720 800" aria-labelledby="catTitle catDesc" role="img">
            <title id="catTitle">Pixels, My Super-friendly Cat</title>
            <desc id="catDesc">An illustrated gray cat with bright green blinking eyes.</desc>
            <path id="tail" data-name="tail" class="cls-1" d="M545.9,695.9c8,28.2,23.2,42.3,27.2,46.9,21.4,24.1,41.5,40.2,81.1,42.9s65.4-14.2,60.8-26.8-23.1-9.1-51.3-8.3c-35.2.9-66.6-31.3-74.8-63.9s-7.9-63.8-36.8-85.5c-44.1-33-135.6-7.1-159.8-3.4s-48.4,52.5-9.6,45.1,91.4-23.1,123.2-12.7C537.8,640.4,537.9,667.7,545.9,695.9Z" transform="translate(-9.7 -9.3)"/>
        </svg>
    ```
    3. Embed SVG via object or iframe
        1. add tabindex="0"
        2. replace role="img" with role="group" on the svg.
        3. Add a `<text>` element in the SVG that contains the content of `<title>` and possibly `<desc>` (for `NVDA`):
        4. add a class to hide the text visually, but keeping the content available for screen readers. do this by setting the `font-size: 0`
        5. summary: So, you end up with both the `<title>` (and possibly `<desc>`) and `<text>` containing the same content in order to support both JAWS and NVDA.
    ```html
        <object type="image/svg+xml" 
            data="/path-to-the-svg/filename.svg" 
            width="50%" 
            tabindex="0">
            <img src="Fallback_image.jpg" alt="alt content here">
        </object>
        <iframe src="/path-to-the-svg/filename.svg" 
            width="65%" 
            height="500" 
            sandbox 
            tabindex="0">
            <img src="Fallback_image.jpg" alt="alt content here">     
        </iframe>

        <svg id="cat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" aria-labeledby="pixels-title pixels-desc" role="group">
            <title id="pixels-title">a short title</title>
            <desc id="pixels-desc">a short desc</desc>
            <text id="nvda-title" style="font-size: 0">A cute, gray cat with green eyes. Cat illustration by Heather Migliorisi.</text>
        </svg>
    ```
        **NOTE**:
        Neither <object> nor <iframe> worked in Chrome. Chrome sees the fallback content, so you could throw alt text in there, which would be a third (or fourth) place to store the same content.
7. [Accessibility](https://fontawesome.com/how-to-use/on-the-web/other-topics/accessibility)

# JavaScript Libs
* [Toolkit for building accessible rich web apps with React](https://github.com/reakit/reakit)
