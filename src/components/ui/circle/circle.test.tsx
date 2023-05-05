import React from "react";
import { render } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle", () => {
  it("renders without a letter", () => {
    const { container } = render(<Circle />);
    expect(container).toMatchSnapshot();
  });

  it("renders with a letter", () => {
    const { container } = render(<Circle letter="A" />);
    expect(container).toMatchSnapshot();
  });

  it("renders with head", () => {
    const { container } = render(<Circle head="text" />);
    expect(container).toMatchSnapshot();
  });

  it("renders with a react element in head", () => {
    const { container } = render(<Circle head={<div>React element</div>} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with tail", () => {
    const { container } = render(<Circle tail="text" />);
    expect(container).toMatchSnapshot();
  });

  it("renders with a react element in tail", () => {
    const { container } = render(<Circle tail={<div>React element</div>} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with index", () => {
    const { container } = render(<Circle index={1} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with isSmall prop set to true", () => {
    const { container } = render(<Circle isSmall />);
    expect(container).toMatchSnapshot();
  });

  it("renders in default state", () => {
    const { container } = render(<Circle state={ElementStates.Default} />);
    expect(container).toMatchSnapshot();
  });

  it("renders in changing state", () => {
    const { container } = render(<Circle state={ElementStates.Changing} />);
    expect(container).toMatchSnapshot();
  });

  it("renders in modified state", () => {
    const { container } = render(<Circle state={ElementStates.Modified} />);
    expect(container).toMatchSnapshot();
  });
});
