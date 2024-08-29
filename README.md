<h1 align="center">AI Driving Project</h1>

<div align="center">
<img src="/images/fcc.svg"/>

[Live Website](https://ai-driving-simulation.netlify.app/)
</div>





Welcome to the AI Driving project! This project showcases a React and TypeScript based web application that showcases an AI-powered vehicle learning how to drive. In this project, I have developed a simple AI algorithm to control the car's movements within a virtual environment.

It's worth mentioning that I was not responsible for developing the neural network (AI), but rather implemented it after learning the concepts.
This was one of my first "big projects" and it really helped me learning Typescript. Think you can see a huge difference between the code here, and the more recent projects ahahaha.

## Project Overview


<img align="center" src="/images/overview.png"/>


This project demonstrates the capabilities of AI in autonomous vehicle navigation within a controlled environment. The main components of this project are:

   - React: The project is built using React, a popular JavaScript library for building user interfaces. React provides a fast and efficient way to create interactive web applications.

   - TypeScript: TypeScript is used to add static typing to the JavaScript codebase, making the project more robust and maintainable.

   - Bootstrap: Bootstrap is utilized for responsive and visually appealing user interface components, ensuring that the application looks great on both desktop and mobile devices.

   - AI Algorithm: implementing a simple neural network that controls the car's movements based on its current position and obstacles within the environment (road borders and traffic).

## Usage
On the simulation panel, users have access to some configuration options that they can configure to improve the neural network. From the start, this simplistic model is not yet trained and the probability of success is nearly impossible.
By default it uses around 100 cars, and once each hits either a road border, or a traffic car, they will stop and be discarded from the current run. In order for a user to successfully pass all the cars in one run, they must save progress before the last car hits something.

Once the simulation is restarted, it will take up the last saved car data and use it to improve itself.

The **Load Optimal Data** loads a pre-trained model capable of passing all the traffic cars.

Each configuration option has a tooltip to better explain it's functionality

### NOTE
This project is based on a FreeCodeCamp project originally created using JavaScript. The codebase has been redone utilizing TypeScript, React, React-Bootstrap, and Sass. Although it's not "original", it was a crucial step on my journey as a developer and helped me get a better grasp on typescript
