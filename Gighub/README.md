
# Gighub Sample project

## Video & Design
You can get the designs from our <a href="https://www.figma.com/community/file/1408320936296089088/gighub-website">Figma Community File.</a>

You can view the <a href="https://youtu.be/RKsko50G0V0">video</a> by Conner Adram on convert this design to code with Locofy.

## Codebase
Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code> with a minimum version of 18.

To preview and run the project with the components on your device:
1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
2) In the terminal, run `npm install`
3) Run `npm start` to view project in browser

## Importing components using Locofy CLI
You can view our documentation on <code><a href="https://www.locofy.ai/docs/custom-components/overview/">importing custom components</a></code>

Steps to import components using Locofy CLI

1) Create a new project or import custom components for an existing project
2) Ensure your `node version` is atleast 18
3) Install the Locofy CLI globally using `npm install @locofy/cli -g`
4) Navigate to the root folder of your codebase
5) Use `locofy init` command to create a locofy.config.json to configure your custom components. <a href="https://www.locofy.ai/docs/custom-components/configure-components/">Learn how to struture your config file.</a>
6) Use `locofy push` command to push your components from the local codebase to Locofy.
7) In the plugin press the button `I have completed all the steps` and all the components pushed from CLI will be pulled into the Locofy Plugin.
8) If you want to update or resync the component library, update the `locofy.config.json` and use `locofy push` command to push the updates to Locofy.
9) Select the frames in Figma and convert them into code <i>optimally reusing your custom components</i>