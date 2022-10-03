import React from "react";
import "./landing.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import background from "../../assets/background.svg";

import { faker } from "@faker-js/faker";
const judul1 = faker.lorem.sentence(4);
const judul2 = faker.lorem.sentence(4);
const judul3 = faker.lorem.sentence(4);
const judul4 = faker.lorem.sentence(4);
const paragraph1 = faker.lorem.paragraph(5);
const paragraph2 = faker.lorem.paragraph(5);
const paragraph3 = faker.lorem.paragraph(5);
const paragraph4 = faker.lorem.paragraph(5);

export default function Landing() {
  return (
    <div>
      <img className="background" src={background}></img>
      <header></header>
      <section className="flex-container">
        <img className="app-logo" src={logo} width={"40%"}></img>
        <h1 className="textRow">{judul1}</h1>
        <p className="textRow">{paragraph1}</p>
      </section>
      <section className="flex-container">
        <img className="app-logo" src={logo} width={400}></img>
        <h1 className="textRow">{judul2}</h1>
        <p className="textRow">{paragraph2}</p>
      </section>
      <section className="flex-container">
        <img className="app-logo" src={logo} width={400}></img>
        <h1 className="textRow">{judul3}</h1>
        <p className="textRow">{paragraph3}</p>
      </section>
      <section className="flex-container">
        <img className="app-logo" src={logo} width={400}></img>
        <h1 className="textRow">{judul4}</h1>
        <p className="textRow">{paragraph4}</p>
      </section>
      <footer></footer>
    </div>
  );
}
