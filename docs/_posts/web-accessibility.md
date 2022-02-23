### Web Accessibility

<strong>1. Why</strong>

For disabled people to browse the web application in a more friendly way (Eg: navigate web just by keyboard 🤝 ~~)

Ensure web application is being used equally by human beings ~~

<strong>2. How</strong>

Tools: 
  - `Voice over` for mac book (Mac OS built-in one)
  - `Lighthouse` for accessibility check before open a pull request !!

Web development: <a href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility" target="_blank">Bible</a> to read ~~

<strong>3. What I have learnt</strong>

(1). Inside `<section>` tag, we need to ensure we have `heading` and `paragraph` for inside the section -> God practice required !!

(2). The html tags can have 2 meanings
  - Semantic meaning: eg: the original font size defined by HTML standard
  - Styling design meaning: the actual design font size which is different from original defined size, such as h1,2,3,4,5 tags ..

(3). `role="presentation"`: means the content is not important to be shown, which will be `un-selectable` and `no semantic meaning`. Check more role properties in <a href="https://www.w3.org/TR/using-aria/#presentation" target="_blank">here</a>

(4). `aria-hidden="true"`: element is removed from the DOM tree, `role="presentation"` still keeps the element

(5). `aria-live`: exposes the dynamic content changes, eg: select an planet option from dropdown list, after yoy selected, the dropdown is shown as the selected planet answer, which is dynamically shown the changes of current selected planet !!

(6). Term of `contract ratio`: `3A` means highly distinguishable, means color is very easy to be differentiated. Normally check it on the Chrome inspect element and find a color palette and see the `contract ratio` options

(7). Different between link and button:
  - link: link to an external page -> url get updated ~
  - button: a popup or form save button -> url stay unchanged ~

(8). Firefox Accessibility Inspector has accessibility tree for checking accessibility in detail ..

(9). A better tool to check accessibility for your web app, <a href="" target="_blank">Axe</a> - follow the steps to debug ..

(10). A web page must have
  - h1 header (level 1 heading) for page/component indication
  - using tools like axe before submit your changes
  - `role="link"` for link ONLY, not for a paragraph or text
  - keep press Tab from your keyboard, ensure all elements on page is accessible by keyboard ~

(11). So far, `WCAG` is one of most popular compliance to follow ~
