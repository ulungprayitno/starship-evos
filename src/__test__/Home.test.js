import React from "react";
import { shallow } from "enzyme";
import Home from "../pages/home";

describe("Home", () => {
  it("renders", () => {
    shallow(<Home />);
  });
});