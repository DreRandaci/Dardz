import React, { Component } from 'react';
import { View } from 'react-native';
import { CalcButton } from '../CalcButton';
import Text from '../TextWithAppFont';
import styles from './styles';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAmount: 0,
      selectedSymbol: null,
      selectedPlayer: this.props.player
    };
    this.inputButtons = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['-', 0, '+'],
      ['C', '=']
    ]
    this.MAX_POSSIBLE_SCORE = 999;
    this.MIN_POSSIBLE_SCORE = 0;
  }

  renderInputButtons = () => {
    const { selectedSymbol } = this.state;
    return this.inputButtons.map((row, index) => {
      const inputRow = row.map((buttonVal, columnIndex) => {
        return (
          <CalcButton
            styles={styles}
            value={buttonVal}
            highlight={selectedSymbol === buttonVal}
            onPress={() => { this.onCalcButtonPress(buttonVal) }
            }
            key={'button-' + columnIndex}
          />
        );
      });
      return (
        <View style={styles.inputRow} key={'row-' + index}>
          {inputRow}
        </View>
      );
    });
  }

  onCalcButtonPress = (input) => {
    switch (typeof input) {
      case 'number':
        return this.handleNumberInput(input);
      case 'string':
        return this.handleStringInput(input);
    }
  }

  handleNumberInput = (input) => {
    const inputAmount = this.state.inputAmount * 10 + input;
    if (this.amountIsInScoreRange(inputAmount)) {
      this.setState({ inputAmount });
    }
  }

  amountIsInScoreRange = (amount) => (
    amount >= this.MIN_POSSIBLE_SCORE && amount <= this.MAX_POSSIBLE_SCORE
  );

  handleStringInput = (input) => {
    const { selectedPlayer, inputAmount } = this.state;
    switch (input) {
      case '+':
      case '-':
        this.setState({
          selectedSymbol: input,
          previousInputAmount: inputAmount,
          inputAmount: inputAmount !== 0 ? inputAmount : 0
        });
        break;
      case '=':
        const { selectedSymbol } = this.state;
        /*
          If a -/+ symbol has not been selected, return since there is nothing to evaluate
        */
        if (!selectedSymbol) {
          return;
        }
        let newPlayerScore = eval(
          selectedPlayer.score + selectedSymbol + inputAmount
        );
        /*
          The player score should never be a negative number. If it is, just make it zero. The score range is set to 0-999.
        */
        if (newPlayerScore <= this.MIN_POSSIBLE_SCORE) {
          newPlayerScore = this.MIN_POSSIBLE_SCORE;
        } else if (newPlayerScore >= this.MAX_POSSIBLE_SCORE) {
          newPlayerScore = this.MAX_POSSIBLE_SCORE
        }
        this.setState({
          previousInputAmount: 0,
          inputAmount: 0,
          selectedSymbol: null
        });
        this.props.closeCalculator(newPlayerScore);
        break;
      case 'C':
        if (inputAmount === 0) {
          this.props.closeCalculator();
        }
        this.setState({
          previousInputAmount: 0,
          inputAmount: 0,
          selectedSymbol: null
        });
        break;
    }
  }

  render() {
    const { inputAmount, selectedSymbol } = this.state;
    const { player } = this.props;
    return (
      <View style={styles.rootContainer}>
        <View
          style={[
            styles.displayContainer,
            { backgroundColor: player.swatch.color }
          ]}
        >
          <View>
            <Text numberOfLines={1} style={styles.displayTextLeft}>
              {player.name}
            </Text>
            <Text style={styles.subtext}>
              {`current score: ${player.score}`}
            </Text>
          </View>
          <Text style={styles.displayTextRight}>
            {selectedSymbol || ''}{inputAmount}
          </Text>
        </View>
        <View style={styles.inputContainer}>{this.renderInputButtons()}</View>
      </View>
    );
  }
}
