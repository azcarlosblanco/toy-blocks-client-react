import React from "react";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedNodes, { Nodes } from "./Nodes";
import Node from "../components/Node";
import { CircularProgress, Typography } from "@material-ui/core";
import Blocks from "./Blocks";
import Block from "../components/Block";

describe("<Blocks />", () => {
    const nodeUrl = 'http://testUrl';
    const blocks = [
        {
            "id": "5",
            "type": "blocks",
            "attributes": {
              "index": 1,
              "timestamp": 1530679678,
              "data": "The Human Torch",
              "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
              "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
            }
        }
    ]

  it("should render a loader", async () => {
      const wrapper = shallow(<Blocks nodeUrl={nodeUrl} />);
      const loader = wrapper.find(CircularProgress).exists();
      expect(loader).toBeTruthy();
  });

  it("should render an error", async () => {
    jest.spyOn(Blocks.prototype, 'getBlocks').mockReturnValue({
        error: true,
        blocks: []
    });

    const wrapper = await shallow(<Blocks nodeUrl={nodeUrl} />);
    const textError = await wrapper.find(Typography).text();
    expect(textError).toEqual('Something went wrong!!!');
  });

  it("should render an empty state", async () => {
    jest.spyOn(Blocks.prototype, 'getBlocks').mockReturnValue({
        error: false,
        blocks: []
    });

    const wrapper = await shallow(<Blocks nodeUrl={nodeUrl} />);
    const textError = await wrapper.find(Typography).text();
    expect(textError).toEqual('No blocks were received.');
  });

  // Blocks getBlocks() that is going to return an object with blocks on it
  it("should render blocks", async () => {
    jest.spyOn(Blocks.prototype, 'getBlocks').mockReturnValue({
        error: false,
        blocks
    });

    const wrapper = await mount(<Blocks nodeUrl={nodeUrl} />);
    wrapper.update()

    const text1 = wrapper.find(Block).at(0).find(Typography).at(0).props();
    const text2 = wrapper.find(Block).at(0).find(Typography).at(1).props();

    expect(text1.children).toEqual('001');
    expect(text2.children).toEqual('The Human Torch');
  });

  it("should match snapshot", async () => {
    jest.spyOn(Blocks.prototype, 'getBlocks').mockReturnValue({
        error: false,
        blocks
    });

    const component = await create(<Blocks nodeUrl={nodeUrl} />);
    const tree = component.toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
