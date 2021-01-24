import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/nodes";
import Node from "../components/Node";
import { Typography, Box, CircularProgress } from "@material-ui/core";
import Block from "../components/Block";

export class Blocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      loading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const data = await this.getBlocks();
    this.setState({...data, loading: false})
  }

  async getBlocks() {
    try {
      const node = await fetch(`${this.props.nodeUrl}/api/v1/blocks`)
      const nodeResponse = await node.json();

      if (node.status === 200) {
        return {
          blocks: nodeResponse.data,
          error: false
        }
      }

      return {
        blocks: [],
        error: true
      }
    } catch (error) {
      return {
        blocks: [],
        error: true
      }
    }
  }

  renderBlocks() {
    debugger
    return this.state.blocks.map((item, i) => <Block key={i} item={item} />);
  }

  render() {
    if (this.state.loading === true) {
      return <CircularProgress />
    }

    if (this.state.error === true) {
      return <Typography variant="h5">Something went wrong!!!</Typography>;
    }

    if (this.state.blocks.length === 0) {
      return <Typography variant="h5">No blocks were received.</Typography>;
    }

    return this.renderBlocks();
  }
}

Blocks.propTypes = {
  nodeUrl: PropTypes.string.isRequired,
};

export default Blocks;
