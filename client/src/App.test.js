import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App.js";
import Dog from "./components/Dog.jsx";

const testDog = {
  id: 1,
  name: "Test",
  image:
    "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb.jpg",
  temperament: "Aloof, Aggressive",
  min_weight: 10,
  max_weight: 20,
};

describe("Landing Page", () => {
  render(<App />);
  const button = screen.getByRole("button");

  it("Should render a button to enter home", () => {
    expect(button).toBeInTheDocument();
  });
});

describe("Dog card", () => {
  render(<Dog {...testDog} />);
  const name = screen.getByTestId("name");
  const temp = screen.getByTestId("temp");
  const img = screen.getByTestId("image");

  it("Should render dog's name ", () => {
    expect(name.innerHTML).toBe("Test");
  });
  it("Should render a dog's temperament ", () => {
    expect(temp.innerHTML).toBe("Temperaments: Aloof, Aggressive");
  });
  it("Should render a dog's image ", () => {
    expect(img.src).toBe(
      "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb.jpg"
    );
  });
});
