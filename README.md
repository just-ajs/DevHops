![DevHops](./assets/DevHops.png)

# DevHops
DevHops is a workflow and toolkit for organizing Rhino Grasshopper scripts with [Hops](https://developer.rhino3d.com/guides/compute/hops-component/) and [Kanban](https://en.wikipedia.org/wiki/Kanban_board) boards.

This tool was created as a part of the [AEC Tech 2022 Hackathon](https://www.aectech.us/)


![AEC Tech Hackathon 2022](https://images.squarespace-cdn.com/content/v1/5d51be135134590001e45cf7/bf9a18f5-993c-44c1-b658-d0d77907f60a/AECtech_Banner_NYC-04.png?format=200w
)

## Introduction
Managing Rhino Grasshopper scripts and workflows when working on complex, multi-year architectural projects is difficult, due to the size and complexity of Grasshopper definitions and procedural challenges when multiple computational designers work on the on the same script in parallel. 

This project addresses this issue by proposing a workflow where  Grasshopper scripts are organized into multiple Hops components which are connected to a Kanban board for tracking project progression through work items.

## Content
| Content | App | Requirements |
| ----------- | ----------- | ----------- |
| DevOpsApp | NextJS 13 | NodeJS 16 and npm |
| DevOpsBackEnd | NetCore 6 | Visual Studio 2022 and Microsoft SQL Server Express  |
| DevHopsGh | Rhino 7 Grasshopper Plugin | Visual Studio 2022 and [Grasshopper template](https://marketplace.visualstudio.com/items?itemName=McNeel.Rhino7Templates)
| DevHopsGhSamples | Rhino Grasshopper Samples | Rhino 7 Grasshopper

## Getting Started
### Grasshopper Plugin (DevHopsGh)
1. Copy the .dll and .gha files from `C\DevHops\DevHopsGh\Plugin` folder into your Rhino Grasshopper Components folder.
2. Open in Visual Studio 2022 and build. 

### Backend (DevOpsBackEnd)
1. Open in Visual Studio 2022 and run in debug mode to deploy the back-end.
2. The backend will be running to `localhost:5296`.
3. OpenAPI documentation is available on `http://localhost:5296/swagger`

### Frontend DevOpsApp
1. Run the NextJS webapp with `npm run start`
2. The app is hosted on `localhost:3000`.

## Attributions 
- Image: "Hand drawn psychedelic groovy background" by [Freepik](https://www.freepik.com/free-vector/hand-drawn-psychedelic-groovy-background_12277065.htm#query=groovy%20background%20wallpaper&position=2&from_view=keyword")

## Contributors
- [mkosicki](https://github.com/mkosicki)
- [jkamm](https://github.com/jkamm)
- [just-ajs](https://github.com/just-ajs)
- [andersrod](https://github.com/andersrod)
- [cdriesler](https://github.com/cdriesler)
